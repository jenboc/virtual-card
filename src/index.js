const mainMenu = document.getElementById("main-menu");
const loadMenu = document.getElementById("load-menu");
const createMenu = document.getElementById("create-menu");
const createResult = document.getElementById("create-result");

let displayed = mainMenu;

const showMenu = (menu) => {
    displayed.style.display = "none";
    displayed = menu;
    console.log(displayed);
    displayed.style.display = "flex";
    console.log(displayed);

}

const loadCode = () => {
    console.log("LOAD USING CODE");
}

const preview = () => {
    console.log("PREVIEW CREATION");
}

const create = () => {
    console.log("FINALISE CREATION");
}

mainMenu.style.display = "flex";
loadMenu.style.display = "none";
createMenu.style.display = "none";
createResult.style.display = "none";