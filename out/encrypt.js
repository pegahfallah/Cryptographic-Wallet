var prompt = require("prompt-sync")();
var crypto = require("crypto");
var CryptoJS = require("crypto-js");
var bitcoin = require("bitcoinjs-lib");
//generate public and private key pair
// const value = crypto.randomBytes(32); // 32 bytes = 256 bits
// const aPrivateKey = value.toString("hex");
// // console.log('a private key', aPrivateKey)
// //a private key dee093921fa2461a8d5bfb9eb2c320815f953cc9069d036a6433762c4eaaa431
var keyPair = bitcoin.ECPair.makeRandom();
var address = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey }).address;
var publicKey = keyPair.publicKey.toString("hex");
var privateKey = keyPair.toWIF();
console.log(publicKey, privateKey);
// ask user for a message to encrypt
var input_data = prompt("Type message press enter: ");
// ENCRYPT THE DATA
var encrypted_msg = crypto.publicEncrypt({
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256", // SHA256 hashing algorithm
}, Buffer.from(input_data) // convert data from string to buffer format
);
// display the output
console.log("\nYour encrypted message is:\n\n", encrypted_msg.toString("base64"), "\n");
// // SIGN
// let signed_msg = input_data; // data to sign
// // generate a signature
// let signature = crypto.sign("sha256", Buffer.from(signed_msg), {
//   key: privateKey,
//   padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
// });
// // display the signature in a string format
// console.log("\nSignature:\n\n", signature.toString("base64"), "\n");
// let is_verified = crypto.verify(
//   "sha256",
//   Buffer.from(signed_msg),
//   {
//     key: publicKey,
//     padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
//   },
//   signature
// );
// // if signature is verified, proceed with decryption or abort
// if (is_verified == true) {
//   console.log("signature verified: ", is_verified + "\n");
//   // DECRYPT THE DATA
//   let yes_no = prompt("Press y to decrypt the message. Press n to abort.\n");
//   if (yes_no == "y") {
//     let decrypted_msg = crypto.privateDecrypt(
//       {
//         key: privateKey,
//         // we need to specify the same hash and padding scheme that we used to encrypt the data
//         padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//         oaepHash: "sha256",
//       },
//       encrypted_msg
//     );
//     // convert data from the Buffer type to a string
//     console.log(
//       "Your decrypted message is:\n\n",
//       decrypted_msg.toString(),
//       "\n"
//     );
//   } else {
//     return;
//   }
// } else {
//   console.log("Signature was not verified.");
//   return;
// }
