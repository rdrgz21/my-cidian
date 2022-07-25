const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://my-cidian.herokuapp.com',
            changeOrigin: true
        })
    )
}