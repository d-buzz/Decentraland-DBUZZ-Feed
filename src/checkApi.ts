import { displayEvent } from './eventBoard'

export async function getEvents() {
  let events: any[] = []
  let url = 'https://events.decentraland.org/api/events/?limit=5'

  try {
    let response = await fetch('https://api.hive.blog/', {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({"id":3,"jsonrpc":"2.0","method":"bridge.get_ranked_posts","params":{"tag":"hive-193084","limit":15,"sort":"created","start_permlink":"","start_author":""}}),
    })
    let json = await response.json()
    log(json)

    for (let event of json.result) {
        events.push(event)

    }

    return events
  } catch (e) {
    log('error getting event data ', e)
  }
}

