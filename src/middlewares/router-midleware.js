/*
*   1、自动注入route controller
*   2、在执行时，需要传入根目录路径，比如在根目录下的index.js中执行
*       const moduleRouters = require('./src/middlewares/router-midleware')
*       moduleRouters(__dirname);
*       这时候__dirname就是项目根目录
*   3、所有的controller
*/

const fs = require('fs')
const path = require('path')
let router;
const _ = require('lodash')

const mapFiles = (targetPath, fileHandler) => {
    // 获得文件夹下的所有的文件夹和文件
    const [dirs, files] = _(fs.readdirSync(targetPath)).partition(p => fs.statSync(path.join(targetPath, p)).isDirectory())
    // 映射文件夹
    dirs.forEach(dir => mapFiles(path.join(targetPath, dir), fileHandler))
    files.forEach(fileName => fileHandler && fileHandler(fileName, path.join(targetPath, fileName)));
}

const injectRouter = (controllers) => {
    for (let name in controllers) {
        let controller = controllers[name];
        let basePath = `/${name}`;
        for (let k in controller) {
            if (k !== 'name' && k !== 'filePath') {
                let isGet = k.indexOf('Get') > -1;
                let isPost = k.indexOf('Post') > -1;
                /*如果是已Get结尾的，就注册一个get请求，如果是已post结尾的，就注册一个post请求，如果两者都没有，就注册get和post请求*/
                if (!isGet && !isPost) {
                    router.all(`${basePath}/${k}`, controller[k]);
                } else if (isGet) {
                    router.get(`${basePath}/${k}`, controller[k]);
                } else {
                    router.post(`${basePath}/${k}`, controller[k]);
                }
            }
        }
    }
    return router.routes();
}

module.exports = ({
                      rootPath,                                     //项目根目录
                      modulePath,                                   //要扫描的目录
                      fileNamePatter = '.controller.js',            //controller文件模板名称
                      koaRouterConfig,                              //koa-router的配置项
                  }) => {
    if (!rootPath) throw new Error("rootPath can't be undefined!");
    if (!modulePath) throw new Error("modulePath can't be undefined!");
    router = require('koa-router')(koaRouterConfig);
    let controllers = {};
    const targetPath = `${rootPath}/${modulePath}`;
    mapFiles(targetPath, (fileName, filePath) => {
        if (fileName.indexOf('.controller.js') > -1) {
            let name = fileName.substr(0, fileName.indexOf('.'));
            console.log(name, filePath);
            if (!!controllers[name]) {
                let errMsg = `同名controller已经存在，先发现controller【${controllers[name].filePath}】，后发现controller【${filePath}】，冲突名称【${name}】`;
                throw new Error(errMsg);
            }
            let controller = require(filePath);
            controller.filePath = filePath;
            controller.name = name;
            controllers[name] = controller;
        }
    });
    global.controllers = controllers;
    return injectRouter(controllers);
}
