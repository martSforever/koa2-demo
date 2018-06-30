/*
*   1、该中间件为请求参数中间件，会自动把请求参数放在ctx.params中；
*   2、该中间件依赖于koa-bodyparser，在app.use(bodyParser())之后app.use(paramsMiddleware)
*   3、get请求无法获取post参数，但是如果是post请求可以获取get参数，这里会把对应请求放在ctx.params中，post参数放在ctx.postParams中，get请求放在ctx.getParams中；
*/

module.exports = async (ctx, next) => {
    ctx.params = ctx.request.method === 'POST' ? ctx.request.body : ctx.query;
    ctx.postParams = ctx.request.body;
    ctx.getParams = ctx.query;
    next();
}