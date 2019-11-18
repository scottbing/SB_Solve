// Scott Bing
// BSSD5520 Javascript
// Fall 2019
// Final Project

var cols, rows;
var w = 40;     // each cell is a square there are 10 rows and 10 columns
var grid = [];  // an array to store the maze

var current;

// setup the maze
function setup() {
    createCanvas(400,400);
    cols = floor(width/w);
    rows = floor(height/w);
    
    // build the grid
    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols;  i++) {
            var cell = new Cell(i,j);       // instantiate a Cell object
            grid.push(cell);
        }    
    }
    current = grid[0];
}



function draw() {
    background(51);
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }
    
    current.visited = true;
    var next = current.checkNeighbors();
    if(next) {
        next.visited = true;
        current = next;
        
    }
}

function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    }
    return i + j * cols;
}

// maze cell constructor
function Cell(i, j) {
    this.i = i;     // column
    this.j = j;     // row
            //  [Top,right,bottom,left]
    this.walls =[true, true, true,true]
    this.visited = false;
    
    this.checkNeighbors = function() {
        var neighbors = [];
        
        var top    = grid[index(i, j - 1)];
        var right  = grid[index(i + 1, j)];
        var bottom = grid[index(i, j + 1)];
        var left   = grid[index(i - 1, j)];
        
        if (top && !top.visited) {
            neighbors.push(top);
        }
        if (right && !right.visited) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (left && !left.visited) {
            neighbors.push(left);
        }
        
        if (neighbors.length > 0) {
            var r = floor(random(0, neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }
    }
    
    // object function - draw cell
    this.show = function() {
        var x = this.i*w;
        var y = this.j*w;
        stroke(255);
        if (this.walls[0]) {
            line(x,y,x+w,y);        // top -north wall
        }
        if (this.walls[1]) {
            line(x+w,y,x+w,y+w);    // right - east wall
        }
        if (this.walls[2]) {
            line(x+w,y+w,x,y+w);    // bottom -south wall
        }
        if (this.walls[3]) {
            line(x,y+w,x,y);        // left - west wall
        }
    
        if (this.visited) {
            fill(255, 0, 255, 100);
            rect(x,y,w,w);    
        }
        
        
    }
    
}