

var bip39 = require('bip39');
var hdkey = require('hdkey');
var createHash = require('create-hash');
var btcLib = require('bitcoinjs-lib');
var bs58check = require('bs58check');
//master private key generation

//mneumonic generation
const mnemonic = bip39.generateMnemonic(); //generates string
// const mnemonic = "gentle mutual speak consider mandate kingdom cash explain soul exile cabin squeeze";
const seed = bip39.mnemonicToSeed(mnemonic).toString(); //creates seed buffer
console.log('Seed: ' + seed);
console.log('mnemonic: ' + mnemonic);

//address generation
// root of the node tree 
// masterPrivatKey

const root = hdkey.fromMasterSeed(seed);
const masterPrivateKey = root.privateKey.toString('hex');
console.log('masterPrivateKey: ' + masterPrivateKey);

//BIP 44
//m / purpose' / coin_type' / account' / change / address_index

const addrnode = root.derive("m/44'/0'/0'/0/0");
console.log('addrnodePublicKey: '+ addrnode._publicKey)

//GENERATING A BITCOIN ADDRESS FROM THE ADDRESS NODE
//get public key
const getPublicKey = addrnode._publicKey;
//perform sha256 hashing on the public key 
const sha256 =  createHash('sha256').update(getPublicKey).digest();
//ripemd 160 hashing on the result of sha256
// Merkle–Damgård construction. It is used in the Bitcoin standard. 
// It is a a strengthened version of the RIPEMD algorithm which produces a 128 bit hash digest while the RIPEMD - 160 algorithm produces a 160 - bit output.The compression function is made up of 80 stages made up of 5 blocks that run 16 times each.
// This pattern runs twice with the results being combined at the bottom using modulo 32 addition.
const ripemd = createHash('rmd160').update(sha256).digest();

//add version byte 0x6f as testnet 
let versionByte = Buffer.allocUnsafe(21)
versionByte.writeUInt8(0x00, 0);
ripemd.copy(versionByte, 1) //extended result


//base 58 encoding--> 58 characters to encode the data and checksum is added to the data
//the first 4 bytes of sha256 result is the checksum 

//hash the ripemd twice with sha256 then take away the first 4 bytes and add it to the end of the base address 
const bs58 = bs58check.encode(ripemd);

console.log(bs58)