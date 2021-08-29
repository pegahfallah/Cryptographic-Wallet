"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var CryptoJS = require('crypto-js');
var bitcoin = require('bitcoinjs-lib');
// Hashing
/*
echo -n "input of any size" | openssl dgst -md5
echo -n "same output" | openssl dgst -md5
echo -n "same output" | openssl dgst -md5
echo -n "collision resistance" | openssl dgst -sha256
echo -n "hiding" | openssl dgst -sha256
echo -n "puzzle friendliness (brute force)" | openssl dgst -sha256
*/
var md5hash = CryptoJS.MD5('bloom');
console.log('md5hash bloom', md5hash.toString());
var sha256hash = CryptoJS.SHA256('bloom');
console.log('sha256hash bloom', sha256hash.toString());
var keccakhash = CryptoJS.SHA3('bloom', { outputLength: 256 }); // length in bits
console.log('keccackhash bloom', keccakhash.toString());
var ripemd160hash = CryptoJS.RIPEMD160('bloom');
console.log('ripemd160hash bloom', ripemd160hash.toString());
// Key generation
var value = crypto.randomBytes(32); // 32 bytes = 256 bits
var aPrivateKey = value.toString('hex');
console.log('a private key', aPrivateKey);
function generateKeyPairs() {
    var keyPair = bitcoin.ECPair.makeRandom();
    var address = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey }).address;
    var publicKey = keyPair.publicKey.toString('hex');
    var privateKey = keyPair.toWIF();
    return { address: address, privateKey: privateKey, publicKey: publicKey };
}
console.log('Bitcoin address and keys', generateKeyPairs());
/*
mkdir alex
mkdir beth
openssl genrsa -out ./alex/privkey.pem 2048
openssl genrsa -out ./beth/privkey.pem 2048
openssl rsa -in ./alex/privkey.pem -pubout -out ./alex/pubkey.pem
openssl rsa -in ./beth/privkey.pem -pubout -out ./beth/pubkey.pem
echo "secret message" > ./msg.txt
openssl rsautl -sign -in ./msg.txt -inkey ./beth/privkey.pem -out ./msg.sig
openssl rsautl -encrypt -inkey alex/pubkey.pem -pubin -in ./msg.txt -out ./msg.enc
openssl rsautl -decrypt -inkey alex/privkey.pem -in ./msg.enc -out ./msg.dec
*/
// Symmetric encryption
var message = "Bloom Season 0";
var ciphertext = CryptoJS.AES.encrypt(message, aPrivateKey).toString();
// Symmetric decryption
var bytes = CryptoJS.AES.decrypt(ciphertext, aPrivateKey);
var originalText = bytes.toString(CryptoJS.enc.Utf8);
console.log('Symmetric decryption:', originalText); // 'Bloom Season 0'
