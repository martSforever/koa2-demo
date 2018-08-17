for (var i = 1; i <= 3; i++) {
    setTimeout(function () {
        console.log(i);
    }, 0);
}


for (var i = 1; i <= 3; i++) {
    (function (i) {
        setTimeout(function () {
            console.log(i);
        }, 0);
    })(i)
}