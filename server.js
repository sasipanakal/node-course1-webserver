const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port=process.env.PORT||3000;
var app=express();

app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');
//app.use(express.static(__dirname+'/public'));
app.use(
    (req,res,next)=>{
        var now=new Date().toString();
        //console.log(`${now}:${req.method}:${req.url}`);
        var log=`${now}:${req.method}:${req.url}`;
        console.log(log);
        fs.appendFile(
            'server.log',log+'\n',
            (err)=>{
                if(err){
                    console.log('Unable to write to server.log file ');
                }
                
            }
        );
    next();
    }
);
/* to put the site inmaintenance modde uncomment this code
app.use(
    (req,res,next)=>{
        res.render('maintenance.hbs');
    }
);
*/
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
    
});
hbs.registerHelper('screamIt',(text)=>{return text.toUpperCase();})

app.get('/',(req,res)=>{
    //res.send('<h1>Hello Express</h1>');
    res.render('home.hbs',{
        pageTitle:'Home Page',
        welcomeMessage:'Welcometo my Page',
        
    });
   
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'unable to handle request!'
    })
});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page',
        currentYear:new Date().getFullYear()
    });
});
app.get('/projects',(re,res)=>{
    res.render('projects.hbs',{
        pageTitle:'Projects Page'
    })
});
app.listen(port,()=>{console.log(`Server is running on port ${port}`)});