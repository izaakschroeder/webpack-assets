
import { lookup } from 'mime-types';
import path from 'path';

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

function name(asset) {
  const name = asset.name || path.basename(asset.file);
  return {
    ...asset,
    name: name,
  };
}

function url(asset, { publicPath }) {
  const base = ensureDirectory(publicPath);
  return {
    ...asset,
    url: base + ensureRelative(asset.file),
  };
}

function hash(asset) {
  return {
    ...asset,
    hash: asset.chunk.hash,
  };
}

const props = [
  name,
  url,
  contentType,
  hash,
];

export default function collect(stats) {
  const { chunks } = stats;
  // Order the chunks so commons chunks come first.
  return chunks
    .slice()
    .sort((a, b) => a.entry === b.entry ? b.id - a.id : !!b.entry - !!a.entry)
    .reduce((list, chunk) => list.concat(chunk.files.map(file => {
      return props.reduce((result, prop) => prop(result, stats), {
        file,
        chunk,
      });
    })), []);
}
