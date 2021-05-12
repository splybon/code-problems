class Allocator {
  constructor(int) {
    this.maxInt = int - 1;
    this.stack = [...Array(int).keys()];
    // needed for releasing
    this.allocated = new Set();
  }

  allocate() {
    if (!this.stack.length) return -1;
    const id = this.stack.shift();
    this.allocated.add(id);
    return id;
  }

  release(id) {
    if (this.allocated.has(id)) {
      this.stack.unshift(id);
      this.allocated.delete(id);
    } else {
      throw new Error("id not available");
    }
  }
}

class Allocator2 {
  constructor(int) {
    this.maxInt = int - 1;
    // only need the set
    this.allocated = new Set([...Array(int).keys()]);
  }

  allocate() {
    if (!this.allocated.size) return -1;
    const { value: id } = this.allocated.keys().next();
    this.allocated.delete(id);
    return id;
  }

  release(id) {
    if (!this.allocated.has(id) && id < maxInt) {
      this.allocated.add(id);
    } else {
      throw new Error("unable to release");
    }
  }
}

class AllocatorBoolArray {
  constructor(int) {
    this.stack = Array(int).fill(false);
  }

  allocate() {
    for (let i = 0; i < this.stack.length; i++) {
      if (!this.stack[i]) {
        this.stack[i] = true;
        return i;
      }
    }
  }

  release(id) {
    if (this.stack[id]) {
      this.stack[id] = false;
    } else {
      throw new Error("cant release");
    }
  }
}

class AllocateHeap {
  constructor(int) {
    this.maxVal = int;
    this.boolArray = Array(int * 2).fill(false);
  }

  getIndexFromId(id) {
    return id + this.maxVal - 1;
  }

  getIdFromIndex(index) {
    return index - this.maxVal + 1;
  }

  allocate() {
    let index = 0;
    if (this.boolArray[index]) throw new Error("no ids available");
    while (index < this.maxVal - 1) {
      const leftChild = index * 2 + 1;
      const rightChild = index * 2 + 2;
      if (!this.boolArray[leftChild]) {
        index = leftChild;
      } else if (!this.boolArray[rightChild]) {
        index = rightChild;
      }
    }
    this.boolArray[index] = true;
    const id = this.getIdFromIndex(index);
    this.setTree(index);
    return id;
  }

  setTree(idx) {
    let index = idx;
    while (index > 0) {
      const parent = Math.ceil(index / 2) - 1;
      const right = parent * 2 + 2;
      const left = parent * 2 + 1;
      this.boolArray[parent] = this.boolArray[left] && this.boolArray[right];
      index = parent;
    }
  }

  release(id) {
    let index = this.getIndexFromId(id);
    this.boolArray[index] = false;
    this.setTree(index);
  }

  logArray() {
    console.log(this.boolArray);
  }
}

const all = new AllocateHeap(4);

const id1 = all.allocate();
const id2 = all.allocate();
const id3 = all.allocate();
const id4 = all.allocate();

all.logArray();
all.release(id3);

all.logArray();
