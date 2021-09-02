Personal Site of Nick Girardo
=============================

Check it out live <https://nickgirardo.com/>

Runing the Site
---------------

`npm start` will serve the project locally.

Because the build process is a bit complicated (detailed bellow), I recommend checking out the build version before deploying.  To test the build process locally, you can build the project with `npm run build` and then serve the `./build` directory with the static webserver of your choice.

Build Process
-------------

Execute `npm run build` to build the site and output to `./build`.

The site is a react application which is pre-rendered into a mostly static site with [React Snap](https://github.com/stereobooster/react-snap).

React Snap unfortunately lacks an exclude option, so some files which shouldn't be pre-rendered are.  There is [an open PR](https://github.com/stereobooster/react-snap/pull/515) to add this behavior which has not been acknowledged by the maintainer (the project seems abandoned).  Due to this, we must manually delete the files after they are created instead.

Following this, we generate an RSS feed from the files output to the blog directory (excluding `./blog/index.html`).  Data for the RSS feed is scraped from these files (mostly from `meta` tags).  The implementation of this is somewhat tied to the implementation of this site and would likely need a fair amount of modification for use in other projects.

See `scripts/postbuild.mjs` for details of this process.

Deployment
----------

The github action described in `.github/workflows/build_and_deploy.yml` builds and deploys the project to a specified AWS S3 bucket.
