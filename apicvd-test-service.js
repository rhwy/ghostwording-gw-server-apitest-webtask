var express    = require('express');
var Webtask    = require('webtask-tools');
var bodyParser = require('body-parser');
var axios      = require('axios');
var app = express();

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendStatus(200);
});

app.get('/test/docdemo/intentions',function(req,res){
  axios.defaults.headers.common['Accept-Language'] = 'fr-FR';
  axios.defaults.headers.common['Accept'] = 'application/json';
  axios
    .get('http://api.cvd.io/docdemo/intentions')
    .then(function (response) {
      //console.log(response.data);
      if(response.data.length === 5){
        res.sendStatus(200);
      } else {
        res.status(400).send('get ok but expected 5 items and instead got ' + response.data.length);
      }
      
    })
    .catch(function (error) {
      console.log(error);
    });
  });
module.exports = Webtask.fromExpress(app);
