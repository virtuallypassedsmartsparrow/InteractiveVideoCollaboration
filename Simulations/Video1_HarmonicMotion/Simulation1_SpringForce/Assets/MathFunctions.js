function Chart(originx, originy, Xvec,Yvec) {
    var x0 = originx * scale;
    var y0 = originy * scale;
    var X = Xvec;
    var Y = Yvec;
    ctx.strokeStyle = "black";
    ctx.beginPath();
    //drawing chart
    ctx.moveTo(x0+X[0],y0+Y[0]);
    for (i = 1; i < X.length; i++){
        ctx.lineTo(x0+X[i]*scale,y0+Y[i]*scale)
    }
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
}
function drawRectangle( x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x * scale, y * scale, width * scale, height * scale);
    ctx.fillStyle = color;
    ctx.closePath();
    ctx.fill();
    // ctx.stroke();
}
function drawRectangleSlant(x1, y1, L, t, theta) {
    ctx.beginPath();
    var gr = ctx.createLinearGradient(scale * x1, scale * y1, scale * (x1 + L*Math.cos(theta)), scale * (y1 + L*Math.sin(theta)));
    gr.addColorStop(0,'rgb(204,204,204)');
    gr.addColorStop(0.5, 'rgb(191,191,191');
    gr.addColorStop(1,'rgb(200,200,200)');
    ctx.fillStyle = gr;
    ctx.moveTo(scale * x1, scale * y1);
    ctx.lineTo(scale * (x1 + L * Math.cos(theta)), scale * (y1 + L * Math.sin(theta)));
    ctx.lineTo(scale * (x1 + L * Math.cos(theta) - t * Math.sin(theta)), scale * (y1 + L * Math.sin(theta) + t * Math.cos(theta)));
    ctx.lineTo(scale * (x1 - t * Math.sin(theta)), scale * (y1 + t * Math.cos(theta)));
    ctx.lineTo(scale * x1, scale * y1);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}
