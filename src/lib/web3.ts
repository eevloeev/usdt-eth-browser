import Web3 from "web3"

const key = process.env.INFURA_API_KEY

if (typeof key !== "string") {
  throw new Error("Please define the INFURA_API_KEY environment variable")
}

const web3 = new Web3("https://mainnet.infura.io/v3/" + key)

export { web3 }
