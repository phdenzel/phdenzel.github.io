// Grab canvas
var dst = document.getElementById('dst');
var canvasCenter = [dst.width/2, dst.height/2];
var canvasScale = 100;
var lineWidth = 6;
var dashPattern = [lineWidth, lineWidth];
var lineColor = 'turquoise';
var invertY = true;
var [A, B, C] = ['-1+4i', '-4-2i', '5-2i'];
const PI2 = 2*math.PI;


class GeometryEngine {

    /**
     * @constructs GeometryEngine
     * @param {Complex[3]|number[2][3]|string[3]} triangleEdges - edges of a triangle
     * @returns {nil}
     */
    constructor(triangleEdges=null) {
        
        this.triangle = new Triangle();
        if (triangleEdges) {
            this.triangle.edges = triangleEdges;
        }
    }

    /**
     * complexify - standardize inputs as Complex objects
     * @static
     * @param {Complex, number[2], string} i - input
     * @returns {Complex} - a complex number
     */
    static complexify(i) {
        if (typeof i === 'string') {
            i = math.complex(i);
        } else if (Array.isArray(i)) {
            i = math.complex(i[0], i[1]);
        }
        return i;
    }

    /**
     * intersect - calculate the intersection of two lines through (a, c) and (b, d)
     * on complex number plane
     * @static
     * @param {Complex|number[2]|string} a - first point
     * @param {Complex|number[2]|string} b - second point
     * @param {Complex|number[2]|string} c - third point
     * @param {Complex|number[2]|string} d - fourth point
     * @return {Complex} - intersection point on complex number plane
     */
    static intersect(a, b, c, d) {
        a = GeometryEngine.complexify(a);
        b = GeometryEngine.complexify(b);
        c = GeometryEngine.complexify(c);
        d = GeometryEngine.complexify(d);
        let [x1, y1] = a.toVector();
        let [x2, y2] = c.toVector();
        let [X1, Y1] = b.sub(a).toVector();
        let [X2, Y2] = d.sub(c).toVector();
        let det = X1*Y2 - X2*Y1;
        let u = (X2*y1 - X2*y2 - Y2*x1 + Y2*x2) / det;
        // let v = (X1*y1 - X1*y2 - Y1*x1 + Y1*x2) / det;
        // console.log(x1, y1, x2, y2, X1, Y1, X2, Y2);
        return math.complex(x1+u*X1, y1+u*Y1);
    }

    /**
     * bisect - calculate a point on the bisection of the angle between (a, b) and (b, c)
     * on complex number plane
     * @static
     * @param {Complex|number[2]|string} a - first point
     * @param {Complex|number[2]|string} b - second point
     * @param {Complex|number[2]|string} c - third point
     * @return {Complex} - complex number on bisection
     */
    static bisect(a, b, c) {
        let [x1, y1] = a.sub(b).toVector();
        let [x2, y2] = c.sub(b).toVector();
        let f1 = math.atan2(y1, x1);
        let f2 = math.atan2(y2, x2);
        return b.add(math.Complex.fromPolar(1, (f1+f2)/2));
    }

    /**
     * perpendicular - calculate point on the perpendicular from a to b
     * @static
     * @param {Complex|number[2]|string} a - point on complex number plane
     * @param {Complex|number[2]|string} b - point on complex number plane
     * @returns {Complex|number[2]|string} - point on the perpendicular from a
     */
    static perpendicular(a, b) {
        a = GeometryEngine.complexify(a);
        b = GeometryEngine.complexify(b);
        return a.add(math.Complex['I'].mul(b.sub(a)));
    }

