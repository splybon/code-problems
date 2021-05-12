class LLItem {
  constructor(prev, next) {
    this.prev = prev;
    this.next = next;
  }

  setNext(next) {
    this.next = next;
  }

  setPrev(prev) {
    this.prev = prev;
  }

  remove() {
    this.prev.setNext(this.next);
  }
}

class LinkedList {
  constructor() {
    const start = new LLItem();
    const end = new LLItem(start);
    start.setNext(end);
    this.start = start;
    this.end = end;
  }

  push(item) {
    item.setPrev(this.end);
    this.end.next = item;
    this.end = item;
  }

  iterate(callback) {
    let item = this.start;
    while (true) {
      callback(item);
      if (item.next === undefined) break;
      item = item.next;
    }
  }

  length() {
    let counter = 0;
    this.iterate(() => (counter += 1));
    return counter;
  }
}

const list = new LinkedList();

const f = new LLItem();

list.push(new LLItem());
list.push(f);
list.push(new LLItem());
list.push(new LLItem());

list.iterate((item) => {
  if (item === f) {
    item.remove();
  }
});

console.log("Length", list.length());
