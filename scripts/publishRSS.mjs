//@ts-nocheck
import { readdir, readFile } from 'fs/promises';
import HTMLParser from 'node-html-parser';
import RSS from 'rss';

// TODO hardcoding for now
// List of articles in the blog directory to ignore
const exclude = ['index.html'];

export default async function makeFeed (blogDir) {
  if (!process.env.PUBLIC_URL)
    console.warn('PUBLIC_URL not set!  This will likely cause problems!');

  const baseUrl = process.env.PUBLIC_URL;

  async function getDir() {
    try {
      return await readdir(blogDir);
    } catch (err) {
      console.error(err);
    }
  }

  async function getFile(name) {
    const opts = { encoding: 'utf8' };
    const file = await readFile(blogDir + name, opts);
    return [name, file];
  }

  function getItemData([name, file]) {
    const url = baseUrl + 'blog/' + name;
    const root = HTMLParser.parse(file);

    const title = root.querySelector('head title').innerHTML;
    // If the title has a separator (hardcoded) remove everything following
    // If the title doesn't have a separator this will just trim
    const titleTrimmed = title.split('—')[0].trim();

    const metas = root.querySelectorAll('head meta');

    const checkName = (attrName) => (metaElement) =>
      metaElement.getAttribute('name') === attrName;

    const getField = (attrName, defValue = '') => {
      const meta = metas.find(checkName(attrName))
      return meta ? meta.getAttribute('content') : defValue;
    };

    const date = getField('created', false);

    return {
      url,
      title: titleTrimmed,
      description: getField('description'),
      author: getField('author'),
      date: date ? new Date(date) : '',
      guid: getField('id'),
    };
  }

  // TODO description?
  const feed = new RSS({
    title: "Nick Girardo's Personal Blog",
    site_url: baseUrl,
    feed_url: baseUrl + 'blog/feed.rss',
    language: 'en-us',
  });

  // Get all of the files in the blog dir
  const dir = await getDir();

  // Only interested in the html files
  // Filter out index.html as well
  console.log(dir);
  const htmlFiles = dir
    .filter(name => !exclude.includes(name))
    .filter(name => name.endsWith('.html'));

  // This transforms from name => [name, fileContents]
  const files = await Promise.all(htmlFiles.map(getFile));
  // This gets the rss data associated with each file
  const itemData = files.map(getItemData);
  // This mutates the feed, adding each blog post
  itemData.forEach(i => feed.item(i));

  return feed;
};
