// canvas and related variables
var nFrames = 16;
var cFS = {}; // canvas functionspace
var cNS = {}; // canvas namespace
for (let i=1; i <= nFrames; i++) {
    cNS[i] = document.getElementById(`dst${i}`);
}

var cc = {
    's' : 100,        // complex plane scale
    'lw' : 6,         // line width
    'ps' : 10,        // point size
    'mc' : '#40e0d0', // main color
    'hc' : '#808080', // hide color
    'ac' : '#dedede', // accent color
    '+c' : '#40e080', // positive color
    '-c' : '#ff1493', // negative color
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
    p.draw(canvas, scale, lw, mc, dp0, inv, true);
}
cFS[1] = frame1;

function frame2(canvas) {
    let [scale, lw, ps, inv] = [cc['s'], cc['lw'], cc['ps'], cc['inv']];
    let [mc, hc, ac] = [cc['mc'], cc['hc'], cc['ac']];
    let [dp0, dp1, dp2] = [cc['dp0'], cc['dp1'], cc['dp2']];
    GeometryEngine.drawLine(canvas, p.a, p.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawPoint(canvas, p.p, scale, ps, ac, inv);
    p.draw(canvas, scale, lw, mc, dp0, inv, true);
}
cFS[2] = frame2;

function frame3(canvas) {
    let [scale, lw, ps, inv] = [cc['s'], cc['lw'], cc['ps'], cc['inv']];
    let [mc, hc, ac] = [cc['mc'], cc['hc'], cc['ac']];
    let [dp0, dp1, dp2] = [cc['dp0'], cc['dp1'], cc['dp2']];
    GeometryEngine.drawLine(canvas, p.p, p.d, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, p.a, p.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawPoint(canvas, p.p, scale, ps, ac, inv);
    p.draw(canvas, scale, lw, mc, dp0, inv, true);
}
cFS[3] = frame3;

function frame4(canvas) {
    let [scale, lw, ps, inv] = [cc['s'], cc['lw'], cc['ps'], cc['inv']];
    let [mc, hc, ac] = [cc['mc'], cc['hc'], cc['ac']];
    let [dp0, dp1, dp2] = [cc['dp0'], cc['dp1'], cc['dp2']];
    GeometryEngine.drawLine(canvas, p.p, p.d, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, p.a, p.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, p.e, p.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, p.f, p.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, p.a, p.f, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, p.e, p.c, scale, lw, hc, dp2, inv);
    GeometryEngine.drawPoint(canvas, p.p, scale, ps, ac, inv);
    p.draw(canvas, scale, lw, mc, dp0, inv, true);
}
cFS[4] = frame4;

function frame5(canvas) {
    let [scale, lw, ps, inv] = [cc['s'], cc['lw'], cc['ps'], cc['inv']];
    let [mc, hc, ac] = [cc['mc'], cc['hc'], cc['ac']];
    let [dp0, dp1, dp2] = [cc['dp0'], cc['dp1'], cc['dp2']];
    GeometryEngine.drawLine(canvas, p.p, p.d, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, p.a, p.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, p.e, p.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, p.f, p.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, p.p, p.b, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, p.a, p.f, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, p.p, p.c, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, p.e, p.c, scale, lw, hc, dp2, inv);
    GeometryEngine.drawPoint(canvas, p.p, scale, ps, ac, inv);
    p.draw(canvas, scale, lw, mc, dp0, inv, true);
}
cFS[5] = frame5;

function frame6(canvas) {
    let [scale, lw, ps, inv] = [cc['s'], cc['lw'], cc['ps'], cc['inv']];
    let [mc, hc, ac, pc] = [cc['mc'], cc['hc'], cc['ac'], cc['+c']];
    let [dp0, dp1, dp2] = [cc['dp0'], cc['dp1'], cc['dp2']];
    GeometryEngine.drawLine(canvas, p.p, p.d, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, p.a, p.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, p.e, p.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, p.f, p.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, p.p, p.b, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, p.a, p.f, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, p.p, p.c, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, p.e, p.c, scale, lw, hc, dp2, inv);
    GeometryEngine.drawPoint(canvas, p.p, scale, ps, ac, inv);
    p.draw(canvas, scale, lw, mc, dp0, inv, true);
    p.tAFP.draw(canvas, scale, lw, pc, dp0, inv, true);
    p.tAPE.draw(canvas, scale, lw, pc, dp0, inv, true);
}
cFS[6] = frame6;

function frame7(canvas) {
    let [scale, lw, ps, inv] = [cc['s'], cc['lw'], cc['ps'], cc['inv']];
    let [mc, hc, ac, pc] = [cc['mc'], cc['hc'], cc['ac'], cc['+c']];
    let [dp0, dp1, dp2] = [cc['dp0'], cc['dp1'], cc['dp2']];
    GeometryEngine.drawLine(canvas, p.p, p.d, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, p.a, p.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, p.e, p.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, p.f, p.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, p.p, p.b, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, p.a, p.f, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, p.p, p.c, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, p.e, p.c, scale, lw, hc, dp2, inv);
    GeometryEngine.drawPoint(canvas, p.p, scale, ps, ac, inv);
    p.draw(canvas, scale, lw, mc, dp0, inv, true);
    p.tBPD.draw(canvas, scale, lw, pc, dp0, inv, true);
    p.tCDP.draw(canvas, scale, lw, pc, dp0, inv, true);
}
cFS[7] = frame7;

function frame8(canvas) {
    let [scale, lw, ps, inv] = [cc['s'], cc['lw'], cc['ps'], cc['inv']];
    let [mc, hc, ac, pc] = [cc['mc'], cc['hc'], cc['ac'], cc['+c']];
    let [dp0, dp1, dp2] = [cc['dp0'], cc['dp1'], cc['dp2']];
    GeometryEngine.drawLine(canvas, p.p, p.d, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, p.a, p.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, p.e, p.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, p.f, p.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, p.p, p.b, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, p.a, p.f, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, p.p, p.c, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, p.e, p.c, scale, lw, hc, dp2, inv);
    GeometryEngine.drawPoint(canvas, p.p, scale, ps, ac, inv);
    p.draw(canvas, scale, lw, mc, dp0, inv, true);
    p.tBFP.draw(canvas, scale, lw, pc, dp0, inv, true);
    p.tCEP.draw(canvas, scale, lw, pc, dp0, inv, true);
}
cFS[8] = frame8;


// Ruse 1
function frame9(canvas) {
    let [scale, lw, ps, inv] = [cc['s'], cc['lw'], cc['ps'], cc['inv']];
    let [mc, hc, ac, pc, nc] = [cc['mc'], cc['hc'], cc['ac'], cc['+c'], cc['-c']];
    let [dp0, dp1, dp2] = [cc['dp0'], cc['dp1'], cc['dp2']];
    GeometryEngine.drawLine(canvas, pFake.p, pFake.d, scale, lw, ac, dp1, inv);
    if (pFake.triangle.isIsosceles["a"]) {
        GeometryEngine.drawLine(canvas, pFake.a, pFake.p, scale, lw, ac, dp1, inv);
    } else {
        GeometryEngine.drawLine(canvas, pFake.a, pFake.p, scale, lw, nc, dp1, inv);
    }
    GeometryEngine.drawLine(canvas, pFake.e, pFake.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, pFake.f, pFake.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, pFake.p, pFake.b, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, pFake.a, pFake.f, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, pFake.p, pFake.c, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, pFake.e, pFake.c, scale, lw, hc, dp2, inv);
    GeometryEngine.drawPoint(canvas, pFake.p, scale, ps, ac, inv);
    pFake.draw(canvas, scale, lw, mc, dp0, inv, true);
}
cFS[9] = frame9;

function frame10(canvas) {
    let [scale, lw, ps, inv] = [cc['s'], cc['lw'], cc['ps'], cc['inv']];
    let [mc, hc, ac, pc, nc] = [cc['mc'], cc['hc'], cc['ac'], cc['+c'], cc['-c']];
    let [dp0, dp1, dp2] = [cc['dp0'], cc['dp1'], cc['dp2']];
    GeometryEngine.drawLine(canvas, pFake.p, pFake.d, scale, lw, ac, dp1, inv);
    if (pFake.triangle.isIsosceles["a"]) {
        GeometryEngine.drawLine(canvas, pFake.a, pFake.p, scale, lw, ac, dp1, inv);
    } else {
        GeometryEngine.drawLine(canvas, pFake.a, pFake.p, scale, lw, nc, dp1, inv);
    }
    GeometryEngine.drawLine(canvas, pFake.e, pFake.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, pFake.f, pFake.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, pFake.p, pFake.b, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, pFake.a, pFake.f, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, pFake.p, pFake.c, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, pFake.e, pFake.c, scale, lw, hc, dp2, inv);
    GeometryEngine.drawPoint(canvas, pFake.p, scale, ps, ac, inv);
    pFake.draw(canvas, scale, lw, mc, dp0, inv, true);
    pFake.tBPD.draw(canvas, scale, lw, pc, dp0, inv, true);
    pFake.tCDP.draw(canvas, scale, lw, pc, dp0, inv, true);
}
cFS[10] = frame10;

function frame11(canvas) {
    let [scale, lw, ps, inv] = [cc['s'], cc['lw'], cc['ps'], cc['inv']];
    let [mc, hc, ac, pc, nc] = [cc['mc'], cc['hc'], cc['ac'], cc['+c'], cc['-c']];
    let [dp0, dp1, dp2] = [cc['dp0'], cc['dp1'], cc['dp2']];
    let isIso = pFake.triangle.isIsosceles["a"];
    GeometryEngine.drawLine(canvas, pFake.p, pFake.d, scale, lw, ac, dp1, inv);
    if (isIso) {
        GeometryEngine.drawLine(canvas, pFake.a, pFake.p, scale, lw, ac, dp1, inv);
    } else {
        GeometryEngine.drawLine(canvas, pFake.a, pFake.p, scale, lw, nc, dp1, inv);
    }
    GeometryEngine.drawLine(canvas, pFake.e, pFake.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, pFake.f, pFake.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, pFake.p, pFake.b, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, pFake.a, pFake.f, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, pFake.p, pFake.c, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, pFake.e, pFake.c, scale, lw, hc, dp2, inv);
    GeometryEngine.drawPoint(canvas, pFake.p, scale, ps, ac, inv);
    pFake.draw(canvas, scale, lw, mc, dp0, inv, true);
    if (isIso) {
        pFake.tAFP.draw(canvas, scale, lw, pc, dp0, inv, true);
        pFake.tAPE.draw(canvas, scale, lw, pc, dp0, inv, true);
    } else {
        pFake.tAFP.draw(canvas, scale, lw, nc, dp0, inv, true);
        pFake.tAPE.draw(canvas, scale, lw, nc, dp0, inv, true);
    }
}
cFS[11] = frame11;

function frame12(canvas) {
    let [scale, lw, ps, inv] = [cc['s'], cc['lw'], cc['ps'], cc['inv']];
    let [mc, hc, ac, pc, nc] = [cc['mc'], cc['hc'], cc['ac'], cc['+c'], cc['-c']];
    let [dp0, dp1, dp2] = [cc['dp0'], cc['dp1'], cc['dp2']];
    let isIso = pFake.triangle.isIsosceles["a"];
    GeometryEngine.drawLine(canvas, pFake.p, pFake.d, scale, lw, ac, dp1, inv);
    if (isIso) {
        GeometryEngine.drawLine(canvas, pFake.a, pFake.p, scale, lw, ac, dp1, inv);
    } else {
        GeometryEngine.drawLine(canvas, pFake.a, pFake.p, scale, lw, nc, dp1, inv);
    }
    GeometryEngine.drawLine(canvas, pFake.e, pFake.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, pFake.f, pFake.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, pFake.p, pFake.b, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, pFake.a, pFake.f, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, pFake.p, pFake.c, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, pFake.e, pFake.c, scale, lw, hc, dp2, inv);
    GeometryEngine.drawPoint(canvas, pFake.p, scale, ps, ac, inv);
    pFake.draw(canvas, scale, lw, mc, dp0, inv, true);
    if (isIso) {
        pFake.tBFP.draw(canvas, scale, lw, pc, dp0, inv, true);
        pFake.tCEP.draw(canvas, scale, lw, pc, dp0, inv, true);
    } else {
        pFake.tBFP.draw(canvas, scale, lw, nc, dp0, inv, true);
        pFake.tCEP.draw(canvas, scale, lw, nc, dp0, inv, true);
    }
}
cFS[12] = frame12;


// Ruse 2
function frame13(canvas) {
    let [scale, lw, ps, inv] = [cc['s'], cc['lw'], cc['ps'], cc['inv']];
    let [mc, hc, ac, pc, nc] = [cc['mc'], cc['hc'], cc['ac'], cc['+c'], cc['-c']];
    let [dp0, dp1, dp2] = [cc['dp0'], cc['dp1'], cc['dp2']];
    if (pFake2.triangle.isIsosceles["a"]) {
        GeometryEngine.drawLine(canvas, pFake2.p, pFake2.d, scale, lw, ac, dp1, inv);
    } else {
        GeometryEngine.drawLine(canvas, pFake2.p, pFake2.d, scale, lw, nc, dp1, inv);
    }
    GeometryEngine.drawLine(canvas, pFake2.a, pFake2.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, pFake2.e, pFake2.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, pFake2.f, pFake2.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, pFake2.p, pFake2.b, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, pFake2.a, pFake2.f, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, pFake2.p, pFake2.c, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, pFake2.e, pFake2.c, scale, lw, hc, dp2, inv);
    GeometryEngine.drawPoint(canvas, pFake2.p, scale, ps, ac, inv);
    pFake2.draw(canvas, scale, lw, mc, dp0, inv, true);
}
cFS[13] = frame13;

function frame14(canvas) {
    let [scale, lw, ps, inv] = [cc['s'], cc['lw'], cc['ps'], cc['inv']];
    let [mc, hc, ac, pc, nc] = [cc['mc'], cc['hc'], cc['ac'], cc['+c'], cc['-c']];
    let [dp0, dp1, dp2] = [cc['dp0'], cc['dp1'], cc['dp2']];
    if (pFake2.triangle.isIsosceles["a"]) {
        GeometryEngine.drawLine(canvas, pFake2.p, pFake2.d, scale, lw, ac, dp1, inv);
    } else {
        GeometryEngine.drawLine(canvas, pFake2.p, pFake2.d, scale, lw, nc, dp1, inv);
    }
    GeometryEngine.drawLine(canvas, pFake2.a, pFake2.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, pFake2.e, pFake2.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, pFake2.f, pFake2.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, pFake2.p, pFake2.b, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, pFake2.a, pFake2.f, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, pFake2.p, pFake2.c, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, pFake2.e, pFake2.c, scale, lw, hc, dp2, inv);
    GeometryEngine.drawPoint(canvas, pFake2.p, scale, ps, ac, inv);
    pFake2.draw(canvas, scale, lw, mc, dp0, inv, true);
    pFake2.tAFP.draw(canvas, scale, lw, pc, dp0, inv, true);
    pFake2.tAPE.draw(canvas, scale, lw, pc, dp0, inv, true);
}
cFS[14] = frame14;

function frame15(canvas) {
    let [scale, lw, ps, inv] = [cc['s'], cc['lw'], cc['ps'], cc['inv']];
    let [mc, hc, ac, pc, nc] = [cc['mc'], cc['hc'], cc['ac'], cc['+c'], cc['-c']];
    let [dp0, dp1, dp2] = [cc['dp0'], cc['dp1'], cc['dp2']];
    let isIso = pFake2.triangle.isIsosceles["a"];
    if (isIso) {
        GeometryEngine.drawLine(canvas, pFake2.p, pFake2.d, scale, lw, ac, dp1, inv);
    } else {
        GeometryEngine.drawLine(canvas, pFake2.p, pFake2.d, scale, lw, nc, dp1, inv);
    }
    GeometryEngine.drawLine(canvas, pFake2.p, pFake2.d, scale, lw, nc, dp1, inv);
    GeometryEngine.drawLine(canvas, pFake2.a, pFake2.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, pFake2.e, pFake2.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, pFake2.f, pFake2.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, pFake2.p, pFake2.b, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, pFake2.a, pFake2.f, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, pFake2.p, pFake2.c, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, pFake2.e, pFake2.c, scale, lw, hc, dp2, inv);
    GeometryEngine.drawPoint(canvas, pFake2.p, scale, ps, ac, inv);
    pFake2.draw(canvas, scale, lw, mc, dp0, inv, true);
    if (isIso) {
        pFake2.tBPD.draw(canvas, scale, lw, pc, dp0, inv, true);
        pFake2.tCDP.draw(canvas, scale, lw, pc, dp0, inv, true);
    } else {
        pFake2.tBPD.draw(canvas, scale, lw, nc, dp0, inv, true);
        pFake2.tCDP.draw(canvas, scale, lw, nc, dp0, inv, true);
    }
}
cFS[15] = frame15;

function frame16(canvas) {
    let [scale, lw, ps, inv] = [cc['s'], cc['lw'], cc['ps'], cc['inv']];
    let [mc, hc, ac, pc, nc] = [cc['mc'], cc['hc'], cc['ac'], cc['+c'], cc['-c']];
    let [dp0, dp1, dp2] = [cc['dp0'], cc['dp1'], cc['dp2']];
    let isIso = pFake2.triangle.isIsosceles["a"];
    if (isIso) {
        GeometryEngine.drawLine(canvas, pFake2.p, pFake2.d, scale, lw, ac, dp1, inv);
    } else {
        GeometryEngine.drawLine(canvas, pFake2.p, pFake2.d, scale, lw, nc, dp1, inv);
    }
    GeometryEngine.drawLine(canvas, pFake2.a, pFake2.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, pFake2.e, pFake2.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, pFake2.f, pFake2.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, pFake2.p, pFake2.b, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, pFake2.a, pFake2.f, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, pFake2.p, pFake2.c, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, pFake2.e, pFake2.c, scale, lw, hc, dp2, inv);
    GeometryEngine.drawPoint(canvas, pFake2.p, scale, ps, ac, inv);
    pFake2.draw(canvas, scale, lw, mc, dp0, inv, true);
    if (isIso) {
        pFake2.tBFP.draw(canvas, scale, lw, pc, dp0, inv, true);
        pFake2.tCEP.draw(canvas, scale, lw, pc, dp0, inv, true);
    } else {
        pFake2.tBFP.draw(canvas, scale, lw, nc, dp0, inv, true);
        pFake2.tCEP.draw(canvas, scale, lw, nc, dp0, inv, true);
    }
}
cFS[16] = frame16;


function interactiveFrame(canvas) {
    let [scale, lw, ps, inv] = [cc['s'], cc['lw'], cc['ps'], cc['inv']];
    let [mc, hc, ac] = [cc['mc'], cc['hc'], cc['ac']];
    let [dp0, dp1, dp2] = [cc['dp0'], cc['dp1'], cc['dp2']];
    p.draw(canvas, scale, lw, mc, dp0, inv, true);
    GeometryEngine.drawLine(canvas, p.p, p.d, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, p.a, p.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, p.e, p.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, p.f, p.p, scale, lw, ac, dp1, inv);
    GeometryEngine.drawLine(canvas, p.p, p.b, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, p.a, p.f, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, p.c, p.e, scale, lw, hc, dp2, inv);
    GeometryEngine.drawLine(canvas, p.p, p.c, scale, lw, hc, dp2, inv);
    GeometryEngine.drawPoint(canvas, p.p, scale, ps, ac, inv);
    p.draw(canvas, scale, lw, mc, dp0, inv, true);
}
// cFS[0] = interactiveFrame;
