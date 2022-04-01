const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const app = express();

//Define paths for express config
const publicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

//Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('',(req,res)=>{
    res.render('index',{
       title:'Weather App',
       name:'Nikhil Thakur' 
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',
        name:'Nikhil Thakur'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        message:'Kindly mail to nikhil@gmail.com',
        name:'Nikhil Thakur'
    });
})

app.get('/weather',(req,res)=>{
    const {address} = req.query;
    
    if(!address){
        return res.send({
            error:'Please provide address'
        });
    }
    geocode.location(address,(error,{longitude,latitude,location}={})=>{
        if(error){
            return res.send({error});
        }
        weather.forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error});
            }
            res.send({
                forecast:forecastData,
                location: location,
                address:address
            });
        });

    });
});

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404',
        errormsg:'Help article not found',
        name:'Nikhil Thakur'
    });
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'404',
        errormsg:'not found',
        name:'Nikhil Thakur'
    });
})
 


app.listen(3000 || process.env.port,()=>{
    console.log('Running the server at port 3000...');
});