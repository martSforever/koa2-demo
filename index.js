const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const paramsMiddleware = require('./src/middlewares/params-middleware');
const config = require('./src/config/config.public')

const moduleRoutes = require('./src/middlewares/router-midleware')({
    rootPath: config.rootPath,
    modulePath: config.modulePath,
    koaRouterConfig: {
        prefix: config.requestPrefix
    }
});


app
    .use(bodyParser())
    .use(paramsMiddleware)
    .use(moduleRoutes)

const port = config.port;

app.listen(port);
console.log(`listen on ${port}`);