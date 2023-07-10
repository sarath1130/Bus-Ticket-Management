var readline = require("readline");
function armstrongnum(num: number) {
  let a: number = num;
  let a1: number = a;
  let n = a.toString().length;
  let r: number = 0;
  let sum: number = 0;
  while (a > 0) {
    r = a % 10;
    sum += Math.pow(r, n);
    a = Math.floor(a / 10);
  }
  if (a1 == sum) {
    console.log("Armstrong number");
  } else {
    console.log("Not an Armstrong number");
  }
}
const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
r1.question("Enter the number:", (c) => {
  armstrongnum(c);
});
