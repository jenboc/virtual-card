// Menus 
const mainMenu = document.getElementById("main-menu");
const loadMenu = document.getElementById("load-menu");
const createMenu = document.getElementById("create-menu");
const createResult = document.getElementById("create-result");

// Inputs 
const codeEntry = document.getElementById("load-code");
const headerEntry = document.getElementById("header-text");
const messageEntry = document.getElementById("message-text");

// Outputs 
const qrId = "qr";
const codeOutput = document.getElementById("code-output");
const linkOutput = document.getElementById("link-output");

let displayed = mainMenu;

const showMenu = (menu) => {
    displayed.style.display = "none";
    displayed = menu;
    console.log(displayed);
    displayed.style.display = "flex";
    console.log(displayed);

}

// Show card.html given a code
const loadCode = () => {
    const code = codeEntry.value;

    if (code.length === 0) 
        window.location.replace("card.html");

    if (!code.includes("\\"))
    {
        codeEntry.value = "Code was invalid";
        return;
    }

    const encodedData = code.split("\\");
    window.location.replace(`card.html?h=${encodedData[0]}&m=${encodedData[1]}`);
}

// Create a code
const createCode = (headerText, messageText) => {
    const header = btoa(headerText);
    const message = btoa(messageText);

    return `${header}\\${message}`;
}

// Create a URL 
const createUrl = (headerText, messageText) => {
    if (headerText.length === 0 || messageText.length === 0) 
        return "card.html";

    const header = btoa(headerText);
    const message = btoa(messageText);

    return `${window.location.href}/card.html?h=${header}&m=${message}`;
}

const preview = () => {
    window.open(createUrl(headerEntry.value, messageEntry.value)).focus();
}

const create = () => {
    if (headerEntry.value.length === 0) 
    {
        headerEntry.value = "YOU MUST HAVE A HEADER TO PROCEED";
        return;
    }
    else if (messageEntry.value.length === 0) 
    {
        messageEntry.value = "YOU MUST HAVE A MESSAGE TO CONTINUE";
        return;
    }

    const code = createCode(headerEntry.value, messageEntry.value);
    const link = createUrl(headerEntry.value, messageEntry.value); 
    document.getElementById(qrId).innerHTML = "";
    const qr = new QRCode(qrId, link);

    codeOutput.value = code;
    linkOutput.value = link;

    showMenu(createResult);
}

mainMenu.style.display = "flex";
loadMenu.style.display = "none";
createMenu.style.display = "none";
createResult.style.display = "none";