    /**
     * draw - draw all shapes on a canvas
     * @param {HTMLCanvasElement} canvas - canvas object
     * @param {number} [scale=1] - length scaling from complex number plane to canvas
     * @param {number} [lineWidth=6] - width of the lines drawn on the canvas
     * @param {string} [color='white'] - color of the lines drawn on the canvas
     * @param {string} [dashPattern=[]] - dash style of the lines drawn on the canvas
     * @param {boolean} [flipY=true] - flip the Y-axis on the canvas
     * @param {boolean} [drawEdgePoints=true] - draw points on the edges
     * @returns {nil}
     */
    draw(canvas, scale=1, lineWidth=6, color='white', dashPattern=[], flipY=true, drawEdgePoints=true) {
        this.triangle.draw(canvas, scale, lineWidth, color, dashPattern, flipY, drawEdgePoints);
    }

    /**
     * drawPoint - draw a point at the specified coordinates
     * @static
     * @param {HTMLCanvasElement} canvas - canvas object
     * @param {Complex|number[2]|string} point - point coordinates on complex number plane
     * @param {number} [scale=1] - length scaling from complex number plane to canvas
     * @param {number} [size=6] - width of the lines drawn on the canvas
     * @param {string} [color='white'] - color of the lines drawn on the canvas
     * @param {boolean} [flipY=true] - flip the Y-axis on the canvas
     * @returns {nil}
     */
    static drawPoint(canvas, point, scale=1, size=6, color='white', flipY=true) {
        var ctx = canvas.getContext('2d');
        if (ctx) {
            let path = new Path2D();
            const center = [canvas.width/2, canvas.height/2];
            var z = GeometryEngine.complexify(point);
            if (Array.isArray(point)) {
                z = GeometryEngine.canvasInverseTransform(point, center, scale, flipY);
            }
            var cZ = GeometryEngine.canvasTransform(z, center, scale, flipY);

            path.moveTo(cZ[0], cZ[1]);
            path.arc(cZ[0], cZ[1], size, 0, PI2, true);

            ctx.fillStyle = color;
            ctx.fill(path);
        }
        // console.log("Point drawn...", z, cZ);
    }

    /**
     * drawLine - draw a line from a to b
     * @param {HTMLCanvasElement} canvas - canvas object
     * @param {Complex|number[2]|string} a - point coordinates on complex number plane
     * @param {Complex|number[2]|string} b - point coordinates on complex number plane
     * @param {number} [scale=1] - length scaling from complex number plane to canvas
     * @param {number} [lineWidth=6] - width of the lines drawn on the canvas
     * @param {string} [color='white'] - color of the lines drawn on the canvas
     * @param {string} [dashPattern=[]] - dash style of the lines drawn on the canvas
     * @param {boolean} [flipY=true] - flip the Y-axis on the canvas
     * @returns {nil}
     */
    static drawLine(canvas, a, b, scale=1, lineWidth=6, color='white', dashPattern=[], flipY=true) {
        var ctx = canvas.getContext('2d');
        if (ctx) {
            let path = new Path2D();
            const center = [canvas.width/2, canvas.height/2];
            var zA = GeometryEngine.complexify(a);
            var zB = GeometryEngine.complexify(b);
            if (Array.isArray(a)) {
                zA = GeometryEngine.canvasInverseTransform(a, center, scale, flipY);
            }
            if (Array.isArray(b)) {
                zB = GeometryEngine.canvasInverseTransform(b, center, scale, flipY);
            }
            var cA = GeometryEngine.canvasTransform(zA, center, scale, flipY);
            var cB = GeometryEngine.canvasTransform(zB, center, scale, flipY);

            path.moveTo(cA[0], cA[1]);
            path.lineTo(cB[0], cB[1]);

            ctx.lineWidth = lineWidth;
            ctx.setLineDash(dashPattern);
            ctx.strokeStyle = color;
            ctx.stroke(path);

            ctx.fillStyle = color;
            ctx.fill(path);
        }
        // console.log("Point drawn...", [zA, zB], [cA, cB]);
    }

