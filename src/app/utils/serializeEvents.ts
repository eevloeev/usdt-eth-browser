import { EventLog } from "web3-eth-contract"

const serializeEvents = (events: (string | EventLog)[]) => {
  const string = JSON.stringify(events, (key, value) => {
    if (typeof value === "bigint") {
      return String(value)
    }
    return value
  })

  const object = JSON.parse(string)

  return object
}

export { serializeEvents }
