/*
*  函数声明与变量声明会被JavaScript引擎隐式地提升到当前作用域的顶部，但是只提升名称不会提升赋值部分。
*/

var foo = 1;

(function () {
    console.log(foo);
    var foo = 2;
    console.log(foo);
})();

/*

以上这段代码相当于
var foo = 1;
(function(){
    var foo;
    console.log(foo); //undefined
    foo = 2;
    console.log(foo); // 2;
})()

*/


(function () {
    console.log(foo);
})()