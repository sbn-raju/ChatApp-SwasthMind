const socket = io();
let btn = document.querySelector(".btn");
let input = document.querySelector("#textarea");
let messageArea = document.querySelector('.message_area');

let name;
do {
    name = prompt("Enter your username");
}while(!name);


btn.addEventListener("click",(e)=>{
    e.preventDefault;
    sendMessage(input.value);
});

function sendMessage(message){
    let msg = {
        user :name,
        message:message
    }

    appendMessage(msg, 'outgoing');
    input.value = '';
    scrollToBottom();
    socket.emit('message',msg);
    
}


function appendMessage(msg, type){
      let mainDiv = document.createElement('div');
      let typePos =  type;
      mainDiv.classList.add(typePos, 'message');

      let markup = `
      <h4>${msg.user}</h4>
      <p>${msg.message}</p>
      `

      mainDiv.innerHTML = markup;
      messageArea.appendChild(mainDiv);
}
//Reciving Data

socket.on('message',(msg)=>{
      appendMessage(msg, 'incoming');
      scrollToBottom();
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}