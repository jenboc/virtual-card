// PARSING PARAMETERS TO PUT THE CONTENT INTO THE CARD 

const overlay = document.getElementById("overlay");
const header = document.getElementById("header-container");
const message = document.getElementById("message-container");
const params = new URLSearchParams(window.location.search); 

const encodedHeader = params.get("h");
const encodedMessage = params.get("m");

if (encodedHeader === null || encodedMessage === null) 
{
    overlay.style.display = "none";
}
else 
{
    header.innerText = atob(encodedHeader);
    message.innerText = atob(encodedMessage);
}