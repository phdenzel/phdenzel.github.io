// Grab canvas and related variables
// frames.js
var nFrames, cNS, cFS, cc;
// console.log(cNS);

// geometry.js
if (typeof PI2 === 'undefined') { const PI2 = 2*math.PI; }
// var canvasCenter, canvasScale, lineWidth, dashPattern, lineColor, invertY;
var A, B, C;
A = '-1+3i';
B = '-3-1i';
C = '4-1i';

// interaction variables
var zProximity = 0.3;
var isDown = false;
var lastX, lastY, grabbed;

let p = new IsoscelesProof([A, B, C]);
let pFake = new IsoscelesProof([A, B, C], isFake=true);
let pFake2 = new IsoscelesProof([A, B, C], isFake=2);


function getMouseZ(x, y, origin=[0, 0]) {
    let [scale, flipY] = [cc['s'], cc['inv']];
    let z = GeometryEngine.canvasInverseTransform([x, y], origin, scale, flipY);
    return z;
}

function handleMouseDown(e) {
    // handle this event myself
    e.preventDefault();
    e.stopPropagation();
    // cache the mouse position on canvas
    let cvs = e.currentTarget;
    let [cw, ch] = [cvs.width, cvs.height];
    let [ccw, cch] = [cvs.clientWidth, cvs.clientHeight];
    let origin = [cw/2, ch/2];
    if (e.offsetX && e.offsetY) {
        lastX = parseInt((cw/ccw)*e.offsetX);
        lastY = parseInt((ch/cch)*e.offsetY);
    } else {
        let rect = e.target.getBoundingClientRect();
        lastX = parseInt((cw/ccw)*(e.targetTouches[0].clientX-rect.left));
        lastY = parseInt((ch/cch)*(e.targetTouches[0].clientY-rect.top));
    }
    // translate to complex number
    let z = getMouseZ(lastX, lastY, origin);
    // check triangle distances to z
    let ds = p.triangle.edgeDistances(z);
    let dsIdx = p.triangle.argMinDistance(z);
    if (ds[dsIdx] < zProximity) {
        grabbed = dsIdx;
        isDown = true;
    } else {
        grabbed = null;
    }
    // console.log(e);
    console.log(z, grabbed);
}

function handleMouseUp(e) {
    // handle this event myself
    e.preventDefault();
    e.stopPropagation();
    // stop the drag
    isDown = false;
    // console.log(e);
}

function handleMouseMove(e) {
    // only do anything if mouse button is pressed
    if (!(isDown)) {
        return;
    }
    // handle this event myself
    e.preventDefault();
    e.stopPropagation();
    // get current mouse position
    let cvs = e.currentTarget;
    let [cw, ch] = [cvs.width, cvs.height];
    let [ccw, cch] = [cvs.clientWidth, cvs.clientHeight];
    let origin = [cw/2, ch/2];
    if (e.offsetX && e.offsetY) {
        mouseX = parseInt((cw/ccw)*e.offsetX);
        mouseY = parseInt((ch/cch)*e.offsetY);
    } else {
        let rect = e.target.getBoundingClientRect();
        mouseX = parseInt((cw/ccw)*(e.targetTouches[0].clientX-rect.left));
        mouseY = parseInt((ch/cch)*(e.targetTouches[0].clientY-rect.top));
    }
    let z = getMouseZ(mouseX, mouseY, origin);
    if (grabbed >= 0) {
        let edges = p.triangle.edges;
        edges[grabbed] = z;
        p.flushCache();
        pFake.flushCache();
        pFake2.flushCache();
        p.triangle.edges = edges;
        pFake.triangle.edges = edges;
        pFake2.triangle.edges = edges;
        updateAllCanvas();
    }
    // console.log(z, grabbed);
}

function updateAllCanvas() {
    // clear entire canvas namespace
    for (let key in cNS) {
        let cvs = cNS[key];
        let ctx = cvs.getContext('2d');
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        cFS[key](cNS[key]);
    }
}

// bind event listeners
for (let i=0; i <= nFrames; i++) {
    let dstStr = `#dst${i}`;
    if (i === 0) { dstStr = '#dst'; }
    let dstobj = document.getElementById(dstStr.substring(1));
    $(dstStr).mousedown(function(e) {
        handleMouseDown(e);
    });
    $(dstStr).mousemove(function (e) {
        handleMouseMove(e);
    });
    $(dstStr).mouseup(function (e) {
        handleMouseUp(e);
    });
    $(dstStr).mouseout(function (e) {
        handleMouseUp(e);
    });
    dstobj.addEventListener('touchstart', function(e) {
        handleMouseDown(e);
    });
    dstobj.addEventListener('touchmove', function(e) {
        handleMouseMove(e);
    });
    dstobj.addEventListener('touchstart', function(e) {
        handleMouseUp(e);
    });
}

// draw initial frames
updateAllCanvas();
