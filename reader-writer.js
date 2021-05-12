const promiseMaker = (fn, time = 1000) => {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      const result = fn();
      resolve(result);
    }, time)
  );
};

class RWLock {
  constructor() {
    this.readers = [];
    this.writers = [];
    this.currentPromise = null;
  }

  async writer_lock() {
    this.currentPromise =
      this.currentPromise ||
      new Promise(async (resolve, reject) => {
        await Promise.all(this.readers);
        this.readers = [];
        while (this.writers.length) {
          const prom = this.writers.shift();
          await prom();
        }
        resolve();
        this.currentPromise = null;
      });
    await this.currentPromise;
  }

  async read(func) {
    await this.writer_lock();
    this.readers.push(func);
    await func();
  }

  async write(func) {
    this.writers.push(func);
    return await this.writer_lock(func);
  }
}

class Lock {
  constructor() {
    this.lock_promise = null;
  }

  async run(func) {
    let resolve = null;
    let previous_lock = this.lock_promise;
    this.lock_promise = new Promise((rs, rj) => {
      resolve = rs;
    });
    await previous_lock;
    const result = await func();
    resolve();
    return result;
  }
}

class RWLock {
  constructor() {
    this.readers = [];
    this.lock = new Lock();
    this.writing_promise = null;
  }

  async read(func) {
    console.log("r1");
    this.readers.push(func);
    await this.writing_promise;

    return await func();
  }

  async write(func, log) {
    console.log("w1");
    this.writing_promise = this.lock.run(async () => {
      console.log("in here", this.readers);
      await Promise.all(this.readers);
      console.log("after await");
      // return await func()
    });
    return await this.writing_promise;
  }
}

const rwLock = new RWLock();

rwLock.read(async () => {
  console.log("r0 start");
  await promiseMaker(() => console.log("reading 0"), 1000);
  console.log("r0 end");
});

rwLock.write(async () => {
  console.log("w1 start");
  await promiseMaker(() => console.log("writing 1"));
  console.log("w1 end");
}, "1");

// const run = () =>
//   setTimeout(() => {
//     rwLock.write(async () => {
//       console.log("w1 start");
//       await promiseMaker(() => console.log("writing 1"));
//       console.log("w1 end");
//     }, "1");

//     rwLock.write(async () => {
//       console.log("w2 start");
//       await promiseMaker(() => console.log("writing 2"), 5000);
//       console.log("w2 end");
//     }, "2");

//     // rwLock.read(async () => {
//     //   console.log("r3 start");
//     //   await promiseMaker(() => console.log("reading 3"), 5000);
//     //   console.log("r3 end");
//     // });

//     rwLock.write(async () => {
//       console.log("w3 start");
//       await promiseMaker(() => console.log("writing 3"), 1000);
//       console.log("w3 end");
//     });

//     // rwLock.read(async () => {
//     //   console.log("r1 start");
//     //   await promiseMaker(() => console.log("reading 1"));
//     //   console.log("r1 end");
//     // });
//   }, 10);

// run();
