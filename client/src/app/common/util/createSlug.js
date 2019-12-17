export const createSlug = title => {
  var slug = title
    .replace(/'/g, '')
    .replace(/[^A-Za-z0-9-]+/g, '-')
    .toLowerCase();

  var len = slug.length;
  if (len > 80) {
    slug = slug.substring(0, 79);
  }
  if (slug.substring(len - 1) === '-') {
    slug = slug.substring(0, len - 1);
    len--;
  }
  return slug;
};
