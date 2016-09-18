var express = require('express');
var router = express.Router();

// import from coinbase and authenticate APIKey
var coinbase = require('coinbase');
var client = new coinbase.Client({'apiKey': '3FKhgE8DSfNX2fTx', 'apiSecret': 'ZpvkbipchxXJ0cGxxAcY5atZRTGomdyR'});

// declare variables we will pass into render function
var bal = [];
var trans = [];
var currency = [];
var time = [];
var totals = [0, 0, 0, 0, 0, 0];
var total_amt = 0;

// get our account
client.getAccounts({}, function(err, accounts) {
  accounts.forEach(function(acct) {
    getValues(acct);
    getTotal(acct);
  });
});

// compute necessary values
var getValues = function(acct) {
  bal.push(acct.balance.amount);
  bal.push(acct.name);
  acct.getTransactions(null, function(err, txns) {
  	txns.forEach(function(txn) {
      trans.push(parseFloat(txn.amount.amount).toFixed(7));
      currency.push(txn.amount.currency);
      time.push(txn.created_at.substring(0,10));
    });
  });
}

var getTotal = function(acct) {
  acct.getTransactions(null, function(err, txns) {
  	txns.forEach(function(txn) {
  	  if (txn.created_at.substring(0,10) == '2016-09-13') {
  	  	totals[0] += parseFloat(txn.amount.amount);
  	  }
  	  if (txn.created_at.substring(0,10) == '2016-09-14') {
  	  	totals[1] += parseFloat(txn.amount.amount);
  	  }
  	  if (txn.created_at.substring(0,10) == '2016-09-15') {
  	  	totals[2] += parseFloat(txn.amount.amount);
  	  }
  	  if (txn.created_at.substring(0,10) == '2016-09-16') {
  	  	totals[3] += parseFloat(txn.amount.amount);
  	  }
  	  if (txn.created_at.substring(0,10) == '2016-09-17') {
  	 	  totals[4] += parseFloat(txn.amount.amount);
  	  }
      if (txn.created_at.substring(0,10) == '2016-09-18') {
  	 	  totals[5] += parseFloat(txn.amount.amount);
  	  }
  	})
  })
}

/* GET dashboard page. */

router.get('/dashboard', function(req, res, next) {
    for(i = 0; i < trans.length; ++i) {
      total_amt += trans[i];
    }
    res.render('dashboard',
    	{title: "My Dashboard",
    	 balance: bal,
       transTotal: trans,
       transactions: total_amt,
    	 currencies: currency,
    	 times: time,
    	 total: totals,
    	 });
});


module.exports = router;
