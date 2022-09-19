// canvas and related variables
var nFrames = 1;
var cFS = {}; // canvas functionspace
var cNS = {}; // canvas namespace
for (let i=1; i <= nFrames; i++) {
    cNS[i] = document.getElementById(`dst${i}`);
}

var cc = {
    's' : 100,        // complex plane scale
    'lw' : 6,         // line width
    'ps' : 10,        // point size
    // original color scheme
    // 'mc' : '#40e0d0', // main color
    // 'hc' : '#808080', // hide color
    // 'ac' : '#dedede', // accent color
    // '+c' : '#40e080', // positive color
    // '-c' : '#ff1493', // negative color
    // muted color scheme
    // 'mc' : '#88CCEE', // main color
    // 'hc' : '#DDDDDD', // hide color
    // 'ac' : '#FFFFFF', // accent color
    // '+c' : '#117733', // positive color
    // '-c' : '#CC6677', // negative color
    // bright color scheme
    // 'mc' : '#66CCEE', // main color
    // 'hc' : '#BBBBBB', // hide color
    // 'ac' : '#FFFFFF', // accent color
    // '+c' : '#228833', // positive color
    // '-c' : '#EE6677', // negative color
    // high-contrast color scheme
    // 'mc' : '#004488', // main color
    // 'hc' : '#000000', // hide color
    // 'ac' : '#FFFFFF', // accent color
    // '+c' : '#DDAA33', // positive color
    // '-c' : '#BB5566', // negative color
    // vibrant color scheme
    'mc' : '#33BBEE', // main color
    'hc' : '#BBBBBB', // hide color
    'ac' : '#FFFFFF', // accent color
    '+c' : '#009988', // positive color
    '-c' : '#EE3377', // negative color
    'dp0': [],        // no dash pattern
    'dp1': [6, 6],    // dash pattern 1
    'dp2': [3, 3],    // dash pattern 2
    'inv': true,      // flip Y axis
};


// Frames
function frame1(canvas) {
    let [scale, lw, ps, inv] = [cc['s'], cc['lw'], cc['ps'], cc['inv']];
    let [mc, hc, ac] = [cc['mc'], cc['hc'], cc['ac']];
    let [dp0, dp1, dp2] = [cc['dp0'], cc['dp1'], cc['dp2']];
    ge.draw(canvas, scale, lw, mc, dp0, inv, true);
    let aDelta = GeometryEngine.calcPointOffset(ge.triangle.a,
                                                [ge.triangle.a.sub(ge.triangle.b),
                                                 ge.triangle.a.sub(ge.triangle.c)],
                                                20, 0.5);
    let bDelta = GeometryEngine.calcPointOffset(ge.triangle.b,
                                                [ge.triangle.a.sub(ge.triangle.b),
                                                 ge.triangle.b.sub(ge.triangle.c)],
                                                20, 0.5);
    let cDelta = GeometryEngine.calcPointOffset(ge.triangle.c,
                                                [ge.triangle.c.sub(ge.triangle.a),
                                                 ge.triangle.c.sub(ge.triangle.b)],
                                                20, 0.5);
    GeometryEngine.drawAnnotation(canvas, "A", aDelta, scale, 50, ac, "RooneySans", inv);
    GeometryEngine.drawAnnotation(canvas, "B", bDelta, scale, 50, ac, "RooneySans", inv);
    GeometryEngine.drawAnnotation(canvas, "C", cDelta, scale, 50, ac, "RooneySans", inv);
}
cFS[1] = frame1;

function interactiveFrame(canvas) {
    let [scale, lw, ps, inv] = [cc['s'], cc['lw'], cc['ps'], cc['inv']];
    let [mc, hc, ac] = [cc['mc'], cc['hc'], cc['ac']];
    let [dp0, dp1, dp2] = [cc['dp0'], cc['dp1'], cc['dp2']];
    ge.draw(canvas, scale, lw, mc, dp0, inv, true);
}
// cFS[0] = interactiveFrame;