    /**
     * canvasTransform - Transform points in complex number plane to canvas coordinates
     * @static
     * @param {Complex|number[2]|string} point - coordinate as a complex number
     * @param {number[2]} canvasCenter - an array representing a 2D vector to the canvas' center
     * @param {number} [lengthScale=1] - length scaling from complex number plane to canvas
     * @param {boolean} [flipY=true] - flip the Y axis on the canvas
     * @returns {number[2]} - an array representing a 2D vector on the canvas
     */
    static canvasTransform(point, canvasCenter, lengthScale=1, flipY=true) {
        const yDir = (flipY) ? -1 : 1;
        const origin = math.complex(canvasCenter[0], yDir*canvasCenter[1]);
        let z = GeometryEngine.complexify(point);
        var arr = z.mul(lengthScale).add(origin).toVector();
        arr[1] *= yDir;
        return arr;
    }

    /**
     * canvasInverseTransform - Transform canvas coordinates to points in complex number plane
     * @static
     * @param {number[2]} point - an array representing a 2D vector on the canvas
     * @param {number[2]} canvasCenter - an array representing a 2D vector to the canvas' center
     * @param {number} [lengthScale=1] - length scaling from complex number plane to canvas
     * @param {boolean} [flipY=true] - flip the Y axis on the canvas
     * @returns {Complex} - coordinate as a complex number
     */
    static canvasInverseTransform(point, canvasCenter, lengthScale=1, flipY=true) {
        const yDir = (flipY) ? -1 : 1;
        const origin = math.complex(canvasCenter[0], yDir*canvasCenter[1]);
        var z = GeometryEngine.complexify(point);
        if (flipY) {
            z = z.conjugate();
        }
        return z.sub(origin).div(lengthScale);
    }
}


class Triangle {

    /**
     * @constructs Triangle
     * @param {Complex|number[2]|string} a - first edge of the triangle
     * @param {Complex|number[2]|string} b - second edge of the triangle
     * @param {Complex|number[2]|string} c - third edge of the triangle
     * @returns {nil}
     */
    constructor(a=null, b=null, c=null, tol=1e-3) {
        if (a && b && c) {
            this.a = GeometryEngine.complexify(a);
            this.b = GeometryEngine.complexify(b);
            this.c = GeometryEngine.complexify(c);
            console.assert(!(this.a.equals(this.b)), 'Edges are equal at %!', this.a);
            console.assert(!(this.b.equals(this.c)), 'Edges are equal at %s!', this.b);
            console.assert(!(this.c.equals(this.a)), 'Edges are equal at %s!', this.c);
        }
        this.isoscelesTolerance = tol;
    }

    /**
     * edges - setter for all edges of the triangle from single array input
     * @param {Complex[3]|number[2][3]|string[3]} edgePoints - array input
     * @returns {nil}
     */
    set edges(edgePoints) {
        let a = edgePoints[0];
        let b = edgePoints[1];
        let c = edgePoints[2];
        this.a = GeometryEngine.complexify(a);
        this.b = GeometryEngine.complexify(b);
        this.c = GeometryEngine.complexify(c);
    }

    /**
     * edges - getter for all edges of the triangle as array
     * @param {nil} nil
     * @returns {Complex[3]} - array of complex numbers for edge points
     */
    get edges() {
        return [this.a, this.b, this.c];
    }

    /**
     * altitude - getter for all altitude points on the triangle's sides, i.e.
     * c on a-b, a on b-c, and b on c-a
     * @param {nil} nil
     * @returns {Complex{3}} - object of complex numbers for altitudes "c"|0, "a"|1, "b"|2
     */    
    get altitude() {
        let aMirr = this.a.add(math.Complex['I'].mul(this.c.sub(this.b)));
        let bMirr = this.b.add(math.Complex['I'].mul(this.a.sub(this.c)));
        let cMirr = this.c.add(math.Complex['I'].mul(this.b.sub(this.a)));
        var cH = GeometryEngine.intersect(this.a, this.b, this.c, cMirr);
        var aH = GeometryEngine.intersect(this.b, this.c, this.a, aMirr);
        var bH = GeometryEngine.intersect(this.c, this.a, this.b, bMirr);
        return {
            0: cH, "c": cH,
            1: aH, "a": aH,
            2: bH, "b": bH
        };
    }

