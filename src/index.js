
function ensureDirectory(path) {
  return path.charAt(path.length) !== '/' ? `${path}/` : path;
}

export default function collect({ chunks, publicPath }) {
  const base = ensureDirectory(publicPath);

  // Order the chunks so commons chunks come first.
  return chunks
    .slice()
    .sort((a, b) => a.entry === b.entry ? b.id - a.id : b.entry - a.entry)
    .reduce((list, chunk) => list.concat(chunk.files.map(file => {
      return {
        url: base + file,
        chunk,
      };
    })), []);
}
