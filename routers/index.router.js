var express = require('express');
var router = express.Router();

router.get('/', function(request, response){
  response.sendFile('public/html/index.html', {root: __dirname});
});

module.exports = router;
