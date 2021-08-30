const { mathjax } = require('mathjax-full/js/mathjax');
const { TeX } = require('mathjax-full/js/input/tex');
const { SVG } = require('mathjax-full/js/output/svg');

const { liteAdaptor } = require('mathjax-full/js/adaptors/liteAdaptor');
const { RegisterHTMLHandler } = require('mathjax-full/js/handlers/html');

const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);

// TODO take packages as arg
// TODO look into other args
const tex = new TeX({ packages: ['base', 'ams']});
const svg = new SVG({ fontCache: 'none' });

const texDoc = mathjax.document('', {
  InputJax: tex,
  OutputJax: svg,
});

// TODO test loading multiple document
const loader = (src) => {
  const node = texDoc.convert(src.trim(), {
    display: true,
  });

  // This returns a string of svg
  // It should be chained with another loader which can handle svgs
  return adaptor.innerHTML(node);
}

module.exports = loader;
