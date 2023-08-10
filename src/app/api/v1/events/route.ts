import { parseEvents } from "@/app/utils/parseEvents"
import { mongoClient } from "@/lib/mongodb"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const eventsCollection = mongoClient.db("db").collection("events")

  const eventsCount = await eventsCollection.countDocuments()

  if (eventsCount === 0) {
    parseEvents()

    return new Response("Parsing events, please try again later...", {
      status: 202,
    })
  }

  const events = await eventsCollection.find().toArray()

  return NextResponse.json({
    count: events.length,
    events,
  })
}
