

const socket= io.connect();

const form=document.getElementById('send-container');
const message=document.getElementById('messageInp');
const messagecontainer=document.querySelector('.container');

const append=(message,position)=>{
    const messageElement= document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messagecontainer.append(messageElement)
}
// io.on('connection', (socket) => {
//     socket.broadcast.emit('hi');
// });

const name=prompt('Enter your Name to Join');
socket.emit('New-user-joined', name );

socket.on('user-joined',name=>{
    console.log("Message received from server"+name);
    append(`${name} joined the chat`,'right');
})

socket.on('send',message=>{
    console.log("Message sent from server"+message);
    append(`${message.name} : ${message.message}`,'right')
})

socket.on('receive',message=>{
    console.log("Message received from server"+message);
    append(`${message.name} : ${message.message}`,'left')
})

function submitform(e) {
    e.preventDefault();
    console.log("Submitting form "+document.getElementById("messageInp").value);
    var msg =document.getElementById("messageInp").value;
    append(`${msg}`,'right');
    socket.emit('send', msg);
    document.getElementById("messageInp").value="";
}
// document.getElementById("myForm").submit();
  
