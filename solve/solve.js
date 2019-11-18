// Scott Bing
// BSSD5520 Javascript
// Fall 2019
// Final Project

var  canvas;
var ctx;
var output;

var Width = 1200;
var Height = 800;

tileW = 20;
tileH = 20;

tileRowCount = 25;
tileColumnCount = 40;

dragok = false;

boundX =0;
boundY =0;

var tiles = [];
for (c = 0; c < tileColumnCount; c++) {
    tiles[c] = [];
    for (r = 0; r < tileRowCount;  r++) {
        tiles[c][r] = {x: c*(tileW+3), y: r*(tileH+3), state: 'e'}; // state is 'e' for empty
    }
}
tiles[0][0].state = 's'; //start tile   
tiles[tileColumnCount-1][tileRowCount-1].state = 'f';   // finish tile

// color each of the squares according to its currrent state value
function rect(x,y,w,h,state) {
    if (state == 's') {
        ctx.fillStyle = '#00FF00'; // RGB 
    } else if (state == 'f') {
        ctx.fillStyle = '#FF0000'; // RGB 
    } else if (state == 'e') {
        ctx.fillStyle = '#808080'; // RGB 
    } else if (state == 'w') {
        ctx.fillStyle = '#0000FF'; // RGB 
    } else if (state == 'x') {
        ctx.fillStyle = '#000000'; // RGB
    } else {
        ctx.fillStyle = '#FFFF00'; // RGB 
    }
      
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
}

function clear() {
    ctx.clearRect(0,0,Width,Height);
}

function draw() {
    clear();
    console.log("in draw:")
    
    for (c = 0; c < tileColumnCount; c++) {
        for (r = 0; r < tileRowCount; r++) {
            rect(tiles[c][r].x, tiles[c][r].y, tileW, tileH, tiles[c][r].state);
        }
    }
}

function solveMaze() {
    var Xqueue = [0];
    var Yqueue = [0];
    
    var pathFound = false;
    
    var xLoc;
    var yLoc;
    
    while (Xqueue.length > 0 && !pathFound) {
        console.log("Xqueue.length: ", Xqueue.length);
        console.log("pathFound: ", pathFound);
        xLoc = Xqueue.shift();
        console.log("after shift 'x' xLoc", xLoc);
        console.log("after shift 'x' yLoc", yLoc);
        yLoc = Yqueue.shift();
        console.log("after shift 'y' xLoc", xLoc);
        console.log("after shift 'y' yLoc", yLoc);
        
        if (xLoc > 0) {
            if (tiles[xLoc-1][yLoc].state == 'f') {
                pathFound = true;
            }
        }
        if (xLoc < tileColumnCount - 1) {
            if (tiles[xLoc+1][yLoc].state == 'f') {
                pathFound = true;
            }
        }
        if (yLoc > 0) {
            if (tiles[xLoc][yLoc-1].state == 'f') {
                pathFound = true;
            }
        }
        if (yLoc < tileRowCount - 1) {
            if (tiles[xLoc][yLoc+1].state == 'f') {
                pathFound = true;
            }
        }
        
    
        if (xLoc > 0) {
            if (tiles[xLoc-1][yLoc].state == 'e') {
                Xqueue.push(xLoc-1);
                Yqueue.push(yLoc);
                tiles[xLoc-1][yLoc].state = tiles[xLoc][yLoc].state + 'l';
            }
        }
        if (xLoc < tileColumnCount - 1) {
            if (tiles[xLoc+1][yLoc].state == 'e') {
                Xqueue.push(xLoc+1);
                Yqueue.push(yLoc);
                tiles[xLoc+1][yLoc].state = tiles[xLoc][yLoc].state + 'r';
            }
        }
        if (yLoc > 0) {
            if (tiles[xLoc][yLoc-1].state == 'e') {
                Xqueue.push(xLoc);
                Yqueue.push(yLoc-1); 
                tiles[xLoc][yLoc-1].state = tiles[xLoc][yLoc].state + 'u';
            }
        }
        if (yLoc < tileRowCount - 1) {
            if (tiles[xLoc][yLoc+1].state == 'e') {
                Xqueue.push(xLoc);
                Yqueue.push(yLoc+1);
                tiles[xLoc][yLoc+1].state = tiles[xLoc][yLoc].state + 'd';
            }
        }            
    }
    
    if (!pathFound) {
        output.innerHTML = 'No Solution!';
    } else {
        output.innerHTML = 'Solved!';
        var path = tiles[xLoc][yLoc].state;
        var pathLength = path.length;
        var currX = 0
        var currY = 0;
        for (var i = 0; i < pathLength-1; i++) {
            if (path.charAt(i+1) == 'u') {
                currY -= 1;
            }
            if (path.charAt(i+1) == 'd') {
                currY += 1;
            }
            if (path.charAt(i+1) == 'r') {
                currX += 1;
            }
            if (path.charAt(i+1) == 'l') {
                currX -= 1;
            }
            tiles[currX][currY].state = 'x';
        }
    }
}

