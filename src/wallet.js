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
function generateKeyFiles() {
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
  const keyPair = crypto.generateKeyPairSync("rsa", {
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
  console.log(
    "The BASE 64 public key is: ",
    keyPair.publicKey.toString("base64")
  );
  console.log();
  console.log(
    "The BASE 64 private key is: ",
    keyPair.privateKey.toString("base64")
  );
  // Creating public key file
  fs.writeFileSync("public_key", keyPair.publicKey);
}

// Generate keys
generateKeyFiles();

// Create a promise based version of readline so we can use it in async functions
const question = (str) =>
  new Promise((resolve) => readline.question(str, resolve));

const encrypting = {
  start: async () => {
    return encrypting.ask();
  },
  ask: async () => {
    const message = await question("Enter a message to encrypt: ");
    if (message) {
      return encrypting.encryptMessage(message, "./public_key");
    }
  },
  encryptMessage: async (message, publicKeyFile) => {
    const publicKey = fs.readFileSync(publicKeyFile, "utf8");
    // publicEncrypt() method with its parameters
    const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(message));
    console.log(encrypted.toString("base64"));
  },
  end: async () => {
    readline.close();
  },
};
encrypting.start();
