const socket = new WebSocket(`ws://${location.host}:81`);
let chatBox = document.getElementById("chat");

window.onload = function() {
  document.getElementById("message").addEventListener('keydown', function(event) {
    if(event.key == "Enter") {
      send();
    }
  });
};

socket.onmessage = ({data}) => {
  handleMessage(data);
}

function send(){
  let user = document.getElementById("user").value;
  let msg = document.getElementById("message").value;

  socket.send(`<span class="user">${user}:</span> ${msg}`);

  document.getElementById("message").value = "";
}

function handleMessage(data){
  if(data.includes("People Online: ")){
    put(`${data.substring(15)} other user(s) online`);
  }
  else{
    put(data);
  }

  setTimeout(()=> {document.getElementById("chat").scrollTo(0, document.getElementById("chat").scrollHeight)}, 75);
}

function put(message){
  let msg = document.createElement("div");
  msg.setAttribute("class", "messages");
  msg.innerHTML = message;
  chatBox.insertBefore(msg, document.getElementById("anchor"));
}