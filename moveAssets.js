const fsx = require('fs-extra');

(async () => {
  const src = './client/public/static/media';
  const dist = './client/build/static/media';
  await fsx.copy(src, dist);
})();