    get isIsosceles() {
        var [isAtB, isAtA, isAtC] = [false, false, false];
        let AB = (this.a.sub(this.b)).abs();
        let AC = (this.a.sub(this.c)).abs();
        let BC = (this.b.sub(this.c)).abs();
        isAtA = ((AB - AC)**2 < this.isoscelesTolerance);
        isAtB = ((AB - BC)**2 < this.isoscelesTolerance);
        isAtC = ((AC - BC)**2 < this.isoscelesTolerance);
        return {
            0: isAtA, "a": isAtA,
            1: isAtB, "b": isAtB,
            2: isAtC, "c": isAtC,
        };
    }

    /**
     * edgeDistances - calculate distance of a point to each edge of the triangle
     * @param {Complex|number[2]} point - coordinate for distance calculation
     * @returns {number[3]} - distances from the point to each edge of the triangle
     */
    edgeDistances(point) {
        let z = GeometryEngine.complexify(point);
        return this.edges.map(function (edge) {
            return z.sub(edge).abs();
        });
    }

    argMinDistance(point) {
        let ds = this.edgeDistances(point);
        function argMin(arr) {
            return arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] < r[0] ? a : r))[1];
        }
        return argMin(ds);
    }

    /**
     * draw - draw the triangle on a canvas
     * @param {HTMLCanvasElement} canvas - canvas object
     * @param {number} [scale=1] - length scaling from complex number plane to canvas
     * @param {number} [lineWidth=6] - width of the lines drawn on the canvas
     * @param {string} [color='white'] - color of the lines drawn on the canvas
     * @param {string} [dashPattern=[]] - dash style of the lines drawn on the canvas
     * @param {boolean} [flipY=true] - flip the Y-axis on the canvas
     * @param {boolean} [drawEdgePoints=false] - draw points on the edges
     * @returns {nil}
     */
    draw(canvas, scale=1, lineWidth=6, color='white', dashPattern=[], flipY=true, drawEdgePoints=false) {
        var ctx = canvas.getContext('2d');
        if (ctx && this.a && this.b && this.c) {
            const center = [canvas.width/2, canvas.height/2];
            let path = new Path2D();

            var cA = GeometryEngine.canvasTransform(this.a, center, scale, flipY);
            var cB = GeometryEngine.canvasTransform(this.b, center, scale, flipY);
            var cC = GeometryEngine.canvasTransform(this.c, center, scale, flipY);

            path.moveTo(cA[0], cA[1]);
            path.lineTo(cB[0], cB[1]);
            path.lineTo(cC[0], cC[1]);
            path.closePath();

            ctx.lineWidth = lineWidth;
            ctx.setLineDash(dashPattern);
            ctx.strokeStyle = color;
            ctx.stroke(path);

            if (drawEdgePoints) {
                GeometryEngine.drawPoint(canvas, cA, scale, 2*lineWidth, color, flipY);
                GeometryEngine.drawPoint(canvas, cB, scale, 2*lineWidth, color, flipY);
                GeometryEngine.drawPoint(canvas, cC, scale, 2*lineWidth, color, flipY);
            }
        }
        // console.log('Triangle drawn...', this);
    }
}


class IsoscelesProof extends GeometryEngine {

    #cache;
    /**
     * @constructs IsoscelesProof
     * @param {Complex[3]|number[2][3]|string[3]} triangleEdges - edges of a triangle
     * @returns {nil}
     */
    constructor(triangleEdges=null, isFake=false) {
        super(triangleEdges);
        this.isFake = isFake;
        this.#cache = this.constructor.emptyCache();
    }

    static emptyCache() {
        return {
            'd': null,
            'dPerp': null,
            'h': null,
            'p': null,
            'e': null,
            'f': null,
            'tPCA': null,
            'tPAB': null,
            'tAFP': null,
            'tAPE': null,
            'tBPD': null,
            'tCDP': null,
            'tBFP': null,
            'tCEP': null
        };
    }

