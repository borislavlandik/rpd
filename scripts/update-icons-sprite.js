/* eslint-disable */
const SVGSpriter = require('svg-sprite');
const path = require('path');
const fs = require('fs');

const spriter = new SVGSpriter({
  dest: 'src/assets',
  log: 'info',
  shape: {
    id: {
      separator: '--',
      pseudo: '~'
    },
    dimension: {
      maxWidth: 2000,
      maxHeight: 2000,
      precision: 2,
      attributes: false,
    },
    transform: [
      {
        svgo: {}
      },
    ],
  },
  svg: {
    xmlDeclaration: true,
    doctypeDeclaration: true,
    namespaceIDs: true,
    namespaceIDPrefix: '',
    namespaceClassnames: true,
    dimensionAttributes: true
  },
  mode: {
    symbol: {
      dest: '.',
      sprite: 'sprite.svg',
      example: {
        dest: 'icons-example.html',
      }
    }
  }
});


const basePath = path.resolve('src/assets/icons');

fs.readdirSync(basePath).forEach((file) => {
  const iconPath = path.join(basePath, file);
  spriter.add(iconPath, file, fs.readFileSync(iconPath, { encoding: 'utf-8' }));
});

spriter.compile((_, result) => {
  for (var mode in result) {
    for (var type in result[mode]) {
      fs.writeFileSync(result[mode][type].path, result[mode][type].contents);
    }
  }

  const spritePath = path.join(path.resolve('src/assets'), 'sprite.svg');
  fs.writeFileSync(spritePath, fs.readFileSync(spritePath, { encoding: 'utf-8' }).replaceAll('fill="#07172D"', 'fill="currentColor"'));
});