function drawLine(x1,y1,x2,y2) {
    ctx.beginPath();
    ctx.moveTo(x1 * scale,y1 * scale);
    ctx.lineTo(x2 * scale,y2 * scale);
    ctx.stroke();
}
function drawArrowLarge(x,y,x_tip,y_tip) {
    var theta = Math.atan((y_tip - y) / (x_tip - x));
    if (x_tip - x < 0) {
    theta = theta + Math.PI;
} else { 
    theta = theta;
}
    ctx.beginPath();
    ctx.moveTo(x * scale, y * scale);
    ctx.lineTo(x_tip * scale, y_tip * scale);
    ctx.lineTo(scale*x_tip - scale*0.3 * Math.sin(0.25 * Math.PI - theta), scale*y_tip - scale*0.3 * Math.cos(0.25 * Math.PI - theta));
    ctx.moveTo(x_tip * scale, y_tip * scale);
    ctx.lineTo(scale*x_tip - scale*0.3 * Math.cos(0.25 * Math.PI - theta), scale*y_tip + scale*0.3 * Math.sin(0.25 * Math.PI - theta));
    ctx.stroke();
    ctx.closePath();
}
function drawArrowSmall(x,y,x_tip,y_tip,color) {
    // var gr = ctx.createLinearGradient(x,y,x_tip,y_tip);
    // gr.addColorStop(0,color);
    // gr.addColorStop(1,color);
    //ctx.strokeStyle = gr
    ctx.strokeStyle = color;
    var theta = Math.atan((y_tip - y) / (x_tip - x));
        if (x_tip - x < 0) {
        theta = theta + Math.PI;
    } else { 
        theta = theta;
    }
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = color;
    ctx.moveTo(x * scale, y * scale);
    ctx.lineTo(x_tip * scale, y_tip * scale);
    ctx.lineTo(scale*x_tip - scale*0.45 * Math.sin(Math.PI/3 - theta), scale*y_tip - scale*0.45 * Math.cos(Math.PI/3 - theta));
    ctx.moveTo(x_tip * scale, y_tip * scale);
    ctx.lineTo(scale*x_tip - scale*0.45 * Math.cos(Math.PI/6 - theta), scale*y_tip + scale*0.45 * Math.sin(Math.PI/6 - theta));
    ctx.stroke();
    ctx.closePath();
}
function drawBall(x1,y1,r) {
    ctx.beginPath();
    ctx.arc(x1 * scale,y1 * scale,r * scale,0,2*Math.PI);
    ctx.stroke();
}
function spring(x_1,y_1,x_2,y_2,n) {
    var h = 30;//10;
    var x1 = x_1 * scale;
    var x2 = x_2 * scale;
    var y1 = y_1 * scale;
    var y2 = y_2 * scale;
    var theta = Math.atan((y1-y2)/(x2-x1));
    var d = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1))/(2+4*n);
    var gamma = Math.atan(h/(2*d));
    if (x2-x1 < 0) {
        theta = theta + Math.PI;
    } else { 
        theta = theta;
    }
    ctx.strokeStyle = "black";
    ctx.beginPath();
    //first line of spring
    ctx.moveTo(x1,y1);
    ctx.lineTo(x1+d*Math.cos(theta), y1-d*Math.sin(theta))
    ctx.lineTo(x1+d*Math.cos(theta)+Math.sqrt(d*d+h*h/4)*Math.cos(gamma-theta), y1-d*Math.sin(theta)+Math.sqrt(d*d+h*h/4)*Math.sin(gamma-theta));
    //last line of spring
    ctx.moveTo(x2,y2);
    ctx.lineTo(x2-d*Math.cos(theta), y2+d*Math.sin(theta));
    ctx.lineTo(x2-d*Math.cos(theta)-Math.sqrt(d*d+h*h/4)*Math.cos(gamma-theta), y2+d*Math.sin(theta)-Math.sqrt(d*d+h*h/4)*Math.sin(gamma-theta));
    //spring
    ctx.moveTo(x1+d*Math.cos(theta)+Math.sqrt(d*d+h*h/4)*Math.cos(gamma-theta), y1-d*Math.sin(theta)+Math.sqrt(d*d+h*h/4)*Math.sin(gamma-theta));
    for (i = 1; i < 2*n; i++) {
    ctx.lineTo(x1+d*Math.cos(theta)+Math.sqrt(d*d+h*h/4)*Math.cos(gamma-theta)+(0.25+0.5*i-0.25*(Math.pow(-1,i)))*2*Math.sqrt(d*d+h*h/4)*Math.cos(gamma+theta)+(-0.25+0.5*i+0.25*(Math.pow(-1,i)))*2*Math.sqrt(d*d+h*h/4)*Math.cos(gamma-theta), y1-d*Math.sin(theta)+Math.sqrt(d*d+h*h/4)*Math.sin(gamma-theta)-(0.25+0.5*i-0.25*(Math.pow(-1,i)))*2*Math.sqrt(d*d+h*h/4)*Math.sin(gamma+theta)+(-0.25+0.5*i+0.25*(Math.pow(-1,i)))*2*Math.sqrt(d*d+h*h/4)*Math.sin(gamma-theta));
    }
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
}
function damper(x_1,y_1,x_2,y_2) {
    var x1 = x_1 * scale;
    var x2 = x_2 * scale;
    var y1 = y_1 * scale;
    var y2 = y_2 * scale
    var L = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1))
    var theta = Math.atan((y1-y2)/(x2-x1));
    var gap = 0.15 //percentage
    var piston = L*0.5*(1-gap) + L*gap*Math.exp(-L/(scale*3)); //length of bit before piston casing + amount piston head goes into casing
    var casing = L*0.5*(1-gap); //length of bit before casing
    var h = 8;
    if (x2-x1 < 0) {
        theta = theta + Math.PI;
    } else { 
        theta = theta;
    }
    ctx.beginPath();
    //piston
    ctx.moveTo(x1,y1);
    ctx.lineTo(x1 + piston*Math.cos(theta), y1 - piston*Math.sin(theta))
    ctx.moveTo(x1 + piston*Math.cos(theta) - 0.7*h*Math.sin(theta), y1 - piston*Math.sin(theta) - 0.7*h*Math.cos(theta))
    ctx.lineTo(x1 + piston*Math.cos(theta) + 0.7*h*Math.sin(theta), y1 - piston*Math.sin(theta) + 0.7*h*Math.cos(theta))
    //casing
    ctx.moveTo(x2,y2);
    //little bit at end of casing
    ctx.lineTo(x2 - (casing)*Math.cos(theta), y2 + (casing)*Math.sin(theta));
    //main casing
    ctx.lineTo(x2 - (casing)*Math.cos(theta) - h*Math.sin(theta), y2 + (casing)*Math.sin(theta) - h*Math.cos(theta));
    ctx.lineTo(x2 - (casing)*Math.cos(theta) - h*Math.sin(theta) - gap*L*Math.cos(theta), y2 + (casing)*Math.sin(theta) - h*Math.cos(theta) + gap*L*Math.sin(theta));
    ctx.moveTo(x2 - (casing)*Math.cos(theta), y2 + (casing)*Math.sin(theta));
    ctx.lineTo(x2 - (casing)*Math.cos(theta) + h*Math.sin(theta), y2 + (casing)*Math.sin(theta) + h*Math.cos(theta));
    ctx.lineTo(x2 - (casing)*Math.cos(theta) + h*Math.sin(theta) - gap*L*Math.cos(theta), y2 + (casing)*Math.sin(theta) + h*Math.cos(theta) + gap*L*Math.sin(theta));
    ctx.linewidth = 1;
    ctx.stroke();
    ctx.closePath();
}
function springanddamper(x_1,y_1,x_2,y_2,n) {
    var gap = 10;
    var h_spring = 10;
    var h_damper = 8;
    var theta = Math.atan((y_1-y_2)/(x_2-x_1));
    spring(x_1 - (gap/2 + h_spring/2)*Math.sin(theta)/scale, y_1 - (gap/2 + h_spring/2)*Math.cos(theta)/scale, x_2 - (gap/2 + h_spring/2)*Math.sin(theta)/scale, y_2 - (gap/2 + h_spring/2)*Math.cos(theta)/scale, n);
    damper(x_1 + (gap/2 + h_damper/2)*Math.sin(theta)/scale, y_1 + (gap/2 + h_damper/2)*Math.cos(theta)/scale, x_2 + (gap/2 + h_damper/2)*Math.sin(theta)/scale, y_2 + (gap/2 + h_damper/2)*Math.cos(theta)/scale);
}

    var utils = {
    norm: function(value, min, max) {
        return (value - min) / (max - min);
    },
    lerp: function(norm, min, max) {
        return (max - min) * norm + min;
    },
    map: function(value, sourceMin, sourceMax, destMin, destMax) {
        return utils.lerp(utils.norm(value, sourceMin, sourceMax), destMin, destMax);
    },
    clamp: function(value, min, max) {
        return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
    },
    distance: function(p0, p1) {
        var dx = p1.x - p0.x,
            dy = p1.y - p0.y;
        return Math.sqrt(dx * dx + dy * dy);
    },
    distanceXY: function(x0, y0, x1, y1) {
        var dx = x1 - x0,
            dy = y1 - y0;
        return Math.sqrt(dx * dx + dy * dy);
    },
    circleCollision: function(c0, c1) {
        return utils.distance(c0, c1) <= c0.radius + c1.radius;
    },
    circlePointCollision: function(x, y, circle) {
        return utils.distanceXY(x, y, circle.x, circle.y) < circle.radius;
    },
    pointInRect: function(x, y, rect) {
        return utils.inRange(x, rect.x, rect.x + rect.width) &&
               utils.inRange(y, rect.y, rect.y + rect.height);
    },
    inRange: function(value, min, max) {
        return value >= Math.min(min, max) && value <= Math.max(min, max);
    },
    rangeIntersect: function(min0, max0, min1, max1) {
        return Math.max(min0, max0) >= Math.min(min1, max1) && 
               Math.min(min0, max0) <= Math.max(min1, max1);
    },
    rectIntersect: function(r0, r1) {
        return utils.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&
               utils.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height);
    },
    degreesToRads: function(degrees) {
        return degrees / 180 * Math.PI;
    },
    radsToDegrees: function(radians) {
        return radians * 180 / Math.PI;
    },
    randomRange: function(min, max) {
        return min + Math.random() * (max - min);
    },
    randomInt: function(min, max) {
        return Math.floor(min + Math.random() * (max - min + 1));
    },
    roundToPlaces: function(value, places) {
        var mult = Math.pow(10, places);
        return Math.round(value * mult) / mult;
    },
    roundNearest: function(value, nearest) {
        return Math.round(value / nearest) * nearest;
    },
    quadraticBezier: function(p0, p1, p2, t, pFinal) {
        pFinal = pFinal || {};
        pFinal.x = Math.pow(1 - t, 2) * p0.x + 
                   (1 - t) * 2 * t * p1.x + 
                   t * t * p2.x;
        pFinal.y = Math.pow(1 - t, 2) * p0.y + 
                   (1 - t) * 2 * t * p1.y + 
                   t * t * p2.y;
        return pFinal;
    },
    cubicBezier: function(p0, p1, p2, p3, t, pFinal) {
        pFinal = pFinal || {};
        pFinal.x = Math.pow(1 - t, 3) * p0.x + 
                   Math.pow(1 - t, 2) * 3 * t * p1.x + 
                   (1 - t) * 3 * t * t * p2.x + 
                   t * t * t * p3.x;
        pFinal.y = Math.pow(1 - t, 3) * p0.y + 
                   Math.pow(1 - t, 2) * 3 * t * p1.y + 
                   (1 - t) * 3 * t * t * p2.y + 
                   t * t * t * p3.y;
        return pFinal;
    }
}