function reset() {
    for (c = 0; c < tileColumnCount; c++) {
    tiles[c] = [];
    for (r = 0; r < tileRowCount;  r++) {
        tiles[c][r] = {x: c*(tileW+3), y: r*(tileH+3), state: 'e'}; // state is 'e' for empty
        }   
    }
    tiles[0][0].state = 's'; //start tile
    tiles[tileColumnCount-1][tileRowCount-1].state = 'f';  // finish tile
    
    // clear  output area
    output.innerHTML + '';
} 

function init() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    output = document.getElementById("outcome");
    return setInterval(draw, 10);
}

function myMove(e) {
    x = e.pageX - canvas.offsetLeft;
    y = e.pageY - canvas.offsetTop;
    console.log("canvas.offsetLeft", canvas.offsetLeft);
    console.log("canvas.offsetTop", canvas.offsetTop);
    
    for (c = 0; c < tileColumnCount; c++) {
        for (r = 0; r < tileRowCount; r++) {
            if (c*(tileW+3) < x && x < c*(tileW+3)+tileW && r*(tileH+3) < y && y < r*(tileH+3)+tileH) {
                console.log("tiles[c][r].state; ", tiles[c][r].state);
                if (tiles[c][r].state == 'e' && (c != boundX || r != boundY)) {
                    console.log("Change Color: tiles[c][r].state; ", tiles[c][r].state);
                    tiles[c][r].state = 'w';
                    boundX = c;
                    boundY = r;
                }
                else if (tiles[c][r].state == 'w' && (c != boundX || r != boundY)) {
                    console.log("Change Color: tiles[c][r].state; ", tiles[c][r].state);
                    tiles[c][r].state = 'e';
                    boundX = c;
                    boundY = r;
                }
            }
        }
    }
    
}

function myDown(e) {
    canvas.onmousemove = myMove;
    
    x = e.pageX - canvas.offsetLeft;
    y = e.pageY - canvas.offsetTop;
    console.log("canvas.offsetLeft", canvas.offsetLeft);
    console.log("canvas.offsetTop", canvas.offsetTop);
    
    for (c = 0; c < tileColumnCount; c++) {
        for (r = 0; r < tileRowCount; r++) {
            if (c*(tileW+3) < x && x < c*(tileW+3)+tileW && r*(tileH+3) < y && y < r*(tileH+3)+tileH) {
                console.log("tiles[c][r].state; ", tiles[c][r].state);
                if (tiles[c][r].state == 'e') {
                    console.log("Change Color: tiles[c][r].state; ", tiles[c][r].state);
                    tiles[c][r].state = 'w';
                    boundX = c;
                    boundY = r;
                }
                else if (tiles[c][r].state == 'w') {
                    console.log("Change Color: tiles[c][r].state; ", tiles[c][r].state);
                    tiles[c][r].state = 'e';
                    boundX = c;
                    boundY = r;
                }
            }
        }
    }
}

function myUp() {
    canvas.onmousemove = null;
}

init();
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;