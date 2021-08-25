
var bip39 = require('bip39');
var hdkey = require('hdkey');
var ethUtil = require('ethereumjs-util');
var ethTx = require('ethereumjsx');
const Web3 = require('web3');

//BIP 32 + BIP 44 generate secure keys

//@ethereumjs/tx create manipulate and sign eth transactions

//master private key and address generation

const mnemonic_eth = bip39.generateMnemonic(); //generates string
const seed_eth = bip39.mnemonicToSeed(mnemonic_eth); //creates seed buffer
const root_eth = hdkey.fromMasterSeed(seed_eth);
const masterPrivateKey_eth = root.privateKey.toString('hex');


//each address is considered an account 

//checksum
const addrNode = root.derive("m/44'/60'/0'/0/0"); //line 1
const pubKey = ethUtil.privateToPublic(addrNode._privateKey);
const addr = ethUtil.publicToAddress(pubKey).toString('hex');
const address = ethUtil.toChecksumAddress(addr);

const params = {
  nonce: 0,
  to: '0xF19e63fcF2EB7c8360b3E4270a626348D72ac9D1',
  value: '0.1',
  gasPrice: 5000000000,
  gasLimit: 21000,
  chainId: 3
};


const tx = new ethTx(params);
//Signing the transaction with the correct private key
tx.sign(addrNode._privateKey);
const serializedTx = tx.serialize()


const web3 = new Web3(
   new Web3.providers.HttpProvider('http://localhost:8545')
);
//Verify connection is successful
web3.eth.net.isListening()
   .then(() => console.log('is connected'))
    .catch(e => console.log('Wow. Something went wrong'));
   


    Web3.eth.sendSignedTransaction(
   `0x${serializedTx.toString('hex')}`, 
   (error, result) => { 
      if (error) { console.log(`Error: ${error}`); }  
      else { console.log(`Result: ${result}`); } 
   } 
    );