    flushCache() {
        this.#cache = this.constructor.emptyCache();
    }

    addInCache(key, val) {
        if (!(this.#cache[key])) {
            this.#cache[key] = val;
        }
    }

    forceToCache(key, val) {
        this.#cache[key] = val;
    }

    get a() {
        return this.triangle.a;
    }

    set a(p) {
        p = this.constructor.complexify(p);
    }

    get b() {
        return this.triangle.b;
    }

    get c() {
        return this.triangle.c;
    }

    get d() {
        if (!(this.#cache['d'])) {
            this.#cache['d'] = this.b.add(this.c).div(2);
        }
        return this.#cache['d'];
    }

    get h() {
        if (!(this.#cache['h'])) {
            this.#cache['h'] = this.constructor.bisect(this.b, this.a, this.c);
        }
        return this.#cache['h'];
    }

    get dPerp() {
        if (!(this.#cache['dPerp'])) {
            this.#cache['dPerp'] = this.constructor.perpendicular(this.d, this.c);
        }
        return this.#cache['dPerp'];
    }

    get q() {
        if (!(this.#cache['q'])) {
            if (this.b.sub(this.a).abs() > this.c.sub(this.a).abs()) {
                this.#cache['q'] = this.b;
            } else {
                this.#cache['q'] = this.c;
            }
        }
        return this.#cache['q'];
    }

    get p() {
        if (!(this.#cache['p'])) {
            if (this.isFake > 1) {
                let p = this.constructor.intersect(this.a, this.h, this.d, this.dPerp);
                this.#cache['p'] = this.a.add(p.sub(this.a).div(2));
            } else if (this.isFake) {
                let p = this.constructor.intersect(this.d, this.dPerp, this.a, this.q);
                this.#cache['p'] = this.d.add(p.sub(this.d).div(4));
            } else {
                this.#cache['p'] = this.constructor.intersect(
                    this.a, this.h, this.d, this.dPerp);
            }
        }
        return this.#cache['p'];
    }

    get e() {
        if (!(this.#cache['e'])) {
            this.#cache['e'] = this.tPCA.altitude[1];
        }
        return this.#cache['e'];
    }

    get f() {
        if (!(this.#cache['f'])) {
            this.#cache['f'] = this.tPAB.altitude[1];
        }
        return this.#cache['f'];
    }

    get tPCA() {
        if (!(this.#cache['tPCA'])) {
            this.#cache['tPCA'] = new Triangle(this.p, this.c, this.a);
        }
        return this.#cache['tPCA'];
    }

    get tPAB() {
        if (!(this.#cache['tPAB'])) {
            this.#cache['tPAB'] = new Triangle(this.p, this.a, this.b);
        }
        return this.#cache['tPAB'];
    }

    get tAFP() {
        if (!(this.#cache['tAFP'])) {
            this.#cache['tAFP'] = new Triangle(this.a, this.f, this.p);
        }
        return this.#cache['tAFP'];
    }

    get tAPE() {
        if (!(this.#cache['tAPE'])) {
            this.#cache['tAPE'] = new Triangle(this.a, this.p, this.e);
        }
        return this.#cache['tAPE'];
    }

    get tBPD() {
        if (!(this.#cache['tBPD'])) {
            this.#cache['tBPD'] = new Triangle(this.b, this.p, this.d);
        }
        return this.#cache['tBPD'];
    }
    
    get tCDP() {
        if (!(this.#cache['tCDP'])) {
            this.#cache['tCDP'] = new Triangle(this.c, this.d, this.p);
        }
        return this.#cache['tCDP'];
    }

    get tBFP() {
        if (!(this.#cache['tBFP'])) {
            this.#cache['tBFP'] = new Triangle(this.b, this.f, this.p);
        }
        return this.#cache['tBFP'];
    }

    get tCEP() {
        if (!(this.#cache['tCEP'])) {
            this.#cache['tCEP'] = new Triangle(this.c, this.e, this.p);
        }
        return this.#cache['tCEP'];
    }
}
