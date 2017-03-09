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
	if (this.getAttribute("fill")!="green"){	
		this.setAttribute("fill","green");
		e.stopPropagation();
	}
	else {
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
	}
	else {
		this.remove();
		var a = createCircle(e);
		a.setAttribute("cx", Math.random()*width);	
		a.setAttribute("cy", Math.random()*height);	
		svg.appendChild(a);
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
	newDot.addEventListener("click", circleClick);
	//newDot.addEventListener("click", teleport);
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

var moveCircles = function () {
	x=0;

	dx = 1;
	dy = 1;


	while (x < svg.children.length) {
		if (svg.children[x].getAttribute("cx") >= width || svg.children[x].getAttribute("cx") <= 0) {
			dx=-1;
		}
		else if (svg.children[x].getAttribute("cy") >= width || svg.children[x].getAttribute("cy") <= 0) {
			dy=-1;
		}
		else {
			svg.children[x].setAttribute("cx", svg.children[x].getAttribute("cx")+dx);
			svg.children[x].setAttribute("cy", svg.children[x].getAttribute("cy")+dy);
		};
		x++;
	};
	
	
};

moveb.addEventListener("click", moveCircles);

