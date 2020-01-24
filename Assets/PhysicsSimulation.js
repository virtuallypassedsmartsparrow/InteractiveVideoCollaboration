var dt = 1/60; // in seconds
var scale = 50 //scale is 50 pixles per meter
var canvasheight = document.getElementById('myCanvas').height / scale //canvasheight in meters
var canvaswidth = document.getElementById('myCanvas').width / scale // canvaswidth in meters
//define inputs and geometry
var m;
var k;
var c;
var x_1 = 0 
var a_1;
var v_1;
var boxlength = 0.8;
var Xpos;
var T;
var count;
//timer
var timer;

start_sim(); //this just sets initial values.

function getCanvas() {
            var c = document.getElementById("myCanvas");
            return c.getContext("2d");
}

function prepare() {
    //handle is the box. Giving initial positions.
            handle = {
            x: canvaswidth * scale / 3 - boxlength * scale /2,
            y: canvasheight * scale / 2 - boxlength * scale/2,
            width: boxlength * scale,
            height: boxlength * scale
        },
        offset = {};
    draw();
};

function onMouseMove(event) {
        handle.x = event.clientX - ctx.canvas.offsetLeft - offset.x;
        handle.y = event.clientY - ctx.canvas.offsetTop - offset.y;
        draw();
    }
function onMouseUp(event) {
        handle.x = canvaswidth * scale/3 - boxlength * scale/2;
        document.body.removeEventListener("mousemove", onMouseMove);
        document.body.removeEventListener("mouseup", onMouseUp);
        x_1 = handle.y / scale- (canvasheight/2 - boxlength/2);
        mouseisdown = false;
        start_sim();
    }

function onMouseMove_touch(event) {
        handle.x = event.touches[0].clientX - ctx.canvas.offsetLeft - offset.x;
        handle.y = event.touches[0].clientY - ctx.canvas.offsetTop - offset.y;
        draw();
    }

function onMouseUp_touch(event) {
        handle.x = canvaswidth * scale/3 - boxlength * scale/2;
        document.body.removeEventListener("touchmove", onMouseMove_touch);
        document.body.removeEventListener("touchend", onMouseUp_touch);
        x_1 = handle.y / scale- (canvasheight/2 - boxlength/2);
        mouseisdown = false;
        start_sim();
    }

//draws pause icon on top of video
/*
function drawPayIcon(){
     ctx.fillStyle = "black";  // darken display
     ctx.globalAlpha = 0.5;
     ctx.fillRect(0,0,canvas.width,canvas.height);
     ctx.fillStyle = "#DDD"; // colour of play icon
     ctx.globalAlpha = 0.75; // partly transparent
     ctx.beginPath(); // create the path for the icon
     var size = (canvas.height / 2) * 0.5;  // the size of the icon
     ctx.moveTo(canvas.width/2 + size/2, canvas.height / 2); // start at the pointy end
     ctx.lineTo(canvas.width/2 - size/2, canvas.height / 2 + size);
     ctx.lineTo(canvas.width/2 - size/2, canvas.height / 2 - size);
     ctx.closePath();
     ctx.fill();
     ctx.globalAlpha = 1; // restore alpha
}    
*/

function draw() {
    drawRectangle(canvaswidth/3 - boxlength/2, handle.y / scale,  handle.width / scale, handle.height / scale,"rgba(245,201,63,0.8)");
    springanddamper(canvaswidth/3, 0, canvaswidth/3, handle.y / scale, 10);
}

function start_sim(){
    //set inputs and geometry initial values
    timer = 0;
    boxlength = 0.8;
    //x_1 = 1;
    a_1 = 0;
    v_1 = 0;
    //w = Number(document.getElementById("w").value)
    m = 40;
    k = 525;
    c = 60; 
    Xpos = [];
    T = [];
    count = 0;
}

function simulate_calcs() {
    timer = timer + dt;
    ctx.beginPath();
    ctx.font = '20px Calibri';
    ctx.fillStyle = 'black';
    ctx.fillText("Time: " + Math.round(timer*10)/10 + " s", 10, 30);
    ctx.closePath();
    ctx.fill();
    //draw block
    drawRectangle(canvaswidth/3 - boxlength/2, x_1 + canvasheight/2 - boxlength/2, boxlength,boxlength,"rgba(245,201,63,0.8)");
    //spring and damper
    springanddamper(canvaswidth/3, 0, canvaswidth/3, x_1 + canvasheight/2 - boxlength/2, 10);
    //creating vector of displacements X and time T
    count = count + 1;
    Xpos[count] = x_1
    T[count] = timer *0.5
    Chart(canvaswidth/3 + boxlength/2, canvasheight/2, T, Xpos)
    //dynamics
    a_1 = -(k/m) * x_1 -(c/m) * v_1;
    v_1 = v_1 + a_1 * dt;
    x_1 = x_1 + v_1 * dt;
    handle.y = x_1 * scale + (canvasheight/2 - boxlength/2) * scale;
}
