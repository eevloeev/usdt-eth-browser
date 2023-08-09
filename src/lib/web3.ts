import Web3 from "web3"

const INFURA_API_KEY = process.env.INFURA_API_KEY

const web3 = new Web3("https://mainnet.infura.io/v3/" + INFURA_API_KEY)

export { web3 }
