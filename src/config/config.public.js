const path = require('path');
module.exports = {
    rootPath: path.join(__dirname,'../../'),           //根目录路径
    requestPrefix: '/webapp',                           //请求前缀，要加/
    modulePath: 'src/modules',                          //业务模块存放的目录，用来自动扫描controller、service以及mapper
    port: 9966,                                         //默认启动端口
}