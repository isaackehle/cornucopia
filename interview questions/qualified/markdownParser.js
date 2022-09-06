const getLevel = (str) => {
  return str.split("").reduce((sum, s) => (s == "#" ? sum + 1 : sum), 0);
};

const markdownParser = (markdown) => {
  markdown = markdown.trim();
  // Valid check for hash at the beginning of the string
  const startsWithHash = markdown.search(/^#/);
  if (startsWithHash == -1) return markdown;

  // Valid check for space after hash
  const splitMd = markdown.split("# ", 2);
  const hasSpaceAfterHash = splitMd.length > 1;
  if (!hasSpaceAfterHash) return markdown;

  // This returns the hash that was removed in the split above to properly calculate the level
  const level = getLevel(splitMd[0] + "#");
  if (level > 6) return markdown;

  // remove the header from the markdown
  const hdr = Array(level).fill("#").join("") + " ";
  const content = markdown.replace(hdr, "").trim();

  const h = `h${level}`;
  return `<${h}>${content}</${h}>`;
};


module.exports = markdownParser