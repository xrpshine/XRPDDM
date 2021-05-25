  const {XummSdk} = require('xumm-sdk')
const Sdk = new XummSdk('26e827d2-a3ff-43e7-aa49-149cfce70396', '7fe8f030-80e5-4481-b20f-c46087e9bc54')

const main = async () => {
  //console.log(`Hi! This is where we'll be writing some code`)
  ///const appInfo = await Sdk.ping()
  ///console.log(appInfo.application.name)
    const appInfo = await Sdk.ping()
  console.log(appInfo.application.name)

  const request = {
    "txjson": {
        "TransactionType": "TrustSet",
        "Account": "rN8Ww2gWMsriJTCnJztSmgjfjmziETk1T3",
        "Fee": "12",
        "Flags": 131072,
        "LimitAmount": {
          "currency": "POP",
            "issuer": "rJkNwMsXjbM1FcpkXjSowDnh2Am46EP1eW",
            "value": "1000000000000000e-94"
        }
    },
    "user_token": "5decf1d6-cc29-4859-9d5e-0a33d10da79a"
}


  const subscription = await Sdk.payload.createAndSubscribe(request, event => {
    console.log('New payload event:', event.data)

    if (event.data.signed === true) {
      // No need to console.log here, we'll do that below
      return event.data
    }

    if (event.data.signed === false) {
      // No need to console.log here, we'll do that below
      return false
    }
  })

  console.log(subscription.created)

  /**
   * Now let's wait until the subscription resolved (by returning something)
   * in the callback function.
   */
  const resolveData = await subscription.resolved

  if (resolveData.signed === false) {
    console.log('The sign request was rejected :(')
  }

  if (resolveData.signed === true) {
    console.log('Woohoo! The sign request was signed :)')

    /**
     * Let's fetch the full payload end result, and get the issued
     * user token, we can use to send our next payload per Push notification
     */
    const result = await Sdk.payload.get(resolveData.payload_uuidv4)
    console.log('User token:', result.application.issued_user_token)
  }  
}

main()