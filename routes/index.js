var express = require('express');
const { ConsoleMessage } = require('puppeteer');
var router = express.Router();
const lib=require('./results')

/* GET home page. */
router.get('/', async function(req, res, next) {

  res.render('index', { title: 'Search events '});
});

/* Post the returned events */
router.post('/',async function(req,res)

  {   
    console.log('posted')
    response = {
      event_res:req.body,
    };
    console.log(response.event_res.artist);
    const artist=response.event_res.artist;
  console.log(artist)
  var fetch=await lib.art(artist)
  console.log(fetch)
  var eventlist=[]
  if (fetch.length)
  {
    for (i=0;i <fetch.length;i++){
        eventlist.push(fetch[i])
        
        
    }
  }
console.log("Returned",eventlist.length)
  
   res.render('index', {title:'Found events',events:eventlist,band:artist});
  
  }
 
)

module.exports = router;
