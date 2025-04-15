const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/rss',
    createProxyMiddleware({
      target: 'https://news.ycombinator.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api/rss': '/rss'
      },
      onProxyRes: function(proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      }
    })
  );
}; 