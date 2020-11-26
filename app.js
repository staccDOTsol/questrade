var Questrade = require('questrade');

var qt = new Questrade('kklBqgPysU0aW3SopXRZpE_vYxUBHqrQ0');
const express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
var request = require("request")
var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.set('view engine', 'ejs');
app.listen(process.env.PORT || 7138, function() {});
var usd2 = 0
var usdstart = 0
qt.on('ready', async function () {

  qt.getBalances(function (err, balances) {
  for(var bal in balances.combinedBalances){
  
	if (balances.combinedBalances[bal].currency == 'CAD'){
		usd2 = parseFloat(balances.combinedBalances[bal].totalEquity)
	}
	if (usdstart == 0){
		usdstart = usd2
	}
  }
  })

})
var usds = []
setInterval(function(){
	qt.getBalances(function (err, balances) {
  for(var bal in balances.combinedBalances){
  
	if (balances.combinedBalances[bal].currency == 'CAD'){
		usd2 = parseFloat(balances.combinedBalances[bal].totalEquity)
	}
	if (usdstart == 0){
		usdstart = usd
	}
  }
  })
		usds.push( [new Date().getTime(), -1 * (1-(usd2 / usdstart)) * 100])

}, 5000);

app.get('/update', cors(), (req, res) => {

res.json({usd: usds[usds.length-1]})
})

app.get('/', (req, res) => {
        res.render('index.ejs', {
            
            usd: usds
        })

});