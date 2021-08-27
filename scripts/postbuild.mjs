//@ts-nocheck
import { run as runSnap } from 'react-snap';
import { open } from 'fs/promises';

import makeFeed from './publishRSS.mjs';

const blogDir = './build/blog/';

// Run react-snap here
// Traverses our pages and outputs as HTML
// This must happen before building our rss as the rss depends on these files
await runSnap();

// Build our rss feed here
const feed = await makeFeed(blogDir);
const outputFile = await open(blogDir + 'feed.rss', 'w')

console.log(`Writing rss feed to ${blogDir}feed.rss!`);
outputFile.write(feed.xml({indent: true}));
