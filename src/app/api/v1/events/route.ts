import { USDT_ETH } from "@/constant/contracts"
import { mongoClient } from "@/lib/mongodb"
import { web3 } from "@/lib/web3"
import { NextRequest, NextResponse } from "next/server"
import { EventLog } from "web3-eth-contract"

export async function GET(request: NextRequest) {
  const eventsCollection = mongoClient.db("db").collection("events")

  const eventsCount = await eventsCollection.countDocuments()

  if (eventsCount === 0) {
    const contract = new web3.eth.Contract(USDT_ETH.abi, USDT_ETH.address)

    const events = (await contract.getPastEvents(
      // @ts-ignore
      "Transfer",
      {
        fromBlock: 17612968,
        toBlock: 17612970,
      }
    )) as EventLog[]

    await eventsCollection.insertMany(events)
  }

  const events = await eventsCollection.find().toArray()

  return NextResponse.json({
    count: events.length,
    events,
  })
}
