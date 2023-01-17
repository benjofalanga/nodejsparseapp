const axios = require("axios");
const fs = require('fs');
const cheerio=require('cheerio')
const pretty=require('pretty');
const { ConsoleMessage } = require("puppeteer");



  
  var fetch= (url) => axios.get(url)
  .then(async (response) => {
    console.log("getting response")
    
    const $ =cheerio.load(await response.data)
 
    nu_of_events=$('#eventSelectionBox > div > div.filter.js-filter > div.listing-control.listing-control-in-card.margin-bottom-s.theme-element-border > div.listing-control-info.margin-bottom-m > span')
    int_nu_of_events=nu_of_events.text().split(' ')
    console.log("There are ",parseInt(int_nu_of_events[0])," events")
    events=$('.listing-item')
      let dict=[]
      let saved=[]


    for (let i=0 ;i<events.length;i++){
      console.log("event ",i)
      let month=$(events[i]).find(".event-listing-month")
      let day=$(events[i]).find(".event-listing-date")
      let time=$(events[i]).find(".event-listing-time")
      let city=$(events[i]).find('.event-listing-city')
      let price=$(events[i]).find('.event-price-available')
      let url_link=$(events[i]).find('.btn')
      const regx=new RegExp(/(?<=ab)(.*?)(?=ab)/gs)
      let result=async(price) => {
        const res= regx.exec(await price)
        return res
        }
      var res=await result(price.text())
      if (res)
      {
        res=res[0]
      }
      else res='"unknown"'
      // console.log(result.index)
      dict.push(
        {
          month:month.text(),
          day:day.text(),
          time:time.text(),
          city:city.text(),
          
          price: res ,
          url:"https://eventim.de"+url_link.attr('href')
        }


      )
      console.log(dict[i])
    }
    // console.log(dict)
    return dict
    })
  .catch((err) => 
    console.log(err)
    // dict=[]

  )
  const printArtist = async (url) => {
    const a = await fetch(url);
    return a

  };


  async function art (artist){
    var url='https://www.eventim.de/artist/'+artist
      const dict = await fetch(url);
    
      
      return dict
    }

module.exports = { art };