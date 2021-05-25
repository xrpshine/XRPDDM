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
      //"TransactionType": "Payment",
      //"Destination": "rwietsevLFg8XSmG3bEZzFein1g8RBqWDZ",
      //"Amount": "10000"
      "Account": "rN8Ww2gWMsriJTCnJztSmgjfjmziETk1T3",
      "TransactionType": "Payment",
      "Amount": "1",
      "Destination": "rPCxnSjwViCVTKDSDXuAZtEGgu9kJuV8uJ",
      "Fee": "100000",
      "Memos": [{
        "Memo": {
          "MemoData": "546861742773206F6E6520736D616C6C20696D616765206F66206D6F6F6E2C206F6E65206769616E74206C65617020666F72204E4654206F6E20746865205852504C",
          "MemoFormat": "746578742F706C61696E",
          "MemoType": "6E66742F30"
        }
      },
        {
          "Memo": {
            "MemoData": "48756265727420476574726F7577",
            "MemoFormat": "746578742F706C61696E",
            "MemoType": "6E66742F31"
          }
        },
        {
          "Memo": {
            "MemoData": "697066733A2F2F62616679626569686561786B696A3276656D6B7337726B716E6F67367933367579793337626B33346D697533776F72636A756F6833747532773279",
            "MemoFormat": "746578742F757269",
            "MemoType": "6E66742F32"
          }
        },
    
        {
          "Memo": {
            "MemoData": "68747470733A2F2F676574726F75772E636F6D2F696D672F707572706C656D6F6F6E2E706E67",
            "MemoFormat": "746578742F757269",
            "MemoType": "6E66742F33"
          }
        },
          {
          "Memo": {
            "MemoData": "646174613A696D6167652F6769663B6261736536342C52306C474F446C684641415541505141414141414142415145434167494441774D4542415146425155474267594842776348392F66342B506A352B666E362B7672372B2F76382F507A392F66332B2F76377741414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414143483542414541414241414C4141414141415541425141414157524943534F5A476D65614B7175624F74437A664D7551564D456937674D41494D554D684942554F4D784941454141544A736942674F4A674267654267456A476E413063673945524446464342364E4D6248305945684543454579784844414354316571383352486C69654D73474147414641414949436A495051776F4F66675A4A41544A5A5932414C4255634B535A516A684552424A41384355774F6750414B6649326445547156554A6A774166364345435352694F436F4D42416F6A6A61675149514137",
            "MemoFormat": "746578742F757269",
            "MemoType": "6E66742F34"
          }
        }]
        
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