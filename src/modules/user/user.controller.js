module.exports = {
    async sayHello(ctx) {
        ctx.body = {
            post: ctx.postParams,
            get: ctx.getParams,
            param: ctx.params,
        };
    },
    async testGet(ctx) {
        console.log('testGet')
        ctx.body = 'testGet';
    },
    async testPost(ctx){
        console.log('testPost')
        ctx.body = 'testPost';
    },
}