const STATE = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

class CustomPromise {
  #state = STATE.PENDING;
  #value = null;
  #fulfilledCallbacks = [];
  #rejectedCallbacks = [];

  constructor(executorFunc) {
    try {
      executorFunc(
        (value) => this.#resolve(value),
        (value) => this.#reject(value)
      );
    } catch (error) {
      this.#reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new CustomPromise((resolve, reject) => {
      const fulfilledCallback = () => {
        if (!onFulfilled) {
          return resolve(this.#value);
        }
        queueMicrotask(() => {
          try {
            const value = onFulfilled(this.#value);
            resolve(value);
          } catch (error) {
            reject(error);
          }
        });
      };
      const rejectCallback = () => {
        if (!onRejected) {
          return reject(this.#value);
        }
        queueMicrotask(() => {
          try {
            const value = onRejected(this.#value);
            resolve(value);
          } catch (error) {
            reject(error);
          }
        });
      };
      switch (this.#state) {
        case STATE.PENDING:
          this.#fulfilledCallbacks.push(fulfilledCallback);
          this.#rejectedCallbacks.push(rejectCallback);
          break;
        case STATE.FULFILLED:
          fulfilledCallback();
          break;
        case STATE.REJECTED:
          rejectCallback();
          break;
        default:
          throw new Error("Unexpected promise state");
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  get state() {
    return this.#state;
  }

  get value() {
    return this.#value;
  }
  #resolve(value) {
    this.#value = value;
    this.#state = STATE.FULFILLED;
    this.#fulfilledCallbacks.forEach((callback) => callback());
  }

  #reject(value) {
    this.#value = value;
    this.#state = STATE.REJECTED;
    this.#rejectedCallbacks.forEach((callback) => callback());
  }
}

new CustomPromise((resolve, reject) => {
  const generateRandomNumber = parseInt(Math.random() * 100, 10);
  if (generateRandomNumber % 5 === 0) {
    reject(generateRandomNumber);
  } else {
    resolve(generateRandomNumber);
  }
})
  .then((val) => console.log("Resolved:", val))
  .catch((err) => console.log("Rejected:", err));
