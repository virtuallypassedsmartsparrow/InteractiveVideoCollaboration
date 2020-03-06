var dt = 1/60; // in seconds
var scale = 50 //scale is 50 pixles per meter
var canvasheight = document.getElementById('myCanvas').height / scale //canvasheight in meters
var canvaswidth = document.getElementById('myCanvas').width / scale // canvaswidth in meters
var w = Math.sqrt(5.25); //~2.3
//define inputs and geometry
start_sim(); //this just sets initial values.

function getCanvas() {
            var c = document.getElementById("myCanvas");
            return c.getContext("2d");
}

function prepare() {
    //handle is the box. Giving initial positions.
            handle = {
            // x: canvaswidth * scale / 5 - boxlength * scale /2,
            // y: canvasheight * scale / 2 - boxlength * scale/2,
            // width: boxlength * scale,
            // height: boxlength * scale
            x: canvaswidth*0.025*scale + scale*sliderlength*(w-w_start)/(w_finish-w_start),
            y: canvasheight*0.5*scale,
            width: 2*cursorH * scale,
            height: 1.5*cursorH * scale
        },
        offset = {};
    draw();
};

function onMouseMove(event) {
        handle.x = event.clientX - ctx.canvas.offsetLeft - offset.x;
        handle.y = event.clientY - ctx.canvas.offsetTop - offset.y;
        if (handle.x/scale < canvaswidth*0.025) {
            w = w_start;
        } else if (handle.x/scale > canvaswidth*0.025 + sliderlength) {
            w = w_finish;
        }
        else {
            w = w_start + (handle.x/scale - canvaswidth*0.025)*(w_finish - w_start)/sliderlength;
        }
        draw();
    }
function onMouseUp(event) {
        handle.y = 0.5*canvasheight*scale;
        //handle.x = canvaswidth * scale/5 - boxlength * scale/2;
        document.body.removeEventListener("mousemove", onMouseMove);
        document.body.removeEventListener("mouseup", onMouseUp);
        if (handle.x/scale < canvaswidth*0.025) {
            w = w_start;
            handle.x = scale * canvaswidth*0.025;
        } else if (handle.x/scale > canvaswidth*0.025 + sliderlength) {
            w = w_finish;
            handle.x = scale * (canvaswidth*0.025 + sliderlength);
        }
        else {
            w = w_start + (handle.x/scale - canvaswidth*0.025)*(w_finish - w_start)/sliderlength;
        }
        mouseisdown = false;
        draw();
        //start_sim();
    }

function onMouseMove_touch(event) {
        // handle.x = event.touches[0].clientX - ctx.canvas.offsetLeft - offset.x;
        // handle.y = event.touches[0].clientY - ctx.canvas.offsetTop - offset.y;
        // draw();
        handle.x = event.touches[0].clientX - ctx.canvas.offsetLeft - offset.x;
        handle.y = event.touches[0].clientY - ctx.canvas.offsetTop - offset.y;
        if (handle.x/scale < canvaswidth*0.025) {
            w = w_start;
        } else if (handle.x/scale > canvaswidth*0.025 + sliderlength) {
            w = w_finish;
        }
        else {
            w = w_start + (handle.x/scale - canvaswidth*0.025)*(w_finish - w_start)/sliderlength;
        }
        draw();
    }

function onMouseUp_touch(event) {
        // handle.x = canvaswidth * scale/5 - boxlength * scale/2; //make sure handle.y hasn't chagned after user moved it.
        // document.body.removeEventListener("touchmove", onMouseMove_touch);
        // document.body.removeEventListener("touchend", onMouseUp_touch);
        // x_1 = handle.y / scale- (canvasheight/2 - boxlength/2); //set initila condition to user value
        // mouseisdown = false;
        // start_sim();
        handle.y = 0.5*canvasheight*scale;
        //handle.x = canvaswidth * scale/5 - boxlength * scale/2;
        document.body.removeEventListener("touchmove", onMouseMove_touch);
        document.body.removeEventListener("touchend", onMouseUp_touch);
        if (handle.x/scale < canvaswidth*0.025) {
            w = w_start;
            handle.x = scale * canvaswidth*0.025;
        } else if (handle.x/scale > canvaswidth*0.025 + sliderlength) {
            w = w_finish;
            handle.x = scale * (canvaswidth*0.025 + sliderlength);
        }
        else {
            w = w_start + (handle.x/scale - canvaswidth*0.025)*(w_finish - w_start)/sliderlength;
        }
        mouseisdown = false;
        draw();
        //start_sim();
    }

