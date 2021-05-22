const http = require("http");
const fs = require("fs");

http.createServer((request, response) => {
	const file = request.url == '/' ? './WWW/index.html' : `./WWW${request.url}`;
	
    if (request.url == "/submit") {
         let formulario = [];
         request.on("formulario", value =>{
              formulario.push(value);
          }).on("end", () =>{
			 let parametro = Buffer.concat(formulario).toString(); 
			  parametro += '\n'
			  
		fs.appendFile("./WWW/formulario/bdd.txt", parametro, (err) => {
            if (err){
                response.writeHead(400,{"Content-Type":"text/plain"});
                response.write("Not Found");
                response.end();
			}
		  });
		});
		  
		fs.readFile("./WWW/index.html", (error, html) => {
			if (error){
			  response.writeHead(400,{"Content-Type":"text/plain"});
			  response.write("Not Found");
			  response.end();
			}
		  response.writeHead(200, {"Content-Type":"text/html"});
		  response.end(html);
		});
        
    } else {

        fs.readFile(file, (err, data) => {
            if (err) {
                response.writeHead(404, { "Content-Type": "text/plain" });
                response.write("Not Found");
                response.end();
            } else {
                const extension = file.split(".").pop();
                switch (extension) {
                    case 'js':
                        response.writeHead(200, {
                            "Content-Type": "text/javascript",
                        });
                        break;
                    case 'html':
                        response.writeHead(200, {
                            "Content-Type": "text/html",
                        });
                        break;
                    case 'css':
                        response.writeHead(200, { "Content-Type": "text/css" });
                        break;
                    case 'jpeg':
                        response.writeHead(200, {
                            "Content-Type": "image/jpeg",
                        });
                        break;
					case 'txt':
						  response.writeHead(200, {"Content-Type" : "text/plain"});
						  break;
                    default:
                        break;
                }
                response.write(data);
                response.end();
            }
        });
    }
}).listen(8888);

