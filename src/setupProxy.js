/** src/setupProxy.js */
const proxy = require('http-proxy-middleware');

// 开发环境代理配置
module.exports = function(app) {
    
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        next();
    });

    app.use(
        proxy('/api', {
            target: 'http://gank.io/api',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '',
            },
        })
    );
    app.use(
        proxy('/doubanApi', {
            target: 'https://api.douban.com',
            changeOrigin: true,
            pathRewrite: {
                '^/doubanApi': '',
            },
        })
    );
};
