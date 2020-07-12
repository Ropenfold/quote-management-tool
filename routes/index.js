const express = require ('express'); 
const router = express.Router(); 
const Quote = require('../models/quote'); 

router.get('/quotes', function(req, res) { 
  Quote.find(function(err, quotes) {
    res.json(quotes);
  });
});

router.get('/quotes/:id', function(req, res) {  
  Quote.findById(req.params.id, function(err, quote) {
    if (!quote) {
      res.status(404).send('No result found');
    } else {
      res.json(quote);
    }
  });
});

router.post('/quotes', function(req, res) {     
  let quote = new Quote(req.body);
  quote.save()
    .then(quote => {
      res.send(quote);
    })
    .catch(function(err) {
      res.status(422).send('Quote add failed');
    });
});

router.patch('/quotes/:id', function(req, res){    
  Quote.findByIdAndUpdate(req.params.id, req.body)
    .then(function() {
      res.json('Quote updated');
    })
    .catch(function(err) {
      res.status(422).send("Quote update failed.");
    });
});

router.delete('/quotes/:id', function(req, res) {  
  Quote.findById(req.params.id, function(err, quote) {
    if (!quote) {
      res.status(404).send('Quote not found');
    } else {
      Quote.findByIdAndRemove(req.params.id)
        .then(function() { res.status(200).json("Quote deleted") })
        .catch(function(err) {
          res.status(400).send("Quote delete failed.");
        })
    }
  });
})

module.exports = router;