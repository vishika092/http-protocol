let input = require('readline-sync');
let encode = require("./main_Encode")
let decode = require("./main_Decode")
let encode_img = require("./Encode_img")
let decode_img = require("./Decode_img")


function printMenu() {
    console.log("-------------------------------------------------");
    console.log("Menu : ");
    console.log("0 to Exit");
    console.log("1. Encode text to Base64");
    console.log("2. Decode Base64 to text");
    console.log("3. Encode Image to Base64");
    console.log("4. Decode Base64 to Image");
    console.log("-------------------------------------------------");
}

function ifContinue(){
    let choice = input.question("Do you wanna continue ? (y/n) : ");
    if(choice === "y"){
        main();
    }
    else{
        console.log("Exiting--- !!");
        return;
    }
}

let choice;
async function main(){
    printMenu();
    choice = input.questionInt("Enter Your Choice : ");
    switch (choice) {
        case 1:
            await encode()
            break;

        case 2:
            await decode();
            break;

        case 3:
            await encode_img();
            break;

        case 4:
            await decode_img();
            break;


        case 0:
            console.log("Exiting--- !!");
            break;
            
        default:
            console.log("Invalid Input !!");
            break;
   
    }
    if(choice != 0){
        ifContinue();
    }
}

main();