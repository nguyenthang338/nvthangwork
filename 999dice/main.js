let conf = require('./conf.js');
let lowhigh = require('./lowhigh.js')
let login = require('./login.js')
let placebet  = require('./placebet.js')
let jsonfile = require('jsonfile');
config = {

}

async function start(){

   let session = (await login()).session;
   let percent = lowhigh(percent);
   let PayIn = 0;
   while(true){
    let result =  await placebet(session, percent, PayIn);
    if (result.Payout > 0 ){
      console.log('You win');
      PayIn = 0;
    }else {
      PayIn = PayIn * 110%
      console.log('You Lost');
    }
  }
   //setInterval(order, );
}
//Play game
start()
