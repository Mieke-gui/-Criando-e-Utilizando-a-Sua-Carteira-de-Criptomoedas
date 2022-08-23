//importando dependencias
const bip32 =  require('bip32')
const bip39 =  require('bip39')
const bitcoin =  require('bitcoinjs-lib')

//definir a rede
const network = bitcoin.networks.testnet

const path = `m/49'/1'/0'/0`

let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criando raiz da carteira
let root = bip32.fromSeed(seed, network)

//criando conta
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAdress = bitcoin.payments.p2pkh({
    pubkey : node.publicKey,
    network : network
}).address

console.log("carteira gerada")
console.log("Endereço: ", btcAdress)
console.log("Chave privada: ", node.toWIF())
console.log("Seed: ", mnemonic)