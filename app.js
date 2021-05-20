const http = require("http");
const fs = require("fs");

http.createServer((request, response) => {
    console.log(request.url);
    console.log(request.method);
    if (request.method == "POST") {
         var body = "";
         request.on('data', function (chunk) {
              body += chunk;
          });
          console.log(body);
        response.writeHead(200, { "content-type": "application/json" });
        response.end();
        
    } else {
        const file = request.url == "/" ? "./WWW/index.html" : `./WWW${request.url}`;

        fs.readFile(file, (err, data) => {
            if (err) {
                response.writeHead(404, { "Content-Type": "text/plain" });
                response.write("Not Found");
                response.end();
            } else {
                const extension = file.split(".").pop();
                switch (extension) {
                    case "js":
                        response.writeHead(200, {
                            "Content-Type": "text/javascript",
                        });
                        break;
                    case "html":
                        response.writeHead(200, {
                            "Content-Type": "text/html",
                        });
                        break;
                    case "css":
                        response.writeHead(200, { "Content-Type": "text/css" });
                        break;
                    case "jpeg":
                        response.writeHead(200, {
                            "Content-Type": "image/jpeg",
                        });
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

function saveText(email, cuerpo, tiempo) {
    const lineTexto = `${tiempo}\nEmail: ${email}\nMensaje: ${cuerpo}`;
    fs.appendFile("./bdd.txt", lineTexto, (err) => {
        if (err) {
            console.log(err);
        } else {
            alert("Se mando mensaje exitosamente");
        }
    });
}

function recogerdatos() {
    var email = document.getElementById("email").value;
    var cuerpo = document.getElementById("cuerpo").value;
    let tiempo = (timestamp = new Date(Date.now()).toUTCString());
    saveText(email, cuerpo, tiempo);
    console.log(email);
    console.log(cuerpo);
}
