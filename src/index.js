
function ensureDirectory(path) {
  return path.charAt(path.length - 1) !== '/' ? `${path}/` : path;
}

function ensureRelative(path) {
  return path.charAt(0) !== '/' ? path : path.substr(1);
}

export default function collect({ chunks, publicPath }) {
  const base = ensureDirectory(publicPath);

  // Order the chunks so commons chunks come first.
  return chunks
    .slice()
    .sort((a, b) => a.entry === b.entry ? b.id - a.id : b.entry - a.entry)
    .reduce((list, chunk) => list.concat(chunk.files.map(file => {
      return {
        url: base + ensureRelative(file),
        chunk,
      };
    })), []);
}
