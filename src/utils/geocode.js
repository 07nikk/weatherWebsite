const request = require('postman-request');

const location = (address,callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibmlraGlsdGhha3VyIiwiYSI6ImNsMTh1a3RleTA0OW4zcnFyOXVkNHJiNGkifQ.PWnFBKnRblVqksH_wDLcDA&limit=1`
    
    request({url,json:true},(error,response,body)=>{
        if(error){
            callback('Unable to connect to the location service',undefined);
        } else if (body.features.length === 0){
            callback('Unable to find the location try another search',undefined)
        } else {

            const {features} = body;
            const {center,place_name} = features[0];

            callback(undefined,{
            latitude : center[1],
            longitude : center[0],
            location : place_name
            });
        }
    }); 
}

module.exports={
    location : location
}