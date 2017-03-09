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
	newDot.addEventListener("click", teleport);
	newDot.addEventListener("click", circleClick);
	return newDot;
	

};


var createCircleG = function(x,y,fill) {
	var newDot = document.createElementNS( "http://www.w3.org/2000/svg", "circle");
	newDot.setAttribute("cx",x);
	newDot.setAttribute("cy",y);
	newDot.setAttribute("r",20);
	newDot.setAttribute("fill",fill);
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
	var x = 0;
	var y = 0;
	var dx = 1;
	var dy = 1;
	
	var move = function(){
		//console.log(c);
		while (c < svg.children.length) {
			console.log(c);
			if (svg.children[c].getAttribute("cx") >= width || svg.children[x].getAttribute("cx") <= 0) {
				dx=-1*dx;
			}
			else if (svg.children[c].getAttribute("cy") >= width || svg.children[x].getAttribute("cy") <= 0) {
				dy=-1*dy;
			}
			else {
				oldc = svg.children[c];
				oldx = oldc.getAttribute("cx");
				oldy = oldc.getAttribute("cy");
				color = oldc.getAttribute("fill");
				oldc.remove();
				newc = createCircleG(oldx, oldy, color);
				svg.appendChild(newc);
			};
			c++;
			
		};
	
	rid = window.requestAnimationFrame(move);
	
	};
		move();
};

moveb.addEventListener("click", moveCircles);

