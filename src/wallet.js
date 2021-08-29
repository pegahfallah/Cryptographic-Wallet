var crypto = require("crypto");
const CryptoJS = require("crypto-js");
const bitcoin = require("bitcoinjs-lib");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("This is a node JS walkthrough of a cryptographic wallet");

//generate public and private key pair using DSA
const { publicKey, privateKey } = crypto.generateKeyPairSync("ec", {
  namedCurve: "secp256k1",
  publicKeyEncoding: {
    type: "spki",
    format: "der",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "der",
  },
});

// Prints asymmetric key pair
console.log("The public key is: ", publicKey);
console.log();
console.log("The private key is: ", privateKey);
//after encoding
// Prints asymmetric key pair after encoding
console.log("The BASE 64 public key is: ", publicKey.toString("base64"));
console.log();
console.log("The BASE 64 private key is: ", privateKey.toString("base64"));

let encrypt = "";
readline.question(`Enter a secret message: `, (msg) => {
  encrypt = msg;
  console.log(`This message will be encrypted: ${encrypt} `);
  readline.close();
});
