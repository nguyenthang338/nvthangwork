let  Binance = require ('binance-api-node').default;
const random = require('random');
const jsonfile = require('jsonfile');
const filedir = '/tmp/data.json'

//jsonfile.writeFileSync(file, obj)
// Authenticated client, can make signed calls
const client = Binance({
  apiKey: 'U6YoJUkYCHSOg0ekOt6KvqFNeJAE5eLBejFukBKgte2sv4NQvIjhNY7Rs3bHDlkz',
  apiSecret: '9LTKyEoUe4qtz4PPQ6l8fRatunaQincXH7N6M2a1QAXPj1RS3U3EQfrNHfKfW0Js' ,
})

async function buy (){
  let ArrayCoin = ['XMRUSDT','LTCUSDT','DOGEUSDT','XRPUSDT','BCHUSDT','EOSUSDT']
  //buy limit
  let number = random.int(min = 0, max = 5) // uniform integer in [ min, max ]
  let coinbuy = Arraycoin[number];
  let info = await client.accountInfo();
  let usdt = info.balances.find(e => e ='USDT');
  let free = usdt.free;

  let lastprice = await client.prices({ symbol: coinbuy})

  let quanity = (free / lastprice).toFixed(4) ;
  //oder buy
  let result = await client.order({
    symbol: coinbuy,
    side: 'BUY',
    quantity: quanity,
    price: lastprice,
  }),
    //write  lai result to file
    jsonfile.writeFileSync(file, result)
}

//sell limit
//read info from file

async function sell () {
  let result = jsonfile.readFileSync(file);
  let lastprice = await client.prices({ symbol: result.symbol})
  let percent = lastprice / file.price - 1;
  if (percent > config.percent ){
    await client.order({
      symbol: result.symbol,
      side: 'SELL',
      quantity: result.quantity,
      price: lastprice,
    }),
  }
  result = {};
  //write file empty
  jsonfile.writeFileSync(file, result)

}
async function order(){
  console.log(
    await client.order({
      symbol: 'XLMETH',
      side: 'BUY',
      quantity: 100,
      price: 0.0002,
    }),
  )
}
/*
{
  symbol: 'XLMETH',
  orderId: 1740797,
  clientOrderId: '1XZTVBTGS4K1e',
  transactTime: 1514418413947,
  price: '0.00020000',
  origQty: '100.00000000',
  executedQty: '0.00000000',
  status: 'NEW',
  timeInForce: 'GTC',
  type: 'LIMIT',
  side: 'BUY'
}
*/

