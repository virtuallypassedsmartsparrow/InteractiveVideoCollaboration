var dt = 1/60; // in seconds
var scale = 50 //scale is 50 pixles per meter
var canvasheight = document.getElementById('myCanvas').height / scale //canvasheight in meters
var canvaswidth = document.getElementById('myCanvas').width / scale // canvaswidth in meters
//define inputs and geometry
start_sim(); //this just sets initial values.

function getCanvas() {
            var c = document.getElementById("myCanvas");
            return c.getContext("2d");
}

function prepare() {
    //handle is the box. Giving initial positions.
            handle = {
            x: canvaswidth * scale / 2 - boxlength * scale /2,
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
        handle.y = canvasheight * scale /2 - boxlength * scale /2;
        document.body.removeEventListener("mousemove", onMouseMove);
        document.body.removeEventListener("mouseup", onMouseUp);
        x_1 = handle.x / scale - (canvaswidth/2 - boxlength/2);
        mouseisdown = false;
        start_sim();
    }

function onMouseMove_touch(event) {
        handle.x = event.touches[0].clientX - ctx.canvas.offsetLeft - offset.x;
        handle.y = event.touches[0].clientY - ctx.canvas.offsetTop - offset.y;
        draw();
    }

function onMouseUp_touch(event) {
        handle.y = canvasheight * scale /2 - boxlength * scale/2; //make sure handle.y hasn't chagned after user moved it.
        document.body.removeEventListener("touchmove", onMouseMove_touch);
        document.body.removeEventListener("touchend", onMouseUp_touch);
        x_1 = handle.x / scale - (canvaswidth/2 - boxlength/2); //set initila condition to user value
        mouseisdown = false;
        start_sim();
    }

function draw() {
    spring(0,canvasheight/2, handle.x/scale, canvasheight/2,10);
    drawRectangle(handle.x / scale, canvasheight/2 - boxlength/2, boxlength, boxlength, "rgba(245,201,63,0.8)");
    // drawArrowSmall(handle.x / scale, canvasheight/2, handle.x/scale - (1/1000)*k*(handle.x/scale-(canvaswidth/2-boxlength/2)),canvasheight/2,"blue");
    drawArrowLarge(0.1*canvaswidth,canvasheight/2,0.9*canvaswidth,canvasheight/2,"gray");//x axis
    drawArrowLarge(canvaswidth/2 - boxlength/2, canvasheight*0.9, canvaswidth/2 - boxlength/2, canvasheight*0.1,"gray");//y axis
    drawArrowSmall(handle.x / scale, canvasheight/2, handle.x/scale - (1/1000)*k*(handle.x/scale-(canvaswidth/2-boxlength/2)),canvasheight/2,"blue");
    
    drawBall(handle.x/scale, canvasheight/2 + (1/1000)*k*(handle.x/scale-(canvaswidth/2-boxlength/2)), 0.08,"black");
    drawLine(canvaswidth/2 - boxlength/2,canvasheight/2,canvaswidth/2 - boxlength/2 + 0.45*canvaswidth,canvasheight/2 + 0.45*canvaswidth*(1/1000)*k);
    drawLine(canvaswidth/2 - boxlength/2,canvasheight/2,canvaswidth/2 - boxlength/2 - 0.4*canvaswidth,canvasheight/2 - 0.4*canvaswidth*(1/1000)*k);

}

function start_sim(){
    //set inputs and geometry initial values
    timer = 0;
    boxlength = 2//0.8;
    //x_1 = 1;
    a_1 = 0;
    v_1 = 0;
    //w = Number(document.getElementById("w").value)
    m = 100//40;
    k = 525;
    c = 0//60; 
    Xpos = [];
    T = [];
    count = 0;
}

function simulate_calcs() {
    // timer = timer + dt;
    // ctx.beginPath();
    // ctx.font = '20px Calibri';
    // ctx.fillStyle = 'black';
    // ctx.fillText("Time: " + Math.round(timer*10)/10 + " s", 10, 30);
    // ctx.closePath();
    // ctx.fill();
    
    // //creating vector of displacements X and time T
    // count = count + 1;
    // Xpos[count] = x_1
    // T[count] = timer *0.5
    // Chart(canvaswidth/3 + boxlength/2, canvasheight/2, T, Xpos)
    spring(0,canvasheight/2, x_1 + canvaswidth/2 - boxlength/2, canvasheight/2,10);
    drawRectangle(x_1 + canvaswidth/2 - boxlength/2, canvasheight/2 - boxlength/2, boxlength, boxlength, "rgba(245,201,63,0.8)");
    // drawArrowSmall(handle.x / scale, canvasheight/2, handle.x/scale - (1/1000)*k*(handle.x/scale-(canvaswidth/2-boxlength/2)),canvasheight/2,"blue");
    drawArrowLarge(0.1*canvaswidth,canvasheight/2,0.9*canvaswidth,canvasheight/2,"gray");//x axis
    drawArrowLarge(canvaswidth/2 - boxlength/2, canvasheight*0.9, canvaswidth/2 - boxlength/2, canvasheight*0.1,"gray");//y axis
    drawBall(handle.x/scale, canvasheight/2 + (1/1000)*k*(handle.x/scale-(canvaswidth/2-boxlength/2)), 0.08,"black");
    drawLine(canvaswidth/2 - boxlength/2,canvasheight/2,canvaswidth/2 - boxlength/2 + 0.45*canvaswidth,canvasheight/2 + 0.45*canvaswidth*(1/1000)*k);
    drawLine(canvaswidth/2 - boxlength/2,canvasheight/2,canvaswidth/2 - boxlength/2 - 0.4*canvaswidth,canvasheight/2 - 0.4*canvaswidth*(1/1000)*k);
    drawArrowSmall(handle.x / scale, canvasheight/2, handle.x/scale - (1/1000)*k*(handle.x/scale-(canvaswidth/2-boxlength/2)),canvasheight/2,"blue");
    //dynamics
    a_1 = -(k/m) * x_1 -(c/m) * v_1;
    v_1 = v_1 + a_1 * dt;
    x_1 = x_1 + v_1 * dt;
    handle.x = x_1 * scale + (canvaswidth/2 - boxlength/2) * scale;
}