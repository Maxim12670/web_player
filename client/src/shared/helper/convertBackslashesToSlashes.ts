const convertBackslashesToSlashes = (url: string): string => {
  return url.replace(/\\/g, "/");
};

export default convertBackslashesToSlashes;
