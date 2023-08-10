import { USDT_ETH } from "@/constant/contracts"
import { mongoClient } from "@/lib/mongodb"
import { web3 } from "@/lib/web3"
import { EventLog } from "web3-eth-contract"

interface Event extends EventLog {
  time?: Date
  amount?: number
  fee?: string
}

const parseEvents = async () => {
  const eventsCollection = mongoClient.db("db").collection("events")
  const contract = new web3.eth.Contract(USDT_ETH.abi, USDT_ETH.address)

  const events: Event[] = []
  const rawEvents = (await contract.getPastEvents(
    // @ts-ignore
    "Transfer",
    {
      fromBlock: 17612968,
      toBlock: 17612970,
    }
  )) as EventLog[]

  for (const rawEvent of rawEvents) {
    console.log("processing event #" + rawEvent.transactionHash)
    const { transactionHash, returnValues } = rawEvent

    if (transactionHash === undefined) {
      throw new Error("event.transactionHash is undefined")
    }

    const block = await web3.eth.getBlock(rawEvent.blockNumber)
    const receipt = await web3.eth.getTransactionReceipt(transactionHash)
    const transaction = await web3.eth.getTransaction(transactionHash)
    const gasPrice = (transaction as any).gasPrice as bigint
    const gasUsed = receipt.gasUsed
    const fee = gasPrice * BigInt(gasUsed)

    events.push({
      ...rawEvent,
      time: new Date(Number(block.timestamp * BigInt(1000))),
      amount: Number((returnValues.value as bigint) / USDT_ETH.decimals),
      fee: web3.utils.fromWei(fee, "ether"),
    })
  }

  eventsCollection.insertMany(events)

  console.log("processed " + events.length + " events")
}

export { parseEvents }
