import * as crypto from 'crypto'
const CryptoJS = require('crypto-js')
const bitcoin = require('bitcoinjs-lib')

// Hashing

/*
echo -n "input of any size" | openssl dgst -md5
echo -n "same output" | openssl dgst -md5
echo -n "same output" | openssl dgst -md5
echo -n "collision resistance" | openssl dgst -sha256
echo -n "hiding" | openssl dgst -sha256
echo -n "puzzle friendliness (brute force)" | openssl dgst -sha256
*/

const md5hash = CryptoJS.MD5('bloom')
console.log('md5hash bloom', md5hash.toString())

const sha256hash = CryptoJS.SHA256('bloom')
console.log('sha256hash bloom', sha256hash.toString())

const keccakhash = CryptoJS.SHA3('bloom', { outputLength: 256 }) // length in bits
console.log('keccackhash bloom', keccakhash.toString())

const ripemd160hash = CryptoJS.RIPEMD160('bloom')
console.log('ripemd160hash bloom', ripemd160hash.toString())

// Key generation

const value = crypto.randomBytes(32) // 32 bytes = 256 bits
const aPrivateKey = value.toString('hex')
console.log('a private key', aPrivateKey)

function generateKeyPairs() {
    const keyPair = bitcoin.ECPair.makeRandom()
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey })
    const publicKey = keyPair.publicKey.toString('hex')
    const privateKey = keyPair.toWIF()
    return { address, privateKey, publicKey }
}

console.log('Bitcoin address and keys', generateKeyPairs())

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

const message = "Bloom Season 0"
const ciphertext = CryptoJS.AES.encrypt(message, aPrivateKey).toString()

// Symmetric decryption

const bytes  = CryptoJS.AES.decrypt(ciphertext, aPrivateKey);
const originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log('Symmetric decryption:', originalText); // 'Bloom Season 0'