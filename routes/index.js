var http = require('http')
   ,cheerio = require('cheerio')
   ,request = require('request')

// resume view
var options = {
  host: 'www.ccw.org.tw',
  port: 80,
  path: '/legislator/content/62'
};


exports.index = function(req, res){
  res.sendfile('./views/index.htm');
};

exports.getUrl = function(req, res){
  var urlInput = req.param('url'); 
  
  request(urlInput, function(err, re, html) {
    if(err) {
      console.log(err)
      res.send({status:err, dom: {} });
      return;
    } 
    var opts = { 
      lowerCaseTags: true,
      lowerCaseAttributesNames: true,
      ignoreWhitespace: true
    }
    var $ = cheerio.load(html, opts);
    // console.log(html)
    var obj = {};
    var status = 'OK';

    if($('body').length>0) {
      objs = trav($('body')[0]);
    } else if(html && html.length>0){
      status = 'Get cotent string but HTML parsed incorrectly.'
    } else {
      status = 'Got problems on getting HTML content at: '+ urlInput;
    }

    function trav(self) { 
      var r = [];
      for(var i=0;i < self.children.length; i++) {
        var c = self.children[i];
        // console.log(c.type)
        if(c.type=='text') {
          r.push({type:c.type, data: c.data, attrs:{} });
        } else if(c.type=='tag') {
          // console.log(c.children)
          r.push({ type:c.type, name:c.name, attrs:c.attribs, children:trav(c) });
        } else if(c.type=='script'){
          // ignore for now
        }
      }
      return r;  
    }

    // done trav
    res.send({status:status, dom: objs });
    
  });
};

