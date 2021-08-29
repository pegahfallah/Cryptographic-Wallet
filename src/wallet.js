var crypto = require("crypto");
const CryptoJS = require("crypto-js");
const bitcoin = require("bitcoinjs-lib");
const fs = require("fs");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("This is a node JS walkthrough of a cryptographic wallet");

//generate public and private key pair using DSA
// function generateKeyFiles() {
//   const keyPair = crypto.generateKeyPairSync("ec", {
//     namedCurve: "secp256k1",
//     publicKeyEncoding: {
//       type: "spki",
//       format: "pem",
//     },
//     privateKeyEncoding: {
//       type: "pkcs8",
//       format: "pem",
//       cipher: "aes-256-cbc",
//       passphrase: "",
//     },
//   });
const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 520,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
    cipher: "aes-256-cbc",
    passphrase: "",
  },
});

// Prints asymmetric key pair
//after encoding
// Prints asymmetric key pair after encoding
console.log("The BASE 64 public key is:\n ", publicKey.toString("base64"));
console.log();
console.log("The BASE 64 private key is:\n", privateKey.toString("base64"));
// Creating public key file
fs.writeFileSync("public_key", publicKey);
// }

// Generate keys
// generateKeyFiles();

// Create a promise based version of readline so we can use it in async functions
var encrypted = "";
var message = "";
var input = "";
const question = (str) =>
  new Promise((resolve) => readline.question(str, resolve));

const wallet = {
  start: async () => {
    return wallet.ask();
  },
  ask: async () => {
    message = await question("Enter a message to encrypt: ");
    if (message) {
      input = message;
      return wallet.encryptMessage(message, "./public_key");
    }
  },
  encryptMessage: async (message, publicKeyFile) => {
    const publicKey = fs.readFileSync(publicKeyFile, "utf8");
    // publicEncrypt() method with its parameters
    encrypted = crypto.publicEncrypt(publicKey, Buffer.from(message));
    console.log(encrypted.toString("base64"));
    return wallet.decryptAsk();
  },
  decryptAsk: async () => {
    const msg = await question("Decrypt this message? (y/n) ");
    if (msg === "y") {
      return wallet.signMessage(Buffer.from(input));
    } else {
      return wallet.end();
    }
  },
  signMessage: async (messageToSign) => {
    // Sign the data and returned signature in buffer
    console.log("Signing");
    const sign = crypto.sign("SHA256", messageToSign, privateKey);
    // Convert returned buffer to base64
    const signature = sign.toString("base64");
    // Printing the signature
    console.log(`Signature:\n\n ${signature}`);
    return wallet.verifyMessage(signature);
  },
  verifyMessage: async (signature) => {
    const isVerified = crypto.verify("SHA256", message, publicKey, signature);
    console.log(`Is signature verified: ${isVerified}`);
  },

  decryptMessage: async () => {
    const decrypted = crypto.privateDecrypt(
      crypto.publicEncrypt(privateKey, Buffer.from(message))
    );
    console.log(`Decrypted: ${decrypted}`);
    return wallet.end();
  },
  end: async () => {
    readline.close();
  },
};
wallet.start();

// var decrypted = crypto.privateDecrypt({
//     key: privateKey.toString(),
//     passphrase: 'top secret',
//   }, buffer);
