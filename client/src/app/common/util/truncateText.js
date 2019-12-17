export const truncateText = text => {
  if (!text) {
    return '';
  }
  return text.match(/.{1,225}(\s|$)/g)[0].trim() + '...';
};
