/* 
Create a memoize function that remembers previous inputs and stores them in cache so that it wont have to commute the same inputs more than once.
The function will take unspecified number of inputs and a reducer method.
 */

//reducer method
function add(arr) {
  let sum = 0;
  sum = arr.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
  return sum;
}

const memoize = (func) => {
  let cache = {};
  return function (...args) {
    let numbersArr = args;
    if (numbersArr in cache) {
      return cache[numbersArr];
    }
    let result = func(numbersArr);
    cache[numbersArr] = result;
    return result;
  };
};

console.time();
const memoizeAdd = memoize(add);
console.log(memoizeAdd(100, 100));
console.timeEnd();

console.time();
console.log(memoizeAdd(100, 100));
console.timeEnd();
