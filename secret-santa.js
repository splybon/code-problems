const fs = require("fs");

const prom = new Promise((resolve, reject) => {
  fs.readFile("./secret-santa.csv", "utf8", (err, d) => {
    if (err) {
      console.error(err);
      reject(err);
      return;
    }
    resolve(d);
  });
});

const parse = (data) => {
  const splitData = data.split("\n");
  const rows = splitData.map((row) => row.split(","));
  rows.sort(() => Math.random() - 0.5);
  rows.forEach((row, index) => {
    const selectedRow = index === rows.length - 1 ? 0 : index + 1;
    console.log(`${row[0]} is assigned to ${rows[selectedRow]}`);
  });
};

prom.then(parse);
