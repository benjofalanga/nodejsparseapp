const axios = require("axios");
const fs = require('fs');
const cheerio=require('cheerio')
const pretty=require('pretty');
const { ConsoleMessage } = require("puppeteer");


// async function  get_events(artist){
  
  var fetch= (url) => axios.get(url)
  .then((response) => {
    console.log("getting response")
    
    const $ =cheerio.load(response.data)
    // fs.writeFileSync('response.txt',pretty($.html()))
    nu_of_events=$('#eventSelectionBox > div > div.filter.js-filter > div.listing-control.listing-control-in-card.margin-bottom-s.theme-element-border > div.listing-control-info.margin-bottom-m > span')
    int_nu_of_events=nu_of_events.text().split(' ')
    console.log("There are ",parseInt(int_nu_of_events[0])," events")
    events=$('.listing-item')
      let dict=[]


    for (let i=0 ;i<events.length;i++){
      let month=$(events[i]).find(".event-listing-month")
      let day=$(events[i]).find(".event-listing-date")
      let time=$(events[i]).find(".event-listing-time")
      let city=$(events[i]).find('.event-listing-city')
      let price=$(events[i]).find('.event-price-available')
      let url_link=$(events[i]).find('.btn')
      dict.push(
        {
          month:month.text(),
          day:day.text(),
          time:time.text(),
          city:city.text(),
          price:price.text(),
          url:"https://eventim.de"+url_link.attr('href')
        }


      )
    }
    console.log(dict)
    return dict
    })
  .catch((err) => 
  // console.log("Fetch error " + err)
  dict=[]
  )
  const printArtist = async (url) => {
    const a = await fetch(url);
    return a

  };


  async function art (artist){
    var url='https://www.eventim.de/artist/'+artist
      var dict=await printArtist(url)
      return dict
    }

  // art('metallica')

  //   dict=art('kreator')
    // console.log(dict.then((response)=>{return response}))
module.exports = { art };