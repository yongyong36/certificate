var fs = require("fs");
var dirs = ['cert_wechat_app']
dirs.forEach((dir) => {
  fs.readdir(dir + '/pages/', function (err, files) {
    files.forEach(function (file) {
      fs.watch(dir + '/pages/'+file, function (event, filename) {
        console.log('event is: ' + event);
        if (filename) {
          console.log('filename provided: ' + filename);
        } else {
          console.log('filename not provided');
        }

        if(filename.indexOf(".html")>0){
          fs.readFile('./' + dir + '/pages/'+file +'/' + filename, 'utf8', (err, data) => {
            if (err) throw err;
            fs.writeFile('./' + dir + '/pages/'+file +'/' + filename.replace('html','wxml'), data, (err) => {
              if (err) throw err;
              console.log('The file has been saved!');
            });
          });
        }else if(filename.indexOf(".css")>0){
          fs.readFile('./' + dir + '/pages/'+file +'/' + filename, 'utf8', (err, data) => {
            if (err) throw err;
            fs.writeFile('./' + dir + '/pages/'+file +'/' + filename.replace('css','wxss'), data, (err) => {
              if (err) throw err;
              console.log('The file has been saved!');
            });
          });
        }
      });
    });
  })
})