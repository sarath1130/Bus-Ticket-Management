var readline = require("readline");
function armstrongnum(num) {
    var a = num;
    var a1 = a;
    var n = a.toString().length;
    var r = 0;
    var sum = 0;
    while (a > 0) {
        r = a % 10;
        sum += Math.pow(r, n);
        a = Math.floor(a / 10);
    }
    if (a1 == sum) {
        console.log("Armstrong number");
    }
    else {
        console.log("Not an Armstrong number");
    }
}
var r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
r1.question("Enter the number:", function (c) {
    armstrongnum(c);
});
