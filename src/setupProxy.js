const { createProxyMiddleware } = require('http-proxy-middleware');
const target = 'http://172.16.9.141:3000/'; //文奇本地

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target,
      secure: false,
      changeOrigin: true
    })
  );

  // app.use(
  //   '/auth',
  //   createProxyMiddleware({
  //     target,
  //     secure: false,
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/auth': '/'
  //     }
  //   })
  // );
};
