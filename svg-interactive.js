//globals
var svg = document.getElementById("vimage");
var moveb = document.getElementById("move");
var cb = document.getElementById("clear");
var height = svg.getBoundingClientRect().height;
var width = svg.getBoundingClientRect().width;
var rid;


//clear
var clearSVG = function(){
    while (svg.lastChild) {
	svg.removeChild(svg.lastChild);
    };

};
cb.addEventListener("click",clearSVG);


//teleport
var teleport = function(e) {
    if (this.getAttribute("fill")=="green"){
	this.remove();
	var a = createCircle(e);
	a.setAttribute("cx", Math.random()*width);	
	a.setAttribute("cy", Math.random()*height);
	a.setAttribute("dx",1);
	a.setAttribute("dy",1);
	svg.appendChild(a);
	e.stopPropagation();
    };
};


//circleClick
var circleClick = function(e) {
    console.log("CIRCLE");
    if (this.getAttribute("fill")!="green"){	
	this.setAttribute("fill","green");
	e.stopPropagation();
    };
};

//createcircle
var createCircle = function(e) {
    var newDot = document.createElementNS( "http://www.w3.org/2000/svg", "circle");
    newDot.setAttribute("cx",e.offsetX);
    newDot.setAttribute("cy",e.offsetY);
    newDot.setAttribute("r",20);
    newDot.setAttribute("fill","goldenrod");
    newDot.setAttribute("dx",1);
    newDot.setAttribute("dy",1);
    newDot.addEventListener("click", teleport);
    newDot.addEventListener("click", circleClick);
    return newDot;
    

};


var createCircleG = function(x,y,fill,dx,dy) {
    var newDot = document.createElementNS( "http://www.w3.org/2000/svg", "circle");
    newDot.setAttribute("cx",x);
    newDot.setAttribute("cy",y);
    newDot.setAttribute("r",20);
    newDot.setAttribute("fill",fill);
    newDot.setAttribute("dx",dx);
    newDot.setAttribute("dy",dy);
    newDot.addEventListener("click", teleport);
    newDot.addEventListener("click", circleClick);
    return newDot;
    

};

//addcircle
var addCircle = function(e) {
    console.log("add");
    svg.appendChild(createCircle(e));

};


var change = function(e) {
    console.log("CIRCLE");
};

svg.addEventListener("click", addCircle);

var moveCircles = function (e) {

    window.cancelAnimationFrame(rid);
    
    var move = function(){

	var balls = document.getElementsByTagName('circle');
	for (var i =0; i < balls.length; i++){
	    var ball = balls[i];
	    var x = parseInt(ball.getAttribute("cx"));
	    var y = parseInt(ball.getAttribute("cy"));
	    var dx = parseInt(ball.getAttribute("dx"));
	    var dy = parseInt(ball.getAttribute("dy"));
	    if (x < 0 || x > width){
		dx = -1 * dx;
	    };
	    if (y < 0 || y > width){
		dy = -1 * dy;
	    }
	    ball.setAttribute("cx",x+dx);
	    ball.setAttribute("cy",y+dy);
	    ball.setAttribute("dx",dx);
	    ball.setAttribute("dy",dy);
	};
	rid = window.requestAnimationFrame(move);
    };
    move();
};
	    
		

moveb.addEventListener("click", moveCircles);
