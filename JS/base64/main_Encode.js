let input = require('readline-sync');
const fs = require("fs/promises");


function decimalToBinary(num) {
  let binary = num.toString(2);
  while (binary.length != 8) {
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


function splitInto6(mergerdBinary) {
  

  let paddedZero = 0;
  let arr = [];
  for(let i = 0; i<mergerdBinary.length; i+=6){
    let abc = mergerdBinary.split("").slice(i, i+6).join("")
    arr.push(abc);
  }
  while(arr[arr.length -1].length != 6){
    arr[arr.length -1] += "0";
    paddedZero++;
  }

  return {arr, paddedZero};
}



async function main(){

 try{
  let fileName = input.question("Enter file name : ");
  let character = await fs.readFile(`${fileName}`, "utf-8");


  let binaryArr = character.split("").map((char) => {
    var asciiValue = char.charCodeAt(0);     
    let binary = decimalToBinary(asciiValue);
    return binary;
  });
  
  
  let base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  
  let mergerdBinary = binaryArr.join("");
  let {arr : sixPartsSplit, paddedZero} = splitInto6(mergerdBinary);
  
  let base64Arr = sixPartsSplit.map((binaryNum) => {
      let decimal = binaryToDecimal(binaryNum);   
      let base64Num = base64.charAt(decimal);
      return base64Num;
      
  })
  
  while(paddedZero > 0){
    base64Arr.push("=");
    paddedZero -= 2;
  }
  
  let str = (base64Arr.join(""));

  await fs.writeFile("Decode.txt", str);
  console.log("file decoded successfully");
 }
 catch(err){
  console.log(err);
 }

}


// main();

module.exports = main;
