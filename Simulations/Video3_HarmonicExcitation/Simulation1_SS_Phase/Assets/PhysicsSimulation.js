var dt = 1/60; // in seconds
var scale = 50 //scale is 50 pixles per meter
var canvasheight = document.getElementById('myCanvas').height / scale //canvasheight in meters
var canvaswidth = document.getElementById('myCanvas').width / scale // canvaswidth in meters
var w = 5 //initial value of freq
//define inputs and geometry
start_sim(); //this just sets initial values.

function getCanvas() {
            var c = document.getElementById("myCanvas");
            return c.getContext("2d");
}

function prepare() {
    //handle is the box. Giving initial positions.
            handle = {
            x: canvaswidth * scale / 5 - boxlength * scale /2,
            y: canvasheight * scale / 2 - boxlength * scale/2,
            width: boxlength * scale,
            height: boxlength * scale
        },
            handle_slider = {
            x: scale*canvaswidth/5 + scale*boxlength*1.5 + scale*w*w_ss_scale - scale*sliderlength/2,
            y: scale*canvasheight/2,
            width: 1.5*sliderlength * scale,
            height: 1.5*sliderlength * scale
        },
        offset = {};
    draw();
};

function onMouseMove_slider(event) {
        handle_slider.x = event.clientX - ctx.canvas.offsetLeft - offset.x;
        handle_slider.y = event.clientY - ctx.canvas.offsetTop - offset.y;
        if (handle_slider.x / scale +sliderlength/2 < canvaswidth/5 + boxlength*1.5) {
            w = 0;
        } else if (handle_slider.x / scale +sliderlength/2> canvaswidth*0.95) {
            w = w_ss_finish;
        }
        else {
            w = (handle_slider.x / scale + sliderlength/2 - (canvaswidth/5 + boxlength*1.5))/w_ss_scale;
        }
        draw();
    }

function onMouseUp_slider(event) {
        handle_slider.y = scale*canvasheight/2 - scale*sliderlength/2;
        document.body.removeEventListener("mousemove", onMouseMove_slider);
        document.body.removeEventListener("mouseup", onMouseUp_slider);
        x_1 = handle.y / scale- (canvasheight/2 - boxlength/2);
        if (handle_slider.x / scale +sliderlength/2< canvaswidth/5 + boxlength*1.5) {
            w = 0;
            handle_slider.x = scale*(canvaswidth/5 + boxlength*1.5)
        } else if (handle_slider.x / scale +sliderlength/2> canvaswidth*0.95) {
            w = w_ss_finish;
            handle_slider.x = scale*(canvaswidth/5 + boxlength*1.5 + w_ss_finish*w_ss_scale) //making sure slider doesn't go out of bounds
        }
        else {
            w = (handle_slider.x / scale + sliderlength/2 - (canvaswidth/5 + boxlength*1.5))/w_ss_scale;
        }
        mouseisdown = false;
        start_sim();
    }

function onMouseMove(event) {
        handle.x = event.clientX - ctx.canvas.offsetLeft - offset.x;
        handle.y = event.clientY - ctx.canvas.offsetTop - offset.y;
        draw();
    }
function onMouseUp(event) {
        handle.x = canvaswidth * scale/5 - boxlength * scale/2;
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
        handle.x = canvaswidth * scale/5 - boxlength * scale/2; //make sure handle.y hasn't chagned after user moved it.
        document.body.removeEventListener("touchmove", onMouseMove_touch);
        document.body.removeEventListener("touchend", onMouseUp_touch);
        x_1 = handle.y / scale- (canvasheight/2 - boxlength/2); //set initila condition to user value
        mouseisdown = false;
        start_sim();
    }

function onMouseMove_touch_slider(event) {
        handle_slider.x = event.touches[0].clientX - ctx.canvas.offsetLeft - offset.x;
        handle_slider.y = event.touches[0].clientY - ctx.canvas.offsetTop - offset.y;
        if (handle_slider.x / scale +sliderlength/2 < canvaswidth/5 + boxlength*1.5) {
            w = 0;
        } else if (handle_slider.x / scale +sliderlength/2> canvaswidth*0.95) {
            w = w_ss_finish;
        }
        else {
            w = (handle_slider.x / scale + sliderlength/2 - (canvaswidth/5 + boxlength*1.5))/w_ss_scale;
        }
        draw();
    }

