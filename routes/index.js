var express = require('express');
var router = express.Router();
const lib=require('./results')

/* GET home page. */
router.get('/', async function(req, res, next) {

  res.render('index')
});

router.post('/',async function(req,res)

  {   
    console.log('posted')
    // res.sendStatus()
    response = {
      first_name:req.body,
    };
    console.log(response.first_name.artist);
    const artist=response.first_name.artist;
  console.log(artist)
  var fetch=await lib.art(artist)
  console.log(fetch)
  var dict=[]
  if (fetch.length)
  {
    for (i=0;i <fetch.length;i++){
        dict.push(fetch[i])
    }
  }
  console.log("Retuned",dict.length)
  // res.render('index', { title: 'Search events ' ,events:dict});
    // res.send(dict)
   res.render('index', { title: 'Search events ' ,events:dict,band:artist});
      // res.end(JSON.stringify(response));
  
  //     // res.render('index')
  }
 
)

module.exports = router;
