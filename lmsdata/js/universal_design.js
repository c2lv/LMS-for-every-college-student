function dropdown(classname){
    if (document.querySelector(classname).style.display == "none")
        document.querySelector(classname).style.display = "block";
}
function dropup(classname){
    if (document.querySelector(classname).style.display == "block")
        document.querySelector(classname).style.display = "none";
}

function standarddown(){
    if (document.querySelector('.tooltip-content').style.display = "none")
        document.querySelector('.tooltip-content').style.display = "block";
}
function standardup(){
    if (document.querySelector('.tooltip-content').style.display = "block")
        document.querySelector('.tooltip-content').style.display = "none";
}

function createhover(classname){
    document.querySelector(classname).classList.add('hover');
}
function deletehover(classname){
    document.querySelector(classname).classList.remove('hover');
}