function onMouseUp_touch_slider(event) {
        handle_slider.y = scale*canvasheight/2 - scale*sliderlength/2;
        document.body.removeEventListener("touchmove", onMouseMove_touch_slider);
        document.body.removeEventListener("touchend", onMouseUp_touch_slider);
        x_1 = handle.y / scale- (canvasheight/2 - boxlength/2);
        if (handle_slider.x / scale +sliderlength/2< canvaswidth/5 + boxlength*1.5) {
            w = 0;
            handle_slider.x = scale*(canvaswidth/5 + boxlength*1.5)
        } else if (handle_slider.x / scale +sliderlength/2> canvaswidth*0.95) {
            w = w_ss_finish;
            handle_slider.x = scale*(canvaswidth/5 + boxlength*1.5 + w_ss_finish*w_ss_scale) //making sure slider doesn't go out of bounds
        }
        else {
            w = (handle_slider.x / scale + sliderlength/2 - (canvaswidth/5 + boxlength*1.5))/w_ss_scale;
        }
        mouseisdown = false;
        start_sim();
    }

function draw() {
    drawRectangle(canvaswidth/5 - boxlength/2, handle.y / scale,  handle.width / scale, handle.height / scale,"rgba(245,201,63,0.8)");
    springanddamper(canvaswidth/5, 0, canvaswidth/5, handle.y / scale, 10);
    Chart(canvaswidth/5 + boxlength*1.5, canvasheight/2, w_ss,X_ss)

    drawArrowLarge(canvaswidth/5 + boxlength*1.5, canvasheight/2, canvaswidth*0.95, canvasheight/2)//xaxis
    drawArrowLarge(canvaswidth/5 + boxlength*1.5, canvasheight/2, canvaswidth/5 + boxlength*1.5, canvasheight*0.05) //yaxis
    drawBall(canvaswidth/5 + boxlength*1.5 + w_ss_scale*w, canvasheight/2 - F0/Math.sqrt((k-m*w*w)*(k-m*w*w)+w*w*c*c),0.08,"black")

    //slider
    //drawRectangle((canvaswidth/5 + boxlength*1.5) - sliderlength/2 + w*w_ss_scale, canvasheight/2 - sliderlength/2, sliderlength, sliderlength,"grey")
    slidercursor(canvaswidth/5 + boxlength*1.5 + w*w_ss_scale, canvasheight/2,sliderlength,sliderlength,"grey");

        Chart(canvaswidth/5 + boxlength*1.5, 0.95*canvasheight, w_ss,phi_ss) //phase
    drawArrowLarge(canvaswidth/5 + boxlength*1.5, 0.95*canvasheight, canvaswidth*0.95, 0.95*canvasheight) //xaxis
    drawArrowLarge(canvaswidth/5 + boxlength*1.5, 0.95*canvasheight, canvaswidth/5 + boxlength*1.5, 0.6*canvasheight) //yaxis
    if (w<Math.sqrt(k/m)){
    	drawBall(canvaswidth/5 + boxlength*1.5 + w_ss_scale*w, 0.95*canvasheight - Math.atan(c*w/(k-m*w*w)),0.08,"black")
    } else{
    	drawBall(canvaswidth/5 + boxlength*1.5 + w_ss_scale*w, 0.95*canvasheight - Math.PI - Math.atan(c*w/(k-m*w*w)),0.08,"black")
    }
}

function start_sim(){
    //set inputs and geometry initial values
    timer = 0;
    boxlength = 2//0.8;
    sliderlength = boxlength/3;
    //x_1 = 1;
    a_1 = 0;
    v_1 = 0;
    //w = Number(document.getElementById("w").value)
    m = 50;
    k = 500//5000;
    c = 60; 
    Xpos = [];
    T = [];
    count = 0;

    F0 = 800;
    //w_initial = 5;
    //w = 5;


    w_ss_start = 0;
    w_ss_finish = 6//25;
    N = 120
    w_ss_scale = 1.7//0.4;
    X_ss_scale = 1;
    phi_ss_scale =1;
    w_ss = [];
    X_ss = [];
    phi_ss = [];

    for (var i = 0; i < N+1; i++) {
        w_ss[i] = w_ss_start + i*(w_ss_finish - w_ss_start)/N; //linspace(w_ss_start,w_ss_end,N)
        X_ss[i] =  F0/Math.sqrt((k-m*w_ss[i]*w_ss[i])*(k-m*w_ss[i]*w_ss[i])+w_ss[i]*w_ss[i]*c*c);
        X_ss[i] = -1*X_ss[i]; //flipping y axis to make up +ve
        if (w_ss[i]<Math.sqrt(k/m)) {
        	phi_ss[i] = Math.atan(c*w_ss[i]/(k-m*w_ss[i]*w_ss[i]));
        } else {
        	phi_ss[i] = Math.PI + Math.atan(c*w_ss[i]/(k-m*w_ss[i]*w_ss[i]));
        }
        phi_ss[i] = -1*phi_ss[i]; //flipping

        w_ss[i] = w_ss[i]*w_ss_scale; //scaling
        X_ss[i] = X_ss[i]*X_ss_scale;
        phi_ss[i] = phi_ss[i]*phi_ss_scale;
    }
}

