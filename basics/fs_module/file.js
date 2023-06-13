const fs = require("fs");

//This is to creat the file available in specified directory
fs.writeFileSync("./test.txt", "Hello world");

fs.writeFile("./test1.txt", "Hello there this is async function", (err) => {});

//To read the file
let result = fs.readFileSync("./contacts.txt", "utf-8");
console.log(result);

fs.readFile("./contacts.txt", "utf-8", (err, result) => {
  if (err) {
    console.log("error occured");
  } else {
    console.log("this is readFile async which requires cb");
  }
});
