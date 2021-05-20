const fs = require('fs');

function saveText(email, cuerpo, tiempo){
    const lineTexto = `${tiempo}\nEmail: ${email}\nMensaje: ${cuerpo}`
    fs.appendFile('./bdd.txt', lineTexto, (err) => {
        if (err) {
            console.log(err)
        } else {
            alert('Se mando mensaje exitosamente')
        }
    })
}

function recogerdatos() {
    var email = document.getElementById("email").value;
    var cuerpo = document.getElementById("cuerpo").value;
    let tiempo = timestamp = (new Date(Date.now())).toUTCString();

    console.log(email)
    console.log(cuerpo)
}