function simulate_calcs() {
    timer = timer + dt;
    ctx.beginPath();
    ctx.font = '20px Calibri';
    ctx.fillStyle = 'black';
    //ctx.fillText("Time: " + Math.round(timer*10)/10 + " s", 10, 30);
    ctx.closePath();
    ctx.fill();
    drawRectangle(canvaswidth/5 - boxlength/2, x_1 + canvasheight/2 - boxlength/2, boxlength,boxlength,"rgba(245,201,63,0.8)");
    springanddamper(canvaswidth/5, 0, canvaswidth/5, x_1 + canvasheight/2 - boxlength/2, 10);

    // //creating vector of displacements X and time T
    // count = count + 1;
    // Xpos[count] = x_1
    // T[count] = timer *0.5
    // Chart(canvaswidth/5 + boxlength/2, canvasheight/2, T, Xpos)
    Fscale = 500;
    drawArrowSmall(canvaswidth/5 - boxlength*0.75, canvasheight/2 + x_1, canvaswidth/5 - boxlength*0.75, canvasheight/2 + x_1 - (F0/Fscale)*Math.cos(w*timer),"blue")
    drawBall(canvaswidth/5 + boxlength*1.5 + w_ss_scale*w, canvasheight/2 - F0/Math.sqrt((k-m*w*w)*(k-m*w*w)+w*w*c*c),0.08,"black")

    Chart(canvaswidth/5 + boxlength*1.5, canvasheight/2, w_ss,X_ss) //amplitude
    drawArrowLarge(canvaswidth/5 + boxlength*1.5, canvasheight/2, canvaswidth*0.95, canvasheight/2) //xaxis
    drawArrowLarge(canvaswidth/5 + boxlength*1.5, canvasheight/2, canvaswidth/5 + boxlength*1.5, canvasheight*0.05) //yaxis

    Chart(canvaswidth/5 + boxlength*1.5, 0.95*canvasheight, w_ss,phi_ss) //phase
    drawArrowLarge(canvaswidth/5 + boxlength*1.5, 0.95*canvasheight, canvaswidth*0.95, 0.95*canvasheight) //xaxis
    drawArrowLarge(canvaswidth/5 + boxlength*1.5, 0.95*canvasheight, canvaswidth/5 + boxlength*1.5, 0.6*canvasheight) //yaxis
    if (w<Math.sqrt(k/m)){
    	drawBall(canvaswidth/5 + boxlength*1.5 + w_ss_scale*w, 0.95*canvasheight - Math.atan(c*w/(k-m*w*w)),0.08,"black")
    } else{
    	drawBall(canvaswidth/5 + boxlength*1.5 + w_ss_scale*w, 0.95*canvasheight - Math.PI - Math.atan(c*w/(k-m*w*w)),0.08,"black")
    }

   //displacement
   drawArrowSmall(canvaswidth/5, canvasheight/2, canvaswidth/5, canvasheight/2 + x_1,"black")

    //drawLineDashed(canvaswidth/5 + boxlength*0.5, handle.y / scale + boxlength/2, canvaswidth/5 + boxlength*1.5 + w*w_ss_scale, handle.y / scale + boxlength/2)
    //slider
    //drawRectangle(canvaswidth/5 + boxlength*1.5 + w*w_ss_scale - sliderlength/2, canvasheight/2 - sliderlength/2, sliderlength, sliderlength,"grey")
    slidercursor(canvaswidth/5 + boxlength*1.5 + w*w_ss_scale, canvasheight/2,sliderlength,sliderlength,"grey");
    //dynamics
    a_1 = -(k/m) * x_1 -(c/m) * v_1 - (F0/m)*Math.cos(w*timer);
    v_1 = v_1 + a_1 * dt;
    x_1 = x_1 + v_1 * dt;
    handle.y = x_1 * scale + (canvasheight/2 - boxlength/2) * scale;
}