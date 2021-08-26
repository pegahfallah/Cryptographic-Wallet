# Bitcoin-HD-Wallet


An HD wallet is a public/private key tree all starting from a root node. 
It has a tree structure where each node extends to a private and public key.
The master private key is unable to sign transactions it just generates key pairs. 

#Libraries needed
bip39-- for mnemonic generation
hdkey-- implementation of BIP 32 
create-hash-- for creating hashes
bs58check-- for base58 encoding of bitcoin


