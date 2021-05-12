/* Move a robot on a 2d array.  Robot should be able to go forward, and turn left and right */

const obj = {
  up: {
    row: -1,
    col: 0,
    left: "left",
    right: "right",
  },
  down: {
    row: 1,
    col: 0,
    left: "right",
    right: "left",
  },
  left: {
    row: 0,
    col: -1,
    left: "down",
    right: "up",
  },
  right: {
    row: 0,
    col: 1,
    left: "up",
    right: "down",
  },
};

class Robot {
  constructor(size, currentRow = 0, currentCol = 0, direction = "right") {
    this.array = [...Array(size).fill(false)].map(() => [
      ...Array(size).fill(false),
    ]);
    this.currentRow = currentRow;
    this.currentCol = currentCol;
    this.direction = direction;
    this.array[currentRow][currentCol] = true;
  }

  turnLeft() {
    this.direction = obj[this.direction].left;
  }

  turnRight() {
    this.direction = obj[this.direction].right;
  }

  moveForward() {
    const { row, col } = obj[this.direction];
    const newRow = this.currentRow + row;
    const newCol = this.currentCol + col;
    if (
      this.array[newRow] === undefined ||
      this.array[newRow][newCol] === undefined
    ) {
      throw new Error("Cant move outside of grid");
    }
    this.array[this.currentRow][this.currentCol] = false;
    this.currentRow = newRow;
    this.currentCol = newCol;
    this.array[this.currentRow][this.currentCol] = true;
  }

  getDirection() {
    console.log("Current Row", this.currentRow);
    console.log("Current Column", this.currentCol);
    console.log("array", this.array);
  }
}

const robot = new Robot(10);
robot.moveForward();
robot.moveForward();
robot.getDirection();
robot.turnRight();
robot.moveForward();
robot.moveForward();
robot.moveForward();
robot.moveForward();
robot.getDirection();
