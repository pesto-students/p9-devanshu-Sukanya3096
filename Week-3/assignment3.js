function createIncrement() {
  let count = 0;
  function increment() {
    count++;
  }

  let message = `Count is ${count}`;
  function log() {}

  return [increment, log];
}

const [increment, log] = createIncrement();
console.log(increment, log);
increment();
increment();
increment();
log();

/* The logged value is 'Count is 0', because of closures. Although the count value increases to 3, but the value in the variable message is not changed since its not inside increment method. So only when createIncrement was called first time, the initial value that was assigned to message variable, that is only the final value. So at line 19, when log method is called, we get the value with the initial count number only. */
