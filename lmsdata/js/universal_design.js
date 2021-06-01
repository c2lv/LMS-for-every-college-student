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
function standard(){
    if (document.querySelector('.tooltip-content').style.display = "block")
    {
        document.querySelector('.tooltip-content').style.display = "none";
        return;
    }
    if (document.querySelector('.tooltip-content').style.display = "none")
        document.querySelector('.tooltip-content').style.display = "block";
}

function createhover(classname){
    document.querySelector(classname).classList.add('hover');
}
function deletehover(classname){
    document.querySelector(classname).classList.remove('hover');
}

// 화면 줌인, 줌아웃
var scale = 1;

function scaleIn() {
    scale *= 1.15;
    zoom(scale);
}
 
function scaleOut() {
    scale /= 1.15;
    zoom(scale);
}

function scaleInit() {
    scale = 1;
    zoom(scale);
}

function zoom(scale) {
	//var body = document.html;

	var wrap = document.getElementById("wrap");
	
	wrap.style.zoom = scale;  // IE
	wrap.style.webkitTransform = 'scale('+scale+')';  // Webkit(chrome)
	wrap.style.webkitTransformOrigin = '0 0';
	wrap.style.mozTransform = 'scale('+scale+')';  // Mozilla(firefox)
	wrap.style.mozTransformOrigin = '0 0';
	wrap.style.oTransform = 'scale('+scale+')';  // Opera
	wrap.style.oTransformOrigin = '0 0';
}
 
