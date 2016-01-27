import { lookup } from 'mime-types';

function ensureDirectory(path) {
  return path.charAt(path.length - 1) !== '/' ? `${path}/` : path;
}

function ensureRelative(path) {
  return path.charAt(0) !== '/' ? path : path.substr(1);
}

function contentType(asset) {
  return {
    ...asset,
    contentType: lookup(asset.file),
  };
}

function file(asset) {
  return {
    ...asset,
    file: asset.name,
  };
}

function url(asset, { publicPath }) {
  const base = ensureDirectory(publicPath);
  return {
    ...asset,
    url: base + ensureRelative(asset.file),
  };
}

function hash(asset, stats) {
  return {
    ...asset,
    hash: stats.hash,
  };
}

const props = [
  file,
  url,
  contentType,
  hash,
];

const entry = (stats, asset) => {
  return asset.chunks.some(id => stats.chunks[id].entry);
};

const index = (stats, asset) => {
  return Math.min(...asset.chunks);
};

const comparator = (stats) => (a, b) => {
  const eA = entry(stats, a);
  const eB = entry(stats, b);

  if (eA && eB) {
    return index(stats, a) - index(stats, b);
  }
  return eB - eA;
};

export default function collect(stats) {
  // Order the chunks so commons chunks come first.
  return stats.assets ? stats.assets
    .slice()
    .sort(comparator(stats))
    .map(asset => {
      return props.reduce((result, prop) => prop(result, stats), asset);
    }) : [];
}
