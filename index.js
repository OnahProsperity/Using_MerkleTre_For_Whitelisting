const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')
const Web3 = require('web3');
const bip39 = require('bip39')
const HDKey = require('hdkey')
const ethUtil = require('ethereumjs-util')
const createHash = require('create-hash')
// require('dotenv-defaults').config()

let whiteListedAddress = []
let whiteListedAddressPrivateKey = []

createHdWallet = async (accountIndex) => {
    let mnemonic = await bip39.generateMnemonic();
    let seed = await bip39.mnemonicToSeed(mnemonic)
    let root = HDKey.fromMasterSeed(seed);
    let masterPrivateKey = root.privateKey.toString('hex');
    let masterPublicKey = root.publicKey.toString('hex');

    let addrNodeBSC = await root.derive(`m/44'/60'/0'/0/${accountIndex}`);
    let pubKeyBSC = ethUtil.privateToPublic(addrNodeBSC._privateKey); 
    const privatKey = addrNodeBSC._privateKey.toString('hex');
    const addr = "0x" + ethUtil.publicToAddress(pubKeyBSC).toString('hex');
    const address = ethUtil.toChecksumAddress(addr);

    // whiteListedAddress.push(address)

    // whiteListedAddressPrivateKey.push(privatKey)
    // console.log( {"address":address, "privateKey":privatKey })
    return {
        "address":address,
        "privateKey":privatKey
    }
}

createMultiAddress = async () => {

    for(let i = 0; i <= 1; i++) {
       var rec = await createHdWallet(i);
        
       console.log("hello.",  rec["address"])
    }
}
createMultiAddress()
// createHdWallet(0)
console.log(whiteListedAddressPrivateKey)
console.log(whiteListedAddress)