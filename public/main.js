// Lado del Cliente
const socket = io.connect();

// Funcion que renderiza los mensajes
function render(data) {
    const html = data.map((elem) => {
        return(`<div>
                    <strong style='color:blue; font-weight:bold '>${elem.author} </strong> ${elem.date}:
                    <em>${elem.text}</em>
                </div>`)
    }).join(" ");
    document.getElementById('mensajes').innerHTML = html;
}

//Funcion que se ejecuta luega de apretar el boton enviar del form
function addMessage(e) {
    const date = new Date()
    const mensaje = {
        author: document.getElementById('email').value,
        date: `[${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`,
        text: document.getElementById('texto').value
    };
    
    // Enviamos nuevo mensaje al servidor
    socket.emit('nuevoMensaje', mensaje);
    return false; //Es como un preventDefault() para que no se recarue el formulario
}


socket.on('mensajes', function(data) {
    console.log(data);
    render(data);
});
