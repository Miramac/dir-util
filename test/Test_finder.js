
var dir = require('../index.js')
, options = {
        filters: [/\.js(on)*$/i] //  just count .js or .json files
        , unit: 'b'
    }
, path = './'
;

dir.getSize(path,  function(err, size) {
    console.log(path,size,err);
});


