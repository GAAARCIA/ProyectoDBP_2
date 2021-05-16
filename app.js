const http = require('http');
const fs = require('fs');

http.createServer((request, response) =>{
     console.log(request.url);
     const file = request.url == '/'? './WWW/index.html' : `./WWW${request.url}`;

     fs.readFile(file,(err,data)=>{
     if(err){
        response.writeHead(404, {"Content-Type":"text/plain"});
        response.write("Not Found");
        response.end();
     }else{
      const extension = file.split('.').pop();
      switch(extension){
           case 'txt':
                response.writeHead(200, {"Content-Type":"text/plain"});
                break;
           case 'js':
                response.writeHead(200, {"Content-Type":"text/javascript"});
                break;
           case 'html':
                response.writeHead(200, {"Content-Type":"text/html"});
                break;
           case 'css':
                response.writeHead(200, {"Content-Type":"text/css"});
                break;
           case 'jpeg':
                response.writeHead(200, {"Content-Type":"image/jpeg"});
                break;
              }
        response.write(data);
        response.end();
    }
 });

}).listen(8888);
