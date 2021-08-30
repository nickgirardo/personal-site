//@ts-nocheck
import { run as runSnap } from 'react-snap';
import { rm, open } from 'fs/promises';

import makeFeed from './publishRSS.mjs';

const blogDir = './build/blog/';

const snapExclude = ['/resume.pdf', '/blog/feed.rss'];

// Run react-snap here
// Traverses our pages and outputs as HTML
// This must happen before building our rss as the rss depends on these files
// Options: viewport defaults to mobile, pc form factor is more my target
const snapOptions = {
  viewport: {
    width: 1440,
    height: 900,
  },
  // exclude: snapExclude,
};
await runSnap(snapOptions);


// Removing crap react-snap makes
// A few of the paths linked to are meant to be created with other tools
// such as making the rss feed below
// react-snap has no exclude option, although there is an open pr to add one
// https://github.com/stereobooster/react-snap/pull/515
// The react-snap project appears to be abandoned, I might pick it up if I have time
console.log('Removing garbo made by react-snap since you can\'t exclude paths');
await Promise.all(snapExclude.map(dir => rm(`./build${dir}`, { recursive: true })));

// Build our rss feed here
const feed = await makeFeed(blogDir);
const outputFile = await open(blogDir + 'feed.rss', 'w')

console.log(`Writing rss feed to ${blogDir}feed.rss!`);
outputFile.write(feed.xml({indent: true}));
