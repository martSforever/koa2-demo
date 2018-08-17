var foo = 1;

var a = {
    foo
}

function run() {

    console.log(a, foo);

    var foo = 2;
    console.log(foo);
}

run()