async function sleep(t) {
  return await new Promise((r) => setTimeout(r, t));
}

class RWLock {
  constructor() {
    this.currentReaders = 0;
    this.queue = [];
    this.writing = false;
    this.reading = false;
  }

  async runRead(item) {
    this.running = true;
    this.reading = true;
    this.runQueue();
    this.currentReaders++;
    await item.callback();
    this.currentReaders--;
    if (this.currentReaders <= 0) this.reading = false;
    this.runQueue();
  }

  async runWrite(item) {
    this.running = true;
    this.writing = true;
    await item.callback();
    this.writing = false;
    this.runQueue();
  }

  runQueue() {
    const item = this.queue[0];
    if (!item) {
      this.running = false;
      return;
    }
    if (item.type === "Read" && !this.writing) {
      this.queue.shift();
      this.runRead(item);
    }
    if (item.type === "Write" && !this.reading && !this.writing) {
      this.queue.shift();
      this.runWrite(item);
    }
  }

  readLock(callback) {
    this.queue.push({
      type: "Read",
      callback,
    });

    if (!this.running) this.runQueue();
  }

  writeLock(callback) {
    this.queue.push({
      type: "Write",
      callback,
    });

    if (!this.running) this.runQueue();
  }
}

const rwLock = new RWLock();

rwLock.writeLock(async () => {
  console.log("write 1 start");
  await sleep(1000);
  console.log("write 1 end");
});
rwLock.readLock(async () => {
  console.log("read 0 start");
  await sleep(1000);
  console.log("read 0 end");
});
rwLock.writeLock(async () => {
  console.log("write 2 start");
  await sleep(1000);
  console.log("write 2 end");
});
rwLock.readLock(async () => {
  console.log("read 1 start");
  await sleep(1000);
  console.log("read 1 end");
});
rwLock.readLock(async () => {
  console.log("read 2 start");
  await sleep(500);
  console.log("read 2 end");
});
rwLock.readLock(async () => {
  console.log("read 3 start");
  await sleep(2000);
  console.log("read 3 end");
});
rwLock.writeLock(async () => {
  console.log("write 3 start");
  await sleep(2000);
  console.log("write 3 end");
});
rwLock.readLock(async () => {
  console.log("read 4 start");
  await sleep(2000);
  console.log("read 4 end");
});
rwLock.readLock(async () => {
  console.log("read 5 start");
  await sleep(2000);
  console.log("read 5 end");
});
rwLock.readLock(async () => {
  console.log("read 6 start");
  await sleep(2000);
  console.log("read 6 end");
});

// setTimeout(() => {
//   rwLock.writeLock(async () => {
//     console.log("write 4 start");
//     await sleep(2000);
//     console.log("write 4 end");
//   });
// }, 10000);
