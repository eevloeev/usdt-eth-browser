import { MongoClient, ServerApiVersion } from "mongodb"

const uri = process.env.MONGODB_URI

if (typeof uri !== "string") {
  throw new Error("Please define the MONGODB_URI environment variable")
}

const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    await mongoClient.connect()
  } catch (e) {
    console.dir(e)
  }
}
run()

export { mongoClient }
