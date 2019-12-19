/**
Credit: https://jsdo.it/akm2/ldtm
**/

var JSX = {};
(function () {

/**
 * copies the implementations from source interface to target
 */
function $__jsx_merge_interface(target, source) {
	for (var k in source.prototype)
		if (source.prototype.hasOwnProperty(k))
			target.prototype[k] = source.prototype[k];
}

/**
 * defers the initialization of the property
 */
function $__jsx_lazy_init(obj, prop, func) {
	function reset(obj, prop, value) {
		delete obj[prop];
		obj[prop] = value;
		return value;
	}

	Object.defineProperty(obj, prop, {
		get: function () {
			return reset(obj, prop, func());
		},
		set: function (v) {
			reset(obj, prop, v);
		},
		enumerable: true,
		configurable: true
	});
}

/**
 * sideeffect().a /= b
 */
function $__jsx_div_assign(obj, prop, divisor) {
	return obj[prop] = (obj[prop] / divisor) | 0;
}

/*
 * global functions called by JSX
 * (enamed so that they do not conflict with local variable names)
 */
var $__jsx_parseInt = parseInt;
var $__jsx_parseFloat = parseFloat;
var $__jsx_isNaN = isNaN;
var $__jsx_isFinite = isFinite;

var $__jsx_encodeURIComponent = encodeURIComponent;
var $__jsx_decodeURIComponent = decodeURIComponent;
var $__jsx_encodeURI = encodeURI;
var $__jsx_decodeURI = decodeURI;

var $__jsx_ObjectToString = Object.prototype.toString;
var $__jsx_ObjectHasOwnProperty = Object.prototype.hasOwnProperty;

/*
 * profiler object, initialized afterwards
 */
function $__jsx_profiler() {
}

/*
 * public interface to JSX code
 */
JSX.require = function (path) {
	var m = $__jsx_classMap[path];
	return m !== undefined ? m : null;
};

JSX.profilerIsRunning = function () {
	return $__jsx_profiler.getResults != null;
};

JSX.getProfileResults = function () {
	return ($__jsx_profiler.getResults || function () { return {}; })();
};

JSX.postProfileResults = function (url) {
	if ($__jsx_profiler.postResults == null)
		throw new Error("profiler has not been turned on");
	return $__jsx_profiler.postResults(url);
};
/**
 * class Config extends Object
 * @constructor
 */
function Config() {
}

Config.prototype = new Object;
/**
 * @constructor
 */
function Config$() {
};

Config$.prototype = new Config;

/**
 * class _Main extends Object
 * @constructor
 */
function _Main() {
}

_Main.prototype = new Object;
/**
 * @constructor
 */
function _Main$() {
};

_Main$.prototype = new _Main;

/**
 * @param {Array.<undefined|!string>} args
 */
_Main.main$AS = function (args) {
	/** @type {HTMLCanvasElement} */
	var canvas;
	/** @type {HTMLElement} */
	var b;
	/** @type {Element} */
	var d;
	/** @type {Dragon} */
	var dragon;
	canvas = (function (o) { return o instanceof HTMLCanvasElement ? o : null; })(dom.window.document.getElementById('c'));
	b = dom.window.document.body;
	d = dom.window.document.documentElement;
	canvas.width = 1000;
	canvas.height = 500;
	dragon = new Dragon$NN(canvas.width, canvas.height);
	dragon.context = (function (o) { return o instanceof CanvasRenderingContext2D ? o : null; })(canvas.getContext('2d'));
	dragon.context.lineWidth = 0.8;
	dragon.context.strokeStyle = 'hsla(21, 100%, 80%, 0.9)';
	dragon.context.globalCompositeOperation = 'lighter';
	dom.window.document.addEventListener('click', (function (e) {
		if (dragon.power > 0.8) {
			dragon.power = 0;
		} else {
			if (dragon.power === 0) {
				dragon.power = 0.3;
			}
		}
	}), false);
	Timer$setInterval$F$V$I((function () {
		dragon.update$();
		dragon.draw$();
	}), 1000 / 60);
};

var _Main$main$AS = _Main.main$AS;

/**
 * class Dragon extends Object
 * @constructor
 */
function Dragon() {
}

Dragon.prototype = new Object;
/**
 * @constructor
 * @param {!number} width
 * @param {!number} height
 */
function Dragon$NN(width, height) {
	/** @type {!number} */
	var i;
	/** @type {!number} */
	var len;
	/** @type {Particle} */
	var p;
	this.sparks = null;
	this.power = 0.3;
	this.currentWind = 0;
	this.targetWind = 0;
	this.context = null;
	this.width = (width | 0);
	this.height = (height | 0);
	this.particles = [  ];
	for ((i = 0, len = Config.COUNT); i < len; i++) {
		p = new Particle$();
		this._reborn$LParticle$(p);
		this.particles.push(p);
	}
	this.sparks = [  ];
	this.targetWind = Math.random() * Config.WIND * 2 - Config.WIND;
};

Dragon$NN.prototype = new Dragon;

/**
 * @param {Particle} p
 */
Dragon.prototype._reborn$LParticle$ = function (p) {
	/** @type {!number} */
	var t;
	/** @type {!number} */
	var s;
	/** @type {!number} */
	var c;
	/** @type {!number} */
	var l;
	p.x = p.px = this.width * 0.5 | 0;
	p.y = p.py = this.height;
	t = Math.random() * 0.08 - 0.04;
	s = 1 - (t >= 0 ? t : - t) * 5;
	c = Math.PI * (1.5 + t);
	l = (Math.random() * 15 + 25) * s;
	p.vx = l * Math.cos(c) * this.power;
	p.vy = l * Math.sin(c) * this.power;
	p.age = 0;
	p.life = Config.LIFE * (Math.random() * 0.5 + 0.5) * this.power;
};

/**
 */
Dragon.prototype.update$ = function () {
	var $math_abs_t;
	/** @type {!number} */
	var wind;
	/** @type {!boolean} */
	var sparked;
	/** @type {Spark} */
	var s;
	/** @type {!number} */
	var sx;
	/** @type {!number} */
	var sy;
	/** @type {!number} */
	var i;
	/** @type {!number} */
	var len;
	/** @type {Particle} */
	var p;
	/** @type {Array.<undefined|Spark>} */
	var sparks;
	if (this.power !== 1) {
		if (this.power < 1) {
			this.power *= 1.02;
		}
		if (this.power > 1) {
			this.power = 1;
		}
	}
	this.currentWind += (this.targetWind - this.currentWind) * 0.03;
	if ((($math_abs_t = this.targetWind - this.currentWind) >= 0 ? $math_abs_t : -$math_abs_t) < 0.005) {
		this.targetWind = Math.random() * Config.WIND * 2 - Config.WIND;
	}
	wind = this.currentWind * this.power;
	sparked = false;
	for ((i = 0, len = this.particles.length); i < len; i++) {
		p = this.particles[i];
		p.vx += wind;
		p.vy += Config.GRAVITY;
		p.px = p.x;
		p.py = p.y;
		p.x += p.vx;
		p.y += p.vy;
		p.age += 1;
		if (p.age > p.life || p.x > this.width || p.x < 0 || p.y > this.height) {
			this._reborn$LParticle$(p);
			continue;
		}
		if (Math.random() < 0.0008 && p.age > p.life * 0.5 && this.power > 0.8 && ! sparked) {
			s = Spark$get$();
			sx = p.x + Math.random() * 200 - 100;
			sy = p.y + Math.random() * 100 - 50;
			s.init$NN(sx, sy);
			this.sparks.push(s);
			sparked = true;
		}
	}
	sparks = this.sparks;
	if (len = sparks.length) {
		for (i = 0; i < len; i++) {
			s = sparks[i];
			s.update$();
			if (s.completed) {
				Spark$release$LSpark$(s);
				sparks.splice(i, 1);
				len--;
				i--;
			}
		}
	}
};

/**
 */
Dragon.prototype.draw$ = function () {
	/** @type {CanvasRenderingContext2D} */
	var ctx;
	/** @type {Array.<undefined|Particle>} */
	var particles;
	/** @type {Array.<undefined|Spark>} */
	var sparks;
	/** @type {!number} */
	var i;
	/** @type {!number} */
	var len;
	/** @type {Particle} */
	var p;
	ctx = this.context;
	ctx.save();
	ctx.globalCompositeOperation = 'source-over';
	ctx.fillStyle = 'rgba(0, 0, 0, ' + (Config.ALPHA + "") + ')';
	ctx.fillRect(0, 0, this.width, this.height);
	ctx.restore();
	particles = this.particles;
	sparks = this.sparks;
	ctx.beginPath();
	for ((i = 0, len = particles.length); i < len; ++ i) {
		p = particles[i];
		ctx.moveTo(p.px, p.py);
		ctx.lineTo(p.x, p.y);
	}
	if (len = sparks.length) {
		for (i = 0; i < len; i++) {
			sparks[i].drawLine$LCanvasRenderingContext2D$(ctx);
		}
	}
	ctx.stroke();
	ctx.save();
	ctx.beginPath();
	ctx.shadowBlur = 24;
	ctx.shadowColor = 'hsla(36, 100%, 70%, 0)';
	for ((i = 0, len = particles.length); i < len; ++ i) {
		p = particles[i];
		if (p.age > Config.LIFE * 0.5) {
			ctx.moveTo(p.x + 3, p.y);
			ctx.arc(p.x, p.y, 3, 0, Math.PI * 2, false);
		}
	}
	if (len = sparks.length) {
		for (i = 0; i < len; i++) {
			sparks[i].drawBlur$LCanvasRenderingContext2D$(ctx);
		}
	}
	ctx.fill();
	ctx.restore();
};

/**
 * class Spark extends Object
 * @constructor
 */
function Spark() {
}

Spark.prototype = new Object;
/**
 * @constructor
 */
function Spark$() {
	/** @type {!number} */
	var num;
	/** @type {!number} */
	var i;
	/** @type {Particle} */
	var p;
	this.x = 0;
	this.y = 0;
	this.completed = false;
	this.particles = [  ];
	num = Math.floor(Math.random() * 16) + 10;
	for (i = 0; i < num; i++) {
		p = new Particle$();
		this.particles.push(p);
	}
};

Spark$.prototype = new Spark;

/**
 * @return {Spark}
 */
Spark.get$ = function () {
	return (Spark._pool.length ? Spark._pool.shift() : new Spark$());
};

var Spark$get$ = Spark.get$;

/**
 * @param {Spark} s
 */
Spark.release$LSpark$ = function (s) {
	Spark._pool.push(s);
};

var Spark$release$LSpark$ = Spark.release$LSpark$;

/**
 * @param {!number} x
 * @param {!number} y
 */
Spark.prototype.init$NN = function (x, y) {
	/** @type {Array.<undefined|Particle>} */
	var particles;
	/** @type {!number} */
	var i;
	/** @type {!number} */
	var len;
	/** @type {Particle} */
	var p;
	this.x = x;
	this.y = y;
	particles = this.particles;
	for ((i = 0, len = particles.length); i < len; i++) {
		p = particles[i];
		this._reborn$LParticle$(p);
	}
	this.completed = false;
};

/**
 * @param {Particle} p
 */
Spark.prototype._reborn$LParticle$ = function (p) {
	/** @type {!number} */
	var c;
	/** @type {!number} */
	var l;
	p.x = p.px = this.x;
	p.y = p.py = this.y;
	c = Math.PI * 2 * Math.random();
	l = Math.random() * 10 + 5;
	p.vx = l * Math.cos(c);
	p.vy = l * Math.sin(c);
	p.age = 0;
	p.life = Config.SPARK_LIFE * (Math.random() * 0.5 + 0.5);
};

/**
 */
Spark.prototype.update$ = function () {
	/** @type {Array.<undefined|Particle>} */
	var particles;
	/** @type {!number} */
	var len;
	/** @type {!boolean} */
	var allCompleted;
	/** @type {!number} */
	var i;
	/** @type {Particle} */
	var p;
	particles = this.particles;
	len = particles.length;
	if (! len) {
		this.completed = true;
		return;
	}
	allCompleted = true;
	for (i = 0; i < len; i++) {
		p = particles[i];
		if (p.age > p.life) {
			continue;
		}
		p.vy += Config.GRAVITY;
		p.px = p.x;
		p.py = p.y;
		p.x += p.vx;
		p.y += p.vy;
		p.age += 1;
		allCompleted = false;
	}
	this.completed = allCompleted;
};

/**
 * @param {CanvasRenderingContext2D} ctx
 */
Spark.prototype.drawLine$LCanvasRenderingContext2D$ = function (ctx) {
	/** @type {Array.<undefined|Particle>} */
	var particles;
	/** @type {!number} */
	var i;
	/** @type {!number} */
	var len;
	/** @type {Particle} */
	var p;
	particles = this.particles;
	for ((i = 0, len = particles.length); i < len; ++ i) {
		p = particles[i];
		if (p.age > p.life) {
			continue;
		}
		ctx.moveTo(p.px, p.py);
		ctx.lineTo(p.x, p.y);
	}
};

/**
 * @param {CanvasRenderingContext2D} ctx
 */
Spark.prototype.drawBlur$LCanvasRenderingContext2D$ = function (ctx) {
	/** @type {Array.<undefined|Particle>} */
	var particles;
	/** @type {!number} */
	var i;
	/** @type {!number} */
	var len;
	/** @type {Particle} */
	var p;
	particles = this.particles;
	for ((i = 0, len = particles.length); i < len; ++ i) {
		p = particles[i];
		if (p.age > p.life) {
			continue;
		}
		ctx.moveTo(p.x + 3, p.y);
		ctx.arc(p.x, p.y, 3, 0, Math.PI * 2, false);
	}
};

/**
 * class Particle extends Object
 * @constructor
 */
function Particle() {
}

Particle.prototype = new Object;
/**
 * @constructor
 */
function Particle$() {
	this.x = 0;
	this.y = 0;
	this.px = 0;
	this.py = 0;
	this.vx = 0;
	this.vy = 0;
	this.life = 0;
	this.age = 0;
};

Particle$.prototype = new Particle;

/**
 * class dom extends Object
 * @constructor
 */
function dom() {
}

dom.prototype = new Object;
/**
 * @constructor
 */
function dom$() {
};

dom$.prototype = new dom;

/**
 * @param {!string} id
 * @return {HTMLElement}
 */
dom.id$S = function (id) {
	return (function (o) { return o instanceof HTMLElement ? o : null; })(dom.window.document.getElementById(id));
};

var dom$id$S = dom.id$S;

/**
 * @param {!string} id
 * @return {HTMLElement}
 */
dom.getElementById$S = function (id) {
	return (function (o) { return o instanceof HTMLElement ? o : null; })(dom.window.document.getElementById(id));
};

var dom$getElementById$S = dom.getElementById$S;

/**
 * @param {!string} tag
 * @return {HTMLElement}
 */
dom.createElement$S = function (tag) {
	return (function (v) {
		if (! (v == null || v instanceof HTMLElement)) {
			debugger;
			throw new Error("[/usr/local/JSX/lib/js/js/web.jsx:30] detected invalid cast, value is not an instance of the designated type or null");
		}
		return v;
	}(dom.window.document.createElement(tag)));
};

var dom$createElement$S = dom.createElement$S;

/**
 * class TimerHandle extends Object
 * @constructor
 */
function TimerHandle() {
}

TimerHandle.prototype = new Object;
/**
 * @constructor
 */
function TimerHandle$() {
};

TimerHandle$.prototype = new TimerHandle;

/**
 * class Timer extends Object
 * @constructor
 */
function Timer() {
}

Timer.prototype = new Object;
/**
 * @constructor
 */
function Timer$() {
};

Timer$.prototype = new Timer;

/**
 * @param {!number} milliseconds
 * @return {TimerHandle}
 */
Timer.setTimeout$F$V$I = function (listener, milliseconds) {
	var setTimeout;
	setTimeout = (function (o) { return typeof(o) === "function" ? o : null; })(js.global.setTimeout);
	return setTimeout(listener, milliseconds);
};

var Timer$setTimeout$F$V$I = Timer.setTimeout$F$V$I;

/**
 * @param {TimerHandle} timerID
 */
Timer.clearTimeout$LTimerHandle$ = function (timerID) {
	var clearTimeout;
	clearTimeout = (function (o) { return typeof(o) === "function" ? o : null; })(js.global.clearTimeout);
	clearTimeout(timerID);
};

var Timer$clearTimeout$LTimerHandle$ = Timer.clearTimeout$LTimerHandle$;

/**
 * @param {!number} milliseconds
 * @return {TimerHandle}
 */
Timer.setInterval$F$V$I = function (listener, milliseconds) {
	var setInterval;
	setInterval = (function (o) { return typeof(o) === "function" ? o : null; })(js.global.setInterval);
	return setInterval(listener, milliseconds);
};

var Timer$setInterval$F$V$I = Timer.setInterval$F$V$I;

/**
 * @param {TimerHandle} timerID
 */
Timer.clearInterval$LTimerHandle$ = function (timerID) {
	var clearInterval;
	clearInterval = (function (o) { return typeof(o) === "function" ? o : null; })(js.global.clearInterval);
	clearInterval(timerID);
};

var Timer$clearInterval$LTimerHandle$ = Timer.clearInterval$LTimerHandle$;

/**
 * class js extends Object
 * @constructor
 */
function js() {
}

js.prototype = new Object;
/**
 * @constructor
 */
function js$() {
};

js$.prototype = new js;

Config.COUNT = 75;
Config.GRAVITY = 1.2;
Config.ALPHA = 0;
Config.WIND = 0.25;
Config.LIFE = 32;
Config.SPARK_LIFE = 2;
$__jsx_lazy_init(Spark, "_pool", function () {
	return [  ];
});
$__jsx_lazy_init(dom, "window", function () {
	return js.global.window;
});
js.global = (function () { return this; })();

var $__jsx_classMap = {
	"/tmp/ZcuYiobsvR.jsx": {
		Config: Config,
		Config$: Config$,
		_Main: _Main,
		_Main$: _Main$,
		Dragon: Dragon,
		Dragon$NN: Dragon$NN,
		Spark: Spark,
		Spark$: Spark$,
		Particle: Particle,
		Particle$: Particle$
	},
	"system:lib/js/js/web.jsx": {
		dom: dom,
		dom$: dom$
	},
	"system:lib/js/timer.jsx": {
		TimerHandle: TimerHandle,
		TimerHandle$: TimerHandle$,
		Timer: Timer,
		Timer$: Timer$
	},
	"system:lib/js/js.jsx": {
		js: js,
		js$: js$
	}
};


/**
 * launches _Main.main(:string[]):void invoked by jsx --run|--executable
 */
JSX.runMain = function (sourceFile, args) {
	var module = JSX.require(sourceFile);

	if (! module._Main) {
		throw new Error("entry point _Main not found in " + sourceFile);
	}
	if (! module._Main.main$AS) {
		throw new Error("entry point _Main.main(:string[]):void not found in " + sourceFile);
	}
	module._Main.main$AS(args);
};

/**
 * launches _Test#test*():void invoked by jsx --test
 */
JSX.runTests = function (sourceFile, tests) {
	var module = JSX.require(sourceFile);
	var testClass = module._Test$;

	if (!testClass) return; // skip if there's no test class

	if(tests.length === 0) {
		var p = testClass.prototype;
		for (var m in p) {
			if (p[m] instanceof Function
				&& /^test.*[$]$/.test(m)) {
				tests.push(m);
			}
		}
	}

	var test = new testClass();

	if (test.beforeClass$AS != null)
		test.beforeClass$AS(tests);

	for (var i = 0; i < tests.length; ++i) {
		(function (m) {
			test.run$SF$V$(m, function() { test[m](); });
		}(tests[i]));
	}

	if (test.afterClass$ != null)
		test.afterClass$();
};
/**
 * call a function on load/DOMContentLoaded
 */
function $__jsx_onload (event) {
	window.removeEventListener("load", $__jsx_onload);
	document.removeEventListener("DOMContentLoaded", $__jsx_onload);
	JSX.runMain("/tmp/ZcuYiobsvR.jsx", [])
}

window.addEventListener("load", $__jsx_onload);
document.addEventListener("DOMContentLoaded", $__jsx_onload);

})();
