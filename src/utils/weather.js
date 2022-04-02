const request = require("postman-request");

const forecast=(long,lat,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=8e0455ba1c86d98829f34175997435a8&query=${long},${lat}`;

    request({url,json:true},(error,response,body)=>{
        if(error)
        {
            callback('Unable to connect to the service',undefined);
        } else if(body.error)
        {
            callback('Unable to fetch the location weather forecast kindly try another location',undefined);
        } else{
            const {temperature,precip,feelslike,weather_descriptions,visibility} = body.current ;
            const message = `${weather_descriptions[0]} It is currently ${temperature} degrees out. There is ${precip} chance of rain and feels like ${feelslike} degrees and visibility is ${visibility} meters`;
            callback(undefined,message);
        }
    })
}

module.exports={
    forecast:forecast
}