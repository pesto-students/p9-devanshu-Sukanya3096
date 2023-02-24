const fib = {
  n: 5,
  [Symbol.iterator]: function () {
    let i = 1;
    let old = 0,
      new1 = 1;
    return {
      next: () => {
        if (i++ <= this.n) {
          [old, new1] = [new1, old + new1 || 1];
          return { value: old, done: false };
        } else {
          return { done: true };
        }
      },
    };
  },
};

console.log([...fib]);

for (let num of fib) {
  console.log(num);
}
