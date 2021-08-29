# Cryptographic wallet

## Usage

running `node wallet.js` will demonstarte a walkthrough of a cryptographic wallet. 

## Capabilities:

* generate public and private key
* take in user input and encrypt
* sign message with private key
* verify signature with public key
* decrypt message


## Libraries used
Node.js crypto library

# Bitcoin-HD-Wallet

## Usage

run `npm install` and then `npm run start` to run the index.ts file
This demonstrates Bitcoin HD wallet key generation

## Summary 

An HD wallet is a public/private key tree. 
It has a tree structure where each node extends to a private and public key starting from the root.
The master private key is unable to sign transactions, it just generates key pairs. 
This HD wallet is compatible with Bitcoin.

## Libraries used
* bip39-- for mnemonic generation
* hdkey-- implementation of BIP 32 
* create-hash-- for creating hashes
* bs58check-- for base58 encoding of bitcoin


