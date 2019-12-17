export const createUid = () => {
  const d = new Date();
  const s = '' + d.getTime();
  return s.substring(s.length - 6);
};
