let input = require('readline-sync');
const fs = require("fs/promises");


function decimalToBinary(num) {
  let binary = num.toString(2);
  while (binary.length != 6) {
    binary = "0" + binary;
  }
  return binary;
}

function binaryToDecimal(num){
    let decimal = num.split("").reverse().reduce((sum,char, i) => {
        char = parseInt(char);
        let value = char * (2**i);
        return sum + value;
    }, 0);

    return decimal;
    
}


function splitInto8(mergerdBinary) {
    let arr = []

    for(let i =0; i<mergerdBinary.length; i+=8){
      let abc = mergerdBinary.split("").slice(i, i+8).join("");
      arr.push(abc);
    }
    return arr;
}



async function main(){
  let fileName = input.question("Enter file name : ");
  let character = await fs.readFile(`${fileName}`, "utf-8");
  let paddedZero = 0;

  let base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  let binaryArr = character.split("").map((base64Char) => {
    var decimal = base64.indexOf(base64Char);
    if(base64Char === "="){
        paddedZero += 2;
        return "";
    }     
    let binary = decimalToBinary(decimal);
    return binary;
  });
  

  
  let mergerdBinary = binaryArr.join("");
  let splitInto8Arr = (splitInto8(mergerdBinary));
  
  let decimalArr = splitInto8Arr.map((binary) => {
    let decimal = binaryToDecimal(binary);
    return decimal;
  })


  var buf = Buffer.from(decimalArr);

  await fs.writeFile("Output.png", buf);
  console.log("file encoded successfully");
}


// main();

module.exports = main;