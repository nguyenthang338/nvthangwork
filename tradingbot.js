let  Binance = require ('binance-api-node').default;
const random = require('random');
const jsonfile = require('jsonfile');
const filedir = './data.json'

//jsonfile.writeFileSync(file, obj)
// Authenticated client, can make signed calls
const config = {
  delay: 120000 , //Day la 2 phut dung khong nao.
  percent: 0.4,
  usdmin: 10,
  binance: 'bot',
}
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
  let usdt = info.balances.find(e => e.asset == 'USDT');
  let free = usdt.free;

  let lastprice = await client.prices({ symbol: coinbuy})

  if ( usdt > config.usdmin ){
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
  console.log("Buy Symbol" + coinbuy + "\tLast price: " + lastprice + "Quantity:" + quanity);
}

//sell limit
//read info from file

async function sell () {
  let result = jsonfile.readFileSync(file);
  let lastprice = await client.prices({ symbol: result.symbol})
  let percent = 0 ;
  if (lastprice > file.price ){
     percent = lastprice / file.price - 1;
  }else {
    percent = 0;
  }
  if (percent > config.percent ){
    //Sell luon dung khong
    await client.order({
      symbol: result.symbol,
      side: 'SELL',
      quantity: result.origQty,
      price: lastprice,
    }),
  }
  result = {};
  //write file empty
  jsonfile.writeFileSync(file, result)
  console.log("Sell Symbol "+ symbol + "Quantity" + result.origQty + "\tLast price: " + lastprice + "\t Oldprice:" + file.price + "\t Percent: " + percent );
}

function order {
    buy () ;
    sell () ;
}
setInterval (order, config.delay );