function draw() {
    // drawRectangle(canvaswidth/5 - boxlength/2, handle.y / scale,  handle.width / scale, handle.height / scale,"rgba(245,201,63,0.8)");
    // spring(canvaswidth/5, 0, canvaswidth/5, handle.y / scale, 10);

    t = [];
    X = [];

    for (var i = 0; i < N+1; i++) {
        t[i] = t_start + i*(t_finish - t_start)/N; //linspace(w_ss_start,w_ss_end,N)
        X[i] =  A*Math.cos(w*t[i] - phi);
        X[i] = -1*X[i]; //flipping y axis to make up +ve

        t[i] = t[i]*t_scale; //scaling
        X[i] = X[i]*X_scale;
    }

    Chart(canvaswidth/5 + boxlength/2, canvasheight/2, t,X)
    drawArrowLarge(canvaswidth/5 + boxlength/2, canvasheight/2, canvaswidth*0.95, canvasheight/2);
    drawArrowLarge(canvaswidth/5 + boxlength/2, canvasheight/2 + 1.2*A, canvaswidth/5 + boxlength/2, canvasheight/2 - 1.2*A);
    drawRectangle(canvaswidth*0.025, canvasheight*0.49, sliderlength, canvasheight*0.02,"LightGray");
    slidercursor(canvaswidth*0.025 + sliderlength*(w-w_start)/(w_finish-w_start), canvasheight/2, cursorH, cursorH,"Gray");
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
    // Xpos = [];
    // T = [];
    // count = 0;
    cursorH = 0.04*canvaswidth;
    sliderlength = canvaswidth*0.2;
     w_start = 0.5;
     w_finish = 10;

    t_start = 0;
    t_finish = 12//6;
    N = 400;
    t_scale = 1;
    X_scale = 1;
    A = 3.5;
    //w = 9.8;
    phi = 0;
    // t = [];
    // X = [];

    // for (var i = 0; i < N+1; i++) {
    //     t[i] = t_start + i*(t_finish - t_start)/N; //linspace(w_ss_start,w_ss_end,N)
    //     X[i] =  A*Math.cos(w*t[i] - phi);
    //     X[i] = -1*X[i]; //flipping y axis to make up +ve

    //     t[i] = t[i]*t_scale; //scaling
    //     X[i] = X[i]*X_scale;
    // }
}

function simulate_calcs() {
    timer = timer + dt;
    ctx.beginPath();
    ctx.font = '20px Calibri';
    ctx.fillStyle = 'black';
    //ctx.fillText("Time: " + Math.round(timer*10)/10 + " s", 10, 30);
    ctx.closePath();
    ctx.fill();
    // drawRectangle(canvaswidth/5 - boxlength/2, x_1 + canvasheight/2 - boxlength/2, boxlength,boxlength,"rgba(245,201,63,0.8)");
    // //spring and damper
    // spring(canvaswidth/5, 0, canvaswidth/5, x_1 + canvasheight/2 - boxlength/2, 10);
    // //creating vector of displacements X and time T
    // count = count + 1;
    // Xpos[count] = x_1
    // T[count] = timer *0.5
    // Chart(canvaswidth/5 + boxlength/2, canvasheight/2, T, Xpos)
    Chart(canvaswidth/5 + boxlength/2, canvasheight/2, t,X)
    drawArrowLarge(canvaswidth/5 + boxlength/2, canvasheight/2, canvaswidth*0.95, canvasheight/2);
    drawArrowLarge(canvaswidth/5 + boxlength/2, canvasheight/2 + 1.2*A, canvaswidth/5 + boxlength/2, canvasheight/2 - 1.2*A);

    drawRectangle(canvaswidth*0.025, canvasheight*0.49, canvaswidth*0.2, canvasheight*0.02,"LightGray");
    slidercursor(canvaswidth*0.025 + sliderlength*(w-w_start)/(w_finish-w_start), canvasheight/2, cursorH, cursorH,"Gray");
    // //dynamics
    // a_1 = -(k/m) * x_1 -(c/m) * v_1;
    // v_1 = v_1 + a_1 * dt;
    // x_1 = x_1 + v_1 * dt;
    // handle.y = x_1 * scale + (canvasheight/2 - boxlength/2) * scale;
}