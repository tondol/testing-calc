(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var r = require('rationals');
var Operator;
(function (Operator) {
    Operator[Operator["Plus"] = 0] = "Plus";
    Operator[Operator["Minus"] = 1] = "Minus";
    Operator[Operator["Multiply"] = 2] = "Multiply";
    Operator[Operator["Divide"] = 3] = "Divide";
})(Operator || (Operator = {}));
var State;
(function (State) {
    State[State["Init"] = 0] = "Init";
    State[State["Process"] = 1] = "Process";
    State[State["Result"] = 2] = "Result";
})(State || (State = {}));
var Calc = (function () {
    function Calc(selector) {
        this.selector = selector;
        this.clear();
        this.apply();
    }
    Calc.prototype.clear = function () {
        this.expression = '';
        this.state = 0 /* Init */;
        this.apply();
    };
    Calc.prototype.equal = function () {
        this.expression = this.eval().toString().replace(/\/1$/, '');
        this.state = 2 /* Result */;
        this.apply();
    };
    Calc.prototype.putOperator = function (operator) {
        this.expression += operator;
        this.state = 1 /* Process */;
        this.apply();
    };
    Calc.prototype.putDigit = function (d) {
        if (this.state == 2 /* Result */) {
            this.expression = '';
        }
        this.expression += d.toString();
        this.state = 1 /* Process */;
        this.apply();
    };
    Calc.prototype.apply = function () {
        this.selector.val(this.expression);
    };
    Calc.prototype.isDigit = function (e, i) {
        return e.charCodeAt(i) >= '0'.charCodeAt(0) && e.charCodeAt(i) <= '9'.charCodeAt(0);
    };
    Calc.prototype.toDigit = function (e, i) {
        return e.charCodeAt(i) - '0'.charCodeAt(0);
    };
    Calc.prototype.evalNumber = function (e, i) {
        var n = 0;
        while (this.isDigit(e, i)) {
            n = n * 10 + this.toDigit(e, i);
            i++;
        }
        return [r(n), i];
    };
    Calc.prototype.evalTerm = function (e, i) {
        if (e.charAt(i) == '(') {
            var tuple = this.evalExpression(e, i + 1);
            tuple[1]++;
            return tuple;
        }
        else {
            return this.evalNumber(e, i);
        }
    };
    Calc.prototype.evalFactor = function (e, i) {
        var left = this.evalTerm(e, i);
        while (e.charAt(left[1]) == '*' || e.charAt(left[1]) == '/') {
            if (e.charAt(left[1]) == '*') {
                var right = this.evalTerm(e, left[1] + 1);
                left[0] = left[0].mul(right[0]);
                left[1] = right[1];
            }
            else {
                var right = this.evalTerm(e, left[1] + 1);
                left[0] = left[0].div(right[0]);
                left[1] = right[1];
            }
        }
        return left;
    };
    Calc.prototype.evalExpression = function (e, i) {
        var left = this.evalFactor(e, i);
        while (e.charAt(left[1]) == '+' || e.charAt(left[1]) == '-') {
            if (e.charAt(left[1]) == '+') {
                var right = this.evalFactor(e, left[1] + 1);
                left[0] = left[0].add(right[0]);
                left[1] = right[1];
            }
            else {
                var right = this.evalFactor(e, left[1] + 1);
                left[0] = left[0].sub(right[0]);
                left[1] = right[1];
            }
        }
        return left;
    };
    Calc.prototype.eval = function () {
        var tuple = this.evalExpression(this.expression, 0);
        return tuple[0];
    };
    return Calc;
})();
$(function () {
    var calc = new Calc($('#result'));
    $('#btn-0').click(function () {
        calc.putDigit(0);
        return false;
    });
    $('#btn-1').click(function () {
        calc.putDigit(1);
        return false;
    });
    $('#btn-2').click(function () {
        calc.putDigit(2);
        return false;
    });
    $('#btn-3').click(function () {
        calc.putDigit(3);
        return false;
    });
    $('#btn-4').click(function () {
        calc.putDigit(4);
        return false;
    });
    $('#btn-5').click(function () {
        calc.putDigit(5);
        return false;
    });
    $('#btn-6').click(function () {
        calc.putDigit(6);
        return false;
    });
    $('#btn-7').click(function () {
        calc.putDigit(7);
        return false;
    });
    $('#btn-8').click(function () {
        calc.putDigit(8);
        return false;
    });
    $('#btn-9').click(function () {
        calc.putDigit(9);
        return false;
    });
    $('#btn-plus').click(function () {
        calc.putOperator('+');
        return false;
    });
    $('#btn-minus').click(function () {
        calc.putOperator('-');
        return false;
    });
    $('#btn-multiply').click(function () {
        calc.putOperator('*');
        return false;
    });
    $('#btn-divide').click(function () {
        calc.putOperator('/');
        return false;
    });
    $('#btn-equal').click(function () {
        calc.equal();
        return false;
    });
    $('#btn-clear').click(function () {
        calc.clear();
        $('#btn-equal').focus();
        return false;
    });
    $('#btn-left').click(function () {
        calc.putOperator('(');
        return false;
    });
    $('#btn-right').click(function () {
        calc.putOperator(')');
        return false;
    });
    $(document).keypress(function (e) {
        switch (e.keyCode) {
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
                calc.putDigit(e.keyCode - 48);
                break;
            case 43:
                calc.putOperator('+');
                break;
            case 45:
                calc.putOperator('-');
                break;
            case 42:
                calc.putOperator('*');
                break;
            case 47:
                calc.putOperator('/');
                break;
            case 13:
            case 61:
                calc.equal();
                break;
            case 40:
                calc.putOperator('(');
                break;
            case 41:
                calc.putOperator(')');
                break;
        }
    });
    $('#btn-equal').focus();
});

},{"rationals":2}],2:[function(require,module,exports){
void function(root){
    "use strict"

    var numbers = {}
        , u = require('totemizer')
        , viral = require('viral')
        , rational
        , apply = u.liberate(Function.prototype.apply)
        , big = require('biginteger').BigInteger
        ;


    function checkInput(input){ return (input && input.init ===  rational.init) ? input : rat(input) }

    function gcd(a, b){
        var t;
        a = a.abs()
        b = b.abs()
        while (b.isPositive()) {
            t = b
            b = a.remainder(b)
            a = t
        }
        return a
    }

    function compare(a, b){ return a[0].multiply(b[1]).compare(a[1].multiply(b[0])) }

    function compareAbs(a, b){ return a[0].multiply(b[1]).compareAbs(a[1].multiply(b[0])) }

    function lcm(a, b){ return (a.multiply(b)).abs().divide(gcd(a,b)) }

    function hashify(r){ return r[0]+'/'+r[1] }

    function display(r){ return ''+r[0]+(r[1]!=1?'/'+r[1]:'') }

    function val(r){ return r[0].toJSValue()/r[1].toJSValue() }

    function add(x, y){ return rat(x[0].multiply(y[1]).add(y[0].multiply(x[1])), x[1].multiply(y[1])) }

    function subtract(x, y){ return rat(x[0].multiply(y[1]).subtract(y[0].multiply(x[1])), x[1].multiply(y[1])) }

    function multiply(x, y){ return rat(x[0].multiply(y[0]), x[1].multiply(y[1])) }

    function divide(x, y){ return rat(x[0].multiply(y[1]), x[1].multiply(y[0])) }

    rational = viral.extend({
        init : function(numerator, denominator){
            this[0] = numerator
            this[1] = denominator
        }
        , toString : u.enslave(hashify)
        , display : u.enslave(display)

        , val : u.enslave(val)

        , add : u.enslave(add)
        , plus : u.enslave(add)

        , subtract : u.enslave(subtract)
        , minus : u.enslave(subtract)
        , sub: u.enslave(subtract)

        , multiply : u.enslave(multiply)
        , times : u.enslave(multiply)
        , mul: u.enslave(multiply)

        , divide : u.enslave(divide)
        , per : u.enslave(divide)
        , div: u.enslave(divide)

        , compare : u.enslave(compare)
        , compareAbs : u.enslave(compareAbs)

    })


    function rat(numerator, denominator){

        var index, divisor, dendecimals = 0, numdecimals = 0

        if ( typeof numerator != 'number' && typeof numerator != 'string'
                && (! u.isInt(numerator)) ) {
            throw new Error('invalid argument '+numerator+' ('+(typeof numerator)+')')
        }
        if ( typeof denominator != 'number' && typeof denominator != 'string'
                && (! u.isInt(denominator)) ) {
            denominator = 1
        }
        numerator = numerator+''
        denominator = denominator+''

        if ( numerator.indexOf('.') > -1 ) {
            numdecimals = Math.pow(10, numerator.length - numerator.indexOf('.') - 1)
            numerator = numerator.split('.').join('')
        }

        if ( denominator.indexOf('.') > -1 ) {
            dendecimals = Math.pow(10, denominator.length - denominator.indexOf('.') - 1)
            denominator = denominator.split('.').join('')
        }

        denominator = big.parse(denominator)
        numerator = big.parse(numerator)

        if ( dendecimals > 0 ) {
            numerator = numerator.multiply(dendecimals)
        }

        if ( numdecimals > 0 ) {
            denominator = denominator.multiply(numdecimals)
        }

        if ( denominator.isZero() ) {

            if ( ! numerator.isZero() ) numerator = big.ONE

        } else {

            divisor = gcd(numerator, denominator)
            if ( ! divisor.isUnit()  ) {
                numerator = numerator.divide(divisor)
                denominator = denominator.divide(divisor)
            }

            if ( denominator.isNegative() ) {
                numerator = numerator.negate()
                denominator = denominator.negate()
            }
        }

        index = hashify([numerator, denominator])

        if ( numbers[index] === undefined ) {
            numbers[index] = rational.make(numerator, denominator)
        }

        return numbers[index]

    }

    rat.checkInput = checkInput
    rat.gcd = function(a, b){ return rat(gcd(a[0],b[0]), lcm(a[1],b[1])) }
    rat.lcm = function(a, b){ return rat(lcm(a[0],b[0]), gcd(a[1],b[1])) }
    rat.add = add
    rat.div = divide
    rat.sub = subtract
    rat.mul = multiply

    if ( typeof module !== 'undefined' && module.exports ) {
        module.exports = rat
    } else {
        root.factory = rat
    }

}(this)

},{"biginteger":3,"totemizer":4,"viral":7}],3:[function(require,module,exports){
/*
	JavaScript BigInteger library version 0.9
	http://silentmatt.com/biginteger/

	Copyright (c) 2009 Matthew Crumley <email@matthewcrumley.com>
	Copyright (c) 2010,2011 by John Tobey <John.Tobey@gmail.com>
	Licensed under the MIT license.

	Support for arbitrary internal representation base was added by
	Vitaly Magerya.
*/

/*
	File: biginteger.js

	Exports:

		<BigInteger>
*/
(function(exports) {
"use strict";
/*
	Class: BigInteger
	An arbitrarily-large integer.

	<BigInteger> objects should be considered immutable. None of the "built-in"
	methods modify *this* or their arguments. All properties should be
	considered private.

	All the methods of <BigInteger> instances can be called "statically". The
	static versions are convenient if you don't already have a <BigInteger>
	object.

	As an example, these calls are equivalent.

	> BigInteger(4).multiply(5); // returns BigInteger(20);
	> BigInteger.multiply(4, 5); // returns BigInteger(20);

	> var a = 42;
	> var a = BigInteger.toJSValue("0b101010"); // Not completely useless...
*/

var CONSTRUCT = {}; // Unique token to call "private" version of constructor

/*
	Constructor: BigInteger()
	Convert a value to a <BigInteger>.

	Although <BigInteger()> is the constructor for <BigInteger> objects, it is
	best not to call it as a constructor. If *n* is a <BigInteger> object, it is
	simply returned as-is. Otherwise, <BigInteger()> is equivalent to <parse>
	without a radix argument.

	> var n0 = BigInteger();      // Same as <BigInteger.ZERO>
	> var n1 = BigInteger("123"); // Create a new <BigInteger> with value 123
	> var n2 = BigInteger(123);   // Create a new <BigInteger> with value 123
	> var n3 = BigInteger(n2);    // Return n2, unchanged

	The constructor form only takes an array and a sign. *n* must be an
	array of numbers in little-endian order, where each digit is between 0
	and BigInteger.base.  The second parameter sets the sign: -1 for
	negative, +1 for positive, or 0 for zero. The array is *not copied and
	may be modified*. If the array contains only zeros, the sign parameter
	is ignored and is forced to zero.

	> new BigInteger([5], -1): create a new BigInteger with value -5

	Parameters:

		n - Value to convert to a <BigInteger>.

	Returns:

		A <BigInteger> value.

	See Also:

		<parse>, <BigInteger>
*/
function BigInteger(n, s, token) {
	if (token !== CONSTRUCT) {
		if (n instanceof BigInteger) {
			return n;
		}
		else if (typeof n === "undefined") {
			return ZERO;
		}
		return BigInteger.parse(n);
	}

	n = n || [];  // Provide the nullary constructor for subclasses.
	while (n.length && !n[n.length - 1]) {
		--n.length;
	}
	this._d = n;
	this._s = n.length ? (s || 1) : 0;
}

BigInteger._construct = function(n, s) {
	return new BigInteger(n, s, CONSTRUCT);
};

// Base-10 speedup hacks in parse, toString, exp10 and log functions
// require base to be a power of 10. 10^7 is the largest such power
// that won't cause a precision loss when digits are multiplied.
var BigInteger_base = 10000000;
var BigInteger_base_log10 = 7;

BigInteger.base = BigInteger_base;
BigInteger.base_log10 = BigInteger_base_log10;

var ZERO = new BigInteger([], 0, CONSTRUCT);
// Constant: ZERO
// <BigInteger> 0.
BigInteger.ZERO = ZERO;

var ONE = new BigInteger([1], 1, CONSTRUCT);
// Constant: ONE
// <BigInteger> 1.
BigInteger.ONE = ONE;

var M_ONE = new BigInteger(ONE._d, -1, CONSTRUCT);
// Constant: M_ONE
// <BigInteger> -1.
BigInteger.M_ONE = M_ONE;

// Constant: _0
// Shortcut for <ZERO>.
BigInteger._0 = ZERO;

// Constant: _1
// Shortcut for <ONE>.
BigInteger._1 = ONE;

/*
	Constant: small
	Array of <BigIntegers> from 0 to 36.

	These are used internally for parsing, but useful when you need a "small"
	<BigInteger>.

	See Also:

		<ZERO>, <ONE>, <_0>, <_1>
*/
BigInteger.small = [
	ZERO,
	ONE,
	/* Assuming BigInteger_base > 36 */
	new BigInteger( [2], 1, CONSTRUCT),
	new BigInteger( [3], 1, CONSTRUCT),
	new BigInteger( [4], 1, CONSTRUCT),
	new BigInteger( [5], 1, CONSTRUCT),
	new BigInteger( [6], 1, CONSTRUCT),
	new BigInteger( [7], 1, CONSTRUCT),
	new BigInteger( [8], 1, CONSTRUCT),
	new BigInteger( [9], 1, CONSTRUCT),
	new BigInteger([10], 1, CONSTRUCT),
	new BigInteger([11], 1, CONSTRUCT),
	new BigInteger([12], 1, CONSTRUCT),
	new BigInteger([13], 1, CONSTRUCT),
	new BigInteger([14], 1, CONSTRUCT),
	new BigInteger([15], 1, CONSTRUCT),
	new BigInteger([16], 1, CONSTRUCT),
	new BigInteger([17], 1, CONSTRUCT),
	new BigInteger([18], 1, CONSTRUCT),
	new BigInteger([19], 1, CONSTRUCT),
	new BigInteger([20], 1, CONSTRUCT),
	new BigInteger([21], 1, CONSTRUCT),
	new BigInteger([22], 1, CONSTRUCT),
	new BigInteger([23], 1, CONSTRUCT),
	new BigInteger([24], 1, CONSTRUCT),
	new BigInteger([25], 1, CONSTRUCT),
	new BigInteger([26], 1, CONSTRUCT),
	new BigInteger([27], 1, CONSTRUCT),
	new BigInteger([28], 1, CONSTRUCT),
	new BigInteger([29], 1, CONSTRUCT),
	new BigInteger([30], 1, CONSTRUCT),
	new BigInteger([31], 1, CONSTRUCT),
	new BigInteger([32], 1, CONSTRUCT),
	new BigInteger([33], 1, CONSTRUCT),
	new BigInteger([34], 1, CONSTRUCT),
	new BigInteger([35], 1, CONSTRUCT),
	new BigInteger([36], 1, CONSTRUCT)
];

// Used for parsing/radix conversion
BigInteger.digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/*
	Method: toString
	Convert a <BigInteger> to a string.

	When *base* is greater than 10, letters are upper case.

	Parameters:

		base - Optional base to represent the number in (default is base 10).
		       Must be between 2 and 36 inclusive, or an Error will be thrown.

	Returns:

		The string representation of the <BigInteger>.
*/
BigInteger.prototype.toString = function(base) {
	base = +base || 10;
	if (base < 2 || base > 36) {
		throw new Error("illegal radix " + base + ".");
	}
	if (this._s === 0) {
		return "0";
	}
	if (base === 10) {
		var str = this._s < 0 ? "-" : "";
		str += this._d[this._d.length - 1].toString();
		for (var i = this._d.length - 2; i >= 0; i--) {
			var group = this._d[i].toString();
			while (group.length < BigInteger_base_log10) group = '0' + group;
			str += group;
		}
		return str;
	}
	else {
		var numerals = BigInteger.digits;
		base = BigInteger.small[base];
		var sign = this._s;

		var n = this.abs();
		var digits = [];
		var digit;

		while (n._s !== 0) {
			var divmod = n.divRem(base);
			n = divmod[0];
			digit = divmod[1];
			// TODO: This could be changed to unshift instead of reversing at the end.
			// Benchmark both to compare speeds.
			digits.push(numerals[digit.valueOf()]);
		}
		return (sign < 0 ? "-" : "") + digits.reverse().join("");
	}
};

// Verify strings for parsing
BigInteger.radixRegex = [
	/^$/,
	/^$/,
	/^[01]*$/,
	/^[012]*$/,
	/^[0-3]*$/,
	/^[0-4]*$/,
	/^[0-5]*$/,
	/^[0-6]*$/,
	/^[0-7]*$/,
	/^[0-8]*$/,
	/^[0-9]*$/,
	/^[0-9aA]*$/,
	/^[0-9abAB]*$/,
	/^[0-9abcABC]*$/,
	/^[0-9a-dA-D]*$/,
	/^[0-9a-eA-E]*$/,
	/^[0-9a-fA-F]*$/,
	/^[0-9a-gA-G]*$/,
	/^[0-9a-hA-H]*$/,
	/^[0-9a-iA-I]*$/,
	/^[0-9a-jA-J]*$/,
	/^[0-9a-kA-K]*$/,
	/^[0-9a-lA-L]*$/,
	/^[0-9a-mA-M]*$/,
	/^[0-9a-nA-N]*$/,
	/^[0-9a-oA-O]*$/,
	/^[0-9a-pA-P]*$/,
	/^[0-9a-qA-Q]*$/,
	/^[0-9a-rA-R]*$/,
	/^[0-9a-sA-S]*$/,
	/^[0-9a-tA-T]*$/,
	/^[0-9a-uA-U]*$/,
	/^[0-9a-vA-V]*$/,
	/^[0-9a-wA-W]*$/,
	/^[0-9a-xA-X]*$/,
	/^[0-9a-yA-Y]*$/,
	/^[0-9a-zA-Z]*$/
];

/*
	Function: parse
	Parse a string into a <BigInteger>.

	*base* is optional but, if provided, must be from 2 to 36 inclusive. If
	*base* is not provided, it will be guessed based on the leading characters
	of *s* as follows:

	- "0x" or "0X": *base* = 16
	- "0c" or "0C": *base* = 8
	- "0b" or "0B": *base* = 2
	- else: *base* = 10

	If no base is provided, or *base* is 10, the number can be in exponential
	form. For example, these are all valid:

	> BigInteger.parse("1e9");              // Same as "1000000000"
	> BigInteger.parse("1.234*10^3");       // Same as 1234
	> BigInteger.parse("56789 * 10 ** -2"); // Same as 567

	If any characters fall outside the range defined by the radix, an exception
	will be thrown.

	Parameters:

		s - The string to parse.
		base - Optional radix (default is to guess based on *s*).

	Returns:

		a <BigInteger> instance.
*/
BigInteger.parse = function(s, base) {
	// Expands a number in exponential form to decimal form.
	// expandExponential("-13.441*10^5") === "1344100";
	// expandExponential("1.12300e-1") === "0.112300";
	// expandExponential(1000000000000000000000000000000) === "1000000000000000000000000000000";
	function expandExponential(str) {
		str = str.replace(/\s*[*xX]\s*10\s*(\^|\*\*)\s*/, "e");

		return str.replace(/^([+\-])?(\d+)\.?(\d*)[eE]([+\-]?\d+)$/, function(x, s, n, f, c) {
			c = +c;
			var l = c < 0;
			var i = n.length + c;
			x = (l ? n : f).length;
			c = ((c = Math.abs(c)) >= x ? c - x + l : 0);
			var z = (new Array(c + 1)).join("0");
			var r = n + f;
			return (s || "") + (l ? r = z + r : r += z).substr(0, i += l ? z.length : 0) + (i < r.length ? "." + r.substr(i) : "");
		});
	}

	s = s.toString();
	if (typeof base === "undefined" || +base === 10) {
		s = expandExponential(s);
	}

	var prefixRE;
	if (typeof base === "undefined") {
		prefixRE = '0[xcb]';
	}
	else if (base == 16) {
		prefixRE = '0x';
	}
	else if (base == 8) {
		prefixRE = '0c';
	}
	else if (base == 2) {
		prefixRE = '0b';
	}
	else {
		prefixRE = '';
	}
	var parts = new RegExp('^([+\\-]?)(' + prefixRE + ')?([0-9a-z]*)(?:\\.\\d*)?$', 'i').exec(s);
	if (parts) {
		var sign = parts[1] || "+";
		var baseSection = parts[2] || "";
		var digits = parts[3] || "";

		if (typeof base === "undefined") {
			// Guess base
			if (baseSection === "0x" || baseSection === "0X") { // Hex
				base = 16;
			}
			else if (baseSection === "0c" || baseSection === "0C") { // Octal
				base = 8;
			}
			else if (baseSection === "0b" || baseSection === "0B") { // Binary
				base = 2;
			}
			else {
				base = 10;
			}
		}
		else if (base < 2 || base > 36) {
			throw new Error("Illegal radix " + base + ".");
		}

		base = +base;

		// Check for digits outside the range
		if (!(BigInteger.radixRegex[base].test(digits))) {
			throw new Error("Bad digit for radix " + base);
		}

		// Strip leading zeros, and convert to array
		digits = digits.replace(/^0+/, "").split("");
		if (digits.length === 0) {
			return ZERO;
		}

		// Get the sign (we know it's not zero)
		sign = (sign === "-") ? -1 : 1;

		// Optimize 10
		if (base == 10) {
			var d = [];
			while (digits.length >= BigInteger_base_log10) {
				d.push(parseInt(digits.splice(digits.length-BigInteger.base_log10, BigInteger.base_log10).join(''), 10));
			}
			d.push(parseInt(digits.join(''), 10));
			return new BigInteger(d, sign, CONSTRUCT);
		}

		// Do the conversion
		var d = ZERO;
		base = BigInteger.small[base];
		var small = BigInteger.small;
		for (var i = 0; i < digits.length; i++) {
			d = d.multiply(base).add(small[parseInt(digits[i], 36)]);
		}
		return new BigInteger(d._d, sign, CONSTRUCT);
	}
	else {
		throw new Error("Invalid BigInteger format: " + s);
	}
};

/*
	Function: add
	Add two <BigIntegers>.

	Parameters:

		n - The number to add to *this*. Will be converted to a <BigInteger>.

	Returns:

		The numbers added together.

	See Also:

		<subtract>, <multiply>, <quotient>, <next>
*/
BigInteger.prototype.add = function(n) {
	if (this._s === 0) {
		return BigInteger(n);
	}

	n = BigInteger(n);
	if (n._s === 0) {
		return this;
	}
	if (this._s !== n._s) {
		n = n.negate();
		return this.subtract(n);
	}

	var a = this._d;
	var b = n._d;
	var al = a.length;
	var bl = b.length;
	var sum = new Array(Math.max(al, bl) + 1);
	var size = Math.min(al, bl);
	var carry = 0;
	var digit;

	for (var i = 0; i < size; i++) {
		digit = a[i] + b[i] + carry;
		sum[i] = digit % BigInteger_base;
		carry = (digit / BigInteger_base) | 0;
	}
	if (bl > al) {
		a = b;
		al = bl;
	}
	for (i = size; carry && i < al; i++) {
		digit = a[i] + carry;
		sum[i] = digit % BigInteger_base;
		carry = (digit / BigInteger_base) | 0;
	}
	if (carry) {
		sum[i] = carry;
	}

	for ( ; i < al; i++) {
		sum[i] = a[i];
	}

	return new BigInteger(sum, this._s, CONSTRUCT);
};

/*
	Function: negate
	Get the additive inverse of a <BigInteger>.

	Returns:

		A <BigInteger> with the same magnatude, but with the opposite sign.

	See Also:

		<abs>
*/
BigInteger.prototype.negate = function() {
	return new BigInteger(this._d, (-this._s) | 0, CONSTRUCT);
};

/*
	Function: abs
	Get the absolute value of a <BigInteger>.

	Returns:

		A <BigInteger> with the same magnatude, but always positive (or zero).

	See Also:

		<negate>
*/
BigInteger.prototype.abs = function() {
	return (this._s < 0) ? this.negate() : this;
};

/*
	Function: subtract
	Subtract two <BigIntegers>.

	Parameters:

		n - The number to subtract from *this*. Will be converted to a <BigInteger>.

	Returns:

		The *n* subtracted from *this*.

	See Also:

		<add>, <multiply>, <quotient>, <prev>
*/
BigInteger.prototype.subtract = function(n) {
	if (this._s === 0) {
		return BigInteger(n).negate();
	}

	n = BigInteger(n);
	if (n._s === 0) {
		return this;
	}
	if (this._s !== n._s) {
		n = n.negate();
		return this.add(n);
	}

	var m = this;
	// negative - negative => -|a| - -|b| => -|a| + |b| => |b| - |a|
	if (this._s < 0) {
		m = new BigInteger(n._d, 1, CONSTRUCT);
		n = new BigInteger(this._d, 1, CONSTRUCT);
	}

	// Both are positive => a - b
	var sign = m.compareAbs(n);
	if (sign === 0) {
		return ZERO;
	}
	else if (sign < 0) {
		// swap m and n
		var t = n;
		n = m;
		m = t;
	}

	// a > b
	var a = m._d;
	var b = n._d;
	var al = a.length;
	var bl = b.length;
	var diff = new Array(al); // al >= bl since a > b
	var borrow = 0;
	var i;
	var digit;

	for (i = 0; i < bl; i++) {
		digit = a[i] - borrow - b[i];
		if (digit < 0) {
			digit += BigInteger_base;
			borrow = 1;
		}
		else {
			borrow = 0;
		}
		diff[i] = digit;
	}
	for (i = bl; i < al; i++) {
		digit = a[i] - borrow;
		if (digit < 0) {
			digit += BigInteger_base;
		}
		else {
			diff[i++] = digit;
			break;
		}
		diff[i] = digit;
	}
	for ( ; i < al; i++) {
		diff[i] = a[i];
	}

	return new BigInteger(diff, sign, CONSTRUCT);
};

(function() {
	function addOne(n, sign) {
		var a = n._d;
		var sum = a.slice();
		var carry = true;
		var i = 0;

		while (true) {
			var digit = (a[i] || 0) + 1;
			sum[i] = digit % BigInteger_base;
			if (digit <= BigInteger_base - 1) {
				break;
			}
			++i;
		}

		return new BigInteger(sum, sign, CONSTRUCT);
	}

	function subtractOne(n, sign) {
		var a = n._d;
		var sum = a.slice();
		var borrow = true;
		var i = 0;

		while (true) {
			var digit = (a[i] || 0) - 1;
			if (digit < 0) {
				sum[i] = digit + BigInteger_base;
			}
			else {
				sum[i] = digit;
				break;
			}
			++i;
		}

		return new BigInteger(sum, sign, CONSTRUCT);
	}

	/*
		Function: next
		Get the next <BigInteger> (add one).

		Returns:

			*this* + 1.

		See Also:

			<add>, <prev>
	*/
	BigInteger.prototype.next = function() {
		switch (this._s) {
		case 0:
			return ONE;
		case -1:
			return subtractOne(this, -1);
		// case 1:
		default:
			return addOne(this, 1);
		}
	};

	/*
		Function: prev
		Get the previous <BigInteger> (subtract one).

		Returns:

			*this* - 1.

		See Also:

			<next>, <subtract>
	*/
	BigInteger.prototype.prev = function() {
		switch (this._s) {
		case 0:
			return M_ONE;
		case -1:
			return addOne(this, -1);
		// case 1:
		default:
			return subtractOne(this, 1);
		}
	};
})();

/*
	Function: compareAbs
	Compare the absolute value of two <BigIntegers>.

	Calling <compareAbs> is faster than calling <abs> twice, then <compare>.

	Parameters:

		n - The number to compare to *this*. Will be converted to a <BigInteger>.

	Returns:

		-1, 0, or +1 if *|this|* is less than, equal to, or greater than *|n|*.

	See Also:

		<compare>, <abs>
*/
BigInteger.prototype.compareAbs = function(n) {
	if (this === n) {
		return 0;
	}

	if (!(n instanceof BigInteger)) {
		if (!isFinite(n)) {
			return(isNaN(n) ? n : -1);
		}
		n = BigInteger(n);
	}

	if (this._s === 0) {
		return (n._s !== 0) ? -1 : 0;
	}
	if (n._s === 0) {
		return 1;
	}

	var l = this._d.length;
	var nl = n._d.length;
	if (l < nl) {
		return -1;
	}
	else if (l > nl) {
		return 1;
	}

	var a = this._d;
	var b = n._d;
	for (var i = l-1; i >= 0; i--) {
		if (a[i] !== b[i]) {
			return a[i] < b[i] ? -1 : 1;
		}
	}

	return 0;
};

/*
	Function: compare
	Compare two <BigIntegers>.

	Parameters:

		n - The number to compare to *this*. Will be converted to a <BigInteger>.

	Returns:

		-1, 0, or +1 if *this* is less than, equal to, or greater than *n*.

	See Also:

		<compareAbs>, <isPositive>, <isNegative>, <isUnit>
*/
BigInteger.prototype.compare = function(n) {
	if (this === n) {
		return 0;
	}

	n = BigInteger(n);

	if (this._s === 0) {
		return -n._s;
	}

	if (this._s === n._s) { // both positive or both negative
		var cmp = this.compareAbs(n);
		return cmp * this._s;
	}
	else {
		return this._s;
	}
};

/*
	Function: isUnit
	Return true iff *this* is either 1 or -1.

	Returns:

		true if *this* compares equal to <BigInteger.ONE> or <BigInteger.M_ONE>.

	See Also:

		<isZero>, <isNegative>, <isPositive>, <compareAbs>, <compare>,
		<BigInteger.ONE>, <BigInteger.M_ONE>
*/
BigInteger.prototype.isUnit = function() {
	return this === ONE ||
		this === M_ONE ||
		(this._d.length === 1 && this._d[0] === 1);
};

/*
	Function: multiply
	Multiply two <BigIntegers>.

	Parameters:

		n - The number to multiply *this* by. Will be converted to a
		<BigInteger>.

	Returns:

		The numbers multiplied together.

	See Also:

		<add>, <subtract>, <quotient>, <square>
*/
BigInteger.prototype.multiply = function(n) {
	// TODO: Consider adding Karatsuba multiplication for large numbers
	if (this._s === 0) {
		return ZERO;
	}

	n = BigInteger(n);
	if (n._s === 0) {
		return ZERO;
	}
	if (this.isUnit()) {
		if (this._s < 0) {
			return n.negate();
		}
		return n;
	}
	if (n.isUnit()) {
		if (n._s < 0) {
			return this.negate();
		}
		return this;
	}
	if (this === n) {
		return this.square();
	}

	var r = (this._d.length >= n._d.length);
	var a = (r ? this : n)._d; // a will be longer than b
	var b = (r ? n : this)._d;
	var al = a.length;
	var bl = b.length;

	var pl = al + bl;
	var partial = new Array(pl);
	var i;
	for (i = 0; i < pl; i++) {
		partial[i] = 0;
	}

	for (i = 0; i < bl; i++) {
		var carry = 0;
		var bi = b[i];
		var jlimit = al + i;
		var digit;
		for (var j = i; j < jlimit; j++) {
			digit = partial[j] + bi * a[j - i] + carry;
			carry = (digit / BigInteger_base) | 0;
			partial[j] = (digit % BigInteger_base) | 0;
		}
		if (carry) {
			digit = partial[j] + carry;
			carry = (digit / BigInteger_base) | 0;
			partial[j] = digit % BigInteger_base;
		}
	}
	return new BigInteger(partial, this._s * n._s, CONSTRUCT);
};

// Multiply a BigInteger by a single-digit native number
// Assumes that this and n are >= 0
// This is not really intended to be used outside the library itself
BigInteger.prototype.multiplySingleDigit = function(n) {
	if (n === 0 || this._s === 0) {
		return ZERO;
	}
	if (n === 1) {
		return this;
	}

	var digit;
	if (this._d.length === 1) {
		digit = this._d[0] * n;
		if (digit >= BigInteger_base) {
			return new BigInteger([(digit % BigInteger_base)|0,
					(digit / BigInteger_base)|0], 1, CONSTRUCT);
		}
		return new BigInteger([digit], 1, CONSTRUCT);
	}

	if (n === 2) {
		return this.add(this);
	}
	if (this.isUnit()) {
		return new BigInteger([n], 1, CONSTRUCT);
	}

	var a = this._d;
	var al = a.length;

	var pl = al + 1;
	var partial = new Array(pl);
	for (var i = 0; i < pl; i++) {
		partial[i] = 0;
	}

	var carry = 0;
	for (var j = 0; j < al; j++) {
		digit = n * a[j] + carry;
		carry = (digit / BigInteger_base) | 0;
		partial[j] = (digit % BigInteger_base) | 0;
	}
	if (carry) {
		partial[j] = carry;
	}

	return new BigInteger(partial, 1, CONSTRUCT);
};

/*
	Function: square
	Multiply a <BigInteger> by itself.

	This is slightly faster than regular multiplication, since it removes the
	duplicated multiplcations.

	Returns:

		> this.multiply(this)

	See Also:
		<multiply>
*/
BigInteger.prototype.square = function() {
	// Normally, squaring a 10-digit number would take 100 multiplications.
	// Of these 10 are unique diagonals, of the remaining 90 (100-10), 45 are repeated.
	// This procedure saves (N*(N-1))/2 multiplications, (e.g., 45 of 100 multiplies).
	// Based on code by Gary Darby, Intellitech Systems Inc., www.DelphiForFun.org

	if (this._s === 0) {
		return ZERO;
	}
	if (this.isUnit()) {
		return ONE;
	}

	var digits = this._d;
	var length = digits.length;
	var imult1 = new Array(length + length + 1);
	var product, carry, k;
	var i;

	// Calculate diagonal
	for (i = 0; i < length; i++) {
		k = i * 2;
		product = digits[i] * digits[i];
		carry = (product / BigInteger_base) | 0;
		imult1[k] = product % BigInteger_base;
		imult1[k + 1] = carry;
	}

	// Calculate repeating part
	for (i = 0; i < length; i++) {
		carry = 0;
		k = i * 2 + 1;
		for (var j = i + 1; j < length; j++, k++) {
			product = digits[j] * digits[i] * 2 + imult1[k] + carry;
			carry = (product / BigInteger_base) | 0;
			imult1[k] = product % BigInteger_base;
		}
		k = length + i;
		var digit = carry + imult1[k];
		carry = (digit / BigInteger_base) | 0;
		imult1[k] = digit % BigInteger_base;
		imult1[k + 1] += carry;
	}

	return new BigInteger(imult1, 1, CONSTRUCT);
};

/*
	Function: quotient
	Divide two <BigIntegers> and truncate towards zero.

	<quotient> throws an exception if *n* is zero.

	Parameters:

		n - The number to divide *this* by. Will be converted to a <BigInteger>.

	Returns:

		The *this* / *n*, truncated to an integer.

	See Also:

		<add>, <subtract>, <multiply>, <divRem>, <remainder>
*/
BigInteger.prototype.quotient = function(n) {
	return this.divRem(n)[0];
};

/*
	Function: divide
	Deprecated synonym for <quotient>.
*/
BigInteger.prototype.divide = BigInteger.prototype.quotient;

/*
	Function: remainder
	Calculate the remainder of two <BigIntegers>.

	<remainder> throws an exception if *n* is zero.

	Parameters:

		n - The remainder after *this* is divided *this* by *n*. Will be
		    converted to a <BigInteger>.

	Returns:

		*this* % *n*.

	See Also:

		<divRem>, <quotient>
*/
BigInteger.prototype.remainder = function(n) {
	return this.divRem(n)[1];
};

/*
	Function: divRem
	Calculate the integer quotient and remainder of two <BigIntegers>.

	<divRem> throws an exception if *n* is zero.

	Parameters:

		n - The number to divide *this* by. Will be converted to a <BigInteger>.

	Returns:

		A two-element array containing the quotient and the remainder.

		> a.divRem(b)

		is exactly equivalent to

		> [a.quotient(b), a.remainder(b)]

		except it is faster, because they are calculated at the same time.

	See Also:

		<quotient>, <remainder>
*/
BigInteger.prototype.divRem = function(n) {
	n = BigInteger(n);
	if (n._s === 0) {
		throw new Error("Divide by zero");
	}
	if (this._s === 0) {
		return [ZERO, ZERO];
	}
	if (n._d.length === 1) {
		return this.divRemSmall(n._s * n._d[0]);
	}

	// Test for easy cases -- |n1| <= |n2|
	switch (this.compareAbs(n)) {
	case 0: // n1 == n2
		return [this._s === n._s ? ONE : M_ONE, ZERO];
	case -1: // |n1| < |n2|
		return [ZERO, this];
	}

	var sign = this._s * n._s;
	var a = n.abs();
	var b_digits = this._d;
	var b_index = b_digits.length;
	var digits = n._d.length;
	var quot = [];
	var guess;

	var part = new BigInteger([], 0, CONSTRUCT);
	part._s = 1;

	while (b_index) {
		part._d.unshift(b_digits[--b_index]);

		if (part.compareAbs(n) < 0) {
			quot.push(0);
			continue;
		}
		if (part._s === 0) {
			guess = 0;
		}
		else {
			var xlen = part._d.length, ylen = a._d.length;
			var highx = part._d[xlen-1]*BigInteger_base + part._d[xlen-2];
			var highy = a._d[ylen-1]*BigInteger_base + a._d[ylen-2];
			if (part._d.length > a._d.length) {
				// The length of part._d can either match a._d length,
				// or exceed it by one.
				highx = (highx+1)*BigInteger_base;
			}
			guess = Math.ceil(highx/highy);
		}
		do {
			var check = a.multiplySingleDigit(guess);
			if (check.compareAbs(part) <= 0) {
				break;
			}
			guess--;
		} while (guess);

		quot.push(guess);
		if (!guess) {
			continue;
		}
		var diff = part.subtract(check);
		part._d = diff._d.slice();
		if (part._d.length === 0) {
			part._s = 0;
		}
	}

	return [new BigInteger(quot.reverse(), sign, CONSTRUCT),
		   new BigInteger(part._d, this._s, CONSTRUCT)];
};

// Throws an exception if n is outside of (-BigInteger.base, -1] or
// [1, BigInteger.base).  It's not necessary to call this, since the
// other division functions will call it if they are able to.
BigInteger.prototype.divRemSmall = function(n) {
	var r;
	n = +n;
	if (n === 0) {
		throw new Error("Divide by zero");
	}

	var n_s = n < 0 ? -1 : 1;
	var sign = this._s * n_s;
	n = Math.abs(n);

	if (n < 1 || n >= BigInteger_base) {
		throw new Error("Argument out of range");
	}

	if (this._s === 0) {
		return [ZERO, ZERO];
	}

	if (n === 1 || n === -1) {
		return [(sign === 1) ? this.abs() : new BigInteger(this._d, sign, CONSTRUCT), ZERO];
	}

	// 2 <= n < BigInteger_base

	// divide a single digit by a single digit
	if (this._d.length === 1) {
		var q = new BigInteger([(this._d[0] / n) | 0], 1, CONSTRUCT);
		r = new BigInteger([(this._d[0] % n) | 0], 1, CONSTRUCT);
		if (sign < 0) {
			q = q.negate();
		}
		if (this._s < 0) {
			r = r.negate();
		}
		return [q, r];
	}

	var digits = this._d.slice();
	var quot = new Array(digits.length);
	var part = 0;
	var diff = 0;
	var i = 0;
	var guess;

	while (digits.length) {
		part = part * BigInteger_base + digits[digits.length - 1];
		if (part < n) {
			quot[i++] = 0;
			digits.pop();
			diff = BigInteger_base * diff + part;
			continue;
		}
		if (part === 0) {
			guess = 0;
		}
		else {
			guess = (part / n) | 0;
		}

		var check = n * guess;
		diff = part - check;
		quot[i++] = guess;
		if (!guess) {
			digits.pop();
			continue;
		}

		digits.pop();
		part = diff;
	}

	r = new BigInteger([diff], 1, CONSTRUCT);
	if (this._s < 0) {
		r = r.negate();
	}
	return [new BigInteger(quot.reverse(), sign, CONSTRUCT), r];
};

/*
	Function: isEven
	Return true iff *this* is divisible by two.

	Note that <BigInteger.ZERO> is even.

	Returns:

		true if *this* is even, false otherwise.

	See Also:

		<isOdd>
*/
BigInteger.prototype.isEven = function() {
	var digits = this._d;
	return this._s === 0 || digits.length === 0 || (digits[0] % 2) === 0;
};

/*
	Function: isOdd
	Return true iff *this* is not divisible by two.

	Returns:

		true if *this* is odd, false otherwise.

	See Also:

		<isEven>
*/
BigInteger.prototype.isOdd = function() {
	return !this.isEven();
};

/*
	Function: sign
	Get the sign of a <BigInteger>.

	Returns:

		* -1 if *this* < 0
		* 0 if *this* == 0
		* +1 if *this* > 0

	See Also:

		<isZero>, <isPositive>, <isNegative>, <compare>, <BigInteger.ZERO>
*/
BigInteger.prototype.sign = function() {
	return this._s;
};

/*
	Function: isPositive
	Return true iff *this* > 0.

	Returns:

		true if *this*.compare(<BigInteger.ZERO>) == 1.

	See Also:

		<sign>, <isZero>, <isNegative>, <isUnit>, <compare>, <BigInteger.ZERO>
*/
BigInteger.prototype.isPositive = function() {
	return this._s > 0;
};

/*
	Function: isNegative
	Return true iff *this* < 0.

	Returns:

		true if *this*.compare(<BigInteger.ZERO>) == -1.

	See Also:

		<sign>, <isPositive>, <isZero>, <isUnit>, <compare>, <BigInteger.ZERO>
*/
BigInteger.prototype.isNegative = function() {
	return this._s < 0;
};

/*
	Function: isZero
	Return true iff *this* == 0.

	Returns:

		true if *this*.compare(<BigInteger.ZERO>) == 0.

	See Also:

		<sign>, <isPositive>, <isNegative>, <isUnit>, <BigInteger.ZERO>
*/
BigInteger.prototype.isZero = function() {
	return this._s === 0;
};

/*
	Function: exp10
	Multiply a <BigInteger> by a power of 10.

	This is equivalent to, but faster than

	> if (n >= 0) {
	>     return this.multiply(BigInteger("1e" + n));
	> }
	> else { // n <= 0
	>     return this.quotient(BigInteger("1e" + -n));
	> }

	Parameters:

		n - The power of 10 to multiply *this* by. *n* is converted to a
		javascipt number and must be no greater than <BigInteger.MAX_EXP>
		(0x7FFFFFFF), or an exception will be thrown.

	Returns:

		*this* * (10 ** *n*), truncated to an integer if necessary.

	See Also:

		<pow>, <multiply>
*/
BigInteger.prototype.exp10 = function(n) {
	n = +n;
	if (n === 0) {
		return this;
	}
	if (Math.abs(n) > Number(MAX_EXP)) {
		throw new Error("exponent too large in BigInteger.exp10");
	}
	if (n > 0) {
		var k = new BigInteger(this._d.slice(), this._s, CONSTRUCT);

		for (; n >= BigInteger_base_log10; n -= BigInteger_base_log10) {
			k._d.unshift(0);
		}
		if (n == 0)
			return k;
		k._s = 1;
		k = k.multiplySingleDigit(Math.pow(10, n));
		return (this._s < 0 ? k.negate() : k);
	} else if (-n >= this._d.length*BigInteger_base_log10) {
		return ZERO;
	} else {
		var k = new BigInteger(this._d.slice(), this._s, CONSTRUCT);

		for (n = -n; n >= BigInteger_base_log10; n -= BigInteger_base_log10) {
			k._d.shift();
		}
		return (n == 0) ? k : k.divRemSmall(Math.pow(10, n))[0];
	}
};

/*
	Function: pow
	Raise a <BigInteger> to a power.

	In this implementation, 0**0 is 1.

	Parameters:

		n - The exponent to raise *this* by. *n* must be no greater than
		<BigInteger.MAX_EXP> (0x7FFFFFFF), or an exception will be thrown.

	Returns:

		*this* raised to the *nth* power.

	See Also:

		<modPow>
*/
BigInteger.prototype.pow = function(n) {
	if (this.isUnit()) {
		if (this._s > 0) {
			return this;
		}
		else {
			return BigInteger(n).isOdd() ? this : this.negate();
		}
	}

	n = BigInteger(n);
	if (n._s === 0) {
		return ONE;
	}
	else if (n._s < 0) {
		if (this._s === 0) {
			throw new Error("Divide by zero");
		}
		else {
			return ZERO;
		}
	}
	if (this._s === 0) {
		return ZERO;
	}
	if (n.isUnit()) {
		return this;
	}

	if (n.compareAbs(MAX_EXP) > 0) {
		throw new Error("exponent too large in BigInteger.pow");
	}
	var x = this;
	var aux = ONE;
	var two = BigInteger.small[2];

	while (n.isPositive()) {
		if (n.isOdd()) {
			aux = aux.multiply(x);
			if (n.isUnit()) {
				return aux;
			}
		}
		x = x.square();
		n = n.quotient(two);
	}

	return aux;
};

/*
	Function: modPow
	Raise a <BigInteger> to a power (mod m).

	Because it is reduced by a modulus, <modPow> is not limited by
	<BigInteger.MAX_EXP> like <pow>.

	Parameters:

		exponent - The exponent to raise *this* by. Must be positive.
		modulus - The modulus.

	Returns:

		*this* ^ *exponent* (mod *modulus*).

	See Also:

		<pow>, <mod>
*/
BigInteger.prototype.modPow = function(exponent, modulus) {
	var result = ONE;
	var base = this;

	while (exponent.isPositive()) {
		if (exponent.isOdd()) {
			result = result.multiply(base).remainder(modulus);
		}

		exponent = exponent.quotient(BigInteger.small[2]);
		if (exponent.isPositive()) {
			base = base.square().remainder(modulus);
		}
	}

	return result;
};

/*
	Function: log
	Get the natural logarithm of a <BigInteger> as a native JavaScript number.

	This is equivalent to

	> Math.log(this.toJSValue())

	but handles values outside of the native number range.

	Returns:

		log( *this* )

	See Also:

		<toJSValue>
*/
BigInteger.prototype.log = function() {
	switch (this._s) {
	case 0:	 return -Infinity;
	case -1: return NaN;
	default: // Fall through.
	}

	var l = this._d.length;

	if (l*BigInteger_base_log10 < 30) {
		return Math.log(this.valueOf());
	}

	var N = Math.ceil(30/BigInteger_base_log10);
	var firstNdigits = this._d.slice(l - N);
	return Math.log((new BigInteger(firstNdigits, 1, CONSTRUCT)).valueOf()) + (l - N) * Math.log(BigInteger_base);
};

/*
	Function: valueOf
	Convert a <BigInteger> to a native JavaScript integer.

	This is called automatically by JavaScipt to convert a <BigInteger> to a
	native value.

	Returns:

		> parseInt(this.toString(), 10)

	See Also:

		<toString>, <toJSValue>
*/
BigInteger.prototype.valueOf = function() {
	return parseInt(this.toString(), 10);
};

/*
	Function: toJSValue
	Convert a <BigInteger> to a native JavaScript integer.

	This is the same as valueOf, but more explicitly named.

	Returns:

		> parseInt(this.toString(), 10)

	See Also:

		<toString>, <valueOf>
*/
BigInteger.prototype.toJSValue = function() {
	return parseInt(this.toString(), 10);
};

var MAX_EXP = BigInteger(0x7FFFFFFF);
// Constant: MAX_EXP
// The largest exponent allowed in <pow> and <exp10> (0x7FFFFFFF or 2147483647).
BigInteger.MAX_EXP = MAX_EXP;

(function() {
	function makeUnary(fn) {
		return function(a) {
			return fn.call(BigInteger(a));
		};
	}

	function makeBinary(fn) {
		return function(a, b) {
			return fn.call(BigInteger(a), BigInteger(b));
		};
	}

	function makeTrinary(fn) {
		return function(a, b, c) {
			return fn.call(BigInteger(a), BigInteger(b), BigInteger(c));
		};
	}

	(function() {
		var i, fn;
		var unary = "toJSValue,isEven,isOdd,sign,isZero,isNegative,abs,isUnit,square,negate,isPositive,toString,next,prev,log".split(",");
		var binary = "compare,remainder,divRem,subtract,add,quotient,divide,multiply,pow,compareAbs".split(",");
		var trinary = ["modPow"];

		for (i = 0; i < unary.length; i++) {
			fn = unary[i];
			BigInteger[fn] = makeUnary(BigInteger.prototype[fn]);
		}

		for (i = 0; i < binary.length; i++) {
			fn = binary[i];
			BigInteger[fn] = makeBinary(BigInteger.prototype[fn]);
		}

		for (i = 0; i < trinary.length; i++) {
			fn = trinary[i];
			BigInteger[fn] = makeTrinary(BigInteger.prototype[fn]);
		}

		BigInteger.exp10 = function(x, n) {
			return BigInteger(x).exp10(n);
		};
	})();
})();

exports.BigInteger = BigInteger;
})(typeof exports !== 'undefined' ? exports : this);

},{}],4:[function(require,module,exports){
require('es5-shim')
require('./node_modules/es5-shim/es5-sham.js')

void function(root){
    'use strict'

    var util = Object.create(null)
        , own = Object.getOwnPropertyNames

    util.liberate = Function.prototype.bind.bind(Function.prototype.call)

    util.detach = Function.prototype.bind.bind(Function.prototype.apply)

    util.slice = util.liberate(Array.prototype.slice)

    util.times = function(nr, fun) {
        var result = []
            , i
            ;
        for ( i = 0; i < nr; i++) { result.push(fun(i)) }
        return result
    }

    util.longest = function(){
        var args = util.slice(arguments)
            , result = []
            ;

        util.times(args.length, function(i){
            var arr = args[i];
            result = args[i] ? (result.length > args[i].length ? result : args[i]) : []
        })
        return result
    }

    util.span = function(init, limit, stepper) {

        var list = []
            ,i = init.valueOf()
            , continuePred
            ;

        stepper = stepper || function(x) { return x + 1; }

        continuePred = (stepper(i) > i) ? function(x) { return x <= limit }
                                        :  function(x) { return x >= limit }

        while (continuePred(i)) {
            list.push(i)
            i = stepper(i)
        }

        return list
    }

    util.zipWith = function(){
        var fxn = arguments[0]
            , args = util.slice(arguments,1)
            , output = []
            , width = Math.max.apply(null, args.map(function(xs){ return xs ? (xs.length || 0) : 0 }))
            , i
            ;

        for (i = 0; i < width; i++) {
            output.push(fxn.apply(null, [].map.call(args, function(xs) {
                return xs ? xs[i] : []
            })))
        }
        return output
    }

    util.zipWithArray = function(funct, argsArray){
        return util.zipWith.apply(null,[funct].concat(argsArray))
    }

    util.zip = util.zipWith.bind(null, function(){return util.slice(arguments)})

    util.partition = function(arr, length){

        var result, each;

        if (length === undefined || length <= 0) { return [] }

        result = []
        each   = []

        arr.forEach(function(value) {

            each.push(value)

            if (each.length === length) {
                result.push(each)
                each = []
            }

        })

        return result.concat(each.length > 0 ? [ each ] : [])
    }

    util.arrayMax = function(arr) { return Math.max.apply(null, arr) }

    util.isInt = function(v){ return v % 1 === 0 }

    util.allIntegers = function(arr){ return arr.every(util.isInt) }

    util.indexOfMax = function(arr){
        return arr.reduce(function(m, e, i, a) { return (m==-1 || e > a[m]) ? i : m }, -1)
    }

    util.indexOfAbsMax = function(arr){
        return arr.reduce(function(m, e, i, a) { return (m==-1 || Math.abs(e) > Math.abs(a[m])) ? i : m }, -1)
    }

    util.bind = function(fn){
        var args = util.slice(arguments, 1);
        return function(){
            var args2 = util.slice(arguments);
            return fn.apply(this, args.concat(args2))
        }
    }

    util.enslave = function(fn) {
        return function(){
            return fn.bind(null, this).apply(null, arguments)
        }
    }

    util.randFloat = function randFloat(min, max){
        return Math.random() * (max - min) + min
    }

    util.rand =  function rand(min, max){
        return Math.round(randFloat(min, max))
    }

    util.getRandomArray = function(minLength, maxLength){

        var length = rand(maxLength || 6, minLength || 3)
            , common_factor = rand(-13, 13)
            , arr=[]
            ;

        while ( maxLength-- > minLength ) {
            arr.push(rand(-13, 13)*common_factor)
        }

        arr.push(rand(-13, 13)*common_factor)

        return arr
    }

    util.forEachOwn = function(obj, fun, thisArg) {
        return own(obj).forEach(fun, thisArg)
    }

    util.arrayWithLength =  function arrayWithLength(length){
        var arr = Array(length)
        while(length--){ arr[length]=undefined }
        return arr
    }

    if ( module !== undefined && module.exports ) {
        module.exports = util
    } else {
        root.vatrix = util
    }
}(this)

},{"./node_modules/es5-shim/es5-sham.js":5,"es5-shim":6}],5:[function(require,module,exports){
// Copyright 2009-2012 by contributors, MIT License
// vim: ts=4 sts=4 sw=4 expandtab

// Module systems magic dance
(function (definition) {
    // RequireJS
    if (typeof define == "function") {
        define(definition);
    // YUI3
    } else if (typeof YUI == "function") {
        YUI.add("es5-sham", definition);
    // CommonJS and <script>
    } else {
        definition();
    }
})(function () {


var call = Function.prototype.call;
var prototypeOfObject = Object.prototype;
var owns = call.bind(prototypeOfObject.hasOwnProperty);

// If JS engine supports accessors creating shortcuts.
var defineGetter;
var defineSetter;
var lookupGetter;
var lookupSetter;
var supportsAccessors;
if ((supportsAccessors = owns(prototypeOfObject, "__defineGetter__"))) {
    defineGetter = call.bind(prototypeOfObject.__defineGetter__);
    defineSetter = call.bind(prototypeOfObject.__defineSetter__);
    lookupGetter = call.bind(prototypeOfObject.__lookupGetter__);
    lookupSetter = call.bind(prototypeOfObject.__lookupSetter__);
}

// ES5 15.2.3.2
// http://es5.github.com/#x15.2.3.2
if (!Object.getPrototypeOf) {
    // https://github.com/kriskowal/es5-shim/issues#issue/2
    // http://ejohn.org/blog/objectgetprototypeof/
    // recommended by fschaefer on github
    Object.getPrototypeOf = function getPrototypeOf(object) {
        return object.__proto__ || (
            object.constructor
                ? object.constructor.prototype
                : prototypeOfObject
        );
    };
}

//ES5 15.2.3.3
//http://es5.github.com/#x15.2.3.3

function doesGetOwnPropertyDescriptorWork(object) {
    try {
        object.sentinel = 0;
        return Object.getOwnPropertyDescriptor(
                object,
                "sentinel"
        ).value === 0;
    } catch (exception) {
        // returns falsy
    }
}

//check whether getOwnPropertyDescriptor works if it's given. Otherwise,
//shim partially.
if (Object.defineProperty) {
    var getOwnPropertyDescriptorWorksOnObject = 
        doesGetOwnPropertyDescriptorWork({});
    var getOwnPropertyDescriptorWorksOnDom = typeof document == "undefined" ||
    doesGetOwnPropertyDescriptorWork(document.createElement("div"));
    if (!getOwnPropertyDescriptorWorksOnDom || 
            !getOwnPropertyDescriptorWorksOnObject
    ) {
        var getOwnPropertyDescriptorFallback = Object.getOwnPropertyDescriptor;
    }
}

if (!Object.getOwnPropertyDescriptor || getOwnPropertyDescriptorFallback) {
    var ERR_NON_OBJECT = "Object.getOwnPropertyDescriptor called on a non-object: ";

    Object.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(object, property) {
        if ((typeof object != "object" && typeof object != "function") || object === null) {
            throw new TypeError(ERR_NON_OBJECT + object);
        }

        // make a valiant attempt to use the real getOwnPropertyDescriptor
        // for I8's DOM elements.
        if (getOwnPropertyDescriptorFallback) {
            try {
                return getOwnPropertyDescriptorFallback.call(Object, object, property);
            } catch (exception) {
                // try the shim if the real one doesn't work
            }
        }

        // If object does not owns property return undefined immediately.
        if (!owns(object, property)) {
            return;
        }

        // If object has a property then it's for sure both `enumerable` and
        // `configurable`.
        var descriptor =  { enumerable: true, configurable: true };

        // If JS engine supports accessor properties then property may be a
        // getter or setter.
        if (supportsAccessors) {
            // Unfortunately `__lookupGetter__` will return a getter even
            // if object has own non getter property along with a same named
            // inherited getter. To avoid misbehavior we temporary remove
            // `__proto__` so that `__lookupGetter__` will return getter only
            // if it's owned by an object.
            var prototype = object.__proto__;
            object.__proto__ = prototypeOfObject;

            var getter = lookupGetter(object, property);
            var setter = lookupSetter(object, property);

            // Once we have getter and setter we can put values back.
            object.__proto__ = prototype;

            if (getter || setter) {
                if (getter) {
                    descriptor.get = getter;
                }
                if (setter) {
                    descriptor.set = setter;
                }
                // If it was accessor property we're done and return here
                // in order to avoid adding `value` to the descriptor.
                return descriptor;
            }
        }

        // If we got this far we know that object has an own property that is
        // not an accessor so we set it as a value and return descriptor.
        descriptor.value = object[property];
        descriptor.writable = true;
        return descriptor;
    };
}

// ES5 15.2.3.4
// http://es5.github.com/#x15.2.3.4
if (!Object.getOwnPropertyNames) {
    Object.getOwnPropertyNames = function getOwnPropertyNames(object) {
        return Object.keys(object);
    };
}

// ES5 15.2.3.5
// http://es5.github.com/#x15.2.3.5
if (!Object.create) {

    // Contributed by Brandon Benvie, October, 2012
    var createEmpty;
    var supportsProto = Object.prototype.__proto__ === null;
    if (supportsProto || typeof document == 'undefined') {
        createEmpty = function () {
            return { "__proto__": null };
        };
    } else {
        // In old IE __proto__ can't be used to manually set `null`, nor does
        // any other method exist to make an object that inherits from nothing,
        // aside from Object.prototype itself. Instead, create a new global
        // object and *steal* its Object.prototype and strip it bare. This is
        // used as the prototype to create nullary objects.
        createEmpty = function () {
            var iframe = document.createElement('iframe');
            var parent = document.body || document.documentElement;
            iframe.style.display = 'none';
            parent.appendChild(iframe);
            iframe.src = 'javascript:';
            var empty = iframe.contentWindow.Object.prototype;
            parent.removeChild(iframe);
            iframe = null;
            delete empty.constructor;
            delete empty.hasOwnProperty;
            delete empty.propertyIsEnumerable;
            delete empty.isPrototypeOf;
            delete empty.toLocaleString;
            delete empty.toString;
            delete empty.valueOf;
            empty.__proto__ = null;

            function Empty() {}
            Empty.prototype = empty;
            // short-circuit future calls
            createEmpty = function () {
                return new Empty();
            };
            return new Empty();
        };
    }

    Object.create = function create(prototype, properties) {

        var object;
        function Type() {}  // An empty constructor.

        if (prototype === null) {
            object = createEmpty();
        } else {
            if (typeof prototype !== "object" && typeof prototype !== "function") {
                // In the native implementation `parent` can be `null`
                // OR *any* `instanceof Object`  (Object|Function|Array|RegExp|etc)
                // Use `typeof` tho, b/c in old IE, DOM elements are not `instanceof Object`
                // like they are in modern browsers. Using `Object.create` on DOM elements
                // is...err...probably inappropriate, but the native version allows for it.
                throw new TypeError("Object prototype may only be an Object or null"); // same msg as Chrome
            }
            Type.prototype = prototype;
            object = new Type();
            // IE has no built-in implementation of `Object.getPrototypeOf`
            // neither `__proto__`, but this manually setting `__proto__` will
            // guarantee that `Object.getPrototypeOf` will work as expected with
            // objects created using `Object.create`
            object.__proto__ = prototype;
        }

        if (properties !== void 0) {
            Object.defineProperties(object, properties);
        }

        return object;
    };
}

// ES5 15.2.3.6
// http://es5.github.com/#x15.2.3.6

// Patch for WebKit and IE8 standard mode
// Designed by hax <hax.github.com>
// related issue: https://github.com/kriskowal/es5-shim/issues#issue/5
// IE8 Reference:
//     http://msdn.microsoft.com/en-us/library/dd282900.aspx
//     http://msdn.microsoft.com/en-us/library/dd229916.aspx
// WebKit Bugs:
//     https://bugs.webkit.org/show_bug.cgi?id=36423

function doesDefinePropertyWork(object) {
    try {
        Object.defineProperty(object, "sentinel", {});
        return "sentinel" in object;
    } catch (exception) {
        // returns falsy
    }
}

// check whether defineProperty works if it's given. Otherwise,
// shim partially.
if (Object.defineProperty) {
    var definePropertyWorksOnObject = doesDefinePropertyWork({});
    var definePropertyWorksOnDom = typeof document == "undefined" ||
        doesDefinePropertyWork(document.createElement("div"));
    if (!definePropertyWorksOnObject || !definePropertyWorksOnDom) {
        var definePropertyFallback = Object.defineProperty,
            definePropertiesFallback = Object.defineProperties;
    }
}

if (!Object.defineProperty || definePropertyFallback) {
    var ERR_NON_OBJECT_DESCRIPTOR = "Property description must be an object: ";
    var ERR_NON_OBJECT_TARGET = "Object.defineProperty called on non-object: "
    var ERR_ACCESSORS_NOT_SUPPORTED = "getters & setters can not be defined " +
                                      "on this javascript engine";

    Object.defineProperty = function defineProperty(object, property, descriptor) {
        if ((typeof object != "object" && typeof object != "function") || object === null) {
            throw new TypeError(ERR_NON_OBJECT_TARGET + object);
        }
        if ((typeof descriptor != "object" && typeof descriptor != "function") || descriptor === null) {
            throw new TypeError(ERR_NON_OBJECT_DESCRIPTOR + descriptor);
        }
        // make a valiant attempt to use the real defineProperty
        // for I8's DOM elements.
        if (definePropertyFallback) {
            try {
                return definePropertyFallback.call(Object, object, property, descriptor);
            } catch (exception) {
                // try the shim if the real one doesn't work
            }
        }

        // If it's a data property.
        if (owns(descriptor, "value")) {
            // fail silently if "writable", "enumerable", or "configurable"
            // are requested but not supported
            /*
            // alternate approach:
            if ( // can't implement these features; allow false but not true
                !(owns(descriptor, "writable") ? descriptor.writable : true) ||
                !(owns(descriptor, "enumerable") ? descriptor.enumerable : true) ||
                !(owns(descriptor, "configurable") ? descriptor.configurable : true)
            )
                throw new RangeError(
                    "This implementation of Object.defineProperty does not " +
                    "support configurable, enumerable, or writable."
                );
            */

            if (supportsAccessors && (lookupGetter(object, property) ||
                                      lookupSetter(object, property)))
            {
                // As accessors are supported only on engines implementing
                // `__proto__` we can safely override `__proto__` while defining
                // a property to make sure that we don't hit an inherited
                // accessor.
                var prototype = object.__proto__;
                object.__proto__ = prototypeOfObject;
                // Deleting a property anyway since getter / setter may be
                // defined on object itself.
                delete object[property];
                object[property] = descriptor.value;
                // Setting original `__proto__` back now.
                object.__proto__ = prototype;
            } else {
                object[property] = descriptor.value;
            }
        } else {
            if (!supportsAccessors) {
                throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
            }
            // If we got that far then getters and setters can be defined !!
            if (owns(descriptor, "get")) {
                defineGetter(object, property, descriptor.get);
            }
            if (owns(descriptor, "set")) {
                defineSetter(object, property, descriptor.set);
            }
        }
        return object;
    };
}

// ES5 15.2.3.7
// http://es5.github.com/#x15.2.3.7
if (!Object.defineProperties || definePropertiesFallback) {
    Object.defineProperties = function defineProperties(object, properties) {
        // make a valiant attempt to use the real defineProperties
        if (definePropertiesFallback) {
            try {
                return definePropertiesFallback.call(Object, object, properties);
            } catch (exception) {
                // try the shim if the real one doesn't work
            }
        }

        for (var property in properties) {
            if (owns(properties, property) && property != "__proto__") {
                Object.defineProperty(object, property, properties[property]);
            }
        }
        return object;
    };
}

// ES5 15.2.3.8
// http://es5.github.com/#x15.2.3.8
if (!Object.seal) {
    Object.seal = function seal(object) {
        // this is misleading and breaks feature-detection, but
        // allows "securable" code to "gracefully" degrade to working
        // but insecure code.
        return object;
    };
}

// ES5 15.2.3.9
// http://es5.github.com/#x15.2.3.9
if (!Object.freeze) {
    Object.freeze = function freeze(object) {
        // this is misleading and breaks feature-detection, but
        // allows "securable" code to "gracefully" degrade to working
        // but insecure code.
        return object;
    };
}

// detect a Rhino bug and patch it
try {
    Object.freeze(function () {});
} catch (exception) {
    Object.freeze = (function freeze(freezeObject) {
        return function freeze(object) {
            if (typeof object == "function") {
                return object;
            } else {
                return freezeObject(object);
            }
        };
    })(Object.freeze);
}

// ES5 15.2.3.10
// http://es5.github.com/#x15.2.3.10
if (!Object.preventExtensions) {
    Object.preventExtensions = function preventExtensions(object) {
        // this is misleading and breaks feature-detection, but
        // allows "securable" code to "gracefully" degrade to working
        // but insecure code.
        return object;
    };
}

// ES5 15.2.3.11
// http://es5.github.com/#x15.2.3.11
if (!Object.isSealed) {
    Object.isSealed = function isSealed(object) {
        return false;
    };
}

// ES5 15.2.3.12
// http://es5.github.com/#x15.2.3.12
if (!Object.isFrozen) {
    Object.isFrozen = function isFrozen(object) {
        return false;
    };
}

// ES5 15.2.3.13
// http://es5.github.com/#x15.2.3.13
if (!Object.isExtensible) {
    Object.isExtensible = function isExtensible(object) {
        // 1. If Type(O) is not Object throw a TypeError exception.
        if (Object(object) !== object) {
            throw new TypeError(); // TODO message
        }
        // 2. Return the Boolean value of the [[Extensible]] internal property of O.
        var name = '';
        while (owns(object, name)) {
            name += '?';
        }
        object[name] = true;
        var returnValue = owns(object, name);
        delete object[name];
        return returnValue;
    };
}

});

},{}],6:[function(require,module,exports){
// Copyright 2009-2012 by contributors, MIT License
// vim: ts=4 sts=4 sw=4 expandtab

// Module systems magic dance
(function (definition) {
    // RequireJS
    if (typeof define == "function") {
        define(definition);
    // YUI3
    } else if (typeof YUI == "function") {
        YUI.add("es5", definition);
    // CommonJS and <script>
    } else {
        definition();
    }
})(function () {

/**
 * Brings an environment as close to ECMAScript 5 compliance
 * as is possible with the facilities of erstwhile engines.
 *
 * Annotated ES5: http://es5.github.com/ (specific links below)
 * ES5 Spec: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf
 * Required reading: http://javascriptweblog.wordpress.com/2011/12/05/extending-javascript-natives/
 */

//
// Function
// ========
//

// ES-5 15.3.4.5
// http://es5.github.com/#x15.3.4.5

function Empty() {}

if (!Function.prototype.bind) {
    Function.prototype.bind = function bind(that) { // .length is 1
        // 1. Let Target be the this value.
        var target = this;
        // 2. If IsCallable(Target) is false, throw a TypeError exception.
        if (typeof target != "function") {
            throw new TypeError("Function.prototype.bind called on incompatible " + target);
        }
        // 3. Let A be a new (possibly empty) internal list of all of the
        //   argument values provided after thisArg (arg1, arg2 etc), in order.
        // XXX slicedArgs will stand in for "A" if used
        var args = _Array_slice_.call(arguments, 1); // for normal call
        // 4. Let F be a new native ECMAScript object.
        // 11. Set the [[Prototype]] internal property of F to the standard
        //   built-in Function prototype object as specified in 15.3.3.1.
        // 12. Set the [[Call]] internal property of F as described in
        //   15.3.4.5.1.
        // 13. Set the [[Construct]] internal property of F as described in
        //   15.3.4.5.2.
        // 14. Set the [[HasInstance]] internal property of F as described in
        //   15.3.4.5.3.
        var bound = function () {

            if (this instanceof bound) {
                // 15.3.4.5.2 [[Construct]]
                // When the [[Construct]] internal method of a function object,
                // F that was created using the bind function is called with a
                // list of arguments ExtraArgs, the following steps are taken:
                // 1. Let target be the value of F's [[TargetFunction]]
                //   internal property.
                // 2. If target has no [[Construct]] internal method, a
                //   TypeError exception is thrown.
                // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the
                //   list boundArgs in the same order followed by the same
                //   values as the list ExtraArgs in the same order.
                // 5. Return the result of calling the [[Construct]] internal
                //   method of target providing args as the arguments.

                var result = target.apply(
                    this,
                    args.concat(_Array_slice_.call(arguments))
                );
                if (Object(result) === result) {
                    return result;
                }
                return this;

            } else {
                // 15.3.4.5.1 [[Call]]
                // When the [[Call]] internal method of a function object, F,
                // which was created using the bind function is called with a
                // this value and a list of arguments ExtraArgs, the following
                // steps are taken:
                // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 2. Let boundThis be the value of F's [[BoundThis]] internal
                //   property.
                // 3. Let target be the value of F's [[TargetFunction]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the
                //   list boundArgs in the same order followed by the same
                //   values as the list ExtraArgs in the same order.
                // 5. Return the result of calling the [[Call]] internal method
                //   of target providing boundThis as the this value and
                //   providing args as the arguments.

                // equiv: target.call(this, ...boundArgs, ...args)
                return target.apply(
                    that,
                    args.concat(_Array_slice_.call(arguments))
                );

            }

        };
        if(target.prototype) {
            Empty.prototype = target.prototype;
            bound.prototype = new Empty();
            // Clean up dangling references.
            Empty.prototype = null;
        }
        // XXX bound.length is never writable, so don't even try
        //
        // 15. If the [[Class]] internal property of Target is "Function", then
        //     a. Let L be the length property of Target minus the length of A.
        //     b. Set the length own property of F to either 0 or L, whichever is
        //       larger.
        // 16. Else set the length own property of F to 0.
        // 17. Set the attributes of the length own property of F to the values
        //   specified in 15.3.5.1.

        // TODO
        // 18. Set the [[Extensible]] internal property of F to true.

        // TODO
        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
        // 20. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
        //   false.
        // 21. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
        //   and false.

        // TODO
        // NOTE Function objects created using Function.prototype.bind do not
        // have a prototype property or the [[Code]], [[FormalParameters]], and
        // [[Scope]] internal properties.
        // XXX can't delete prototype in pure-js.

        // 22. Return F.
        return bound;
    };
}

// Shortcut to an often accessed properties, in order to avoid multiple
// dereference that costs universally.
// _Please note: Shortcuts are defined after `Function.prototype.bind` as we
// us it in defining shortcuts.
var call = Function.prototype.call;
var prototypeOfArray = Array.prototype;
var prototypeOfObject = Object.prototype;
var _Array_slice_ = prototypeOfArray.slice;
// Having a toString local variable name breaks in Opera so use _toString.
var _toString = call.bind(prototypeOfObject.toString);
var owns = call.bind(prototypeOfObject.hasOwnProperty);

// If JS engine supports accessors creating shortcuts.
var defineGetter;
var defineSetter;
var lookupGetter;
var lookupSetter;
var supportsAccessors;
if ((supportsAccessors = owns(prototypeOfObject, "__defineGetter__"))) {
    defineGetter = call.bind(prototypeOfObject.__defineGetter__);
    defineSetter = call.bind(prototypeOfObject.__defineSetter__);
    lookupGetter = call.bind(prototypeOfObject.__lookupGetter__);
    lookupSetter = call.bind(prototypeOfObject.__lookupSetter__);
}

//
// Array
// =====
//

// ES5 15.4.4.12
// http://es5.github.com/#x15.4.4.12
// Default value for second param
// [bugfix, ielt9, old browsers]
// IE < 9 bug: [1,2].splice(0).join("") == "" but should be "12"
if ([1,2].splice(0).length != 2) {
    var array_splice = Array.prototype.splice;

    if(function() { // test IE < 9 to splice bug - see issue #138
        function makeArray(l) {
            var a = [];
            while (l--) {
                a.unshift(l)
            }
            return a
        }

        var array = []
            , lengthBefore
        ;

        array.splice.bind(array, 0, 0).apply(null, makeArray(20));
        array.splice.bind(array, 0, 0).apply(null, makeArray(26));

        lengthBefore = array.length; //20
        array.splice(5, 0, "XXX"); // add one element

        if(lengthBefore + 1 == array.length) {
            return true;// has right splice implementation without bugs
        }
        // else {
        //    IE8 bug
        // }
    }()) {//IE 6/7
        Array.prototype.splice = function(start, deleteCount) {
            if (!arguments.length) {
                return [];
            } else {
                return array_splice.apply(this, [
                    start === void 0 ? 0 : start,
                    deleteCount === void 0 ? (this.length - start) : deleteCount
                ].concat(_Array_slice_.call(arguments, 2)))
            }
        };
    }
    else {//IE8
        Array.prototype.splice = function(start, deleteCount) {
            var result
                , args = _Array_slice_.call(arguments, 2)
                , addElementsCount = args.length
            ;

            if(!arguments.length) {
                return [];
            }

            if(start === void 0) { // default
                start = 0;
            }
            if(deleteCount === void 0) { // default
                deleteCount = this.length - start;
            }

            if(addElementsCount > 0) {
                if(deleteCount <= 0) {
                    if(start == this.length) { // tiny optimisation #1
                        this.push.apply(this, args);
                        return [];
                    }

                    if(start == 0) { // tiny optimisation #2
                        this.unshift.apply(this, args);
                        return [];
                    }
                }

                // Array.prototype.splice implementation
                result = _Array_slice_.call(this, start, start + deleteCount);// delete part
                args.push.apply(args, _Array_slice_.call(this, start + deleteCount, this.length));// right part
                args.unshift.apply(args, _Array_slice_.call(this, 0, start));// left part

                // delete all items from this array and replace it to 'left part' + _Array_slice_.call(arguments, 2) + 'right part'
                args.unshift(0, this.length);

                array_splice.apply(this, args);

                return result;
            }

            return array_splice.call(this, start, deleteCount);
        }

    }
}

// ES5 15.4.4.12
// http://es5.github.com/#x15.4.4.13
// Return len+argCount.
// [bugfix, ielt8]
// IE < 8 bug: [].unshift(0) == undefined but should be "1"
if ([].unshift(0) != 1) {
    var array_unshift = Array.prototype.unshift;
    Array.prototype.unshift = function() {
        array_unshift.apply(this, arguments);
        return this.length;
    };
}

// ES5 15.4.3.2
// http://es5.github.com/#x15.4.3.2
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
if (!Array.isArray) {
    Array.isArray = function isArray(obj) {
        return _toString(obj) == "[object Array]";
    };
}

// The IsCallable() check in the Array functions
// has been replaced with a strict check on the
// internal class of the object to trap cases where
// the provided function was actually a regular
// expression literal, which in V8 and
// JavaScriptCore is a typeof "function".  Only in
// V8 are regular expression literals permitted as
// reduce parameters, so it is desirable in the
// general case for the shim to match the more
// strict and common behavior of rejecting regular
// expressions.

// ES5 15.4.4.18
// http://es5.github.com/#x15.4.4.18
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/forEach

// Check failure of by-index access of string characters (IE < 9)
// and failure of `0 in boxedString` (Rhino)
var boxedString = Object("a"),
    splitString = boxedString[0] != "a" || !(0 in boxedString);

if (!Array.prototype.forEach) {
    Array.prototype.forEach = function forEach(fun /*, thisp*/) {
        var object = toObject(this),
            self = splitString && _toString(this) == "[object String]" ?
                this.split("") :
                object,
            thisp = arguments[1],
            i = -1,
            length = self.length >>> 0;

        // If no callback function or if callback is not a callable function
        if (_toString(fun) != "[object Function]") {
            throw new TypeError(); // TODO message
        }

        while (++i < length) {
            if (i in self) {
                // Invoke the callback function with call, passing arguments:
                // context, property value, property key, thisArg object
                // context
                fun.call(thisp, self[i], i, object);
            }
        }
    };
}

// ES5 15.4.4.19
// http://es5.github.com/#x15.4.4.19
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
if (!Array.prototype.map) {
    Array.prototype.map = function map(fun /*, thisp*/) {
        var object = toObject(this),
            self = splitString && _toString(this) == "[object String]" ?
                this.split("") :
                object,
            length = self.length >>> 0,
            result = Array(length),
            thisp = arguments[1];

        // If no callback function or if callback is not a callable function
        if (_toString(fun) != "[object Function]") {
            throw new TypeError(fun + " is not a function");
        }

        for (var i = 0; i < length; i++) {
            if (i in self)
                result[i] = fun.call(thisp, self[i], i, object);
        }
        return result;
    };
}

// ES5 15.4.4.20
// http://es5.github.com/#x15.4.4.20
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/filter
if (!Array.prototype.filter) {
    Array.prototype.filter = function filter(fun /*, thisp */) {
        var object = toObject(this),
            self = splitString && _toString(this) == "[object String]" ?
                this.split("") :
                    object,
            length = self.length >>> 0,
            result = [],
            value,
            thisp = arguments[1];

        // If no callback function or if callback is not a callable function
        if (_toString(fun) != "[object Function]") {
            throw new TypeError(fun + " is not a function");
        }

        for (var i = 0; i < length; i++) {
            if (i in self) {
                value = self[i];
                if (fun.call(thisp, value, i, object)) {
                    result.push(value);
                }
            }
        }
        return result;
    };
}

// ES5 15.4.4.16
// http://es5.github.com/#x15.4.4.16
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
if (!Array.prototype.every) {
    Array.prototype.every = function every(fun /*, thisp */) {
        var object = toObject(this),
            self = splitString && _toString(this) == "[object String]" ?
                this.split("") :
                object,
            length = self.length >>> 0,
            thisp = arguments[1];

        // If no callback function or if callback is not a callable function
        if (_toString(fun) != "[object Function]") {
            throw new TypeError(fun + " is not a function");
        }

        for (var i = 0; i < length; i++) {
            if (i in self && !fun.call(thisp, self[i], i, object)) {
                return false;
            }
        }
        return true;
    };
}

// ES5 15.4.4.17
// http://es5.github.com/#x15.4.4.17
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
if (!Array.prototype.some) {
    Array.prototype.some = function some(fun /*, thisp */) {
        var object = toObject(this),
            self = splitString && _toString(this) == "[object String]" ?
                this.split("") :
                object,
            length = self.length >>> 0,
            thisp = arguments[1];

        // If no callback function or if callback is not a callable function
        if (_toString(fun) != "[object Function]") {
            throw new TypeError(fun + " is not a function");
        }

        for (var i = 0; i < length; i++) {
            if (i in self && fun.call(thisp, self[i], i, object)) {
                return true;
            }
        }
        return false;
    };
}

// ES5 15.4.4.21
// http://es5.github.com/#x15.4.4.21
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce
if (!Array.prototype.reduce) {
    Array.prototype.reduce = function reduce(fun /*, initial*/) {
        var object = toObject(this),
            self = splitString && _toString(this) == "[object String]" ?
                this.split("") :
                object,
            length = self.length >>> 0;

        // If no callback function or if callback is not a callable function
        if (_toString(fun) != "[object Function]") {
            throw new TypeError(fun + " is not a function");
        }

        // no value to return if no initial value and an empty array
        if (!length && arguments.length == 1) {
            throw new TypeError("reduce of empty array with no initial value");
        }

        var i = 0;
        var result;
        if (arguments.length >= 2) {
            result = arguments[1];
        } else {
            do {
                if (i in self) {
                    result = self[i++];
                    break;
                }

                // if array contains no values, no initial value to return
                if (++i >= length) {
                    throw new TypeError("reduce of empty array with no initial value");
                }
            } while (true);
        }

        for (; i < length; i++) {
            if (i in self) {
                result = fun.call(void 0, result, self[i], i, object);
            }
        }

        return result;
    };
}

// ES5 15.4.4.22
// http://es5.github.com/#x15.4.4.22
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduceRight
if (!Array.prototype.reduceRight) {
    Array.prototype.reduceRight = function reduceRight(fun /*, initial*/) {
        var object = toObject(this),
            self = splitString && _toString(this) == "[object String]" ?
                this.split("") :
                object,
            length = self.length >>> 0;

        // If no callback function or if callback is not a callable function
        if (_toString(fun) != "[object Function]") {
            throw new TypeError(fun + " is not a function");
        }

        // no value to return if no initial value, empty array
        if (!length && arguments.length == 1) {
            throw new TypeError("reduceRight of empty array with no initial value");
        }

        var result, i = length - 1;
        if (arguments.length >= 2) {
            result = arguments[1];
        } else {
            do {
                if (i in self) {
                    result = self[i--];
                    break;
                }

                // if array contains no values, no initial value to return
                if (--i < 0) {
                    throw new TypeError("reduceRight of empty array with no initial value");
                }
            } while (true);
        }

        if (i < 0) {
            return result;
        }

        do {
            if (i in this) {
                result = fun.call(void 0, result, self[i], i, object);
            }
        } while (i--);

        return result;
    };
}

// ES5 15.4.4.14
// http://es5.github.com/#x15.4.4.14
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
if (!Array.prototype.indexOf || ([0, 1].indexOf(1, 2) != -1)) {
    Array.prototype.indexOf = function indexOf(sought /*, fromIndex */ ) {
        var self = splitString && _toString(this) == "[object String]" ?
                this.split("") :
                toObject(this),
            length = self.length >>> 0;

        if (!length) {
            return -1;
        }

        var i = 0;
        if (arguments.length > 1) {
            i = toInteger(arguments[1]);
        }

        // handle negative indices
        i = i >= 0 ? i : Math.max(0, length + i);
        for (; i < length; i++) {
            if (i in self && self[i] === sought) {
                return i;
            }
        }
        return -1;
    };
}

// ES5 15.4.4.15
// http://es5.github.com/#x15.4.4.15
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf
if (!Array.prototype.lastIndexOf || ([0, 1].lastIndexOf(0, -3) != -1)) {
    Array.prototype.lastIndexOf = function lastIndexOf(sought /*, fromIndex */) {
        var self = splitString && _toString(this) == "[object String]" ?
                this.split("") :
                toObject(this),
            length = self.length >>> 0;

        if (!length) {
            return -1;
        }
        var i = length - 1;
        if (arguments.length > 1) {
            i = Math.min(i, toInteger(arguments[1]));
        }
        // handle negative indices
        i = i >= 0 ? i : length - Math.abs(i);
        for (; i >= 0; i--) {
            if (i in self && sought === self[i]) {
                return i;
            }
        }
        return -1;
    };
}

//
// Object
// ======
//

// ES5 15.2.3.14
// http://es5.github.com/#x15.2.3.14
if (!Object.keys) {
    // http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
    var hasDontEnumBug = true,
        dontEnums = [
            "toString",
            "toLocaleString",
            "valueOf",
            "hasOwnProperty",
            "isPrototypeOf",
            "propertyIsEnumerable",
            "constructor"
        ],
        dontEnumsLength = dontEnums.length;

    for (var key in {"toString": null}) {
        hasDontEnumBug = false;
    }

    Object.keys = function keys(object) {

        if (
            (typeof object != "object" && typeof object != "function") ||
            object === null
        ) {
            throw new TypeError("Object.keys called on a non-object");
        }

        var keys = [];
        for (var name in object) {
            if (owns(object, name)) {
                keys.push(name);
            }
        }

        if (hasDontEnumBug) {
            for (var i = 0, ii = dontEnumsLength; i < ii; i++) {
                var dontEnum = dontEnums[i];
                if (owns(object, dontEnum)) {
                    keys.push(dontEnum);
                }
            }
        }
        return keys;
    };

}

//
// Date
// ====
//

// ES5 15.9.5.43
// http://es5.github.com/#x15.9.5.43
// This function returns a String value represent the instance in time
// represented by this Date object. The format of the String is the Date Time
// string format defined in 15.9.1.15. All fields are present in the String.
// The time zone is always UTC, denoted by the suffix Z. If the time value of
// this object is not a finite Number a RangeError exception is thrown.
var negativeDate = -62198755200000,
    negativeYearString = "-000001";
if (
    !Date.prototype.toISOString ||
    (new Date(negativeDate).toISOString().indexOf(negativeYearString) === -1)
) {
    Date.prototype.toISOString = function toISOString() {
        var result, length, value, year, month;
        if (!isFinite(this)) {
            throw new RangeError("Date.prototype.toISOString called on non-finite value.");
        }

        year = this.getUTCFullYear();

        month = this.getUTCMonth();
        // see https://github.com/kriskowal/es5-shim/issues/111
        year += Math.floor(month / 12);
        month = (month % 12 + 12) % 12;

        // the date time string format is specified in 15.9.1.15.
        result = [month + 1, this.getUTCDate(),
            this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds()];
        year = (
            (year < 0 ? "-" : (year > 9999 ? "+" : "")) +
            ("00000" + Math.abs(year))
            .slice(0 <= year && year <= 9999 ? -4 : -6)
        );

        length = result.length;
        while (length--) {
            value = result[length];
            // pad months, days, hours, minutes, and seconds to have two
            // digits.
            if (value < 10) {
                result[length] = "0" + value;
            }
        }
        // pad milliseconds to have three digits.
        return (
            year + "-" + result.slice(0, 2).join("-") +
            "T" + result.slice(2).join(":") + "." +
            ("000" + this.getUTCMilliseconds()).slice(-3) + "Z"
        );
    };
}


// ES5 15.9.5.44
// http://es5.github.com/#x15.9.5.44
// This function provides a String representation of a Date object for use by
// JSON.stringify (15.12.3).
var dateToJSONIsSupported = false;
try {
    dateToJSONIsSupported = (
        Date.prototype.toJSON &&
        new Date(NaN).toJSON() === null &&
        new Date(negativeDate).toJSON().indexOf(negativeYearString) !== -1 &&
        Date.prototype.toJSON.call({ // generic
            toISOString: function () {
                return true;
            }
        })
    );
} catch (e) {
}
if (!dateToJSONIsSupported) {
    Date.prototype.toJSON = function toJSON(key) {
        // When the toJSON method is called with argument key, the following
        // steps are taken:

        // 1.  Let O be the result of calling ToObject, giving it the this
        // value as its argument.
        // 2. Let tv be toPrimitive(O, hint Number).
        var o = Object(this),
            tv = toPrimitive(o),
            toISO;
        // 3. If tv is a Number and is not finite, return null.
        if (typeof tv === "number" && !isFinite(tv)) {
            return null;
        }
        // 4. Let toISO be the result of calling the [[Get]] internal method of
        // O with argument "toISOString".
        toISO = o.toISOString;
        // 5. If IsCallable(toISO) is false, throw a TypeError exception.
        if (typeof toISO != "function") {
            throw new TypeError("toISOString property is not callable");
        }
        // 6. Return the result of calling the [[Call]] internal method of
        //  toISO with O as the this value and an empty argument list.
        return toISO.call(o);

        // NOTE 1 The argument is ignored.

        // NOTE 2 The toJSON function is intentionally generic; it does not
        // require that its this value be a Date object. Therefore, it can be
        // transferred to other kinds of objects for use as a method. However,
        // it does require that any such object have a toISOString method. An
        // object is free to use the argument key to filter its
        // stringification.
    };
}

// ES5 15.9.4.2
// http://es5.github.com/#x15.9.4.2
// based on work shared by Daniel Friesen (dantman)
// http://gist.github.com/303249
if (!Date.parse || "Date.parse is buggy") {
    // XXX global assignment won't work in embeddings that use
    // an alternate object for the context.
    Date = (function(NativeDate) {

        // Date.length === 7
        function Date(Y, M, D, h, m, s, ms) {
            var length = arguments.length;
            if (this instanceof NativeDate) {
                var date = length == 1 && String(Y) === Y ? // isString(Y)
                    // We explicitly pass it through parse:
                    new NativeDate(Date.parse(Y)) :
                    // We have to manually make calls depending on argument
                    // length here
                    length >= 7 ? new NativeDate(Y, M, D, h, m, s, ms) :
                    length >= 6 ? new NativeDate(Y, M, D, h, m, s) :
                    length >= 5 ? new NativeDate(Y, M, D, h, m) :
                    length >= 4 ? new NativeDate(Y, M, D, h) :
                    length >= 3 ? new NativeDate(Y, M, D) :
                    length >= 2 ? new NativeDate(Y, M) :
                    length >= 1 ? new NativeDate(Y) :
                                  new NativeDate();
                // Prevent mixups with unfixed Date object
                date.constructor = Date;
                return date;
            }
            return NativeDate.apply(this, arguments);
        };

        // 15.9.1.15 Date Time String Format.
        var isoDateExpression = new RegExp("^" +
            "(\\d{4}|[\+\-]\\d{6})" + // four-digit year capture or sign +
                                      // 6-digit extended year
            "(?:-(\\d{2})" + // optional month capture
            "(?:-(\\d{2})" + // optional day capture
            "(?:" + // capture hours:minutes:seconds.milliseconds
                "T(\\d{2})" + // hours capture
                ":(\\d{2})" + // minutes capture
                "(?:" + // optional :seconds.milliseconds
                    ":(\\d{2})" + // seconds capture
                    "(?:(\\.\\d{1,}))?" + // milliseconds capture
                ")?" +
            "(" + // capture UTC offset component
                "Z|" + // UTC capture
                "(?:" + // offset specifier +/-hours:minutes
                    "([-+])" + // sign capture
                    "(\\d{2})" + // hours offset capture
                    ":(\\d{2})" + // minutes offset capture
                ")" +
            ")?)?)?)?" +
        "$");

        var months = [
            0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365
        ];

        function dayFromMonth(year, month) {
            var t = month > 1 ? 1 : 0;
            return (
                months[month] +
                Math.floor((year - 1969 + t) / 4) -
                Math.floor((year - 1901 + t) / 100) +
                Math.floor((year - 1601 + t) / 400) +
                365 * (year - 1970)
            );
        }

        // Copy any custom methods a 3rd party library may have added
        for (var key in NativeDate) {
            Date[key] = NativeDate[key];
        }

        // Copy "native" methods explicitly; they may be non-enumerable
        Date.now = NativeDate.now;
        Date.UTC = NativeDate.UTC;
        Date.prototype = NativeDate.prototype;
        Date.prototype.constructor = Date;

        // Upgrade Date.parse to handle simplified ISO 8601 strings
        Date.parse = function parse(string) {
            var match = isoDateExpression.exec(string);
            if (match) {
                // parse months, days, hours, minutes, seconds, and milliseconds
                // provide default values if necessary
                // parse the UTC offset component
                var year = Number(match[1]),
                    month = Number(match[2] || 1) - 1,
                    day = Number(match[3] || 1) - 1,
                    hour = Number(match[4] || 0),
                    minute = Number(match[5] || 0),
                    second = Number(match[6] || 0),
                    millisecond = Math.floor(Number(match[7] || 0) * 1000),
                    // When time zone is missed, local offset should be used
                    // (ES 5.1 bug)
                    // see https://bugs.ecmascript.org/show_bug.cgi?id=112
                    offset = !match[4] || match[8] ?
                        0 : Number(new NativeDate(1970, 0)),
                    signOffset = match[9] === "-" ? 1 : -1,
                    hourOffset = Number(match[10] || 0),
                    minuteOffset = Number(match[11] || 0),
                    result;
                if (
                    hour < (
                        minute > 0 || second > 0 || millisecond > 0 ?
                        24 : 25
                    ) &&
                    minute < 60 && second < 60 && millisecond < 1000 &&
                    month > -1 && month < 12 && hourOffset < 24 &&
                    minuteOffset < 60 && // detect invalid offsets
                    day > -1 &&
                    day < (
                        dayFromMonth(year, month + 1) -
                        dayFromMonth(year, month)
                    )
                ) {
                    result = (
                        (dayFromMonth(year, month) + day) * 24 +
                        hour +
                        hourOffset * signOffset
                    ) * 60;
                    result = (
                        (result + minute + minuteOffset * signOffset) * 60 +
                        second
                    ) * 1000 + millisecond + offset;
                    if (-8.64e15 <= result && result <= 8.64e15) {
                        return result;
                    }
                }
                return NaN;
            }
            return NativeDate.parse.apply(this, arguments);
        };

        return Date;
    })(Date);
}

// ES5 15.9.4.4
// http://es5.github.com/#x15.9.4.4
if (!Date.now) {
    Date.now = function now() {
        return new Date().getTime();
    };
}


//
// Number
// ======
//

// ES5.1 15.7.4.5
// http://es5.github.com/#x15.7.4.5
if (!Number.prototype.toFixed || (0.00008).toFixed(3) !== '0.000' || (0.9).toFixed(0) === '0' || (1.255).toFixed(2) !== '1.25' || (1000000000000000128).toFixed(0) !== "1000000000000000128") {
    // Hide these variables and functions
    (function () {
        var base, size, data, i;

        base = 1e7;
        size = 6;
        data = [0, 0, 0, 0, 0, 0];

        function multiply(n, c) {
            var i = -1;
            while (++i < size) {
                c += n * data[i];
                data[i] = c % base;
                c = Math.floor(c / base);
            }
        }

        function divide(n) {
            var i = size, c = 0;
            while (--i >= 0) {
                c += data[i];
                data[i] = Math.floor(c / n);
                c = (c % n) * base;
            }
        }

        function toString() {
            var i = size;
            var s = '';
            while (--i >= 0) {
                if (s !== '' || i === 0 || data[i] !== 0) {
                    var t = String(data[i]);
                    if (s === '') {
                        s = t;
                    } else {
                        s += '0000000'.slice(0, 7 - t.length) + t;
                    }
                }
            }
            return s;
        }

        function pow(x, n, acc) {
            return (n === 0 ? acc : (n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc)));
        }

        function log(x) {
            var n = 0;
            while (x >= 4096) {
                n += 12;
                x /= 4096;
            }
            while (x >= 2) {
                n += 1;
                x /= 2;
            }
            return n;
        }

        Number.prototype.toFixed = function (fractionDigits) {
            var f, x, s, m, e, z, j, k;

            // Test for NaN and round fractionDigits down
            f = Number(fractionDigits);
            f = f !== f ? 0 : Math.floor(f);

            if (f < 0 || f > 20) {
                throw new RangeError("Number.toFixed called with invalid number of decimals");
            }

            x = Number(this);

            // Test for NaN
            if (x !== x) {
                return "NaN";
            }

            // If it is too big or small, return the string value of the number
            if (x <= -1e21 || x >= 1e21) {
                return String(x);
            }

            s = "";

            if (x < 0) {
                s = "-";
                x = -x;
            }

            m = "0";

            if (x > 1e-21) {
                // 1e-21 < x < 1e21
                // -70 < log2(x) < 70
                e = log(x * pow(2, 69, 1)) - 69;
                z = (e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1));
                z *= 0x10000000000000; // Math.pow(2, 52);
                e = 52 - e;

                // -18 < e < 122
                // x = z / 2 ^ e
                if (e > 0) {
                    multiply(0, z);
                    j = f;

                    while (j >= 7) {
                        multiply(1e7, 0);
                        j -= 7;
                    }

                    multiply(pow(10, j, 1), 0);
                    j = e - 1;

                    while (j >= 23) {
                        divide(1 << 23);
                        j -= 23;
                    }

                    divide(1 << j);
                    multiply(1, 1);
                    divide(2);
                    m = toString();
                } else {
                    multiply(0, z);
                    multiply(1 << (-e), 0);
                    m = toString() + '0.00000000000000000000'.slice(2, 2 + f);
                }
            }

            if (f > 0) {
                k = m.length;

                if (k <= f) {
                    m = s + '0.0000000000000000000'.slice(0, f - k + 2) + m;
                } else {
                    m = s + m.slice(0, k - f) + '.' + m.slice(k - f);
                }
            } else {
                m = s + m;
            }

            return m;
        }
    }());
}


//
// String
// ======
//


// ES5 15.5.4.14
// http://es5.github.com/#x15.5.4.14
// [bugfix, chrome]
// If separator is undefined, then the result array contains just one String,
// which is the this value (converted to a String). If limit is not undefined,
// then the output array is truncated so that it contains no more than limit
// elements.
// "0".split(undefined, 0) -> []
if("0".split(void 0, 0).length) {
    var string_split = String.prototype.split;
    String.prototype.split = function(separator, limit) {
        if(separator === void 0 && limit === 0)return [];
        return string_split.apply(this, arguments);
    }
}

// ECMA-262, 3rd B.2.3
// Note an ECMAScript standart, although ECMAScript 3rd Edition has a
// non-normative section suggesting uniform semantics and it should be
// normalized across all browsers
// [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
if("".substr && "0b".substr(-1) !== "b") {
    var string_substr = String.prototype.substr;
    /**
     *  Get the substring of a string
     *  @param  {integer}  start   where to start the substring
     *  @param  {integer}  length  how many characters to return
     *  @return {string}
     */
    String.prototype.substr = function(start, length) {
        return string_substr.call(
            this,
            start < 0 ? ((start = this.length + start) < 0 ? 0 : start) : start,
            length
        );
    }
}

// ES5 15.5.4.20
// http://es5.github.com/#x15.5.4.20
var ws = "\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003" +
    "\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028" +
    "\u2029\uFEFF";
if (!String.prototype.trim || ws.trim()) {
    // http://blog.stevenlevithan.com/archives/faster-trim-javascript
    // http://perfectionkills.com/whitespace-deviations/
    ws = "[" + ws + "]";
    var trimBeginRegexp = new RegExp("^" + ws + ws + "*"),
        trimEndRegexp = new RegExp(ws + ws + "*$");
    String.prototype.trim = function trim() {
        if (this === undefined || this === null) {
            throw new TypeError("can't convert "+this+" to object");
        }
        return String(this)
            .replace(trimBeginRegexp, "")
            .replace(trimEndRegexp, "");
    };
}

//
// Util
// ======
//

// ES5 9.4
// http://es5.github.com/#x9.4
// http://jsperf.com/to-integer

function toInteger(n) {
    n = +n;
    if (n !== n) { // isNaN
        n = 0;
    } else if (n !== 0 && n !== (1/0) && n !== -(1/0)) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
    }
    return n;
}

function isPrimitive(input) {
    var type = typeof input;
    return (
        input === null ||
        type === "undefined" ||
        type === "boolean" ||
        type === "number" ||
        type === "string"
    );
}

function toPrimitive(input) {
    var val, valueOf, toString;
    if (isPrimitive(input)) {
        return input;
    }
    valueOf = input.valueOf;
    if (typeof valueOf === "function") {
        val = valueOf.call(input);
        if (isPrimitive(val)) {
            return val;
        }
    }
    toString = input.toString;
    if (typeof toString === "function") {
        val = toString.call(input);
        if (isPrimitive(val)) {
            return val;
        }
    }
    throw new TypeError();
}

// ES5 9.9
// http://es5.github.com/#x9.9
var toObject = function (o) {
    if (o == null) { // this matches both null and undefined
        throw new TypeError("can't convert "+o+" to object");
    }
    return Object(o);
};

});

},{}],7:[function(require,module,exports){
void function(root){

	'use strict'

	var create = Object.create || function(o){
		var F = function(){}
		F.prototype = o
		return new F()
	}

	var extend = function(to, from){
		for ( var p in from ) to[p] = from[p]
		return to
	}

	// Library object - a base object to be extended
	var Viral = {

		// create an inheriting object, with added or changed methods or properties
		extend: function(props){
			return extend(create(this), props)
		},

		// create a new instance of an object, calling an init method if available
		make: function(){
			var obj = create(this)
			if ( typeof obj.init === 'function' ) obj.init.apply(obj, arguments)
			return obj
		}
	}

	// module dance
	if ( typeof module !== 'undefined' && module.exports ) module.exports = Viral
	else if ( typeof define === 'function' && define.amd ) define(Viral)
	else                                                   root.Viral = Viral

}(this)

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmF0aW9uYWxzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JhdGlvbmFscy9ub2RlX21vZHVsZXMvYmlnaW50ZWdlci9iaWdpbnRlZ2VyLmpzIiwibm9kZV9tb2R1bGVzL3JhdGlvbmFscy9ub2RlX21vZHVsZXMvdG90ZW1pemVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JhdGlvbmFscy9ub2RlX21vZHVsZXMvdG90ZW1pemVyL25vZGVfbW9kdWxlcy9lczUtc2hpbS9lczUtc2hhbS5qcyIsIm5vZGVfbW9kdWxlcy9yYXRpb25hbHMvbm9kZV9tb2R1bGVzL3RvdGVtaXplci9ub2RlX21vZHVsZXMvZXM1LXNoaW0vZXM1LXNoaW0uanMiLCJub2RlX21vZHVsZXMvcmF0aW9uYWxzL25vZGVfbW9kdWxlcy92aXJhbC92aXJhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbmxEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNWJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaHNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciByID0gcmVxdWlyZSgncmF0aW9uYWxzJyk7XG52YXIgT3BlcmF0b3I7XG4oZnVuY3Rpb24gKE9wZXJhdG9yKSB7XG4gICAgT3BlcmF0b3JbT3BlcmF0b3JbXCJQbHVzXCJdID0gMF0gPSBcIlBsdXNcIjtcbiAgICBPcGVyYXRvcltPcGVyYXRvcltcIk1pbnVzXCJdID0gMV0gPSBcIk1pbnVzXCI7XG4gICAgT3BlcmF0b3JbT3BlcmF0b3JbXCJNdWx0aXBseVwiXSA9IDJdID0gXCJNdWx0aXBseVwiO1xuICAgIE9wZXJhdG9yW09wZXJhdG9yW1wiRGl2aWRlXCJdID0gM10gPSBcIkRpdmlkZVwiO1xufSkoT3BlcmF0b3IgfHwgKE9wZXJhdG9yID0ge30pKTtcbnZhciBTdGF0ZTtcbihmdW5jdGlvbiAoU3RhdGUpIHtcbiAgICBTdGF0ZVtTdGF0ZVtcIkluaXRcIl0gPSAwXSA9IFwiSW5pdFwiO1xuICAgIFN0YXRlW1N0YXRlW1wiUHJvY2Vzc1wiXSA9IDFdID0gXCJQcm9jZXNzXCI7XG4gICAgU3RhdGVbU3RhdGVbXCJSZXN1bHRcIl0gPSAyXSA9IFwiUmVzdWx0XCI7XG59KShTdGF0ZSB8fCAoU3RhdGUgPSB7fSkpO1xudmFyIENhbGMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENhbGMoc2VsZWN0b3IpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuYXBwbHkoKTtcbiAgICB9XG4gICAgQ2FsYy5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZXhwcmVzc2lvbiA9ICcnO1xuICAgICAgICB0aGlzLnN0YXRlID0gMCAvKiBJbml0ICovO1xuICAgICAgICB0aGlzLmFwcGx5KCk7XG4gICAgfTtcbiAgICBDYWxjLnByb3RvdHlwZS5lcXVhbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5leHByZXNzaW9uID0gdGhpcy5ldmFsKCkudG9TdHJpbmcoKS5yZXBsYWNlKC9cXC8xJC8sICcnKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IDIgLyogUmVzdWx0ICovO1xuICAgICAgICB0aGlzLmFwcGx5KCk7XG4gICAgfTtcbiAgICBDYWxjLnByb3RvdHlwZS5wdXRPcGVyYXRvciA9IGZ1bmN0aW9uIChvcGVyYXRvcikge1xuICAgICAgICB0aGlzLmV4cHJlc3Npb24gKz0gb3BlcmF0b3I7XG4gICAgICAgIHRoaXMuc3RhdGUgPSAxIC8qIFByb2Nlc3MgKi87XG4gICAgICAgIHRoaXMuYXBwbHkoKTtcbiAgICB9O1xuICAgIENhbGMucHJvdG90eXBlLnB1dERpZ2l0ID0gZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT0gMiAvKiBSZXN1bHQgKi8pIHtcbiAgICAgICAgICAgIHRoaXMuZXhwcmVzc2lvbiA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXhwcmVzc2lvbiArPSBkLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSAxIC8qIFByb2Nlc3MgKi87XG4gICAgICAgIHRoaXMuYXBwbHkoKTtcbiAgICB9O1xuICAgIENhbGMucHJvdG90eXBlLmFwcGx5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNlbGVjdG9yLnZhbCh0aGlzLmV4cHJlc3Npb24pO1xuICAgIH07XG4gICAgQ2FsYy5wcm90b3R5cGUuaXNEaWdpdCA9IGZ1bmN0aW9uIChlLCBpKSB7XG4gICAgICAgIHJldHVybiBlLmNoYXJDb2RlQXQoaSkgPj0gJzAnLmNoYXJDb2RlQXQoMCkgJiYgZS5jaGFyQ29kZUF0KGkpIDw9ICc5Jy5jaGFyQ29kZUF0KDApO1xuICAgIH07XG4gICAgQ2FsYy5wcm90b3R5cGUudG9EaWdpdCA9IGZ1bmN0aW9uIChlLCBpKSB7XG4gICAgICAgIHJldHVybiBlLmNoYXJDb2RlQXQoaSkgLSAnMCcuY2hhckNvZGVBdCgwKTtcbiAgICB9O1xuICAgIENhbGMucHJvdG90eXBlLmV2YWxOdW1iZXIgPSBmdW5jdGlvbiAoZSwgaSkge1xuICAgICAgICB2YXIgbiA9IDA7XG4gICAgICAgIHdoaWxlICh0aGlzLmlzRGlnaXQoZSwgaSkpIHtcbiAgICAgICAgICAgIG4gPSBuICogMTAgKyB0aGlzLnRvRGlnaXQoZSwgaSk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtyKG4pLCBpXTtcbiAgICB9O1xuICAgIENhbGMucHJvdG90eXBlLmV2YWxUZXJtID0gZnVuY3Rpb24gKGUsIGkpIHtcbiAgICAgICAgaWYgKGUuY2hhckF0KGkpID09ICcoJykge1xuICAgICAgICAgICAgdmFyIHR1cGxlID0gdGhpcy5ldmFsRXhwcmVzc2lvbihlLCBpICsgMSk7XG4gICAgICAgICAgICB0dXBsZVsxXSsrO1xuICAgICAgICAgICAgcmV0dXJuIHR1cGxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXZhbE51bWJlcihlLCBpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2FsYy5wcm90b3R5cGUuZXZhbEZhY3RvciA9IGZ1bmN0aW9uIChlLCBpKSB7XG4gICAgICAgIHZhciBsZWZ0ID0gdGhpcy5ldmFsVGVybShlLCBpKTtcbiAgICAgICAgd2hpbGUgKGUuY2hhckF0KGxlZnRbMV0pID09ICcqJyB8fCBlLmNoYXJBdChsZWZ0WzFdKSA9PSAnLycpIHtcbiAgICAgICAgICAgIGlmIChlLmNoYXJBdChsZWZ0WzFdKSA9PSAnKicpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmlnaHQgPSB0aGlzLmV2YWxUZXJtKGUsIGxlZnRbMV0gKyAxKTtcbiAgICAgICAgICAgICAgICBsZWZ0WzBdID0gbGVmdFswXS5tdWwocmlnaHRbMF0pO1xuICAgICAgICAgICAgICAgIGxlZnRbMV0gPSByaWdodFsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciByaWdodCA9IHRoaXMuZXZhbFRlcm0oZSwgbGVmdFsxXSArIDEpO1xuICAgICAgICAgICAgICAgIGxlZnRbMF0gPSBsZWZ0WzBdLmRpdihyaWdodFswXSk7XG4gICAgICAgICAgICAgICAgbGVmdFsxXSA9IHJpZ2h0WzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsZWZ0O1xuICAgIH07XG4gICAgQ2FsYy5wcm90b3R5cGUuZXZhbEV4cHJlc3Npb24gPSBmdW5jdGlvbiAoZSwgaSkge1xuICAgICAgICB2YXIgbGVmdCA9IHRoaXMuZXZhbEZhY3RvcihlLCBpKTtcbiAgICAgICAgd2hpbGUgKGUuY2hhckF0KGxlZnRbMV0pID09ICcrJyB8fCBlLmNoYXJBdChsZWZ0WzFdKSA9PSAnLScpIHtcbiAgICAgICAgICAgIGlmIChlLmNoYXJBdChsZWZ0WzFdKSA9PSAnKycpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmlnaHQgPSB0aGlzLmV2YWxGYWN0b3IoZSwgbGVmdFsxXSArIDEpO1xuICAgICAgICAgICAgICAgIGxlZnRbMF0gPSBsZWZ0WzBdLmFkZChyaWdodFswXSk7XG4gICAgICAgICAgICAgICAgbGVmdFsxXSA9IHJpZ2h0WzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHJpZ2h0ID0gdGhpcy5ldmFsRmFjdG9yKGUsIGxlZnRbMV0gKyAxKTtcbiAgICAgICAgICAgICAgICBsZWZ0WzBdID0gbGVmdFswXS5zdWIocmlnaHRbMF0pO1xuICAgICAgICAgICAgICAgIGxlZnRbMV0gPSByaWdodFsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGVmdDtcbiAgICB9O1xuICAgIENhbGMucHJvdG90eXBlLmV2YWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0dXBsZSA9IHRoaXMuZXZhbEV4cHJlc3Npb24odGhpcy5leHByZXNzaW9uLCAwKTtcbiAgICAgICAgcmV0dXJuIHR1cGxlWzBdO1xuICAgIH07XG4gICAgcmV0dXJuIENhbGM7XG59KSgpO1xuJChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhbGMgPSBuZXcgQ2FsYygkKCcjcmVzdWx0JykpO1xuICAgICQoJyNidG4tMCcpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FsYy5wdXREaWdpdCgwKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQoJyNidG4tMScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FsYy5wdXREaWdpdCgxKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQoJyNidG4tMicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FsYy5wdXREaWdpdCgyKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQoJyNidG4tMycpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FsYy5wdXREaWdpdCgzKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQoJyNidG4tNCcpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FsYy5wdXREaWdpdCg0KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQoJyNidG4tNScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FsYy5wdXREaWdpdCg1KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQoJyNidG4tNicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FsYy5wdXREaWdpdCg2KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQoJyNidG4tNycpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FsYy5wdXREaWdpdCg3KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQoJyNidG4tOCcpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FsYy5wdXREaWdpdCg4KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQoJyNidG4tOScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FsYy5wdXREaWdpdCg5KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQoJyNidG4tcGx1cycpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FsYy5wdXRPcGVyYXRvcignKycpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgJCgnI2J0bi1taW51cycpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FsYy5wdXRPcGVyYXRvcignLScpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgJCgnI2J0bi1tdWx0aXBseScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FsYy5wdXRPcGVyYXRvcignKicpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgJCgnI2J0bi1kaXZpZGUnKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhbGMucHV0T3BlcmF0b3IoJy8nKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQoJyNidG4tZXF1YWwnKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhbGMuZXF1YWwoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQoJyNidG4tY2xlYXInKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhbGMuY2xlYXIoKTtcbiAgICAgICAgJCgnI2J0bi1lcXVhbCcpLmZvY3VzKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICAkKCcjYnRuLWxlZnQnKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhbGMucHV0T3BlcmF0b3IoJygnKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQoJyNidG4tcmlnaHQnKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhbGMucHV0T3BlcmF0b3IoJyknKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQoZG9jdW1lbnQpLmtleXByZXNzKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIDQ4OlxuICAgICAgICAgICAgY2FzZSA0OTpcbiAgICAgICAgICAgIGNhc2UgNTA6XG4gICAgICAgICAgICBjYXNlIDUxOlxuICAgICAgICAgICAgY2FzZSA1MjpcbiAgICAgICAgICAgIGNhc2UgNTM6XG4gICAgICAgICAgICBjYXNlIDU0OlxuICAgICAgICAgICAgY2FzZSA1NTpcbiAgICAgICAgICAgIGNhc2UgNTY6XG4gICAgICAgICAgICBjYXNlIDU3OlxuICAgICAgICAgICAgICAgIGNhbGMucHV0RGlnaXQoZS5rZXlDb2RlIC0gNDgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0MzpcbiAgICAgICAgICAgICAgICBjYWxjLnB1dE9wZXJhdG9yKCcrJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ1OlxuICAgICAgICAgICAgICAgIGNhbGMucHV0T3BlcmF0b3IoJy0nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDI6XG4gICAgICAgICAgICAgICAgY2FsYy5wdXRPcGVyYXRvcignKicpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0NzpcbiAgICAgICAgICAgICAgICBjYWxjLnB1dE9wZXJhdG9yKCcvJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgY2FzZSA2MTpcbiAgICAgICAgICAgICAgICBjYWxjLmVxdWFsKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgICAgIGNhbGMucHV0T3BlcmF0b3IoJygnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDE6XG4gICAgICAgICAgICAgICAgY2FsYy5wdXRPcGVyYXRvcignKScpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgJCgnI2J0bi1lcXVhbCcpLmZvY3VzKCk7XG59KTtcbiIsInZvaWQgZnVuY3Rpb24ocm9vdCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCJcblxuICAgIHZhciBudW1iZXJzID0ge31cbiAgICAgICAgLCB1ID0gcmVxdWlyZSgndG90ZW1pemVyJylcbiAgICAgICAgLCB2aXJhbCA9IHJlcXVpcmUoJ3ZpcmFsJylcbiAgICAgICAgLCByYXRpb25hbFxuICAgICAgICAsIGFwcGx5ID0gdS5saWJlcmF0ZShGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkpXG4gICAgICAgICwgYmlnID0gcmVxdWlyZSgnYmlnaW50ZWdlcicpLkJpZ0ludGVnZXJcbiAgICAgICAgO1xuXG5cbiAgICBmdW5jdGlvbiBjaGVja0lucHV0KGlucHV0KXsgcmV0dXJuIChpbnB1dCAmJiBpbnB1dC5pbml0ID09PSAgcmF0aW9uYWwuaW5pdCkgPyBpbnB1dCA6IHJhdChpbnB1dCkgfVxuXG4gICAgZnVuY3Rpb24gZ2NkKGEsIGIpe1xuICAgICAgICB2YXIgdDtcbiAgICAgICAgYSA9IGEuYWJzKClcbiAgICAgICAgYiA9IGIuYWJzKClcbiAgICAgICAgd2hpbGUgKGIuaXNQb3NpdGl2ZSgpKSB7XG4gICAgICAgICAgICB0ID0gYlxuICAgICAgICAgICAgYiA9IGEucmVtYWluZGVyKGIpXG4gICAgICAgICAgICBhID0gdFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29tcGFyZShhLCBiKXsgcmV0dXJuIGFbMF0ubXVsdGlwbHkoYlsxXSkuY29tcGFyZShhWzFdLm11bHRpcGx5KGJbMF0pKSB9XG5cbiAgICBmdW5jdGlvbiBjb21wYXJlQWJzKGEsIGIpeyByZXR1cm4gYVswXS5tdWx0aXBseShiWzFdKS5jb21wYXJlQWJzKGFbMV0ubXVsdGlwbHkoYlswXSkpIH1cblxuICAgIGZ1bmN0aW9uIGxjbShhLCBiKXsgcmV0dXJuIChhLm11bHRpcGx5KGIpKS5hYnMoKS5kaXZpZGUoZ2NkKGEsYikpIH1cblxuICAgIGZ1bmN0aW9uIGhhc2hpZnkocil7IHJldHVybiByWzBdKycvJytyWzFdIH1cblxuICAgIGZ1bmN0aW9uIGRpc3BsYXkocil7IHJldHVybiAnJytyWzBdKyhyWzFdIT0xPycvJytyWzFdOicnKSB9XG5cbiAgICBmdW5jdGlvbiB2YWwocil7IHJldHVybiByWzBdLnRvSlNWYWx1ZSgpL3JbMV0udG9KU1ZhbHVlKCkgfVxuXG4gICAgZnVuY3Rpb24gYWRkKHgsIHkpeyByZXR1cm4gcmF0KHhbMF0ubXVsdGlwbHkoeVsxXSkuYWRkKHlbMF0ubXVsdGlwbHkoeFsxXSkpLCB4WzFdLm11bHRpcGx5KHlbMV0pKSB9XG5cbiAgICBmdW5jdGlvbiBzdWJ0cmFjdCh4LCB5KXsgcmV0dXJuIHJhdCh4WzBdLm11bHRpcGx5KHlbMV0pLnN1YnRyYWN0KHlbMF0ubXVsdGlwbHkoeFsxXSkpLCB4WzFdLm11bHRpcGx5KHlbMV0pKSB9XG5cbiAgICBmdW5jdGlvbiBtdWx0aXBseSh4LCB5KXsgcmV0dXJuIHJhdCh4WzBdLm11bHRpcGx5KHlbMF0pLCB4WzFdLm11bHRpcGx5KHlbMV0pKSB9XG5cbiAgICBmdW5jdGlvbiBkaXZpZGUoeCwgeSl7IHJldHVybiByYXQoeFswXS5tdWx0aXBseSh5WzFdKSwgeFsxXS5tdWx0aXBseSh5WzBdKSkgfVxuXG4gICAgcmF0aW9uYWwgPSB2aXJhbC5leHRlbmQoe1xuICAgICAgICBpbml0IDogZnVuY3Rpb24obnVtZXJhdG9yLCBkZW5vbWluYXRvcil7XG4gICAgICAgICAgICB0aGlzWzBdID0gbnVtZXJhdG9yXG4gICAgICAgICAgICB0aGlzWzFdID0gZGVub21pbmF0b3JcbiAgICAgICAgfVxuICAgICAgICAsIHRvU3RyaW5nIDogdS5lbnNsYXZlKGhhc2hpZnkpXG4gICAgICAgICwgZGlzcGxheSA6IHUuZW5zbGF2ZShkaXNwbGF5KVxuXG4gICAgICAgICwgdmFsIDogdS5lbnNsYXZlKHZhbClcblxuICAgICAgICAsIGFkZCA6IHUuZW5zbGF2ZShhZGQpXG4gICAgICAgICwgcGx1cyA6IHUuZW5zbGF2ZShhZGQpXG5cbiAgICAgICAgLCBzdWJ0cmFjdCA6IHUuZW5zbGF2ZShzdWJ0cmFjdClcbiAgICAgICAgLCBtaW51cyA6IHUuZW5zbGF2ZShzdWJ0cmFjdClcbiAgICAgICAgLCBzdWI6IHUuZW5zbGF2ZShzdWJ0cmFjdClcblxuICAgICAgICAsIG11bHRpcGx5IDogdS5lbnNsYXZlKG11bHRpcGx5KVxuICAgICAgICAsIHRpbWVzIDogdS5lbnNsYXZlKG11bHRpcGx5KVxuICAgICAgICAsIG11bDogdS5lbnNsYXZlKG11bHRpcGx5KVxuXG4gICAgICAgICwgZGl2aWRlIDogdS5lbnNsYXZlKGRpdmlkZSlcbiAgICAgICAgLCBwZXIgOiB1LmVuc2xhdmUoZGl2aWRlKVxuICAgICAgICAsIGRpdjogdS5lbnNsYXZlKGRpdmlkZSlcblxuICAgICAgICAsIGNvbXBhcmUgOiB1LmVuc2xhdmUoY29tcGFyZSlcbiAgICAgICAgLCBjb21wYXJlQWJzIDogdS5lbnNsYXZlKGNvbXBhcmVBYnMpXG5cbiAgICB9KVxuXG5cbiAgICBmdW5jdGlvbiByYXQobnVtZXJhdG9yLCBkZW5vbWluYXRvcil7XG5cbiAgICAgICAgdmFyIGluZGV4LCBkaXZpc29yLCBkZW5kZWNpbWFscyA9IDAsIG51bWRlY2ltYWxzID0gMFxuXG4gICAgICAgIGlmICggdHlwZW9mIG51bWVyYXRvciAhPSAnbnVtYmVyJyAmJiB0eXBlb2YgbnVtZXJhdG9yICE9ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgJiYgKCEgdS5pc0ludChudW1lcmF0b3IpKSApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBhcmd1bWVudCAnK251bWVyYXRvcisnICgnKyh0eXBlb2YgbnVtZXJhdG9yKSsnKScpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCB0eXBlb2YgZGVub21pbmF0b3IgIT0gJ251bWJlcicgJiYgdHlwZW9mIGRlbm9taW5hdG9yICE9ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgJiYgKCEgdS5pc0ludChkZW5vbWluYXRvcikpICkge1xuICAgICAgICAgICAgZGVub21pbmF0b3IgPSAxXG4gICAgICAgIH1cbiAgICAgICAgbnVtZXJhdG9yID0gbnVtZXJhdG9yKycnXG4gICAgICAgIGRlbm9taW5hdG9yID0gZGVub21pbmF0b3IrJydcblxuICAgICAgICBpZiAoIG51bWVyYXRvci5pbmRleE9mKCcuJykgPiAtMSApIHtcbiAgICAgICAgICAgIG51bWRlY2ltYWxzID0gTWF0aC5wb3coMTAsIG51bWVyYXRvci5sZW5ndGggLSBudW1lcmF0b3IuaW5kZXhPZignLicpIC0gMSlcbiAgICAgICAgICAgIG51bWVyYXRvciA9IG51bWVyYXRvci5zcGxpdCgnLicpLmpvaW4oJycpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGRlbm9taW5hdG9yLmluZGV4T2YoJy4nKSA+IC0xICkge1xuICAgICAgICAgICAgZGVuZGVjaW1hbHMgPSBNYXRoLnBvdygxMCwgZGVub21pbmF0b3IubGVuZ3RoIC0gZGVub21pbmF0b3IuaW5kZXhPZignLicpIC0gMSlcbiAgICAgICAgICAgIGRlbm9taW5hdG9yID0gZGVub21pbmF0b3Iuc3BsaXQoJy4nKS5qb2luKCcnKVxuICAgICAgICB9XG5cbiAgICAgICAgZGVub21pbmF0b3IgPSBiaWcucGFyc2UoZGVub21pbmF0b3IpXG4gICAgICAgIG51bWVyYXRvciA9IGJpZy5wYXJzZShudW1lcmF0b3IpXG5cbiAgICAgICAgaWYgKCBkZW5kZWNpbWFscyA+IDAgKSB7XG4gICAgICAgICAgICBudW1lcmF0b3IgPSBudW1lcmF0b3IubXVsdGlwbHkoZGVuZGVjaW1hbHMpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIG51bWRlY2ltYWxzID4gMCApIHtcbiAgICAgICAgICAgIGRlbm9taW5hdG9yID0gZGVub21pbmF0b3IubXVsdGlwbHkobnVtZGVjaW1hbHMpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGRlbm9taW5hdG9yLmlzWmVybygpICkge1xuXG4gICAgICAgICAgICBpZiAoICEgbnVtZXJhdG9yLmlzWmVybygpICkgbnVtZXJhdG9yID0gYmlnLk9ORVxuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGRpdmlzb3IgPSBnY2QobnVtZXJhdG9yLCBkZW5vbWluYXRvcilcbiAgICAgICAgICAgIGlmICggISBkaXZpc29yLmlzVW5pdCgpICApIHtcbiAgICAgICAgICAgICAgICBudW1lcmF0b3IgPSBudW1lcmF0b3IuZGl2aWRlKGRpdmlzb3IpXG4gICAgICAgICAgICAgICAgZGVub21pbmF0b3IgPSBkZW5vbWluYXRvci5kaXZpZGUoZGl2aXNvcilcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBkZW5vbWluYXRvci5pc05lZ2F0aXZlKCkgKSB7XG4gICAgICAgICAgICAgICAgbnVtZXJhdG9yID0gbnVtZXJhdG9yLm5lZ2F0ZSgpXG4gICAgICAgICAgICAgICAgZGVub21pbmF0b3IgPSBkZW5vbWluYXRvci5uZWdhdGUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaW5kZXggPSBoYXNoaWZ5KFtudW1lcmF0b3IsIGRlbm9taW5hdG9yXSlcblxuICAgICAgICBpZiAoIG51bWJlcnNbaW5kZXhdID09PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICBudW1iZXJzW2luZGV4XSA9IHJhdGlvbmFsLm1ha2UobnVtZXJhdG9yLCBkZW5vbWluYXRvcilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudW1iZXJzW2luZGV4XVxuXG4gICAgfVxuXG4gICAgcmF0LmNoZWNrSW5wdXQgPSBjaGVja0lucHV0XG4gICAgcmF0LmdjZCA9IGZ1bmN0aW9uKGEsIGIpeyByZXR1cm4gcmF0KGdjZChhWzBdLGJbMF0pLCBsY20oYVsxXSxiWzFdKSkgfVxuICAgIHJhdC5sY20gPSBmdW5jdGlvbihhLCBiKXsgcmV0dXJuIHJhdChsY20oYVswXSxiWzBdKSwgZ2NkKGFbMV0sYlsxXSkpIH1cbiAgICByYXQuYWRkID0gYWRkXG4gICAgcmF0LmRpdiA9IGRpdmlkZVxuICAgIHJhdC5zdWIgPSBzdWJ0cmFjdFxuICAgIHJhdC5tdWwgPSBtdWx0aXBseVxuXG4gICAgaWYgKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSByYXRcbiAgICB9IGVsc2Uge1xuICAgICAgICByb290LmZhY3RvcnkgPSByYXRcbiAgICB9XG5cbn0odGhpcylcbiIsIi8qXG5cdEphdmFTY3JpcHQgQmlnSW50ZWdlciBsaWJyYXJ5IHZlcnNpb24gMC45XG5cdGh0dHA6Ly9zaWxlbnRtYXR0LmNvbS9iaWdpbnRlZ2VyL1xuXG5cdENvcHlyaWdodCAoYykgMjAwOSBNYXR0aGV3IENydW1sZXkgPGVtYWlsQG1hdHRoZXdjcnVtbGV5LmNvbT5cblx0Q29weXJpZ2h0IChjKSAyMDEwLDIwMTEgYnkgSm9obiBUb2JleSA8Sm9obi5Ub2JleUBnbWFpbC5jb20+XG5cdExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cblxuXHRTdXBwb3J0IGZvciBhcmJpdHJhcnkgaW50ZXJuYWwgcmVwcmVzZW50YXRpb24gYmFzZSB3YXMgYWRkZWQgYnlcblx0Vml0YWx5IE1hZ2VyeWEuXG4qL1xuXG4vKlxuXHRGaWxlOiBiaWdpbnRlZ2VyLmpzXG5cblx0RXhwb3J0czpcblxuXHRcdDxCaWdJbnRlZ2VyPlxuKi9cbihmdW5jdGlvbihleHBvcnRzKSB7XG5cInVzZSBzdHJpY3RcIjtcbi8qXG5cdENsYXNzOiBCaWdJbnRlZ2VyXG5cdEFuIGFyYml0cmFyaWx5LWxhcmdlIGludGVnZXIuXG5cblx0PEJpZ0ludGVnZXI+IG9iamVjdHMgc2hvdWxkIGJlIGNvbnNpZGVyZWQgaW1tdXRhYmxlLiBOb25lIG9mIHRoZSBcImJ1aWx0LWluXCJcblx0bWV0aG9kcyBtb2RpZnkgKnRoaXMqIG9yIHRoZWlyIGFyZ3VtZW50cy4gQWxsIHByb3BlcnRpZXMgc2hvdWxkIGJlXG5cdGNvbnNpZGVyZWQgcHJpdmF0ZS5cblxuXHRBbGwgdGhlIG1ldGhvZHMgb2YgPEJpZ0ludGVnZXI+IGluc3RhbmNlcyBjYW4gYmUgY2FsbGVkIFwic3RhdGljYWxseVwiLiBUaGVcblx0c3RhdGljIHZlcnNpb25zIGFyZSBjb252ZW5pZW50IGlmIHlvdSBkb24ndCBhbHJlYWR5IGhhdmUgYSA8QmlnSW50ZWdlcj5cblx0b2JqZWN0LlxuXG5cdEFzIGFuIGV4YW1wbGUsIHRoZXNlIGNhbGxzIGFyZSBlcXVpdmFsZW50LlxuXG5cdD4gQmlnSW50ZWdlcig0KS5tdWx0aXBseSg1KTsgLy8gcmV0dXJucyBCaWdJbnRlZ2VyKDIwKTtcblx0PiBCaWdJbnRlZ2VyLm11bHRpcGx5KDQsIDUpOyAvLyByZXR1cm5zIEJpZ0ludGVnZXIoMjApO1xuXG5cdD4gdmFyIGEgPSA0Mjtcblx0PiB2YXIgYSA9IEJpZ0ludGVnZXIudG9KU1ZhbHVlKFwiMGIxMDEwMTBcIik7IC8vIE5vdCBjb21wbGV0ZWx5IHVzZWxlc3MuLi5cbiovXG5cbnZhciBDT05TVFJVQ1QgPSB7fTsgLy8gVW5pcXVlIHRva2VuIHRvIGNhbGwgXCJwcml2YXRlXCIgdmVyc2lvbiBvZiBjb25zdHJ1Y3RvclxuXG4vKlxuXHRDb25zdHJ1Y3RvcjogQmlnSW50ZWdlcigpXG5cdENvbnZlcnQgYSB2YWx1ZSB0byBhIDxCaWdJbnRlZ2VyPi5cblxuXHRBbHRob3VnaCA8QmlnSW50ZWdlcigpPiBpcyB0aGUgY29uc3RydWN0b3IgZm9yIDxCaWdJbnRlZ2VyPiBvYmplY3RzLCBpdCBpc1xuXHRiZXN0IG5vdCB0byBjYWxsIGl0IGFzIGEgY29uc3RydWN0b3IuIElmICpuKiBpcyBhIDxCaWdJbnRlZ2VyPiBvYmplY3QsIGl0IGlzXG5cdHNpbXBseSByZXR1cm5lZCBhcy1pcy4gT3RoZXJ3aXNlLCA8QmlnSW50ZWdlcigpPiBpcyBlcXVpdmFsZW50IHRvIDxwYXJzZT5cblx0d2l0aG91dCBhIHJhZGl4IGFyZ3VtZW50LlxuXG5cdD4gdmFyIG4wID0gQmlnSW50ZWdlcigpOyAgICAgIC8vIFNhbWUgYXMgPEJpZ0ludGVnZXIuWkVSTz5cblx0PiB2YXIgbjEgPSBCaWdJbnRlZ2VyKFwiMTIzXCIpOyAvLyBDcmVhdGUgYSBuZXcgPEJpZ0ludGVnZXI+IHdpdGggdmFsdWUgMTIzXG5cdD4gdmFyIG4yID0gQmlnSW50ZWdlcigxMjMpOyAgIC8vIENyZWF0ZSBhIG5ldyA8QmlnSW50ZWdlcj4gd2l0aCB2YWx1ZSAxMjNcblx0PiB2YXIgbjMgPSBCaWdJbnRlZ2VyKG4yKTsgICAgLy8gUmV0dXJuIG4yLCB1bmNoYW5nZWRcblxuXHRUaGUgY29uc3RydWN0b3IgZm9ybSBvbmx5IHRha2VzIGFuIGFycmF5IGFuZCBhIHNpZ24uICpuKiBtdXN0IGJlIGFuXG5cdGFycmF5IG9mIG51bWJlcnMgaW4gbGl0dGxlLWVuZGlhbiBvcmRlciwgd2hlcmUgZWFjaCBkaWdpdCBpcyBiZXR3ZWVuIDBcblx0YW5kIEJpZ0ludGVnZXIuYmFzZS4gIFRoZSBzZWNvbmQgcGFyYW1ldGVyIHNldHMgdGhlIHNpZ246IC0xIGZvclxuXHRuZWdhdGl2ZSwgKzEgZm9yIHBvc2l0aXZlLCBvciAwIGZvciB6ZXJvLiBUaGUgYXJyYXkgaXMgKm5vdCBjb3BpZWQgYW5kXG5cdG1heSBiZSBtb2RpZmllZCouIElmIHRoZSBhcnJheSBjb250YWlucyBvbmx5IHplcm9zLCB0aGUgc2lnbiBwYXJhbWV0ZXJcblx0aXMgaWdub3JlZCBhbmQgaXMgZm9yY2VkIHRvIHplcm8uXG5cblx0PiBuZXcgQmlnSW50ZWdlcihbNV0sIC0xKTogY3JlYXRlIGEgbmV3IEJpZ0ludGVnZXIgd2l0aCB2YWx1ZSAtNVxuXG5cdFBhcmFtZXRlcnM6XG5cblx0XHRuIC0gVmFsdWUgdG8gY29udmVydCB0byBhIDxCaWdJbnRlZ2VyPi5cblxuXHRSZXR1cm5zOlxuXG5cdFx0QSA8QmlnSW50ZWdlcj4gdmFsdWUuXG5cblx0U2VlIEFsc286XG5cblx0XHQ8cGFyc2U+LCA8QmlnSW50ZWdlcj5cbiovXG5mdW5jdGlvbiBCaWdJbnRlZ2VyKG4sIHMsIHRva2VuKSB7XG5cdGlmICh0b2tlbiAhPT0gQ09OU1RSVUNUKSB7XG5cdFx0aWYgKG4gaW5zdGFuY2VvZiBCaWdJbnRlZ2VyKSB7XG5cdFx0XHRyZXR1cm4gbjtcblx0XHR9XG5cdFx0ZWxzZSBpZiAodHlwZW9mIG4gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHJldHVybiBaRVJPO1xuXHRcdH1cblx0XHRyZXR1cm4gQmlnSW50ZWdlci5wYXJzZShuKTtcblx0fVxuXG5cdG4gPSBuIHx8IFtdOyAgLy8gUHJvdmlkZSB0aGUgbnVsbGFyeSBjb25zdHJ1Y3RvciBmb3Igc3ViY2xhc3Nlcy5cblx0d2hpbGUgKG4ubGVuZ3RoICYmICFuW24ubGVuZ3RoIC0gMV0pIHtcblx0XHQtLW4ubGVuZ3RoO1xuXHR9XG5cdHRoaXMuX2QgPSBuO1xuXHR0aGlzLl9zID0gbi5sZW5ndGggPyAocyB8fCAxKSA6IDA7XG59XG5cbkJpZ0ludGVnZXIuX2NvbnN0cnVjdCA9IGZ1bmN0aW9uKG4sIHMpIHtcblx0cmV0dXJuIG5ldyBCaWdJbnRlZ2VyKG4sIHMsIENPTlNUUlVDVCk7XG59O1xuXG4vLyBCYXNlLTEwIHNwZWVkdXAgaGFja3MgaW4gcGFyc2UsIHRvU3RyaW5nLCBleHAxMCBhbmQgbG9nIGZ1bmN0aW9uc1xuLy8gcmVxdWlyZSBiYXNlIHRvIGJlIGEgcG93ZXIgb2YgMTAuIDEwXjcgaXMgdGhlIGxhcmdlc3Qgc3VjaCBwb3dlclxuLy8gdGhhdCB3b24ndCBjYXVzZSBhIHByZWNpc2lvbiBsb3NzIHdoZW4gZGlnaXRzIGFyZSBtdWx0aXBsaWVkLlxudmFyIEJpZ0ludGVnZXJfYmFzZSA9IDEwMDAwMDAwO1xudmFyIEJpZ0ludGVnZXJfYmFzZV9sb2cxMCA9IDc7XG5cbkJpZ0ludGVnZXIuYmFzZSA9IEJpZ0ludGVnZXJfYmFzZTtcbkJpZ0ludGVnZXIuYmFzZV9sb2cxMCA9IEJpZ0ludGVnZXJfYmFzZV9sb2cxMDtcblxudmFyIFpFUk8gPSBuZXcgQmlnSW50ZWdlcihbXSwgMCwgQ09OU1RSVUNUKTtcbi8vIENvbnN0YW50OiBaRVJPXG4vLyA8QmlnSW50ZWdlcj4gMC5cbkJpZ0ludGVnZXIuWkVSTyA9IFpFUk87XG5cbnZhciBPTkUgPSBuZXcgQmlnSW50ZWdlcihbMV0sIDEsIENPTlNUUlVDVCk7XG4vLyBDb25zdGFudDogT05FXG4vLyA8QmlnSW50ZWdlcj4gMS5cbkJpZ0ludGVnZXIuT05FID0gT05FO1xuXG52YXIgTV9PTkUgPSBuZXcgQmlnSW50ZWdlcihPTkUuX2QsIC0xLCBDT05TVFJVQ1QpO1xuLy8gQ29uc3RhbnQ6IE1fT05FXG4vLyA8QmlnSW50ZWdlcj4gLTEuXG5CaWdJbnRlZ2VyLk1fT05FID0gTV9PTkU7XG5cbi8vIENvbnN0YW50OiBfMFxuLy8gU2hvcnRjdXQgZm9yIDxaRVJPPi5cbkJpZ0ludGVnZXIuXzAgPSBaRVJPO1xuXG4vLyBDb25zdGFudDogXzFcbi8vIFNob3J0Y3V0IGZvciA8T05FPi5cbkJpZ0ludGVnZXIuXzEgPSBPTkU7XG5cbi8qXG5cdENvbnN0YW50OiBzbWFsbFxuXHRBcnJheSBvZiA8QmlnSW50ZWdlcnM+IGZyb20gMCB0byAzNi5cblxuXHRUaGVzZSBhcmUgdXNlZCBpbnRlcm5hbGx5IGZvciBwYXJzaW5nLCBidXQgdXNlZnVsIHdoZW4geW91IG5lZWQgYSBcInNtYWxsXCJcblx0PEJpZ0ludGVnZXI+LlxuXG5cdFNlZSBBbHNvOlxuXG5cdFx0PFpFUk8+LCA8T05FPiwgPF8wPiwgPF8xPlxuKi9cbkJpZ0ludGVnZXIuc21hbGwgPSBbXG5cdFpFUk8sXG5cdE9ORSxcblx0LyogQXNzdW1pbmcgQmlnSW50ZWdlcl9iYXNlID4gMzYgKi9cblx0bmV3IEJpZ0ludGVnZXIoIFsyXSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoIFszXSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoIFs0XSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoIFs1XSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoIFs2XSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoIFs3XSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoIFs4XSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoIFs5XSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoWzEwXSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoWzExXSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoWzEyXSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoWzEzXSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoWzE0XSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoWzE1XSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoWzE2XSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoWzE3XSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoWzE4XSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoWzE5XSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoWzIwXSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoWzIxXSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoWzIyXSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoWzIzXSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoWzI0XSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoWzI1XSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoWzI2XSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoWzI3XSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoWzI4XSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoWzI5XSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoWzMwXSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoWzMxXSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoWzMyXSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoWzMzXSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoWzM0XSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoWzM1XSwgMSwgQ09OU1RSVUNUKSxcblx0bmV3IEJpZ0ludGVnZXIoWzM2XSwgMSwgQ09OU1RSVUNUKVxuXTtcblxuLy8gVXNlZCBmb3IgcGFyc2luZy9yYWRpeCBjb252ZXJzaW9uXG5CaWdJbnRlZ2VyLmRpZ2l0cyA9IFwiMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXCIuc3BsaXQoXCJcIik7XG5cbi8qXG5cdE1ldGhvZDogdG9TdHJpbmdcblx0Q29udmVydCBhIDxCaWdJbnRlZ2VyPiB0byBhIHN0cmluZy5cblxuXHRXaGVuICpiYXNlKiBpcyBncmVhdGVyIHRoYW4gMTAsIGxldHRlcnMgYXJlIHVwcGVyIGNhc2UuXG5cblx0UGFyYW1ldGVyczpcblxuXHRcdGJhc2UgLSBPcHRpb25hbCBiYXNlIHRvIHJlcHJlc2VudCB0aGUgbnVtYmVyIGluIChkZWZhdWx0IGlzIGJhc2UgMTApLlxuXHRcdCAgICAgICBNdXN0IGJlIGJldHdlZW4gMiBhbmQgMzYgaW5jbHVzaXZlLCBvciBhbiBFcnJvciB3aWxsIGJlIHRocm93bi5cblxuXHRSZXR1cm5zOlxuXG5cdFx0VGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgPEJpZ0ludGVnZXI+LlxuKi9cbkJpZ0ludGVnZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oYmFzZSkge1xuXHRiYXNlID0gK2Jhc2UgfHwgMTA7XG5cdGlmIChiYXNlIDwgMiB8fCBiYXNlID4gMzYpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIHJhZGl4IFwiICsgYmFzZSArIFwiLlwiKTtcblx0fVxuXHRpZiAodGhpcy5fcyA9PT0gMCkge1xuXHRcdHJldHVybiBcIjBcIjtcblx0fVxuXHRpZiAoYmFzZSA9PT0gMTApIHtcblx0XHR2YXIgc3RyID0gdGhpcy5fcyA8IDAgPyBcIi1cIiA6IFwiXCI7XG5cdFx0c3RyICs9IHRoaXMuX2RbdGhpcy5fZC5sZW5ndGggLSAxXS50b1N0cmluZygpO1xuXHRcdGZvciAodmFyIGkgPSB0aGlzLl9kLmxlbmd0aCAtIDI7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHR2YXIgZ3JvdXAgPSB0aGlzLl9kW2ldLnRvU3RyaW5nKCk7XG5cdFx0XHR3aGlsZSAoZ3JvdXAubGVuZ3RoIDwgQmlnSW50ZWdlcl9iYXNlX2xvZzEwKSBncm91cCA9ICcwJyArIGdyb3VwO1xuXHRcdFx0c3RyICs9IGdyb3VwO1xuXHRcdH1cblx0XHRyZXR1cm4gc3RyO1xuXHR9XG5cdGVsc2Uge1xuXHRcdHZhciBudW1lcmFscyA9IEJpZ0ludGVnZXIuZGlnaXRzO1xuXHRcdGJhc2UgPSBCaWdJbnRlZ2VyLnNtYWxsW2Jhc2VdO1xuXHRcdHZhciBzaWduID0gdGhpcy5fcztcblxuXHRcdHZhciBuID0gdGhpcy5hYnMoKTtcblx0XHR2YXIgZGlnaXRzID0gW107XG5cdFx0dmFyIGRpZ2l0O1xuXG5cdFx0d2hpbGUgKG4uX3MgIT09IDApIHtcblx0XHRcdHZhciBkaXZtb2QgPSBuLmRpdlJlbShiYXNlKTtcblx0XHRcdG4gPSBkaXZtb2RbMF07XG5cdFx0XHRkaWdpdCA9IGRpdm1vZFsxXTtcblx0XHRcdC8vIFRPRE86IFRoaXMgY291bGQgYmUgY2hhbmdlZCB0byB1bnNoaWZ0IGluc3RlYWQgb2YgcmV2ZXJzaW5nIGF0IHRoZSBlbmQuXG5cdFx0XHQvLyBCZW5jaG1hcmsgYm90aCB0byBjb21wYXJlIHNwZWVkcy5cblx0XHRcdGRpZ2l0cy5wdXNoKG51bWVyYWxzW2RpZ2l0LnZhbHVlT2YoKV0pO1xuXHRcdH1cblx0XHRyZXR1cm4gKHNpZ24gPCAwID8gXCItXCIgOiBcIlwiKSArIGRpZ2l0cy5yZXZlcnNlKCkuam9pbihcIlwiKTtcblx0fVxufTtcblxuLy8gVmVyaWZ5IHN0cmluZ3MgZm9yIHBhcnNpbmdcbkJpZ0ludGVnZXIucmFkaXhSZWdleCA9IFtcblx0L14kLyxcblx0L14kLyxcblx0L15bMDFdKiQvLFxuXHQvXlswMTJdKiQvLFxuXHQvXlswLTNdKiQvLFxuXHQvXlswLTRdKiQvLFxuXHQvXlswLTVdKiQvLFxuXHQvXlswLTZdKiQvLFxuXHQvXlswLTddKiQvLFxuXHQvXlswLThdKiQvLFxuXHQvXlswLTldKiQvLFxuXHQvXlswLTlhQV0qJC8sXG5cdC9eWzAtOWFiQUJdKiQvLFxuXHQvXlswLTlhYmNBQkNdKiQvLFxuXHQvXlswLTlhLWRBLURdKiQvLFxuXHQvXlswLTlhLWVBLUVdKiQvLFxuXHQvXlswLTlhLWZBLUZdKiQvLFxuXHQvXlswLTlhLWdBLUddKiQvLFxuXHQvXlswLTlhLWhBLUhdKiQvLFxuXHQvXlswLTlhLWlBLUldKiQvLFxuXHQvXlswLTlhLWpBLUpdKiQvLFxuXHQvXlswLTlhLWtBLUtdKiQvLFxuXHQvXlswLTlhLWxBLUxdKiQvLFxuXHQvXlswLTlhLW1BLU1dKiQvLFxuXHQvXlswLTlhLW5BLU5dKiQvLFxuXHQvXlswLTlhLW9BLU9dKiQvLFxuXHQvXlswLTlhLXBBLVBdKiQvLFxuXHQvXlswLTlhLXFBLVFdKiQvLFxuXHQvXlswLTlhLXJBLVJdKiQvLFxuXHQvXlswLTlhLXNBLVNdKiQvLFxuXHQvXlswLTlhLXRBLVRdKiQvLFxuXHQvXlswLTlhLXVBLVVdKiQvLFxuXHQvXlswLTlhLXZBLVZdKiQvLFxuXHQvXlswLTlhLXdBLVddKiQvLFxuXHQvXlswLTlhLXhBLVhdKiQvLFxuXHQvXlswLTlhLXlBLVldKiQvLFxuXHQvXlswLTlhLXpBLVpdKiQvXG5dO1xuXG4vKlxuXHRGdW5jdGlvbjogcGFyc2Vcblx0UGFyc2UgYSBzdHJpbmcgaW50byBhIDxCaWdJbnRlZ2VyPi5cblxuXHQqYmFzZSogaXMgb3B0aW9uYWwgYnV0LCBpZiBwcm92aWRlZCwgbXVzdCBiZSBmcm9tIDIgdG8gMzYgaW5jbHVzaXZlLiBJZlxuXHQqYmFzZSogaXMgbm90IHByb3ZpZGVkLCBpdCB3aWxsIGJlIGd1ZXNzZWQgYmFzZWQgb24gdGhlIGxlYWRpbmcgY2hhcmFjdGVyc1xuXHRvZiAqcyogYXMgZm9sbG93czpcblxuXHQtIFwiMHhcIiBvciBcIjBYXCI6ICpiYXNlKiA9IDE2XG5cdC0gXCIwY1wiIG9yIFwiMENcIjogKmJhc2UqID0gOFxuXHQtIFwiMGJcIiBvciBcIjBCXCI6ICpiYXNlKiA9IDJcblx0LSBlbHNlOiAqYmFzZSogPSAxMFxuXG5cdElmIG5vIGJhc2UgaXMgcHJvdmlkZWQsIG9yICpiYXNlKiBpcyAxMCwgdGhlIG51bWJlciBjYW4gYmUgaW4gZXhwb25lbnRpYWxcblx0Zm9ybS4gRm9yIGV4YW1wbGUsIHRoZXNlIGFyZSBhbGwgdmFsaWQ6XG5cblx0PiBCaWdJbnRlZ2VyLnBhcnNlKFwiMWU5XCIpOyAgICAgICAgICAgICAgLy8gU2FtZSBhcyBcIjEwMDAwMDAwMDBcIlxuXHQ+IEJpZ0ludGVnZXIucGFyc2UoXCIxLjIzNCoxMF4zXCIpOyAgICAgICAvLyBTYW1lIGFzIDEyMzRcblx0PiBCaWdJbnRlZ2VyLnBhcnNlKFwiNTY3ODkgKiAxMCAqKiAtMlwiKTsgLy8gU2FtZSBhcyA1NjdcblxuXHRJZiBhbnkgY2hhcmFjdGVycyBmYWxsIG91dHNpZGUgdGhlIHJhbmdlIGRlZmluZWQgYnkgdGhlIHJhZGl4LCBhbiBleGNlcHRpb25cblx0d2lsbCBiZSB0aHJvd24uXG5cblx0UGFyYW1ldGVyczpcblxuXHRcdHMgLSBUaGUgc3RyaW5nIHRvIHBhcnNlLlxuXHRcdGJhc2UgLSBPcHRpb25hbCByYWRpeCAoZGVmYXVsdCBpcyB0byBndWVzcyBiYXNlZCBvbiAqcyopLlxuXG5cdFJldHVybnM6XG5cblx0XHRhIDxCaWdJbnRlZ2VyPiBpbnN0YW5jZS5cbiovXG5CaWdJbnRlZ2VyLnBhcnNlID0gZnVuY3Rpb24ocywgYmFzZSkge1xuXHQvLyBFeHBhbmRzIGEgbnVtYmVyIGluIGV4cG9uZW50aWFsIGZvcm0gdG8gZGVjaW1hbCBmb3JtLlxuXHQvLyBleHBhbmRFeHBvbmVudGlhbChcIi0xMy40NDEqMTBeNVwiKSA9PT0gXCIxMzQ0MTAwXCI7XG5cdC8vIGV4cGFuZEV4cG9uZW50aWFsKFwiMS4xMjMwMGUtMVwiKSA9PT0gXCIwLjExMjMwMFwiO1xuXHQvLyBleHBhbmRFeHBvbmVudGlhbCgxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwKSA9PT0gXCIxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwXCI7XG5cdGZ1bmN0aW9uIGV4cGFuZEV4cG9uZW50aWFsKHN0cikge1xuXHRcdHN0ciA9IHN0ci5yZXBsYWNlKC9cXHMqWyp4WF1cXHMqMTBcXHMqKFxcXnxcXCpcXCopXFxzKi8sIFwiZVwiKTtcblxuXHRcdHJldHVybiBzdHIucmVwbGFjZSgvXihbK1xcLV0pPyhcXGQrKVxcLj8oXFxkKilbZUVdKFsrXFwtXT9cXGQrKSQvLCBmdW5jdGlvbih4LCBzLCBuLCBmLCBjKSB7XG5cdFx0XHRjID0gK2M7XG5cdFx0XHR2YXIgbCA9IGMgPCAwO1xuXHRcdFx0dmFyIGkgPSBuLmxlbmd0aCArIGM7XG5cdFx0XHR4ID0gKGwgPyBuIDogZikubGVuZ3RoO1xuXHRcdFx0YyA9ICgoYyA9IE1hdGguYWJzKGMpKSA+PSB4ID8gYyAtIHggKyBsIDogMCk7XG5cdFx0XHR2YXIgeiA9IChuZXcgQXJyYXkoYyArIDEpKS5qb2luKFwiMFwiKTtcblx0XHRcdHZhciByID0gbiArIGY7XG5cdFx0XHRyZXR1cm4gKHMgfHwgXCJcIikgKyAobCA/IHIgPSB6ICsgciA6IHIgKz0geikuc3Vic3RyKDAsIGkgKz0gbCA/IHoubGVuZ3RoIDogMCkgKyAoaSA8IHIubGVuZ3RoID8gXCIuXCIgKyByLnN1YnN0cihpKSA6IFwiXCIpO1xuXHRcdH0pO1xuXHR9XG5cblx0cyA9IHMudG9TdHJpbmcoKTtcblx0aWYgKHR5cGVvZiBiYXNlID09PSBcInVuZGVmaW5lZFwiIHx8ICtiYXNlID09PSAxMCkge1xuXHRcdHMgPSBleHBhbmRFeHBvbmVudGlhbChzKTtcblx0fVxuXG5cdHZhciBwcmVmaXhSRTtcblx0aWYgKHR5cGVvZiBiYXNlID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0cHJlZml4UkUgPSAnMFt4Y2JdJztcblx0fVxuXHRlbHNlIGlmIChiYXNlID09IDE2KSB7XG5cdFx0cHJlZml4UkUgPSAnMHgnO1xuXHR9XG5cdGVsc2UgaWYgKGJhc2UgPT0gOCkge1xuXHRcdHByZWZpeFJFID0gJzBjJztcblx0fVxuXHRlbHNlIGlmIChiYXNlID09IDIpIHtcblx0XHRwcmVmaXhSRSA9ICcwYic7XG5cdH1cblx0ZWxzZSB7XG5cdFx0cHJlZml4UkUgPSAnJztcblx0fVxuXHR2YXIgcGFydHMgPSBuZXcgUmVnRXhwKCdeKFsrXFxcXC1dPykoJyArIHByZWZpeFJFICsgJyk/KFswLTlhLXpdKikoPzpcXFxcLlxcXFxkKik/JCcsICdpJykuZXhlYyhzKTtcblx0aWYgKHBhcnRzKSB7XG5cdFx0dmFyIHNpZ24gPSBwYXJ0c1sxXSB8fCBcIitcIjtcblx0XHR2YXIgYmFzZVNlY3Rpb24gPSBwYXJ0c1syXSB8fCBcIlwiO1xuXHRcdHZhciBkaWdpdHMgPSBwYXJ0c1szXSB8fCBcIlwiO1xuXG5cdFx0aWYgKHR5cGVvZiBiYXNlID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHQvLyBHdWVzcyBiYXNlXG5cdFx0XHRpZiAoYmFzZVNlY3Rpb24gPT09IFwiMHhcIiB8fCBiYXNlU2VjdGlvbiA9PT0gXCIwWFwiKSB7IC8vIEhleFxuXHRcdFx0XHRiYXNlID0gMTY7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmIChiYXNlU2VjdGlvbiA9PT0gXCIwY1wiIHx8IGJhc2VTZWN0aW9uID09PSBcIjBDXCIpIHsgLy8gT2N0YWxcblx0XHRcdFx0YmFzZSA9IDg7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmIChiYXNlU2VjdGlvbiA9PT0gXCIwYlwiIHx8IGJhc2VTZWN0aW9uID09PSBcIjBCXCIpIHsgLy8gQmluYXJ5XG5cdFx0XHRcdGJhc2UgPSAyO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGJhc2UgPSAxMDtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBpZiAoYmFzZSA8IDIgfHwgYmFzZSA+IDM2KSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbGxlZ2FsIHJhZGl4IFwiICsgYmFzZSArIFwiLlwiKTtcblx0XHR9XG5cblx0XHRiYXNlID0gK2Jhc2U7XG5cblx0XHQvLyBDaGVjayBmb3IgZGlnaXRzIG91dHNpZGUgdGhlIHJhbmdlXG5cdFx0aWYgKCEoQmlnSW50ZWdlci5yYWRpeFJlZ2V4W2Jhc2VdLnRlc3QoZGlnaXRzKSkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkJhZCBkaWdpdCBmb3IgcmFkaXggXCIgKyBiYXNlKTtcblx0XHR9XG5cblx0XHQvLyBTdHJpcCBsZWFkaW5nIHplcm9zLCBhbmQgY29udmVydCB0byBhcnJheVxuXHRcdGRpZ2l0cyA9IGRpZ2l0cy5yZXBsYWNlKC9eMCsvLCBcIlwiKS5zcGxpdChcIlwiKTtcblx0XHRpZiAoZGlnaXRzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0cmV0dXJuIFpFUk87XG5cdFx0fVxuXG5cdFx0Ly8gR2V0IHRoZSBzaWduICh3ZSBrbm93IGl0J3Mgbm90IHplcm8pXG5cdFx0c2lnbiA9IChzaWduID09PSBcIi1cIikgPyAtMSA6IDE7XG5cblx0XHQvLyBPcHRpbWl6ZSAxMFxuXHRcdGlmIChiYXNlID09IDEwKSB7XG5cdFx0XHR2YXIgZCA9IFtdO1xuXHRcdFx0d2hpbGUgKGRpZ2l0cy5sZW5ndGggPj0gQmlnSW50ZWdlcl9iYXNlX2xvZzEwKSB7XG5cdFx0XHRcdGQucHVzaChwYXJzZUludChkaWdpdHMuc3BsaWNlKGRpZ2l0cy5sZW5ndGgtQmlnSW50ZWdlci5iYXNlX2xvZzEwLCBCaWdJbnRlZ2VyLmJhc2VfbG9nMTApLmpvaW4oJycpLCAxMCkpO1xuXHRcdFx0fVxuXHRcdFx0ZC5wdXNoKHBhcnNlSW50KGRpZ2l0cy5qb2luKCcnKSwgMTApKTtcblx0XHRcdHJldHVybiBuZXcgQmlnSW50ZWdlcihkLCBzaWduLCBDT05TVFJVQ1QpO1xuXHRcdH1cblxuXHRcdC8vIERvIHRoZSBjb252ZXJzaW9uXG5cdFx0dmFyIGQgPSBaRVJPO1xuXHRcdGJhc2UgPSBCaWdJbnRlZ2VyLnNtYWxsW2Jhc2VdO1xuXHRcdHZhciBzbWFsbCA9IEJpZ0ludGVnZXIuc21hbGw7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkaWdpdHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGQgPSBkLm11bHRpcGx5KGJhc2UpLmFkZChzbWFsbFtwYXJzZUludChkaWdpdHNbaV0sIDM2KV0pO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3IEJpZ0ludGVnZXIoZC5fZCwgc2lnbiwgQ09OU1RSVUNUKTtcblx0fVxuXHRlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIEJpZ0ludGVnZXIgZm9ybWF0OiBcIiArIHMpO1xuXHR9XG59O1xuXG4vKlxuXHRGdW5jdGlvbjogYWRkXG5cdEFkZCB0d28gPEJpZ0ludGVnZXJzPi5cblxuXHRQYXJhbWV0ZXJzOlxuXG5cdFx0biAtIFRoZSBudW1iZXIgdG8gYWRkIHRvICp0aGlzKi4gV2lsbCBiZSBjb252ZXJ0ZWQgdG8gYSA8QmlnSW50ZWdlcj4uXG5cblx0UmV0dXJuczpcblxuXHRcdFRoZSBudW1iZXJzIGFkZGVkIHRvZ2V0aGVyLlxuXG5cdFNlZSBBbHNvOlxuXG5cdFx0PHN1YnRyYWN0PiwgPG11bHRpcGx5PiwgPHF1b3RpZW50PiwgPG5leHQ+XG4qL1xuQmlnSW50ZWdlci5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24obikge1xuXHRpZiAodGhpcy5fcyA9PT0gMCkge1xuXHRcdHJldHVybiBCaWdJbnRlZ2VyKG4pO1xuXHR9XG5cblx0biA9IEJpZ0ludGVnZXIobik7XG5cdGlmIChuLl9zID09PSAwKSB7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0aWYgKHRoaXMuX3MgIT09IG4uX3MpIHtcblx0XHRuID0gbi5uZWdhdGUoKTtcblx0XHRyZXR1cm4gdGhpcy5zdWJ0cmFjdChuKTtcblx0fVxuXG5cdHZhciBhID0gdGhpcy5fZDtcblx0dmFyIGIgPSBuLl9kO1xuXHR2YXIgYWwgPSBhLmxlbmd0aDtcblx0dmFyIGJsID0gYi5sZW5ndGg7XG5cdHZhciBzdW0gPSBuZXcgQXJyYXkoTWF0aC5tYXgoYWwsIGJsKSArIDEpO1xuXHR2YXIgc2l6ZSA9IE1hdGgubWluKGFsLCBibCk7XG5cdHZhciBjYXJyeSA9IDA7XG5cdHZhciBkaWdpdDtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuXHRcdGRpZ2l0ID0gYVtpXSArIGJbaV0gKyBjYXJyeTtcblx0XHRzdW1baV0gPSBkaWdpdCAlIEJpZ0ludGVnZXJfYmFzZTtcblx0XHRjYXJyeSA9IChkaWdpdCAvIEJpZ0ludGVnZXJfYmFzZSkgfCAwO1xuXHR9XG5cdGlmIChibCA+IGFsKSB7XG5cdFx0YSA9IGI7XG5cdFx0YWwgPSBibDtcblx0fVxuXHRmb3IgKGkgPSBzaXplOyBjYXJyeSAmJiBpIDwgYWw7IGkrKykge1xuXHRcdGRpZ2l0ID0gYVtpXSArIGNhcnJ5O1xuXHRcdHN1bVtpXSA9IGRpZ2l0ICUgQmlnSW50ZWdlcl9iYXNlO1xuXHRcdGNhcnJ5ID0gKGRpZ2l0IC8gQmlnSW50ZWdlcl9iYXNlKSB8IDA7XG5cdH1cblx0aWYgKGNhcnJ5KSB7XG5cdFx0c3VtW2ldID0gY2Fycnk7XG5cdH1cblxuXHRmb3IgKCA7IGkgPCBhbDsgaSsrKSB7XG5cdFx0c3VtW2ldID0gYVtpXTtcblx0fVxuXG5cdHJldHVybiBuZXcgQmlnSW50ZWdlcihzdW0sIHRoaXMuX3MsIENPTlNUUlVDVCk7XG59O1xuXG4vKlxuXHRGdW5jdGlvbjogbmVnYXRlXG5cdEdldCB0aGUgYWRkaXRpdmUgaW52ZXJzZSBvZiBhIDxCaWdJbnRlZ2VyPi5cblxuXHRSZXR1cm5zOlxuXG5cdFx0QSA8QmlnSW50ZWdlcj4gd2l0aCB0aGUgc2FtZSBtYWduYXR1ZGUsIGJ1dCB3aXRoIHRoZSBvcHBvc2l0ZSBzaWduLlxuXG5cdFNlZSBBbHNvOlxuXG5cdFx0PGFicz5cbiovXG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5uZWdhdGUgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIG5ldyBCaWdJbnRlZ2VyKHRoaXMuX2QsICgtdGhpcy5fcykgfCAwLCBDT05TVFJVQ1QpO1xufTtcblxuLypcblx0RnVuY3Rpb246IGFic1xuXHRHZXQgdGhlIGFic29sdXRlIHZhbHVlIG9mIGEgPEJpZ0ludGVnZXI+LlxuXG5cdFJldHVybnM6XG5cblx0XHRBIDxCaWdJbnRlZ2VyPiB3aXRoIHRoZSBzYW1lIG1hZ25hdHVkZSwgYnV0IGFsd2F5cyBwb3NpdGl2ZSAob3IgemVybykuXG5cblx0U2VlIEFsc286XG5cblx0XHQ8bmVnYXRlPlxuKi9cbkJpZ0ludGVnZXIucHJvdG90eXBlLmFicyA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gKHRoaXMuX3MgPCAwKSA/IHRoaXMubmVnYXRlKCkgOiB0aGlzO1xufTtcblxuLypcblx0RnVuY3Rpb246IHN1YnRyYWN0XG5cdFN1YnRyYWN0IHR3byA8QmlnSW50ZWdlcnM+LlxuXG5cdFBhcmFtZXRlcnM6XG5cblx0XHRuIC0gVGhlIG51bWJlciB0byBzdWJ0cmFjdCBmcm9tICp0aGlzKi4gV2lsbCBiZSBjb252ZXJ0ZWQgdG8gYSA8QmlnSW50ZWdlcj4uXG5cblx0UmV0dXJuczpcblxuXHRcdFRoZSAqbiogc3VidHJhY3RlZCBmcm9tICp0aGlzKi5cblxuXHRTZWUgQWxzbzpcblxuXHRcdDxhZGQ+LCA8bXVsdGlwbHk+LCA8cXVvdGllbnQ+LCA8cHJldj5cbiovXG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5zdWJ0cmFjdCA9IGZ1bmN0aW9uKG4pIHtcblx0aWYgKHRoaXMuX3MgPT09IDApIHtcblx0XHRyZXR1cm4gQmlnSW50ZWdlcihuKS5uZWdhdGUoKTtcblx0fVxuXG5cdG4gPSBCaWdJbnRlZ2VyKG4pO1xuXHRpZiAobi5fcyA9PT0gMCkge1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdGlmICh0aGlzLl9zICE9PSBuLl9zKSB7XG5cdFx0biA9IG4ubmVnYXRlKCk7XG5cdFx0cmV0dXJuIHRoaXMuYWRkKG4pO1xuXHR9XG5cblx0dmFyIG0gPSB0aGlzO1xuXHQvLyBuZWdhdGl2ZSAtIG5lZ2F0aXZlID0+IC18YXwgLSAtfGJ8ID0+IC18YXwgKyB8YnwgPT4gfGJ8IC0gfGF8XG5cdGlmICh0aGlzLl9zIDwgMCkge1xuXHRcdG0gPSBuZXcgQmlnSW50ZWdlcihuLl9kLCAxLCBDT05TVFJVQ1QpO1xuXHRcdG4gPSBuZXcgQmlnSW50ZWdlcih0aGlzLl9kLCAxLCBDT05TVFJVQ1QpO1xuXHR9XG5cblx0Ly8gQm90aCBhcmUgcG9zaXRpdmUgPT4gYSAtIGJcblx0dmFyIHNpZ24gPSBtLmNvbXBhcmVBYnMobik7XG5cdGlmIChzaWduID09PSAwKSB7XG5cdFx0cmV0dXJuIFpFUk87XG5cdH1cblx0ZWxzZSBpZiAoc2lnbiA8IDApIHtcblx0XHQvLyBzd2FwIG0gYW5kIG5cblx0XHR2YXIgdCA9IG47XG5cdFx0biA9IG07XG5cdFx0bSA9IHQ7XG5cdH1cblxuXHQvLyBhID4gYlxuXHR2YXIgYSA9IG0uX2Q7XG5cdHZhciBiID0gbi5fZDtcblx0dmFyIGFsID0gYS5sZW5ndGg7XG5cdHZhciBibCA9IGIubGVuZ3RoO1xuXHR2YXIgZGlmZiA9IG5ldyBBcnJheShhbCk7IC8vIGFsID49IGJsIHNpbmNlIGEgPiBiXG5cdHZhciBib3Jyb3cgPSAwO1xuXHR2YXIgaTtcblx0dmFyIGRpZ2l0O1xuXG5cdGZvciAoaSA9IDA7IGkgPCBibDsgaSsrKSB7XG5cdFx0ZGlnaXQgPSBhW2ldIC0gYm9ycm93IC0gYltpXTtcblx0XHRpZiAoZGlnaXQgPCAwKSB7XG5cdFx0XHRkaWdpdCArPSBCaWdJbnRlZ2VyX2Jhc2U7XG5cdFx0XHRib3Jyb3cgPSAxO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGJvcnJvdyA9IDA7XG5cdFx0fVxuXHRcdGRpZmZbaV0gPSBkaWdpdDtcblx0fVxuXHRmb3IgKGkgPSBibDsgaSA8IGFsOyBpKyspIHtcblx0XHRkaWdpdCA9IGFbaV0gLSBib3Jyb3c7XG5cdFx0aWYgKGRpZ2l0IDwgMCkge1xuXHRcdFx0ZGlnaXQgKz0gQmlnSW50ZWdlcl9iYXNlO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGRpZmZbaSsrXSA9IGRpZ2l0O1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGRpZmZbaV0gPSBkaWdpdDtcblx0fVxuXHRmb3IgKCA7IGkgPCBhbDsgaSsrKSB7XG5cdFx0ZGlmZltpXSA9IGFbaV07XG5cdH1cblxuXHRyZXR1cm4gbmV3IEJpZ0ludGVnZXIoZGlmZiwgc2lnbiwgQ09OU1RSVUNUKTtcbn07XG5cbihmdW5jdGlvbigpIHtcblx0ZnVuY3Rpb24gYWRkT25lKG4sIHNpZ24pIHtcblx0XHR2YXIgYSA9IG4uX2Q7XG5cdFx0dmFyIHN1bSA9IGEuc2xpY2UoKTtcblx0XHR2YXIgY2FycnkgPSB0cnVlO1xuXHRcdHZhciBpID0gMDtcblxuXHRcdHdoaWxlICh0cnVlKSB7XG5cdFx0XHR2YXIgZGlnaXQgPSAoYVtpXSB8fCAwKSArIDE7XG5cdFx0XHRzdW1baV0gPSBkaWdpdCAlIEJpZ0ludGVnZXJfYmFzZTtcblx0XHRcdGlmIChkaWdpdCA8PSBCaWdJbnRlZ2VyX2Jhc2UgLSAxKSB7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0KytpO1xuXHRcdH1cblxuXHRcdHJldHVybiBuZXcgQmlnSW50ZWdlcihzdW0sIHNpZ24sIENPTlNUUlVDVCk7XG5cdH1cblxuXHRmdW5jdGlvbiBzdWJ0cmFjdE9uZShuLCBzaWduKSB7XG5cdFx0dmFyIGEgPSBuLl9kO1xuXHRcdHZhciBzdW0gPSBhLnNsaWNlKCk7XG5cdFx0dmFyIGJvcnJvdyA9IHRydWU7XG5cdFx0dmFyIGkgPSAwO1xuXG5cdFx0d2hpbGUgKHRydWUpIHtcblx0XHRcdHZhciBkaWdpdCA9IChhW2ldIHx8IDApIC0gMTtcblx0XHRcdGlmIChkaWdpdCA8IDApIHtcblx0XHRcdFx0c3VtW2ldID0gZGlnaXQgKyBCaWdJbnRlZ2VyX2Jhc2U7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0c3VtW2ldID0gZGlnaXQ7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0KytpO1xuXHRcdH1cblxuXHRcdHJldHVybiBuZXcgQmlnSW50ZWdlcihzdW0sIHNpZ24sIENPTlNUUlVDVCk7XG5cdH1cblxuXHQvKlxuXHRcdEZ1bmN0aW9uOiBuZXh0XG5cdFx0R2V0IHRoZSBuZXh0IDxCaWdJbnRlZ2VyPiAoYWRkIG9uZSkuXG5cblx0XHRSZXR1cm5zOlxuXG5cdFx0XHQqdGhpcyogKyAxLlxuXG5cdFx0U2VlIEFsc286XG5cblx0XHRcdDxhZGQ+LCA8cHJldj5cblx0Ki9cblx0QmlnSW50ZWdlci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uKCkge1xuXHRcdHN3aXRjaCAodGhpcy5fcykge1xuXHRcdGNhc2UgMDpcblx0XHRcdHJldHVybiBPTkU7XG5cdFx0Y2FzZSAtMTpcblx0XHRcdHJldHVybiBzdWJ0cmFjdE9uZSh0aGlzLCAtMSk7XG5cdFx0Ly8gY2FzZSAxOlxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gYWRkT25lKHRoaXMsIDEpO1xuXHRcdH1cblx0fTtcblxuXHQvKlxuXHRcdEZ1bmN0aW9uOiBwcmV2XG5cdFx0R2V0IHRoZSBwcmV2aW91cyA8QmlnSW50ZWdlcj4gKHN1YnRyYWN0IG9uZSkuXG5cblx0XHRSZXR1cm5zOlxuXG5cdFx0XHQqdGhpcyogLSAxLlxuXG5cdFx0U2VlIEFsc286XG5cblx0XHRcdDxuZXh0PiwgPHN1YnRyYWN0PlxuXHQqL1xuXHRCaWdJbnRlZ2VyLnByb3RvdHlwZS5wcmV2ID0gZnVuY3Rpb24oKSB7XG5cdFx0c3dpdGNoICh0aGlzLl9zKSB7XG5cdFx0Y2FzZSAwOlxuXHRcdFx0cmV0dXJuIE1fT05FO1xuXHRcdGNhc2UgLTE6XG5cdFx0XHRyZXR1cm4gYWRkT25lKHRoaXMsIC0xKTtcblx0XHQvLyBjYXNlIDE6XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBzdWJ0cmFjdE9uZSh0aGlzLCAxKTtcblx0XHR9XG5cdH07XG59KSgpO1xuXG4vKlxuXHRGdW5jdGlvbjogY29tcGFyZUFic1xuXHRDb21wYXJlIHRoZSBhYnNvbHV0ZSB2YWx1ZSBvZiB0d28gPEJpZ0ludGVnZXJzPi5cblxuXHRDYWxsaW5nIDxjb21wYXJlQWJzPiBpcyBmYXN0ZXIgdGhhbiBjYWxsaW5nIDxhYnM+IHR3aWNlLCB0aGVuIDxjb21wYXJlPi5cblxuXHRQYXJhbWV0ZXJzOlxuXG5cdFx0biAtIFRoZSBudW1iZXIgdG8gY29tcGFyZSB0byAqdGhpcyouIFdpbGwgYmUgY29udmVydGVkIHRvIGEgPEJpZ0ludGVnZXI+LlxuXG5cdFJldHVybnM6XG5cblx0XHQtMSwgMCwgb3IgKzEgaWYgKnx0aGlzfCogaXMgbGVzcyB0aGFuLCBlcXVhbCB0bywgb3IgZ3JlYXRlciB0aGFuICp8bnwqLlxuXG5cdFNlZSBBbHNvOlxuXG5cdFx0PGNvbXBhcmU+LCA8YWJzPlxuKi9cbkJpZ0ludGVnZXIucHJvdG90eXBlLmNvbXBhcmVBYnMgPSBmdW5jdGlvbihuKSB7XG5cdGlmICh0aGlzID09PSBuKSB7XG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHRpZiAoIShuIGluc3RhbmNlb2YgQmlnSW50ZWdlcikpIHtcblx0XHRpZiAoIWlzRmluaXRlKG4pKSB7XG5cdFx0XHRyZXR1cm4oaXNOYU4obikgPyBuIDogLTEpO1xuXHRcdH1cblx0XHRuID0gQmlnSW50ZWdlcihuKTtcblx0fVxuXG5cdGlmICh0aGlzLl9zID09PSAwKSB7XG5cdFx0cmV0dXJuIChuLl9zICE9PSAwKSA/IC0xIDogMDtcblx0fVxuXHRpZiAobi5fcyA9PT0gMCkge1xuXHRcdHJldHVybiAxO1xuXHR9XG5cblx0dmFyIGwgPSB0aGlzLl9kLmxlbmd0aDtcblx0dmFyIG5sID0gbi5fZC5sZW5ndGg7XG5cdGlmIChsIDwgbmwpIHtcblx0XHRyZXR1cm4gLTE7XG5cdH1cblx0ZWxzZSBpZiAobCA+IG5sKSB7XG5cdFx0cmV0dXJuIDE7XG5cdH1cblxuXHR2YXIgYSA9IHRoaXMuX2Q7XG5cdHZhciBiID0gbi5fZDtcblx0Zm9yICh2YXIgaSA9IGwtMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRpZiAoYVtpXSAhPT0gYltpXSkge1xuXHRcdFx0cmV0dXJuIGFbaV0gPCBiW2ldID8gLTEgOiAxO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiAwO1xufTtcblxuLypcblx0RnVuY3Rpb246IGNvbXBhcmVcblx0Q29tcGFyZSB0d28gPEJpZ0ludGVnZXJzPi5cblxuXHRQYXJhbWV0ZXJzOlxuXG5cdFx0biAtIFRoZSBudW1iZXIgdG8gY29tcGFyZSB0byAqdGhpcyouIFdpbGwgYmUgY29udmVydGVkIHRvIGEgPEJpZ0ludGVnZXI+LlxuXG5cdFJldHVybnM6XG5cblx0XHQtMSwgMCwgb3IgKzEgaWYgKnRoaXMqIGlzIGxlc3MgdGhhbiwgZXF1YWwgdG8sIG9yIGdyZWF0ZXIgdGhhbiAqbiouXG5cblx0U2VlIEFsc286XG5cblx0XHQ8Y29tcGFyZUFicz4sIDxpc1Bvc2l0aXZlPiwgPGlzTmVnYXRpdmU+LCA8aXNVbml0PlxuKi9cbkJpZ0ludGVnZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbihuKSB7XG5cdGlmICh0aGlzID09PSBuKSB7XG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHRuID0gQmlnSW50ZWdlcihuKTtcblxuXHRpZiAodGhpcy5fcyA9PT0gMCkge1xuXHRcdHJldHVybiAtbi5fcztcblx0fVxuXG5cdGlmICh0aGlzLl9zID09PSBuLl9zKSB7IC8vIGJvdGggcG9zaXRpdmUgb3IgYm90aCBuZWdhdGl2ZVxuXHRcdHZhciBjbXAgPSB0aGlzLmNvbXBhcmVBYnMobik7XG5cdFx0cmV0dXJuIGNtcCAqIHRoaXMuX3M7XG5cdH1cblx0ZWxzZSB7XG5cdFx0cmV0dXJuIHRoaXMuX3M7XG5cdH1cbn07XG5cbi8qXG5cdEZ1bmN0aW9uOiBpc1VuaXRcblx0UmV0dXJuIHRydWUgaWZmICp0aGlzKiBpcyBlaXRoZXIgMSBvciAtMS5cblxuXHRSZXR1cm5zOlxuXG5cdFx0dHJ1ZSBpZiAqdGhpcyogY29tcGFyZXMgZXF1YWwgdG8gPEJpZ0ludGVnZXIuT05FPiBvciA8QmlnSW50ZWdlci5NX09ORT4uXG5cblx0U2VlIEFsc286XG5cblx0XHQ8aXNaZXJvPiwgPGlzTmVnYXRpdmU+LCA8aXNQb3NpdGl2ZT4sIDxjb21wYXJlQWJzPiwgPGNvbXBhcmU+LFxuXHRcdDxCaWdJbnRlZ2VyLk9ORT4sIDxCaWdJbnRlZ2VyLk1fT05FPlxuKi9cbkJpZ0ludGVnZXIucHJvdG90eXBlLmlzVW5pdCA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcyA9PT0gT05FIHx8XG5cdFx0dGhpcyA9PT0gTV9PTkUgfHxcblx0XHQodGhpcy5fZC5sZW5ndGggPT09IDEgJiYgdGhpcy5fZFswXSA9PT0gMSk7XG59O1xuXG4vKlxuXHRGdW5jdGlvbjogbXVsdGlwbHlcblx0TXVsdGlwbHkgdHdvIDxCaWdJbnRlZ2Vycz4uXG5cblx0UGFyYW1ldGVyczpcblxuXHRcdG4gLSBUaGUgbnVtYmVyIHRvIG11bHRpcGx5ICp0aGlzKiBieS4gV2lsbCBiZSBjb252ZXJ0ZWQgdG8gYVxuXHRcdDxCaWdJbnRlZ2VyPi5cblxuXHRSZXR1cm5zOlxuXG5cdFx0VGhlIG51bWJlcnMgbXVsdGlwbGllZCB0b2dldGhlci5cblxuXHRTZWUgQWxzbzpcblxuXHRcdDxhZGQ+LCA8c3VidHJhY3Q+LCA8cXVvdGllbnQ+LCA8c3F1YXJlPlxuKi9cbkJpZ0ludGVnZXIucHJvdG90eXBlLm11bHRpcGx5ID0gZnVuY3Rpb24obikge1xuXHQvLyBUT0RPOiBDb25zaWRlciBhZGRpbmcgS2FyYXRzdWJhIG11bHRpcGxpY2F0aW9uIGZvciBsYXJnZSBudW1iZXJzXG5cdGlmICh0aGlzLl9zID09PSAwKSB7XG5cdFx0cmV0dXJuIFpFUk87XG5cdH1cblxuXHRuID0gQmlnSW50ZWdlcihuKTtcblx0aWYgKG4uX3MgPT09IDApIHtcblx0XHRyZXR1cm4gWkVSTztcblx0fVxuXHRpZiAodGhpcy5pc1VuaXQoKSkge1xuXHRcdGlmICh0aGlzLl9zIDwgMCkge1xuXHRcdFx0cmV0dXJuIG4ubmVnYXRlKCk7XG5cdFx0fVxuXHRcdHJldHVybiBuO1xuXHR9XG5cdGlmIChuLmlzVW5pdCgpKSB7XG5cdFx0aWYgKG4uX3MgPCAwKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5uZWdhdGUoKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0aWYgKHRoaXMgPT09IG4pIHtcblx0XHRyZXR1cm4gdGhpcy5zcXVhcmUoKTtcblx0fVxuXG5cdHZhciByID0gKHRoaXMuX2QubGVuZ3RoID49IG4uX2QubGVuZ3RoKTtcblx0dmFyIGEgPSAociA/IHRoaXMgOiBuKS5fZDsgLy8gYSB3aWxsIGJlIGxvbmdlciB0aGFuIGJcblx0dmFyIGIgPSAociA/IG4gOiB0aGlzKS5fZDtcblx0dmFyIGFsID0gYS5sZW5ndGg7XG5cdHZhciBibCA9IGIubGVuZ3RoO1xuXG5cdHZhciBwbCA9IGFsICsgYmw7XG5cdHZhciBwYXJ0aWFsID0gbmV3IEFycmF5KHBsKTtcblx0dmFyIGk7XG5cdGZvciAoaSA9IDA7IGkgPCBwbDsgaSsrKSB7XG5cdFx0cGFydGlhbFtpXSA9IDA7XG5cdH1cblxuXHRmb3IgKGkgPSAwOyBpIDwgYmw7IGkrKykge1xuXHRcdHZhciBjYXJyeSA9IDA7XG5cdFx0dmFyIGJpID0gYltpXTtcblx0XHR2YXIgamxpbWl0ID0gYWwgKyBpO1xuXHRcdHZhciBkaWdpdDtcblx0XHRmb3IgKHZhciBqID0gaTsgaiA8IGpsaW1pdDsgaisrKSB7XG5cdFx0XHRkaWdpdCA9IHBhcnRpYWxbal0gKyBiaSAqIGFbaiAtIGldICsgY2Fycnk7XG5cdFx0XHRjYXJyeSA9IChkaWdpdCAvIEJpZ0ludGVnZXJfYmFzZSkgfCAwO1xuXHRcdFx0cGFydGlhbFtqXSA9IChkaWdpdCAlIEJpZ0ludGVnZXJfYmFzZSkgfCAwO1xuXHRcdH1cblx0XHRpZiAoY2FycnkpIHtcblx0XHRcdGRpZ2l0ID0gcGFydGlhbFtqXSArIGNhcnJ5O1xuXHRcdFx0Y2FycnkgPSAoZGlnaXQgLyBCaWdJbnRlZ2VyX2Jhc2UpIHwgMDtcblx0XHRcdHBhcnRpYWxbal0gPSBkaWdpdCAlIEJpZ0ludGVnZXJfYmFzZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIG5ldyBCaWdJbnRlZ2VyKHBhcnRpYWwsIHRoaXMuX3MgKiBuLl9zLCBDT05TVFJVQ1QpO1xufTtcblxuLy8gTXVsdGlwbHkgYSBCaWdJbnRlZ2VyIGJ5IGEgc2luZ2xlLWRpZ2l0IG5hdGl2ZSBudW1iZXJcbi8vIEFzc3VtZXMgdGhhdCB0aGlzIGFuZCBuIGFyZSA+PSAwXG4vLyBUaGlzIGlzIG5vdCByZWFsbHkgaW50ZW5kZWQgdG8gYmUgdXNlZCBvdXRzaWRlIHRoZSBsaWJyYXJ5IGl0c2VsZlxuQmlnSW50ZWdlci5wcm90b3R5cGUubXVsdGlwbHlTaW5nbGVEaWdpdCA9IGZ1bmN0aW9uKG4pIHtcblx0aWYgKG4gPT09IDAgfHwgdGhpcy5fcyA9PT0gMCkge1xuXHRcdHJldHVybiBaRVJPO1xuXHR9XG5cdGlmIChuID09PSAxKSB7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHR2YXIgZGlnaXQ7XG5cdGlmICh0aGlzLl9kLmxlbmd0aCA9PT0gMSkge1xuXHRcdGRpZ2l0ID0gdGhpcy5fZFswXSAqIG47XG5cdFx0aWYgKGRpZ2l0ID49IEJpZ0ludGVnZXJfYmFzZSkge1xuXHRcdFx0cmV0dXJuIG5ldyBCaWdJbnRlZ2VyKFsoZGlnaXQgJSBCaWdJbnRlZ2VyX2Jhc2UpfDAsXG5cdFx0XHRcdFx0KGRpZ2l0IC8gQmlnSW50ZWdlcl9iYXNlKXwwXSwgMSwgQ09OU1RSVUNUKTtcblx0XHR9XG5cdFx0cmV0dXJuIG5ldyBCaWdJbnRlZ2VyKFtkaWdpdF0sIDEsIENPTlNUUlVDVCk7XG5cdH1cblxuXHRpZiAobiA9PT0gMikge1xuXHRcdHJldHVybiB0aGlzLmFkZCh0aGlzKTtcblx0fVxuXHRpZiAodGhpcy5pc1VuaXQoKSkge1xuXHRcdHJldHVybiBuZXcgQmlnSW50ZWdlcihbbl0sIDEsIENPTlNUUlVDVCk7XG5cdH1cblxuXHR2YXIgYSA9IHRoaXMuX2Q7XG5cdHZhciBhbCA9IGEubGVuZ3RoO1xuXG5cdHZhciBwbCA9IGFsICsgMTtcblx0dmFyIHBhcnRpYWwgPSBuZXcgQXJyYXkocGwpO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHBsOyBpKyspIHtcblx0XHRwYXJ0aWFsW2ldID0gMDtcblx0fVxuXG5cdHZhciBjYXJyeSA9IDA7XG5cdGZvciAodmFyIGogPSAwOyBqIDwgYWw7IGorKykge1xuXHRcdGRpZ2l0ID0gbiAqIGFbal0gKyBjYXJyeTtcblx0XHRjYXJyeSA9IChkaWdpdCAvIEJpZ0ludGVnZXJfYmFzZSkgfCAwO1xuXHRcdHBhcnRpYWxbal0gPSAoZGlnaXQgJSBCaWdJbnRlZ2VyX2Jhc2UpIHwgMDtcblx0fVxuXHRpZiAoY2FycnkpIHtcblx0XHRwYXJ0aWFsW2pdID0gY2Fycnk7XG5cdH1cblxuXHRyZXR1cm4gbmV3IEJpZ0ludGVnZXIocGFydGlhbCwgMSwgQ09OU1RSVUNUKTtcbn07XG5cbi8qXG5cdEZ1bmN0aW9uOiBzcXVhcmVcblx0TXVsdGlwbHkgYSA8QmlnSW50ZWdlcj4gYnkgaXRzZWxmLlxuXG5cdFRoaXMgaXMgc2xpZ2h0bHkgZmFzdGVyIHRoYW4gcmVndWxhciBtdWx0aXBsaWNhdGlvbiwgc2luY2UgaXQgcmVtb3ZlcyB0aGVcblx0ZHVwbGljYXRlZCBtdWx0aXBsY2F0aW9ucy5cblxuXHRSZXR1cm5zOlxuXG5cdFx0PiB0aGlzLm11bHRpcGx5KHRoaXMpXG5cblx0U2VlIEFsc286XG5cdFx0PG11bHRpcGx5PlxuKi9cbkJpZ0ludGVnZXIucHJvdG90eXBlLnNxdWFyZSA9IGZ1bmN0aW9uKCkge1xuXHQvLyBOb3JtYWxseSwgc3F1YXJpbmcgYSAxMC1kaWdpdCBudW1iZXIgd291bGQgdGFrZSAxMDAgbXVsdGlwbGljYXRpb25zLlxuXHQvLyBPZiB0aGVzZSAxMCBhcmUgdW5pcXVlIGRpYWdvbmFscywgb2YgdGhlIHJlbWFpbmluZyA5MCAoMTAwLTEwKSwgNDUgYXJlIHJlcGVhdGVkLlxuXHQvLyBUaGlzIHByb2NlZHVyZSBzYXZlcyAoTiooTi0xKSkvMiBtdWx0aXBsaWNhdGlvbnMsIChlLmcuLCA0NSBvZiAxMDAgbXVsdGlwbGllcykuXG5cdC8vIEJhc2VkIG9uIGNvZGUgYnkgR2FyeSBEYXJieSwgSW50ZWxsaXRlY2ggU3lzdGVtcyBJbmMuLCB3d3cuRGVscGhpRm9yRnVuLm9yZ1xuXG5cdGlmICh0aGlzLl9zID09PSAwKSB7XG5cdFx0cmV0dXJuIFpFUk87XG5cdH1cblx0aWYgKHRoaXMuaXNVbml0KCkpIHtcblx0XHRyZXR1cm4gT05FO1xuXHR9XG5cblx0dmFyIGRpZ2l0cyA9IHRoaXMuX2Q7XG5cdHZhciBsZW5ndGggPSBkaWdpdHMubGVuZ3RoO1xuXHR2YXIgaW11bHQxID0gbmV3IEFycmF5KGxlbmd0aCArIGxlbmd0aCArIDEpO1xuXHR2YXIgcHJvZHVjdCwgY2FycnksIGs7XG5cdHZhciBpO1xuXG5cdC8vIENhbGN1bGF0ZSBkaWFnb25hbFxuXHRmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRrID0gaSAqIDI7XG5cdFx0cHJvZHVjdCA9IGRpZ2l0c1tpXSAqIGRpZ2l0c1tpXTtcblx0XHRjYXJyeSA9IChwcm9kdWN0IC8gQmlnSW50ZWdlcl9iYXNlKSB8IDA7XG5cdFx0aW11bHQxW2tdID0gcHJvZHVjdCAlIEJpZ0ludGVnZXJfYmFzZTtcblx0XHRpbXVsdDFbayArIDFdID0gY2Fycnk7XG5cdH1cblxuXHQvLyBDYWxjdWxhdGUgcmVwZWF0aW5nIHBhcnRcblx0Zm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0Y2FycnkgPSAwO1xuXHRcdGsgPSBpICogMiArIDE7XG5cdFx0Zm9yICh2YXIgaiA9IGkgKyAxOyBqIDwgbGVuZ3RoOyBqKyssIGsrKykge1xuXHRcdFx0cHJvZHVjdCA9IGRpZ2l0c1tqXSAqIGRpZ2l0c1tpXSAqIDIgKyBpbXVsdDFba10gKyBjYXJyeTtcblx0XHRcdGNhcnJ5ID0gKHByb2R1Y3QgLyBCaWdJbnRlZ2VyX2Jhc2UpIHwgMDtcblx0XHRcdGltdWx0MVtrXSA9IHByb2R1Y3QgJSBCaWdJbnRlZ2VyX2Jhc2U7XG5cdFx0fVxuXHRcdGsgPSBsZW5ndGggKyBpO1xuXHRcdHZhciBkaWdpdCA9IGNhcnJ5ICsgaW11bHQxW2tdO1xuXHRcdGNhcnJ5ID0gKGRpZ2l0IC8gQmlnSW50ZWdlcl9iYXNlKSB8IDA7XG5cdFx0aW11bHQxW2tdID0gZGlnaXQgJSBCaWdJbnRlZ2VyX2Jhc2U7XG5cdFx0aW11bHQxW2sgKyAxXSArPSBjYXJyeTtcblx0fVxuXG5cdHJldHVybiBuZXcgQmlnSW50ZWdlcihpbXVsdDEsIDEsIENPTlNUUlVDVCk7XG59O1xuXG4vKlxuXHRGdW5jdGlvbjogcXVvdGllbnRcblx0RGl2aWRlIHR3byA8QmlnSW50ZWdlcnM+IGFuZCB0cnVuY2F0ZSB0b3dhcmRzIHplcm8uXG5cblx0PHF1b3RpZW50PiB0aHJvd3MgYW4gZXhjZXB0aW9uIGlmICpuKiBpcyB6ZXJvLlxuXG5cdFBhcmFtZXRlcnM6XG5cblx0XHRuIC0gVGhlIG51bWJlciB0byBkaXZpZGUgKnRoaXMqIGJ5LiBXaWxsIGJlIGNvbnZlcnRlZCB0byBhIDxCaWdJbnRlZ2VyPi5cblxuXHRSZXR1cm5zOlxuXG5cdFx0VGhlICp0aGlzKiAvICpuKiwgdHJ1bmNhdGVkIHRvIGFuIGludGVnZXIuXG5cblx0U2VlIEFsc286XG5cblx0XHQ8YWRkPiwgPHN1YnRyYWN0PiwgPG11bHRpcGx5PiwgPGRpdlJlbT4sIDxyZW1haW5kZXI+XG4qL1xuQmlnSW50ZWdlci5wcm90b3R5cGUucXVvdGllbnQgPSBmdW5jdGlvbihuKSB7XG5cdHJldHVybiB0aGlzLmRpdlJlbShuKVswXTtcbn07XG5cbi8qXG5cdEZ1bmN0aW9uOiBkaXZpZGVcblx0RGVwcmVjYXRlZCBzeW5vbnltIGZvciA8cXVvdGllbnQ+LlxuKi9cbkJpZ0ludGVnZXIucHJvdG90eXBlLmRpdmlkZSA9IEJpZ0ludGVnZXIucHJvdG90eXBlLnF1b3RpZW50O1xuXG4vKlxuXHRGdW5jdGlvbjogcmVtYWluZGVyXG5cdENhbGN1bGF0ZSB0aGUgcmVtYWluZGVyIG9mIHR3byA8QmlnSW50ZWdlcnM+LlxuXG5cdDxyZW1haW5kZXI+IHRocm93cyBhbiBleGNlcHRpb24gaWYgKm4qIGlzIHplcm8uXG5cblx0UGFyYW1ldGVyczpcblxuXHRcdG4gLSBUaGUgcmVtYWluZGVyIGFmdGVyICp0aGlzKiBpcyBkaXZpZGVkICp0aGlzKiBieSAqbiouIFdpbGwgYmVcblx0XHQgICAgY29udmVydGVkIHRvIGEgPEJpZ0ludGVnZXI+LlxuXG5cdFJldHVybnM6XG5cblx0XHQqdGhpcyogJSAqbiouXG5cblx0U2VlIEFsc286XG5cblx0XHQ8ZGl2UmVtPiwgPHF1b3RpZW50PlxuKi9cbkJpZ0ludGVnZXIucHJvdG90eXBlLnJlbWFpbmRlciA9IGZ1bmN0aW9uKG4pIHtcblx0cmV0dXJuIHRoaXMuZGl2UmVtKG4pWzFdO1xufTtcblxuLypcblx0RnVuY3Rpb246IGRpdlJlbVxuXHRDYWxjdWxhdGUgdGhlIGludGVnZXIgcXVvdGllbnQgYW5kIHJlbWFpbmRlciBvZiB0d28gPEJpZ0ludGVnZXJzPi5cblxuXHQ8ZGl2UmVtPiB0aHJvd3MgYW4gZXhjZXB0aW9uIGlmICpuKiBpcyB6ZXJvLlxuXG5cdFBhcmFtZXRlcnM6XG5cblx0XHRuIC0gVGhlIG51bWJlciB0byBkaXZpZGUgKnRoaXMqIGJ5LiBXaWxsIGJlIGNvbnZlcnRlZCB0byBhIDxCaWdJbnRlZ2VyPi5cblxuXHRSZXR1cm5zOlxuXG5cdFx0QSB0d28tZWxlbWVudCBhcnJheSBjb250YWluaW5nIHRoZSBxdW90aWVudCBhbmQgdGhlIHJlbWFpbmRlci5cblxuXHRcdD4gYS5kaXZSZW0oYilcblxuXHRcdGlzIGV4YWN0bHkgZXF1aXZhbGVudCB0b1xuXG5cdFx0PiBbYS5xdW90aWVudChiKSwgYS5yZW1haW5kZXIoYildXG5cblx0XHRleGNlcHQgaXQgaXMgZmFzdGVyLCBiZWNhdXNlIHRoZXkgYXJlIGNhbGN1bGF0ZWQgYXQgdGhlIHNhbWUgdGltZS5cblxuXHRTZWUgQWxzbzpcblxuXHRcdDxxdW90aWVudD4sIDxyZW1haW5kZXI+XG4qL1xuQmlnSW50ZWdlci5wcm90b3R5cGUuZGl2UmVtID0gZnVuY3Rpb24obikge1xuXHRuID0gQmlnSW50ZWdlcihuKTtcblx0aWYgKG4uX3MgPT09IDApIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJEaXZpZGUgYnkgemVyb1wiKTtcblx0fVxuXHRpZiAodGhpcy5fcyA9PT0gMCkge1xuXHRcdHJldHVybiBbWkVSTywgWkVST107XG5cdH1cblx0aWYgKG4uX2QubGVuZ3RoID09PSAxKSB7XG5cdFx0cmV0dXJuIHRoaXMuZGl2UmVtU21hbGwobi5fcyAqIG4uX2RbMF0pO1xuXHR9XG5cblx0Ly8gVGVzdCBmb3IgZWFzeSBjYXNlcyAtLSB8bjF8IDw9IHxuMnxcblx0c3dpdGNoICh0aGlzLmNvbXBhcmVBYnMobikpIHtcblx0Y2FzZSAwOiAvLyBuMSA9PSBuMlxuXHRcdHJldHVybiBbdGhpcy5fcyA9PT0gbi5fcyA/IE9ORSA6IE1fT05FLCBaRVJPXTtcblx0Y2FzZSAtMTogLy8gfG4xfCA8IHxuMnxcblx0XHRyZXR1cm4gW1pFUk8sIHRoaXNdO1xuXHR9XG5cblx0dmFyIHNpZ24gPSB0aGlzLl9zICogbi5fcztcblx0dmFyIGEgPSBuLmFicygpO1xuXHR2YXIgYl9kaWdpdHMgPSB0aGlzLl9kO1xuXHR2YXIgYl9pbmRleCA9IGJfZGlnaXRzLmxlbmd0aDtcblx0dmFyIGRpZ2l0cyA9IG4uX2QubGVuZ3RoO1xuXHR2YXIgcXVvdCA9IFtdO1xuXHR2YXIgZ3Vlc3M7XG5cblx0dmFyIHBhcnQgPSBuZXcgQmlnSW50ZWdlcihbXSwgMCwgQ09OU1RSVUNUKTtcblx0cGFydC5fcyA9IDE7XG5cblx0d2hpbGUgKGJfaW5kZXgpIHtcblx0XHRwYXJ0Ll9kLnVuc2hpZnQoYl9kaWdpdHNbLS1iX2luZGV4XSk7XG5cblx0XHRpZiAocGFydC5jb21wYXJlQWJzKG4pIDwgMCkge1xuXHRcdFx0cXVvdC5wdXNoKDApO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXHRcdGlmIChwYXJ0Ll9zID09PSAwKSB7XG5cdFx0XHRndWVzcyA9IDA7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dmFyIHhsZW4gPSBwYXJ0Ll9kLmxlbmd0aCwgeWxlbiA9IGEuX2QubGVuZ3RoO1xuXHRcdFx0dmFyIGhpZ2h4ID0gcGFydC5fZFt4bGVuLTFdKkJpZ0ludGVnZXJfYmFzZSArIHBhcnQuX2RbeGxlbi0yXTtcblx0XHRcdHZhciBoaWdoeSA9IGEuX2RbeWxlbi0xXSpCaWdJbnRlZ2VyX2Jhc2UgKyBhLl9kW3lsZW4tMl07XG5cdFx0XHRpZiAocGFydC5fZC5sZW5ndGggPiBhLl9kLmxlbmd0aCkge1xuXHRcdFx0XHQvLyBUaGUgbGVuZ3RoIG9mIHBhcnQuX2QgY2FuIGVpdGhlciBtYXRjaCBhLl9kIGxlbmd0aCxcblx0XHRcdFx0Ly8gb3IgZXhjZWVkIGl0IGJ5IG9uZS5cblx0XHRcdFx0aGlnaHggPSAoaGlnaHgrMSkqQmlnSW50ZWdlcl9iYXNlO1xuXHRcdFx0fVxuXHRcdFx0Z3Vlc3MgPSBNYXRoLmNlaWwoaGlnaHgvaGlnaHkpO1xuXHRcdH1cblx0XHRkbyB7XG5cdFx0XHR2YXIgY2hlY2sgPSBhLm11bHRpcGx5U2luZ2xlRGlnaXQoZ3Vlc3MpO1xuXHRcdFx0aWYgKGNoZWNrLmNvbXBhcmVBYnMocGFydCkgPD0gMCkge1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGd1ZXNzLS07XG5cdFx0fSB3aGlsZSAoZ3Vlc3MpO1xuXG5cdFx0cXVvdC5wdXNoKGd1ZXNzKTtcblx0XHRpZiAoIWd1ZXNzKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cdFx0dmFyIGRpZmYgPSBwYXJ0LnN1YnRyYWN0KGNoZWNrKTtcblx0XHRwYXJ0Ll9kID0gZGlmZi5fZC5zbGljZSgpO1xuXHRcdGlmIChwYXJ0Ll9kLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0cGFydC5fcyA9IDA7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIFtuZXcgQmlnSW50ZWdlcihxdW90LnJldmVyc2UoKSwgc2lnbiwgQ09OU1RSVUNUKSxcblx0XHQgICBuZXcgQmlnSW50ZWdlcihwYXJ0Ll9kLCB0aGlzLl9zLCBDT05TVFJVQ1QpXTtcbn07XG5cbi8vIFRocm93cyBhbiBleGNlcHRpb24gaWYgbiBpcyBvdXRzaWRlIG9mICgtQmlnSW50ZWdlci5iYXNlLCAtMV0gb3Jcbi8vIFsxLCBCaWdJbnRlZ2VyLmJhc2UpLiAgSXQncyBub3QgbmVjZXNzYXJ5IHRvIGNhbGwgdGhpcywgc2luY2UgdGhlXG4vLyBvdGhlciBkaXZpc2lvbiBmdW5jdGlvbnMgd2lsbCBjYWxsIGl0IGlmIHRoZXkgYXJlIGFibGUgdG8uXG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5kaXZSZW1TbWFsbCA9IGZ1bmN0aW9uKG4pIHtcblx0dmFyIHI7XG5cdG4gPSArbjtcblx0aWYgKG4gPT09IDApIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJEaXZpZGUgYnkgemVyb1wiKTtcblx0fVxuXG5cdHZhciBuX3MgPSBuIDwgMCA/IC0xIDogMTtcblx0dmFyIHNpZ24gPSB0aGlzLl9zICogbl9zO1xuXHRuID0gTWF0aC5hYnMobik7XG5cblx0aWYgKG4gPCAxIHx8IG4gPj0gQmlnSW50ZWdlcl9iYXNlKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQXJndW1lbnQgb3V0IG9mIHJhbmdlXCIpO1xuXHR9XG5cblx0aWYgKHRoaXMuX3MgPT09IDApIHtcblx0XHRyZXR1cm4gW1pFUk8sIFpFUk9dO1xuXHR9XG5cblx0aWYgKG4gPT09IDEgfHwgbiA9PT0gLTEpIHtcblx0XHRyZXR1cm4gWyhzaWduID09PSAxKSA/IHRoaXMuYWJzKCkgOiBuZXcgQmlnSW50ZWdlcih0aGlzLl9kLCBzaWduLCBDT05TVFJVQ1QpLCBaRVJPXTtcblx0fVxuXG5cdC8vIDIgPD0gbiA8IEJpZ0ludGVnZXJfYmFzZVxuXG5cdC8vIGRpdmlkZSBhIHNpbmdsZSBkaWdpdCBieSBhIHNpbmdsZSBkaWdpdFxuXHRpZiAodGhpcy5fZC5sZW5ndGggPT09IDEpIHtcblx0XHR2YXIgcSA9IG5ldyBCaWdJbnRlZ2VyKFsodGhpcy5fZFswXSAvIG4pIHwgMF0sIDEsIENPTlNUUlVDVCk7XG5cdFx0ciA9IG5ldyBCaWdJbnRlZ2VyKFsodGhpcy5fZFswXSAlIG4pIHwgMF0sIDEsIENPTlNUUlVDVCk7XG5cdFx0aWYgKHNpZ24gPCAwKSB7XG5cdFx0XHRxID0gcS5uZWdhdGUoKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuX3MgPCAwKSB7XG5cdFx0XHRyID0gci5uZWdhdGUoKTtcblx0XHR9XG5cdFx0cmV0dXJuIFtxLCByXTtcblx0fVxuXG5cdHZhciBkaWdpdHMgPSB0aGlzLl9kLnNsaWNlKCk7XG5cdHZhciBxdW90ID0gbmV3IEFycmF5KGRpZ2l0cy5sZW5ndGgpO1xuXHR2YXIgcGFydCA9IDA7XG5cdHZhciBkaWZmID0gMDtcblx0dmFyIGkgPSAwO1xuXHR2YXIgZ3Vlc3M7XG5cblx0d2hpbGUgKGRpZ2l0cy5sZW5ndGgpIHtcblx0XHRwYXJ0ID0gcGFydCAqIEJpZ0ludGVnZXJfYmFzZSArIGRpZ2l0c1tkaWdpdHMubGVuZ3RoIC0gMV07XG5cdFx0aWYgKHBhcnQgPCBuKSB7XG5cdFx0XHRxdW90W2krK10gPSAwO1xuXHRcdFx0ZGlnaXRzLnBvcCgpO1xuXHRcdFx0ZGlmZiA9IEJpZ0ludGVnZXJfYmFzZSAqIGRpZmYgKyBwYXJ0O1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXHRcdGlmIChwYXJ0ID09PSAwKSB7XG5cdFx0XHRndWVzcyA9IDA7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0Z3Vlc3MgPSAocGFydCAvIG4pIHwgMDtcblx0XHR9XG5cblx0XHR2YXIgY2hlY2sgPSBuICogZ3Vlc3M7XG5cdFx0ZGlmZiA9IHBhcnQgLSBjaGVjaztcblx0XHRxdW90W2krK10gPSBndWVzcztcblx0XHRpZiAoIWd1ZXNzKSB7XG5cdFx0XHRkaWdpdHMucG9wKCk7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRkaWdpdHMucG9wKCk7XG5cdFx0cGFydCA9IGRpZmY7XG5cdH1cblxuXHRyID0gbmV3IEJpZ0ludGVnZXIoW2RpZmZdLCAxLCBDT05TVFJVQ1QpO1xuXHRpZiAodGhpcy5fcyA8IDApIHtcblx0XHRyID0gci5uZWdhdGUoKTtcblx0fVxuXHRyZXR1cm4gW25ldyBCaWdJbnRlZ2VyKHF1b3QucmV2ZXJzZSgpLCBzaWduLCBDT05TVFJVQ1QpLCByXTtcbn07XG5cbi8qXG5cdEZ1bmN0aW9uOiBpc0V2ZW5cblx0UmV0dXJuIHRydWUgaWZmICp0aGlzKiBpcyBkaXZpc2libGUgYnkgdHdvLlxuXG5cdE5vdGUgdGhhdCA8QmlnSW50ZWdlci5aRVJPPiBpcyBldmVuLlxuXG5cdFJldHVybnM6XG5cblx0XHR0cnVlIGlmICp0aGlzKiBpcyBldmVuLCBmYWxzZSBvdGhlcndpc2UuXG5cblx0U2VlIEFsc286XG5cblx0XHQ8aXNPZGQ+XG4qL1xuQmlnSW50ZWdlci5wcm90b3R5cGUuaXNFdmVuID0gZnVuY3Rpb24oKSB7XG5cdHZhciBkaWdpdHMgPSB0aGlzLl9kO1xuXHRyZXR1cm4gdGhpcy5fcyA9PT0gMCB8fCBkaWdpdHMubGVuZ3RoID09PSAwIHx8IChkaWdpdHNbMF0gJSAyKSA9PT0gMDtcbn07XG5cbi8qXG5cdEZ1bmN0aW9uOiBpc09kZFxuXHRSZXR1cm4gdHJ1ZSBpZmYgKnRoaXMqIGlzIG5vdCBkaXZpc2libGUgYnkgdHdvLlxuXG5cdFJldHVybnM6XG5cblx0XHR0cnVlIGlmICp0aGlzKiBpcyBvZGQsIGZhbHNlIG90aGVyd2lzZS5cblxuXHRTZWUgQWxzbzpcblxuXHRcdDxpc0V2ZW4+XG4qL1xuQmlnSW50ZWdlci5wcm90b3R5cGUuaXNPZGQgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuICF0aGlzLmlzRXZlbigpO1xufTtcblxuLypcblx0RnVuY3Rpb246IHNpZ25cblx0R2V0IHRoZSBzaWduIG9mIGEgPEJpZ0ludGVnZXI+LlxuXG5cdFJldHVybnM6XG5cblx0XHQqIC0xIGlmICp0aGlzKiA8IDBcblx0XHQqIDAgaWYgKnRoaXMqID09IDBcblx0XHQqICsxIGlmICp0aGlzKiA+IDBcblxuXHRTZWUgQWxzbzpcblxuXHRcdDxpc1plcm8+LCA8aXNQb3NpdGl2ZT4sIDxpc05lZ2F0aXZlPiwgPGNvbXBhcmU+LCA8QmlnSW50ZWdlci5aRVJPPlxuKi9cbkJpZ0ludGVnZXIucHJvdG90eXBlLnNpZ24gPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMuX3M7XG59O1xuXG4vKlxuXHRGdW5jdGlvbjogaXNQb3NpdGl2ZVxuXHRSZXR1cm4gdHJ1ZSBpZmYgKnRoaXMqID4gMC5cblxuXHRSZXR1cm5zOlxuXG5cdFx0dHJ1ZSBpZiAqdGhpcyouY29tcGFyZSg8QmlnSW50ZWdlci5aRVJPPikgPT0gMS5cblxuXHRTZWUgQWxzbzpcblxuXHRcdDxzaWduPiwgPGlzWmVybz4sIDxpc05lZ2F0aXZlPiwgPGlzVW5pdD4sIDxjb21wYXJlPiwgPEJpZ0ludGVnZXIuWkVSTz5cbiovXG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5pc1Bvc2l0aXZlID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLl9zID4gMDtcbn07XG5cbi8qXG5cdEZ1bmN0aW9uOiBpc05lZ2F0aXZlXG5cdFJldHVybiB0cnVlIGlmZiAqdGhpcyogPCAwLlxuXG5cdFJldHVybnM6XG5cblx0XHR0cnVlIGlmICp0aGlzKi5jb21wYXJlKDxCaWdJbnRlZ2VyLlpFUk8+KSA9PSAtMS5cblxuXHRTZWUgQWxzbzpcblxuXHRcdDxzaWduPiwgPGlzUG9zaXRpdmU+LCA8aXNaZXJvPiwgPGlzVW5pdD4sIDxjb21wYXJlPiwgPEJpZ0ludGVnZXIuWkVSTz5cbiovXG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5pc05lZ2F0aXZlID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLl9zIDwgMDtcbn07XG5cbi8qXG5cdEZ1bmN0aW9uOiBpc1plcm9cblx0UmV0dXJuIHRydWUgaWZmICp0aGlzKiA9PSAwLlxuXG5cdFJldHVybnM6XG5cblx0XHR0cnVlIGlmICp0aGlzKi5jb21wYXJlKDxCaWdJbnRlZ2VyLlpFUk8+KSA9PSAwLlxuXG5cdFNlZSBBbHNvOlxuXG5cdFx0PHNpZ24+LCA8aXNQb3NpdGl2ZT4sIDxpc05lZ2F0aXZlPiwgPGlzVW5pdD4sIDxCaWdJbnRlZ2VyLlpFUk8+XG4qL1xuQmlnSW50ZWdlci5wcm90b3R5cGUuaXNaZXJvID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLl9zID09PSAwO1xufTtcblxuLypcblx0RnVuY3Rpb246IGV4cDEwXG5cdE11bHRpcGx5IGEgPEJpZ0ludGVnZXI+IGJ5IGEgcG93ZXIgb2YgMTAuXG5cblx0VGhpcyBpcyBlcXVpdmFsZW50IHRvLCBidXQgZmFzdGVyIHRoYW5cblxuXHQ+IGlmIChuID49IDApIHtcblx0PiAgICAgcmV0dXJuIHRoaXMubXVsdGlwbHkoQmlnSW50ZWdlcihcIjFlXCIgKyBuKSk7XG5cdD4gfVxuXHQ+IGVsc2UgeyAvLyBuIDw9IDBcblx0PiAgICAgcmV0dXJuIHRoaXMucXVvdGllbnQoQmlnSW50ZWdlcihcIjFlXCIgKyAtbikpO1xuXHQ+IH1cblxuXHRQYXJhbWV0ZXJzOlxuXG5cdFx0biAtIFRoZSBwb3dlciBvZiAxMCB0byBtdWx0aXBseSAqdGhpcyogYnkuICpuKiBpcyBjb252ZXJ0ZWQgdG8gYVxuXHRcdGphdmFzY2lwdCBudW1iZXIgYW5kIG11c3QgYmUgbm8gZ3JlYXRlciB0aGFuIDxCaWdJbnRlZ2VyLk1BWF9FWFA+XG5cdFx0KDB4N0ZGRkZGRkYpLCBvciBhbiBleGNlcHRpb24gd2lsbCBiZSB0aHJvd24uXG5cblx0UmV0dXJuczpcblxuXHRcdCp0aGlzKiAqICgxMCAqKiAqbiopLCB0cnVuY2F0ZWQgdG8gYW4gaW50ZWdlciBpZiBuZWNlc3NhcnkuXG5cblx0U2VlIEFsc286XG5cblx0XHQ8cG93PiwgPG11bHRpcGx5PlxuKi9cbkJpZ0ludGVnZXIucHJvdG90eXBlLmV4cDEwID0gZnVuY3Rpb24obikge1xuXHRuID0gK247XG5cdGlmIChuID09PSAwKSB7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0aWYgKE1hdGguYWJzKG4pID4gTnVtYmVyKE1BWF9FWFApKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiZXhwb25lbnQgdG9vIGxhcmdlIGluIEJpZ0ludGVnZXIuZXhwMTBcIik7XG5cdH1cblx0aWYgKG4gPiAwKSB7XG5cdFx0dmFyIGsgPSBuZXcgQmlnSW50ZWdlcih0aGlzLl9kLnNsaWNlKCksIHRoaXMuX3MsIENPTlNUUlVDVCk7XG5cblx0XHRmb3IgKDsgbiA+PSBCaWdJbnRlZ2VyX2Jhc2VfbG9nMTA7IG4gLT0gQmlnSW50ZWdlcl9iYXNlX2xvZzEwKSB7XG5cdFx0XHRrLl9kLnVuc2hpZnQoMCk7XG5cdFx0fVxuXHRcdGlmIChuID09IDApXG5cdFx0XHRyZXR1cm4gaztcblx0XHRrLl9zID0gMTtcblx0XHRrID0gay5tdWx0aXBseVNpbmdsZURpZ2l0KE1hdGgucG93KDEwLCBuKSk7XG5cdFx0cmV0dXJuICh0aGlzLl9zIDwgMCA/IGsubmVnYXRlKCkgOiBrKTtcblx0fSBlbHNlIGlmICgtbiA+PSB0aGlzLl9kLmxlbmd0aCpCaWdJbnRlZ2VyX2Jhc2VfbG9nMTApIHtcblx0XHRyZXR1cm4gWkVSTztcblx0fSBlbHNlIHtcblx0XHR2YXIgayA9IG5ldyBCaWdJbnRlZ2VyKHRoaXMuX2Quc2xpY2UoKSwgdGhpcy5fcywgQ09OU1RSVUNUKTtcblxuXHRcdGZvciAobiA9IC1uOyBuID49IEJpZ0ludGVnZXJfYmFzZV9sb2cxMDsgbiAtPSBCaWdJbnRlZ2VyX2Jhc2VfbG9nMTApIHtcblx0XHRcdGsuX2Quc2hpZnQoKTtcblx0XHR9XG5cdFx0cmV0dXJuIChuID09IDApID8gayA6IGsuZGl2UmVtU21hbGwoTWF0aC5wb3coMTAsIG4pKVswXTtcblx0fVxufTtcblxuLypcblx0RnVuY3Rpb246IHBvd1xuXHRSYWlzZSBhIDxCaWdJbnRlZ2VyPiB0byBhIHBvd2VyLlxuXG5cdEluIHRoaXMgaW1wbGVtZW50YXRpb24sIDAqKjAgaXMgMS5cblxuXHRQYXJhbWV0ZXJzOlxuXG5cdFx0biAtIFRoZSBleHBvbmVudCB0byByYWlzZSAqdGhpcyogYnkuICpuKiBtdXN0IGJlIG5vIGdyZWF0ZXIgdGhhblxuXHRcdDxCaWdJbnRlZ2VyLk1BWF9FWFA+ICgweDdGRkZGRkZGKSwgb3IgYW4gZXhjZXB0aW9uIHdpbGwgYmUgdGhyb3duLlxuXG5cdFJldHVybnM6XG5cblx0XHQqdGhpcyogcmFpc2VkIHRvIHRoZSAqbnRoKiBwb3dlci5cblxuXHRTZWUgQWxzbzpcblxuXHRcdDxtb2RQb3c+XG4qL1xuQmlnSW50ZWdlci5wcm90b3R5cGUucG93ID0gZnVuY3Rpb24obikge1xuXHRpZiAodGhpcy5pc1VuaXQoKSkge1xuXHRcdGlmICh0aGlzLl9zID4gMCkge1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0cmV0dXJuIEJpZ0ludGVnZXIobikuaXNPZGQoKSA/IHRoaXMgOiB0aGlzLm5lZ2F0ZSgpO1xuXHRcdH1cblx0fVxuXG5cdG4gPSBCaWdJbnRlZ2VyKG4pO1xuXHRpZiAobi5fcyA9PT0gMCkge1xuXHRcdHJldHVybiBPTkU7XG5cdH1cblx0ZWxzZSBpZiAobi5fcyA8IDApIHtcblx0XHRpZiAodGhpcy5fcyA9PT0gMCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiRGl2aWRlIGJ5IHplcm9cIik7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0cmV0dXJuIFpFUk87XG5cdFx0fVxuXHR9XG5cdGlmICh0aGlzLl9zID09PSAwKSB7XG5cdFx0cmV0dXJuIFpFUk87XG5cdH1cblx0aWYgKG4uaXNVbml0KCkpIHtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGlmIChuLmNvbXBhcmVBYnMoTUFYX0VYUCkgPiAwKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiZXhwb25lbnQgdG9vIGxhcmdlIGluIEJpZ0ludGVnZXIucG93XCIpO1xuXHR9XG5cdHZhciB4ID0gdGhpcztcblx0dmFyIGF1eCA9IE9ORTtcblx0dmFyIHR3byA9IEJpZ0ludGVnZXIuc21hbGxbMl07XG5cblx0d2hpbGUgKG4uaXNQb3NpdGl2ZSgpKSB7XG5cdFx0aWYgKG4uaXNPZGQoKSkge1xuXHRcdFx0YXV4ID0gYXV4Lm11bHRpcGx5KHgpO1xuXHRcdFx0aWYgKG4uaXNVbml0KCkpIHtcblx0XHRcdFx0cmV0dXJuIGF1eDtcblx0XHRcdH1cblx0XHR9XG5cdFx0eCA9IHguc3F1YXJlKCk7XG5cdFx0biA9IG4ucXVvdGllbnQodHdvKTtcblx0fVxuXG5cdHJldHVybiBhdXg7XG59O1xuXG4vKlxuXHRGdW5jdGlvbjogbW9kUG93XG5cdFJhaXNlIGEgPEJpZ0ludGVnZXI+IHRvIGEgcG93ZXIgKG1vZCBtKS5cblxuXHRCZWNhdXNlIGl0IGlzIHJlZHVjZWQgYnkgYSBtb2R1bHVzLCA8bW9kUG93PiBpcyBub3QgbGltaXRlZCBieVxuXHQ8QmlnSW50ZWdlci5NQVhfRVhQPiBsaWtlIDxwb3c+LlxuXG5cdFBhcmFtZXRlcnM6XG5cblx0XHRleHBvbmVudCAtIFRoZSBleHBvbmVudCB0byByYWlzZSAqdGhpcyogYnkuIE11c3QgYmUgcG9zaXRpdmUuXG5cdFx0bW9kdWx1cyAtIFRoZSBtb2R1bHVzLlxuXG5cdFJldHVybnM6XG5cblx0XHQqdGhpcyogXiAqZXhwb25lbnQqIChtb2QgKm1vZHVsdXMqKS5cblxuXHRTZWUgQWxzbzpcblxuXHRcdDxwb3c+LCA8bW9kPlxuKi9cbkJpZ0ludGVnZXIucHJvdG90eXBlLm1vZFBvdyA9IGZ1bmN0aW9uKGV4cG9uZW50LCBtb2R1bHVzKSB7XG5cdHZhciByZXN1bHQgPSBPTkU7XG5cdHZhciBiYXNlID0gdGhpcztcblxuXHR3aGlsZSAoZXhwb25lbnQuaXNQb3NpdGl2ZSgpKSB7XG5cdFx0aWYgKGV4cG9uZW50LmlzT2RkKCkpIHtcblx0XHRcdHJlc3VsdCA9IHJlc3VsdC5tdWx0aXBseShiYXNlKS5yZW1haW5kZXIobW9kdWx1cyk7XG5cdFx0fVxuXG5cdFx0ZXhwb25lbnQgPSBleHBvbmVudC5xdW90aWVudChCaWdJbnRlZ2VyLnNtYWxsWzJdKTtcblx0XHRpZiAoZXhwb25lbnQuaXNQb3NpdGl2ZSgpKSB7XG5cdFx0XHRiYXNlID0gYmFzZS5zcXVhcmUoKS5yZW1haW5kZXIobW9kdWx1cyk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qXG5cdEZ1bmN0aW9uOiBsb2dcblx0R2V0IHRoZSBuYXR1cmFsIGxvZ2FyaXRobSBvZiBhIDxCaWdJbnRlZ2VyPiBhcyBhIG5hdGl2ZSBKYXZhU2NyaXB0IG51bWJlci5cblxuXHRUaGlzIGlzIGVxdWl2YWxlbnQgdG9cblxuXHQ+IE1hdGgubG9nKHRoaXMudG9KU1ZhbHVlKCkpXG5cblx0YnV0IGhhbmRsZXMgdmFsdWVzIG91dHNpZGUgb2YgdGhlIG5hdGl2ZSBudW1iZXIgcmFuZ2UuXG5cblx0UmV0dXJuczpcblxuXHRcdGxvZyggKnRoaXMqIClcblxuXHRTZWUgQWxzbzpcblxuXHRcdDx0b0pTVmFsdWU+XG4qL1xuQmlnSW50ZWdlci5wcm90b3R5cGUubG9nID0gZnVuY3Rpb24oKSB7XG5cdHN3aXRjaCAodGhpcy5fcykge1xuXHRjYXNlIDA6XHQgcmV0dXJuIC1JbmZpbml0eTtcblx0Y2FzZSAtMTogcmV0dXJuIE5hTjtcblx0ZGVmYXVsdDogLy8gRmFsbCB0aHJvdWdoLlxuXHR9XG5cblx0dmFyIGwgPSB0aGlzLl9kLmxlbmd0aDtcblxuXHRpZiAobCpCaWdJbnRlZ2VyX2Jhc2VfbG9nMTAgPCAzMCkge1xuXHRcdHJldHVybiBNYXRoLmxvZyh0aGlzLnZhbHVlT2YoKSk7XG5cdH1cblxuXHR2YXIgTiA9IE1hdGguY2VpbCgzMC9CaWdJbnRlZ2VyX2Jhc2VfbG9nMTApO1xuXHR2YXIgZmlyc3ROZGlnaXRzID0gdGhpcy5fZC5zbGljZShsIC0gTik7XG5cdHJldHVybiBNYXRoLmxvZygobmV3IEJpZ0ludGVnZXIoZmlyc3ROZGlnaXRzLCAxLCBDT05TVFJVQ1QpKS52YWx1ZU9mKCkpICsgKGwgLSBOKSAqIE1hdGgubG9nKEJpZ0ludGVnZXJfYmFzZSk7XG59O1xuXG4vKlxuXHRGdW5jdGlvbjogdmFsdWVPZlxuXHRDb252ZXJ0IGEgPEJpZ0ludGVnZXI+IHRvIGEgbmF0aXZlIEphdmFTY3JpcHQgaW50ZWdlci5cblxuXHRUaGlzIGlzIGNhbGxlZCBhdXRvbWF0aWNhbGx5IGJ5IEphdmFTY2lwdCB0byBjb252ZXJ0IGEgPEJpZ0ludGVnZXI+IHRvIGFcblx0bmF0aXZlIHZhbHVlLlxuXG5cdFJldHVybnM6XG5cblx0XHQ+IHBhcnNlSW50KHRoaXMudG9TdHJpbmcoKSwgMTApXG5cblx0U2VlIEFsc286XG5cblx0XHQ8dG9TdHJpbmc+LCA8dG9KU1ZhbHVlPlxuKi9cbkJpZ0ludGVnZXIucHJvdG90eXBlLnZhbHVlT2YgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHBhcnNlSW50KHRoaXMudG9TdHJpbmcoKSwgMTApO1xufTtcblxuLypcblx0RnVuY3Rpb246IHRvSlNWYWx1ZVxuXHRDb252ZXJ0IGEgPEJpZ0ludGVnZXI+IHRvIGEgbmF0aXZlIEphdmFTY3JpcHQgaW50ZWdlci5cblxuXHRUaGlzIGlzIHRoZSBzYW1lIGFzIHZhbHVlT2YsIGJ1dCBtb3JlIGV4cGxpY2l0bHkgbmFtZWQuXG5cblx0UmV0dXJuczpcblxuXHRcdD4gcGFyc2VJbnQodGhpcy50b1N0cmluZygpLCAxMClcblxuXHRTZWUgQWxzbzpcblxuXHRcdDx0b1N0cmluZz4sIDx2YWx1ZU9mPlxuKi9cbkJpZ0ludGVnZXIucHJvdG90eXBlLnRvSlNWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gcGFyc2VJbnQodGhpcy50b1N0cmluZygpLCAxMCk7XG59O1xuXG52YXIgTUFYX0VYUCA9IEJpZ0ludGVnZXIoMHg3RkZGRkZGRik7XG4vLyBDb25zdGFudDogTUFYX0VYUFxuLy8gVGhlIGxhcmdlc3QgZXhwb25lbnQgYWxsb3dlZCBpbiA8cG93PiBhbmQgPGV4cDEwPiAoMHg3RkZGRkZGRiBvciAyMTQ3NDgzNjQ3KS5cbkJpZ0ludGVnZXIuTUFYX0VYUCA9IE1BWF9FWFA7XG5cbihmdW5jdGlvbigpIHtcblx0ZnVuY3Rpb24gbWFrZVVuYXJ5KGZuKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKGEpIHtcblx0XHRcdHJldHVybiBmbi5jYWxsKEJpZ0ludGVnZXIoYSkpO1xuXHRcdH07XG5cdH1cblxuXHRmdW5jdGlvbiBtYWtlQmluYXJ5KGZuKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHJldHVybiBmbi5jYWxsKEJpZ0ludGVnZXIoYSksIEJpZ0ludGVnZXIoYikpO1xuXHRcdH07XG5cdH1cblxuXHRmdW5jdGlvbiBtYWtlVHJpbmFyeShmbikge1xuXHRcdHJldHVybiBmdW5jdGlvbihhLCBiLCBjKSB7XG5cdFx0XHRyZXR1cm4gZm4uY2FsbChCaWdJbnRlZ2VyKGEpLCBCaWdJbnRlZ2VyKGIpLCBCaWdJbnRlZ2VyKGMpKTtcblx0XHR9O1xuXHR9XG5cblx0KGZ1bmN0aW9uKCkge1xuXHRcdHZhciBpLCBmbjtcblx0XHR2YXIgdW5hcnkgPSBcInRvSlNWYWx1ZSxpc0V2ZW4saXNPZGQsc2lnbixpc1plcm8saXNOZWdhdGl2ZSxhYnMsaXNVbml0LHNxdWFyZSxuZWdhdGUsaXNQb3NpdGl2ZSx0b1N0cmluZyxuZXh0LHByZXYsbG9nXCIuc3BsaXQoXCIsXCIpO1xuXHRcdHZhciBiaW5hcnkgPSBcImNvbXBhcmUscmVtYWluZGVyLGRpdlJlbSxzdWJ0cmFjdCxhZGQscXVvdGllbnQsZGl2aWRlLG11bHRpcGx5LHBvdyxjb21wYXJlQWJzXCIuc3BsaXQoXCIsXCIpO1xuXHRcdHZhciB0cmluYXJ5ID0gW1wibW9kUG93XCJdO1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8IHVuYXJ5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRmbiA9IHVuYXJ5W2ldO1xuXHRcdFx0QmlnSW50ZWdlcltmbl0gPSBtYWtlVW5hcnkoQmlnSW50ZWdlci5wcm90b3R5cGVbZm5dKTtcblx0XHR9XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgYmluYXJ5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRmbiA9IGJpbmFyeVtpXTtcblx0XHRcdEJpZ0ludGVnZXJbZm5dID0gbWFrZUJpbmFyeShCaWdJbnRlZ2VyLnByb3RvdHlwZVtmbl0pO1xuXHRcdH1cblxuXHRcdGZvciAoaSA9IDA7IGkgPCB0cmluYXJ5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRmbiA9IHRyaW5hcnlbaV07XG5cdFx0XHRCaWdJbnRlZ2VyW2ZuXSA9IG1ha2VUcmluYXJ5KEJpZ0ludGVnZXIucHJvdG90eXBlW2ZuXSk7XG5cdFx0fVxuXG5cdFx0QmlnSW50ZWdlci5leHAxMCA9IGZ1bmN0aW9uKHgsIG4pIHtcblx0XHRcdHJldHVybiBCaWdJbnRlZ2VyKHgpLmV4cDEwKG4pO1xuXHRcdH07XG5cdH0pKCk7XG59KSgpO1xuXG5leHBvcnRzLkJpZ0ludGVnZXIgPSBCaWdJbnRlZ2VyO1xufSkodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnID8gZXhwb3J0cyA6IHRoaXMpO1xuIiwicmVxdWlyZSgnZXM1LXNoaW0nKVxucmVxdWlyZSgnLi9ub2RlX21vZHVsZXMvZXM1LXNoaW0vZXM1LXNoYW0uanMnKVxuXG52b2lkIGZ1bmN0aW9uKHJvb3Qpe1xuICAgICd1c2Ugc3RyaWN0J1xuXG4gICAgdmFyIHV0aWwgPSBPYmplY3QuY3JlYXRlKG51bGwpXG4gICAgICAgICwgb3duID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNcblxuICAgIHV0aWwubGliZXJhdGUgPSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5iaW5kKEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsKVxuXG4gICAgdXRpbC5kZXRhY2ggPSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5iaW5kKEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseSlcblxuICAgIHV0aWwuc2xpY2UgPSB1dGlsLmxpYmVyYXRlKEFycmF5LnByb3RvdHlwZS5zbGljZSlcblxuICAgIHV0aWwudGltZXMgPSBmdW5jdGlvbihuciwgZnVuKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXVxuICAgICAgICAgICAgLCBpXG4gICAgICAgICAgICA7XG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgbnI7IGkrKykgeyByZXN1bHQucHVzaChmdW4oaSkpIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cblxuICAgIHV0aWwubG9uZ2VzdCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBhcmdzID0gdXRpbC5zbGljZShhcmd1bWVudHMpXG4gICAgICAgICAgICAsIHJlc3VsdCA9IFtdXG4gICAgICAgICAgICA7XG5cbiAgICAgICAgdXRpbC50aW1lcyhhcmdzLmxlbmd0aCwgZnVuY3Rpb24oaSl7XG4gICAgICAgICAgICB2YXIgYXJyID0gYXJnc1tpXTtcbiAgICAgICAgICAgIHJlc3VsdCA9IGFyZ3NbaV0gPyAocmVzdWx0Lmxlbmd0aCA+IGFyZ3NbaV0ubGVuZ3RoID8gcmVzdWx0IDogYXJnc1tpXSkgOiBbXVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgfVxuXG4gICAgdXRpbC5zcGFuID0gZnVuY3Rpb24oaW5pdCwgbGltaXQsIHN0ZXBwZXIpIHtcblxuICAgICAgICB2YXIgbGlzdCA9IFtdXG4gICAgICAgICAgICAsaSA9IGluaXQudmFsdWVPZigpXG4gICAgICAgICAgICAsIGNvbnRpbnVlUHJlZFxuICAgICAgICAgICAgO1xuXG4gICAgICAgIHN0ZXBwZXIgPSBzdGVwcGVyIHx8IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHggKyAxOyB9XG5cbiAgICAgICAgY29udGludWVQcmVkID0gKHN0ZXBwZXIoaSkgPiBpKSA/IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHggPD0gbGltaXQgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogIGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHggPj0gbGltaXQgfVxuXG4gICAgICAgIHdoaWxlIChjb250aW51ZVByZWQoaSkpIHtcbiAgICAgICAgICAgIGxpc3QucHVzaChpKVxuICAgICAgICAgICAgaSA9IHN0ZXBwZXIoaSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsaXN0XG4gICAgfVxuXG4gICAgdXRpbC56aXBXaXRoID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGZ4biA9IGFyZ3VtZW50c1swXVxuICAgICAgICAgICAgLCBhcmdzID0gdXRpbC5zbGljZShhcmd1bWVudHMsMSlcbiAgICAgICAgICAgICwgb3V0cHV0ID0gW11cbiAgICAgICAgICAgICwgd2lkdGggPSBNYXRoLm1heC5hcHBseShudWxsLCBhcmdzLm1hcChmdW5jdGlvbih4cyl7IHJldHVybiB4cyA/ICh4cy5sZW5ndGggfHwgMCkgOiAwIH0pKVxuICAgICAgICAgICAgLCBpXG4gICAgICAgICAgICA7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHdpZHRoOyBpKyspIHtcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKGZ4bi5hcHBseShudWxsLCBbXS5tYXAuY2FsbChhcmdzLCBmdW5jdGlvbih4cykge1xuICAgICAgICAgICAgICAgIHJldHVybiB4cyA/IHhzW2ldIDogW11cbiAgICAgICAgICAgIH0pKSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0XG4gICAgfVxuXG4gICAgdXRpbC56aXBXaXRoQXJyYXkgPSBmdW5jdGlvbihmdW5jdCwgYXJnc0FycmF5KXtcbiAgICAgICAgcmV0dXJuIHV0aWwuemlwV2l0aC5hcHBseShudWxsLFtmdW5jdF0uY29uY2F0KGFyZ3NBcnJheSkpXG4gICAgfVxuXG4gICAgdXRpbC56aXAgPSB1dGlsLnppcFdpdGguYmluZChudWxsLCBmdW5jdGlvbigpe3JldHVybiB1dGlsLnNsaWNlKGFyZ3VtZW50cyl9KVxuXG4gICAgdXRpbC5wYXJ0aXRpb24gPSBmdW5jdGlvbihhcnIsIGxlbmd0aCl7XG5cbiAgICAgICAgdmFyIHJlc3VsdCwgZWFjaDtcblxuICAgICAgICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgfHwgbGVuZ3RoIDw9IDApIHsgcmV0dXJuIFtdIH1cblxuICAgICAgICByZXN1bHQgPSBbXVxuICAgICAgICBlYWNoICAgPSBbXVxuXG4gICAgICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG5cbiAgICAgICAgICAgIGVhY2gucHVzaCh2YWx1ZSlcblxuICAgICAgICAgICAgaWYgKGVhY2gubGVuZ3RoID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChlYWNoKVxuICAgICAgICAgICAgICAgIGVhY2ggPSBbXVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdC5jb25jYXQoZWFjaC5sZW5ndGggPiAwID8gWyBlYWNoIF0gOiBbXSlcbiAgICB9XG5cbiAgICB1dGlsLmFycmF5TWF4ID0gZnVuY3Rpb24oYXJyKSB7IHJldHVybiBNYXRoLm1heC5hcHBseShudWxsLCBhcnIpIH1cblxuICAgIHV0aWwuaXNJbnQgPSBmdW5jdGlvbih2KXsgcmV0dXJuIHYgJSAxID09PSAwIH1cblxuICAgIHV0aWwuYWxsSW50ZWdlcnMgPSBmdW5jdGlvbihhcnIpeyByZXR1cm4gYXJyLmV2ZXJ5KHV0aWwuaXNJbnQpIH1cblxuICAgIHV0aWwuaW5kZXhPZk1heCA9IGZ1bmN0aW9uKGFycil7XG4gICAgICAgIHJldHVybiBhcnIucmVkdWNlKGZ1bmN0aW9uKG0sIGUsIGksIGEpIHsgcmV0dXJuIChtPT0tMSB8fCBlID4gYVttXSkgPyBpIDogbSB9LCAtMSlcbiAgICB9XG5cbiAgICB1dGlsLmluZGV4T2ZBYnNNYXggPSBmdW5jdGlvbihhcnIpe1xuICAgICAgICByZXR1cm4gYXJyLnJlZHVjZShmdW5jdGlvbihtLCBlLCBpLCBhKSB7IHJldHVybiAobT09LTEgfHwgTWF0aC5hYnMoZSkgPiBNYXRoLmFicyhhW21dKSkgPyBpIDogbSB9LCAtMSlcbiAgICB9XG5cbiAgICB1dGlsLmJpbmQgPSBmdW5jdGlvbihmbil7XG4gICAgICAgIHZhciBhcmdzID0gdXRpbC5zbGljZShhcmd1bWVudHMsIDEpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBhcmdzMiA9IHV0aWwuc2xpY2UoYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmdzLmNvbmNhdChhcmdzMikpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1dGlsLmVuc2xhdmUgPSBmdW5jdGlvbihmbikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiBmbi5iaW5kKG51bGwsIHRoaXMpLmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHV0aWwucmFuZEZsb2F0ID0gZnVuY3Rpb24gcmFuZEZsb2F0KG1pbiwgbWF4KXtcbiAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pblxuICAgIH1cblxuICAgIHV0aWwucmFuZCA9ICBmdW5jdGlvbiByYW5kKG1pbiwgbWF4KXtcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQocmFuZEZsb2F0KG1pbiwgbWF4KSlcbiAgICB9XG5cbiAgICB1dGlsLmdldFJhbmRvbUFycmF5ID0gZnVuY3Rpb24obWluTGVuZ3RoLCBtYXhMZW5ndGgpe1xuXG4gICAgICAgIHZhciBsZW5ndGggPSByYW5kKG1heExlbmd0aCB8fCA2LCBtaW5MZW5ndGggfHwgMylcbiAgICAgICAgICAgICwgY29tbW9uX2ZhY3RvciA9IHJhbmQoLTEzLCAxMylcbiAgICAgICAgICAgICwgYXJyPVtdXG4gICAgICAgICAgICA7XG5cbiAgICAgICAgd2hpbGUgKCBtYXhMZW5ndGgtLSA+IG1pbkxlbmd0aCApIHtcbiAgICAgICAgICAgIGFyci5wdXNoKHJhbmQoLTEzLCAxMykqY29tbW9uX2ZhY3RvcilcbiAgICAgICAgfVxuXG4gICAgICAgIGFyci5wdXNoKHJhbmQoLTEzLCAxMykqY29tbW9uX2ZhY3RvcilcblxuICAgICAgICByZXR1cm4gYXJyXG4gICAgfVxuXG4gICAgdXRpbC5mb3JFYWNoT3duID0gZnVuY3Rpb24ob2JqLCBmdW4sIHRoaXNBcmcpIHtcbiAgICAgICAgcmV0dXJuIG93bihvYmopLmZvckVhY2goZnVuLCB0aGlzQXJnKVxuICAgIH1cblxuICAgIHV0aWwuYXJyYXlXaXRoTGVuZ3RoID0gIGZ1bmN0aW9uIGFycmF5V2l0aExlbmd0aChsZW5ndGgpe1xuICAgICAgICB2YXIgYXJyID0gQXJyYXkobGVuZ3RoKVxuICAgICAgICB3aGlsZShsZW5ndGgtLSl7IGFycltsZW5ndGhdPXVuZGVmaW5lZCB9XG4gICAgICAgIHJldHVybiBhcnJcbiAgICB9XG5cbiAgICBpZiAoIG1vZHVsZSAhPT0gdW5kZWZpbmVkICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHV0aWxcbiAgICB9IGVsc2Uge1xuICAgICAgICByb290LnZhdHJpeCA9IHV0aWxcbiAgICB9XG59KHRoaXMpXG4iLCIvLyBDb3B5cmlnaHQgMjAwOS0yMDEyIGJ5IGNvbnRyaWJ1dG9ycywgTUlUIExpY2Vuc2Vcbi8vIHZpbTogdHM9NCBzdHM9NCBzdz00IGV4cGFuZHRhYlxuXG4vLyBNb2R1bGUgc3lzdGVtcyBtYWdpYyBkYW5jZVxuKGZ1bmN0aW9uIChkZWZpbml0aW9uKSB7XG4gICAgLy8gUmVxdWlyZUpTXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGRlZmluZShkZWZpbml0aW9uKTtcbiAgICAvLyBZVUkzXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgWVVJID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBZVUkuYWRkKFwiZXM1LXNoYW1cIiwgZGVmaW5pdGlvbik7XG4gICAgLy8gQ29tbW9uSlMgYW5kIDxzY3JpcHQ+XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZGVmaW5pdGlvbigpO1xuICAgIH1cbn0pKGZ1bmN0aW9uICgpIHtcblxuXG52YXIgY2FsbCA9IEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsO1xudmFyIHByb3RvdHlwZU9mT2JqZWN0ID0gT2JqZWN0LnByb3RvdHlwZTtcbnZhciBvd25zID0gY2FsbC5iaW5kKHByb3RvdHlwZU9mT2JqZWN0Lmhhc093blByb3BlcnR5KTtcblxuLy8gSWYgSlMgZW5naW5lIHN1cHBvcnRzIGFjY2Vzc29ycyBjcmVhdGluZyBzaG9ydGN1dHMuXG52YXIgZGVmaW5lR2V0dGVyO1xudmFyIGRlZmluZVNldHRlcjtcbnZhciBsb29rdXBHZXR0ZXI7XG52YXIgbG9va3VwU2V0dGVyO1xudmFyIHN1cHBvcnRzQWNjZXNzb3JzO1xuaWYgKChzdXBwb3J0c0FjY2Vzc29ycyA9IG93bnMocHJvdG90eXBlT2ZPYmplY3QsIFwiX19kZWZpbmVHZXR0ZXJfX1wiKSkpIHtcbiAgICBkZWZpbmVHZXR0ZXIgPSBjYWxsLmJpbmQocHJvdG90eXBlT2ZPYmplY3QuX19kZWZpbmVHZXR0ZXJfXyk7XG4gICAgZGVmaW5lU2V0dGVyID0gY2FsbC5iaW5kKHByb3RvdHlwZU9mT2JqZWN0Ll9fZGVmaW5lU2V0dGVyX18pO1xuICAgIGxvb2t1cEdldHRlciA9IGNhbGwuYmluZChwcm90b3R5cGVPZk9iamVjdC5fX2xvb2t1cEdldHRlcl9fKTtcbiAgICBsb29rdXBTZXR0ZXIgPSBjYWxsLmJpbmQocHJvdG90eXBlT2ZPYmplY3QuX19sb29rdXBTZXR0ZXJfXyk7XG59XG5cbi8vIEVTNSAxNS4yLjMuMlxuLy8gaHR0cDovL2VzNS5naXRodWIuY29tLyN4MTUuMi4zLjJcbmlmICghT2JqZWN0LmdldFByb3RvdHlwZU9mKSB7XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2tyaXNrb3dhbC9lczUtc2hpbS9pc3N1ZXMjaXNzdWUvMlxuICAgIC8vIGh0dHA6Ly9lam9obi5vcmcvYmxvZy9vYmplY3RnZXRwcm90b3R5cGVvZi9cbiAgICAvLyByZWNvbW1lbmRlZCBieSBmc2NoYWVmZXIgb24gZ2l0aHViXG4gICAgT2JqZWN0LmdldFByb3RvdHlwZU9mID0gZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2Yob2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBvYmplY3QuX19wcm90b19fIHx8IChcbiAgICAgICAgICAgIG9iamVjdC5jb25zdHJ1Y3RvclxuICAgICAgICAgICAgICAgID8gb2JqZWN0LmNvbnN0cnVjdG9yLnByb3RvdHlwZVxuICAgICAgICAgICAgICAgIDogcHJvdG90eXBlT2ZPYmplY3RcbiAgICAgICAgKTtcbiAgICB9O1xufVxuXG4vL0VTNSAxNS4yLjMuM1xuLy9odHRwOi8vZXM1LmdpdGh1Yi5jb20vI3gxNS4yLjMuM1xuXG5mdW5jdGlvbiBkb2VzR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yV29yayhvYmplY3QpIHtcbiAgICB0cnkge1xuICAgICAgICBvYmplY3Quc2VudGluZWwgPSAwO1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihcbiAgICAgICAgICAgICAgICBvYmplY3QsXG4gICAgICAgICAgICAgICAgXCJzZW50aW5lbFwiXG4gICAgICAgICkudmFsdWUgPT09IDA7XG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgIC8vIHJldHVybnMgZmFsc3lcbiAgICB9XG59XG5cbi8vY2hlY2sgd2hldGhlciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Igd29ya3MgaWYgaXQncyBnaXZlbi4gT3RoZXJ3aXNlLFxuLy9zaGltIHBhcnRpYWxseS5cbmlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHtcbiAgICB2YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yV29ya3NPbk9iamVjdCA9IFxuICAgICAgICBkb2VzR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yV29yayh7fSk7XG4gICAgdmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvcldvcmtzT25Eb20gPSB0eXBlb2YgZG9jdW1lbnQgPT0gXCJ1bmRlZmluZWRcIiB8fFxuICAgIGRvZXNHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JXb3JrKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgIGlmICghZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yV29ya3NPbkRvbSB8fCBcbiAgICAgICAgICAgICFnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JXb3Jrc09uT2JqZWN0XG4gICAgKSB7XG4gICAgICAgIHZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JGYWxsYmFjayA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICAgfVxufVxuXG5pZiAoIU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgfHwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yRmFsbGJhY2spIHtcbiAgICB2YXIgRVJSX05PTl9PQkpFQ1QgPSBcIk9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgY2FsbGVkIG9uIGEgbm9uLW9iamVjdDogXCI7XG5cbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgICAgICAgaWYgKCh0eXBlb2Ygb2JqZWN0ICE9IFwib2JqZWN0XCIgJiYgdHlwZW9mIG9iamVjdCAhPSBcImZ1bmN0aW9uXCIpIHx8IG9iamVjdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihFUlJfTk9OX09CSkVDVCArIG9iamVjdCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtYWtlIGEgdmFsaWFudCBhdHRlbXB0IHRvIHVzZSB0aGUgcmVhbCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JcbiAgICAgICAgLy8gZm9yIEk4J3MgRE9NIGVsZW1lbnRzLlxuICAgICAgICBpZiAoZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yRmFsbGJhY2spIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldE93blByb3BlcnR5RGVzY3JpcHRvckZhbGxiYWNrLmNhbGwoT2JqZWN0LCBvYmplY3QsIHByb3BlcnR5KTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgICAgIC8vIHRyeSB0aGUgc2hpbSBpZiB0aGUgcmVhbCBvbmUgZG9lc24ndCB3b3JrXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBvYmplY3QgZG9lcyBub3Qgb3ducyBwcm9wZXJ0eSByZXR1cm4gdW5kZWZpbmVkIGltbWVkaWF0ZWx5LlxuICAgICAgICBpZiAoIW93bnMob2JqZWN0LCBwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIG9iamVjdCBoYXMgYSBwcm9wZXJ0eSB0aGVuIGl0J3MgZm9yIHN1cmUgYm90aCBgZW51bWVyYWJsZWAgYW5kXG4gICAgICAgIC8vIGBjb25maWd1cmFibGVgLlxuICAgICAgICB2YXIgZGVzY3JpcHRvciA9ICB7IGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9O1xuXG4gICAgICAgIC8vIElmIEpTIGVuZ2luZSBzdXBwb3J0cyBhY2Nlc3NvciBwcm9wZXJ0aWVzIHRoZW4gcHJvcGVydHkgbWF5IGJlIGFcbiAgICAgICAgLy8gZ2V0dGVyIG9yIHNldHRlci5cbiAgICAgICAgaWYgKHN1cHBvcnRzQWNjZXNzb3JzKSB7XG4gICAgICAgICAgICAvLyBVbmZvcnR1bmF0ZWx5IGBfX2xvb2t1cEdldHRlcl9fYCB3aWxsIHJldHVybiBhIGdldHRlciBldmVuXG4gICAgICAgICAgICAvLyBpZiBvYmplY3QgaGFzIG93biBub24gZ2V0dGVyIHByb3BlcnR5IGFsb25nIHdpdGggYSBzYW1lIG5hbWVkXG4gICAgICAgICAgICAvLyBpbmhlcml0ZWQgZ2V0dGVyLiBUbyBhdm9pZCBtaXNiZWhhdmlvciB3ZSB0ZW1wb3JhcnkgcmVtb3ZlXG4gICAgICAgICAgICAvLyBgX19wcm90b19fYCBzbyB0aGF0IGBfX2xvb2t1cEdldHRlcl9fYCB3aWxsIHJldHVybiBnZXR0ZXIgb25seVxuICAgICAgICAgICAgLy8gaWYgaXQncyBvd25lZCBieSBhbiBvYmplY3QuXG4gICAgICAgICAgICB2YXIgcHJvdG90eXBlID0gb2JqZWN0Ll9fcHJvdG9fXztcbiAgICAgICAgICAgIG9iamVjdC5fX3Byb3RvX18gPSBwcm90b3R5cGVPZk9iamVjdDtcblxuICAgICAgICAgICAgdmFyIGdldHRlciA9IGxvb2t1cEdldHRlcihvYmplY3QsIHByb3BlcnR5KTtcbiAgICAgICAgICAgIHZhciBzZXR0ZXIgPSBsb29rdXBTZXR0ZXIob2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgICAgICAgICAgIC8vIE9uY2Ugd2UgaGF2ZSBnZXR0ZXIgYW5kIHNldHRlciB3ZSBjYW4gcHV0IHZhbHVlcyBiYWNrLlxuICAgICAgICAgICAgb2JqZWN0Ll9fcHJvdG9fXyA9IHByb3RvdHlwZTtcblxuICAgICAgICAgICAgaWYgKGdldHRlciB8fCBzZXR0ZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0dGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0b3IuZ2V0ID0gZ2V0dGVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2V0dGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0b3Iuc2V0ID0gc2V0dGVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBJZiBpdCB3YXMgYWNjZXNzb3IgcHJvcGVydHkgd2UncmUgZG9uZSBhbmQgcmV0dXJuIGhlcmVcbiAgICAgICAgICAgICAgICAvLyBpbiBvcmRlciB0byBhdm9pZCBhZGRpbmcgYHZhbHVlYCB0byB0aGUgZGVzY3JpcHRvci5cbiAgICAgICAgICAgICAgICByZXR1cm4gZGVzY3JpcHRvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHdlIGdvdCB0aGlzIGZhciB3ZSBrbm93IHRoYXQgb2JqZWN0IGhhcyBhbiBvd24gcHJvcGVydHkgdGhhdCBpc1xuICAgICAgICAvLyBub3QgYW4gYWNjZXNzb3Igc28gd2Ugc2V0IGl0IGFzIGEgdmFsdWUgYW5kIHJldHVybiBkZXNjcmlwdG9yLlxuICAgICAgICBkZXNjcmlwdG9yLnZhbHVlID0gb2JqZWN0W3Byb3BlcnR5XTtcbiAgICAgICAgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICAgIHJldHVybiBkZXNjcmlwdG9yO1xuICAgIH07XG59XG5cbi8vIEVTNSAxNS4yLjMuNFxuLy8gaHR0cDovL2VzNS5naXRodWIuY29tLyN4MTUuMi4zLjRcbmlmICghT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMpIHtcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMob2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmplY3QpO1xuICAgIH07XG59XG5cbi8vIEVTNSAxNS4yLjMuNVxuLy8gaHR0cDovL2VzNS5naXRodWIuY29tLyN4MTUuMi4zLjVcbmlmICghT2JqZWN0LmNyZWF0ZSkge1xuXG4gICAgLy8gQ29udHJpYnV0ZWQgYnkgQnJhbmRvbiBCZW52aWUsIE9jdG9iZXIsIDIwMTJcbiAgICB2YXIgY3JlYXRlRW1wdHk7XG4gICAgdmFyIHN1cHBvcnRzUHJvdG8gPSBPYmplY3QucHJvdG90eXBlLl9fcHJvdG9fXyA9PT0gbnVsbDtcbiAgICBpZiAoc3VwcG9ydHNQcm90byB8fCB0eXBlb2YgZG9jdW1lbnQgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY3JlYXRlRW1wdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4geyBcIl9fcHJvdG9fX1wiOiBudWxsIH07XG4gICAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSW4gb2xkIElFIF9fcHJvdG9fXyBjYW4ndCBiZSB1c2VkIHRvIG1hbnVhbGx5IHNldCBgbnVsbGAsIG5vciBkb2VzXG4gICAgICAgIC8vIGFueSBvdGhlciBtZXRob2QgZXhpc3QgdG8gbWFrZSBhbiBvYmplY3QgdGhhdCBpbmhlcml0cyBmcm9tIG5vdGhpbmcsXG4gICAgICAgIC8vIGFzaWRlIGZyb20gT2JqZWN0LnByb3RvdHlwZSBpdHNlbGYuIEluc3RlYWQsIGNyZWF0ZSBhIG5ldyBnbG9iYWxcbiAgICAgICAgLy8gb2JqZWN0IGFuZCAqc3RlYWwqIGl0cyBPYmplY3QucHJvdG90eXBlIGFuZCBzdHJpcCBpdCBiYXJlLiBUaGlzIGlzXG4gICAgICAgIC8vIHVzZWQgYXMgdGhlIHByb3RvdHlwZSB0byBjcmVhdGUgbnVsbGFyeSBvYmplY3RzLlxuICAgICAgICBjcmVhdGVFbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSBkb2N1bWVudC5ib2R5IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgICAgIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgICAgICAgICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JztcbiAgICAgICAgICAgIHZhciBlbXB0eSA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdC5wcm90b3R5cGU7XG4gICAgICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgICAgICAgICAgIGlmcmFtZSA9IG51bGw7XG4gICAgICAgICAgICBkZWxldGUgZW1wdHkuY29uc3RydWN0b3I7XG4gICAgICAgICAgICBkZWxldGUgZW1wdHkuaGFzT3duUHJvcGVydHk7XG4gICAgICAgICAgICBkZWxldGUgZW1wdHkucHJvcGVydHlJc0VudW1lcmFibGU7XG4gICAgICAgICAgICBkZWxldGUgZW1wdHkuaXNQcm90b3R5cGVPZjtcbiAgICAgICAgICAgIGRlbGV0ZSBlbXB0eS50b0xvY2FsZVN0cmluZztcbiAgICAgICAgICAgIGRlbGV0ZSBlbXB0eS50b1N0cmluZztcbiAgICAgICAgICAgIGRlbGV0ZSBlbXB0eS52YWx1ZU9mO1xuICAgICAgICAgICAgZW1wdHkuX19wcm90b19fID0gbnVsbDtcblxuICAgICAgICAgICAgZnVuY3Rpb24gRW1wdHkoKSB7fVxuICAgICAgICAgICAgRW1wdHkucHJvdG90eXBlID0gZW1wdHk7XG4gICAgICAgICAgICAvLyBzaG9ydC1jaXJjdWl0IGZ1dHVyZSBjYWxsc1xuICAgICAgICAgICAgY3JlYXRlRW1wdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFbXB0eSgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW1wdHkoKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBPYmplY3QuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKHByb3RvdHlwZSwgcHJvcGVydGllcykge1xuXG4gICAgICAgIHZhciBvYmplY3Q7XG4gICAgICAgIGZ1bmN0aW9uIFR5cGUoKSB7fSAgLy8gQW4gZW1wdHkgY29uc3RydWN0b3IuXG5cbiAgICAgICAgaWYgKHByb3RvdHlwZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgb2JqZWN0ID0gY3JlYXRlRW1wdHkoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvdG90eXBlICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiBwcm90b3R5cGUgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIC8vIEluIHRoZSBuYXRpdmUgaW1wbGVtZW50YXRpb24gYHBhcmVudGAgY2FuIGJlIGBudWxsYFxuICAgICAgICAgICAgICAgIC8vIE9SICphbnkqIGBpbnN0YW5jZW9mIE9iamVjdGAgIChPYmplY3R8RnVuY3Rpb258QXJyYXl8UmVnRXhwfGV0YylcbiAgICAgICAgICAgICAgICAvLyBVc2UgYHR5cGVvZmAgdGhvLCBiL2MgaW4gb2xkIElFLCBET00gZWxlbWVudHMgYXJlIG5vdCBgaW5zdGFuY2VvZiBPYmplY3RgXG4gICAgICAgICAgICAgICAgLy8gbGlrZSB0aGV5IGFyZSBpbiBtb2Rlcm4gYnJvd3NlcnMuIFVzaW5nIGBPYmplY3QuY3JlYXRlYCBvbiBET00gZWxlbWVudHNcbiAgICAgICAgICAgICAgICAvLyBpcy4uLmVyci4uLnByb2JhYmx5IGluYXBwcm9wcmlhdGUsIGJ1dCB0aGUgbmF0aXZlIHZlcnNpb24gYWxsb3dzIGZvciBpdC5cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IHByb3RvdHlwZSBtYXkgb25seSBiZSBhbiBPYmplY3Qgb3IgbnVsbFwiKTsgLy8gc2FtZSBtc2cgYXMgQ2hyb21lXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBUeXBlLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcbiAgICAgICAgICAgIG9iamVjdCA9IG5ldyBUeXBlKCk7XG4gICAgICAgICAgICAvLyBJRSBoYXMgbm8gYnVpbHQtaW4gaW1wbGVtZW50YXRpb24gb2YgYE9iamVjdC5nZXRQcm90b3R5cGVPZmBcbiAgICAgICAgICAgIC8vIG5laXRoZXIgYF9fcHJvdG9fX2AsIGJ1dCB0aGlzIG1hbnVhbGx5IHNldHRpbmcgYF9fcHJvdG9fX2Agd2lsbFxuICAgICAgICAgICAgLy8gZ3VhcmFudGVlIHRoYXQgYE9iamVjdC5nZXRQcm90b3R5cGVPZmAgd2lsbCB3b3JrIGFzIGV4cGVjdGVkIHdpdGhcbiAgICAgICAgICAgIC8vIG9iamVjdHMgY3JlYXRlZCB1c2luZyBgT2JqZWN0LmNyZWF0ZWBcbiAgICAgICAgICAgIG9iamVjdC5fX3Byb3RvX18gPSBwcm90b3R5cGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcGVydGllcyAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhvYmplY3QsIHByb3BlcnRpZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9O1xufVxuXG4vLyBFUzUgMTUuMi4zLjZcbi8vIGh0dHA6Ly9lczUuZ2l0aHViLmNvbS8jeDE1LjIuMy42XG5cbi8vIFBhdGNoIGZvciBXZWJLaXQgYW5kIElFOCBzdGFuZGFyZCBtb2RlXG4vLyBEZXNpZ25lZCBieSBoYXggPGhheC5naXRodWIuY29tPlxuLy8gcmVsYXRlZCBpc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL2tyaXNrb3dhbC9lczUtc2hpbS9pc3N1ZXMjaXNzdWUvNVxuLy8gSUU4IFJlZmVyZW5jZTpcbi8vICAgICBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvZGQyODI5MDAuYXNweFxuLy8gICAgIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9kZDIyOTkxNi5hc3B4XG4vLyBXZWJLaXQgQnVnczpcbi8vICAgICBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MzY0MjNcblxuZnVuY3Rpb24gZG9lc0RlZmluZVByb3BlcnR5V29yayhvYmplY3QpIHtcbiAgICB0cnkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBcInNlbnRpbmVsXCIsIHt9KTtcbiAgICAgICAgcmV0dXJuIFwic2VudGluZWxcIiBpbiBvYmplY3Q7XG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgIC8vIHJldHVybnMgZmFsc3lcbiAgICB9XG59XG5cbi8vIGNoZWNrIHdoZXRoZXIgZGVmaW5lUHJvcGVydHkgd29ya3MgaWYgaXQncyBnaXZlbi4gT3RoZXJ3aXNlLFxuLy8gc2hpbSBwYXJ0aWFsbHkuXG5pZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XG4gICAgdmFyIGRlZmluZVByb3BlcnR5V29ya3NPbk9iamVjdCA9IGRvZXNEZWZpbmVQcm9wZXJ0eVdvcmsoe30pO1xuICAgIHZhciBkZWZpbmVQcm9wZXJ0eVdvcmtzT25Eb20gPSB0eXBlb2YgZG9jdW1lbnQgPT0gXCJ1bmRlZmluZWRcIiB8fFxuICAgICAgICBkb2VzRGVmaW5lUHJvcGVydHlXb3JrKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgIGlmICghZGVmaW5lUHJvcGVydHlXb3Jrc09uT2JqZWN0IHx8ICFkZWZpbmVQcm9wZXJ0eVdvcmtzT25Eb20pIHtcbiAgICAgICAgdmFyIGRlZmluZVByb3BlcnR5RmFsbGJhY2sgPSBPYmplY3QuZGVmaW5lUHJvcGVydHksXG4gICAgICAgICAgICBkZWZpbmVQcm9wZXJ0aWVzRmFsbGJhY2sgPSBPYmplY3QuZGVmaW5lUHJvcGVydGllcztcbiAgICB9XG59XG5cbmlmICghT2JqZWN0LmRlZmluZVByb3BlcnR5IHx8IGRlZmluZVByb3BlcnR5RmFsbGJhY2spIHtcbiAgICB2YXIgRVJSX05PTl9PQkpFQ1RfREVTQ1JJUFRPUiA9IFwiUHJvcGVydHkgZGVzY3JpcHRpb24gbXVzdCBiZSBhbiBvYmplY3Q6IFwiO1xuICAgIHZhciBFUlJfTk9OX09CSkVDVF9UQVJHRVQgPSBcIk9iamVjdC5kZWZpbmVQcm9wZXJ0eSBjYWxsZWQgb24gbm9uLW9iamVjdDogXCJcbiAgICB2YXIgRVJSX0FDQ0VTU09SU19OT1RfU1VQUE9SVEVEID0gXCJnZXR0ZXJzICYgc2V0dGVycyBjYW4gbm90IGJlIGRlZmluZWQgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9uIHRoaXMgamF2YXNjcmlwdCBlbmdpbmVcIjtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KG9iamVjdCwgcHJvcGVydHksIGRlc2NyaXB0b3IpIHtcbiAgICAgICAgaWYgKCh0eXBlb2Ygb2JqZWN0ICE9IFwib2JqZWN0XCIgJiYgdHlwZW9mIG9iamVjdCAhPSBcImZ1bmN0aW9uXCIpIHx8IG9iamVjdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihFUlJfTk9OX09CSkVDVF9UQVJHRVQgKyBvYmplY3QpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgodHlwZW9mIGRlc2NyaXB0b3IgIT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgZGVzY3JpcHRvciAhPSBcImZ1bmN0aW9uXCIpIHx8IGRlc2NyaXB0b3IgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRVJSX05PTl9PQkpFQ1RfREVTQ1JJUFRPUiArIGRlc2NyaXB0b3IpO1xuICAgICAgICB9XG4gICAgICAgIC8vIG1ha2UgYSB2YWxpYW50IGF0dGVtcHQgdG8gdXNlIHRoZSByZWFsIGRlZmluZVByb3BlcnR5XG4gICAgICAgIC8vIGZvciBJOCdzIERPTSBlbGVtZW50cy5cbiAgICAgICAgaWYgKGRlZmluZVByb3BlcnR5RmFsbGJhY2spIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmluZVByb3BlcnR5RmFsbGJhY2suY2FsbChPYmplY3QsIG9iamVjdCwgcHJvcGVydHksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgLy8gdHJ5IHRoZSBzaGltIGlmIHRoZSByZWFsIG9uZSBkb2Vzbid0IHdvcmtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIGl0J3MgYSBkYXRhIHByb3BlcnR5LlxuICAgICAgICBpZiAob3ducyhkZXNjcmlwdG9yLCBcInZhbHVlXCIpKSB7XG4gICAgICAgICAgICAvLyBmYWlsIHNpbGVudGx5IGlmIFwid3JpdGFibGVcIiwgXCJlbnVtZXJhYmxlXCIsIG9yIFwiY29uZmlndXJhYmxlXCJcbiAgICAgICAgICAgIC8vIGFyZSByZXF1ZXN0ZWQgYnV0IG5vdCBzdXBwb3J0ZWRcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAvLyBhbHRlcm5hdGUgYXBwcm9hY2g6XG4gICAgICAgICAgICBpZiAoIC8vIGNhbid0IGltcGxlbWVudCB0aGVzZSBmZWF0dXJlczsgYWxsb3cgZmFsc2UgYnV0IG5vdCB0cnVlXG4gICAgICAgICAgICAgICAgIShvd25zKGRlc2NyaXB0b3IsIFwid3JpdGFibGVcIikgPyBkZXNjcmlwdG9yLndyaXRhYmxlIDogdHJ1ZSkgfHxcbiAgICAgICAgICAgICAgICAhKG93bnMoZGVzY3JpcHRvciwgXCJlbnVtZXJhYmxlXCIpID8gZGVzY3JpcHRvci5lbnVtZXJhYmxlIDogdHJ1ZSkgfHxcbiAgICAgICAgICAgICAgICAhKG93bnMoZGVzY3JpcHRvciwgXCJjb25maWd1cmFibGVcIikgPyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA6IHRydWUpXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgIFwiVGhpcyBpbXBsZW1lbnRhdGlvbiBvZiBPYmplY3QuZGVmaW5lUHJvcGVydHkgZG9lcyBub3QgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcInN1cHBvcnQgY29uZmlndXJhYmxlLCBlbnVtZXJhYmxlLCBvciB3cml0YWJsZS5cIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICBpZiAoc3VwcG9ydHNBY2Nlc3NvcnMgJiYgKGxvb2t1cEdldHRlcihvYmplY3QsIHByb3BlcnR5KSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb29rdXBTZXR0ZXIob2JqZWN0LCBwcm9wZXJ0eSkpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIEFzIGFjY2Vzc29ycyBhcmUgc3VwcG9ydGVkIG9ubHkgb24gZW5naW5lcyBpbXBsZW1lbnRpbmdcbiAgICAgICAgICAgICAgICAvLyBgX19wcm90b19fYCB3ZSBjYW4gc2FmZWx5IG92ZXJyaWRlIGBfX3Byb3RvX19gIHdoaWxlIGRlZmluaW5nXG4gICAgICAgICAgICAgICAgLy8gYSBwcm9wZXJ0eSB0byBtYWtlIHN1cmUgdGhhdCB3ZSBkb24ndCBoaXQgYW4gaW5oZXJpdGVkXG4gICAgICAgICAgICAgICAgLy8gYWNjZXNzb3IuXG4gICAgICAgICAgICAgICAgdmFyIHByb3RvdHlwZSA9IG9iamVjdC5fX3Byb3RvX187XG4gICAgICAgICAgICAgICAgb2JqZWN0Ll9fcHJvdG9fXyA9IHByb3RvdHlwZU9mT2JqZWN0O1xuICAgICAgICAgICAgICAgIC8vIERlbGV0aW5nIGEgcHJvcGVydHkgYW55d2F5IHNpbmNlIGdldHRlciAvIHNldHRlciBtYXkgYmVcbiAgICAgICAgICAgICAgICAvLyBkZWZpbmVkIG9uIG9iamVjdCBpdHNlbGYuXG4gICAgICAgICAgICAgICAgZGVsZXRlIG9iamVjdFtwcm9wZXJ0eV07XG4gICAgICAgICAgICAgICAgb2JqZWN0W3Byb3BlcnR5XSA9IGRlc2NyaXB0b3IudmFsdWU7XG4gICAgICAgICAgICAgICAgLy8gU2V0dGluZyBvcmlnaW5hbCBgX19wcm90b19fYCBiYWNrIG5vdy5cbiAgICAgICAgICAgICAgICBvYmplY3QuX19wcm90b19fID0gcHJvdG90eXBlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmplY3RbcHJvcGVydHldID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghc3VwcG9ydHNBY2Nlc3NvcnMpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEVSUl9BQ0NFU1NPUlNfTk9UX1NVUFBPUlRFRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiB3ZSBnb3QgdGhhdCBmYXIgdGhlbiBnZXR0ZXJzIGFuZCBzZXR0ZXJzIGNhbiBiZSBkZWZpbmVkICEhXG4gICAgICAgICAgICBpZiAob3ducyhkZXNjcmlwdG9yLCBcImdldFwiKSkge1xuICAgICAgICAgICAgICAgIGRlZmluZUdldHRlcihvYmplY3QsIHByb3BlcnR5LCBkZXNjcmlwdG9yLmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3ducyhkZXNjcmlwdG9yLCBcInNldFwiKSkge1xuICAgICAgICAgICAgICAgIGRlZmluZVNldHRlcihvYmplY3QsIHByb3BlcnR5LCBkZXNjcmlwdG9yLnNldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9O1xufVxuXG4vLyBFUzUgMTUuMi4zLjdcbi8vIGh0dHA6Ly9lczUuZ2l0aHViLmNvbS8jeDE1LjIuMy43XG5pZiAoIU9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIHx8IGRlZmluZVByb3BlcnRpZXNGYWxsYmFjaykge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhvYmplY3QsIHByb3BlcnRpZXMpIHtcbiAgICAgICAgLy8gbWFrZSBhIHZhbGlhbnQgYXR0ZW1wdCB0byB1c2UgdGhlIHJlYWwgZGVmaW5lUHJvcGVydGllc1xuICAgICAgICBpZiAoZGVmaW5lUHJvcGVydGllc0ZhbGxiYWNrKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkZWZpbmVQcm9wZXJ0aWVzRmFsbGJhY2suY2FsbChPYmplY3QsIG9iamVjdCwgcHJvcGVydGllcyk7XG4gICAgICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgICAgICAvLyB0cnkgdGhlIHNoaW0gaWYgdGhlIHJlYWwgb25lIGRvZXNuJ3Qgd29ya1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgcHJvcGVydHkgaW4gcHJvcGVydGllcykge1xuICAgICAgICAgICAgaWYgKG93bnMocHJvcGVydGllcywgcHJvcGVydHkpICYmIHByb3BlcnR5ICE9IFwiX19wcm90b19fXCIpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBwcm9wZXJ0eSwgcHJvcGVydGllc1twcm9wZXJ0eV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfTtcbn1cblxuLy8gRVM1IDE1LjIuMy44XG4vLyBodHRwOi8vZXM1LmdpdGh1Yi5jb20vI3gxNS4yLjMuOFxuaWYgKCFPYmplY3Quc2VhbCkge1xuICAgIE9iamVjdC5zZWFsID0gZnVuY3Rpb24gc2VhbChvYmplY3QpIHtcbiAgICAgICAgLy8gdGhpcyBpcyBtaXNsZWFkaW5nIGFuZCBicmVha3MgZmVhdHVyZS1kZXRlY3Rpb24sIGJ1dFxuICAgICAgICAvLyBhbGxvd3MgXCJzZWN1cmFibGVcIiBjb2RlIHRvIFwiZ3JhY2VmdWxseVwiIGRlZ3JhZGUgdG8gd29ya2luZ1xuICAgICAgICAvLyBidXQgaW5zZWN1cmUgY29kZS5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9O1xufVxuXG4vLyBFUzUgMTUuMi4zLjlcbi8vIGh0dHA6Ly9lczUuZ2l0aHViLmNvbS8jeDE1LjIuMy45XG5pZiAoIU9iamVjdC5mcmVlemUpIHtcbiAgICBPYmplY3QuZnJlZXplID0gZnVuY3Rpb24gZnJlZXplKG9iamVjdCkge1xuICAgICAgICAvLyB0aGlzIGlzIG1pc2xlYWRpbmcgYW5kIGJyZWFrcyBmZWF0dXJlLWRldGVjdGlvbiwgYnV0XG4gICAgICAgIC8vIGFsbG93cyBcInNlY3VyYWJsZVwiIGNvZGUgdG8gXCJncmFjZWZ1bGx5XCIgZGVncmFkZSB0byB3b3JraW5nXG4gICAgICAgIC8vIGJ1dCBpbnNlY3VyZSBjb2RlLlxuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH07XG59XG5cbi8vIGRldGVjdCBhIFJoaW5vIGJ1ZyBhbmQgcGF0Y2ggaXRcbnRyeSB7XG4gICAgT2JqZWN0LmZyZWV6ZShmdW5jdGlvbiAoKSB7fSk7XG59IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICBPYmplY3QuZnJlZXplID0gKGZ1bmN0aW9uIGZyZWV6ZShmcmVlemVPYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGZyZWV6ZShvYmplY3QpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0ID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmcmVlemVPYmplY3Qob2JqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KShPYmplY3QuZnJlZXplKTtcbn1cblxuLy8gRVM1IDE1LjIuMy4xMFxuLy8gaHR0cDovL2VzNS5naXRodWIuY29tLyN4MTUuMi4zLjEwXG5pZiAoIU9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucykge1xuICAgIE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyA9IGZ1bmN0aW9uIHByZXZlbnRFeHRlbnNpb25zKG9iamVjdCkge1xuICAgICAgICAvLyB0aGlzIGlzIG1pc2xlYWRpbmcgYW5kIGJyZWFrcyBmZWF0dXJlLWRldGVjdGlvbiwgYnV0XG4gICAgICAgIC8vIGFsbG93cyBcInNlY3VyYWJsZVwiIGNvZGUgdG8gXCJncmFjZWZ1bGx5XCIgZGVncmFkZSB0byB3b3JraW5nXG4gICAgICAgIC8vIGJ1dCBpbnNlY3VyZSBjb2RlLlxuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH07XG59XG5cbi8vIEVTNSAxNS4yLjMuMTFcbi8vIGh0dHA6Ly9lczUuZ2l0aHViLmNvbS8jeDE1LjIuMy4xMVxuaWYgKCFPYmplY3QuaXNTZWFsZWQpIHtcbiAgICBPYmplY3QuaXNTZWFsZWQgPSBmdW5jdGlvbiBpc1NlYWxlZChvYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG59XG5cbi8vIEVTNSAxNS4yLjMuMTJcbi8vIGh0dHA6Ly9lczUuZ2l0aHViLmNvbS8jeDE1LjIuMy4xMlxuaWYgKCFPYmplY3QuaXNGcm96ZW4pIHtcbiAgICBPYmplY3QuaXNGcm96ZW4gPSBmdW5jdGlvbiBpc0Zyb3plbihvYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG59XG5cbi8vIEVTNSAxNS4yLjMuMTNcbi8vIGh0dHA6Ly9lczUuZ2l0aHViLmNvbS8jeDE1LjIuMy4xM1xuaWYgKCFPYmplY3QuaXNFeHRlbnNpYmxlKSB7XG4gICAgT2JqZWN0LmlzRXh0ZW5zaWJsZSA9IGZ1bmN0aW9uIGlzRXh0ZW5zaWJsZShvYmplY3QpIHtcbiAgICAgICAgLy8gMS4gSWYgVHlwZShPKSBpcyBub3QgT2JqZWN0IHRocm93IGEgVHlwZUVycm9yIGV4Y2VwdGlvbi5cbiAgICAgICAgaWYgKE9iamVjdChvYmplY3QpICE9PSBvYmplY3QpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTsgLy8gVE9ETyBtZXNzYWdlXG4gICAgICAgIH1cbiAgICAgICAgLy8gMi4gUmV0dXJuIHRoZSBCb29sZWFuIHZhbHVlIG9mIHRoZSBbW0V4dGVuc2libGVdXSBpbnRlcm5hbCBwcm9wZXJ0eSBvZiBPLlxuICAgICAgICB2YXIgbmFtZSA9ICcnO1xuICAgICAgICB3aGlsZSAob3ducyhvYmplY3QsIG5hbWUpKSB7XG4gICAgICAgICAgICBuYW1lICs9ICc/JztcbiAgICAgICAgfVxuICAgICAgICBvYmplY3RbbmFtZV0gPSB0cnVlO1xuICAgICAgICB2YXIgcmV0dXJuVmFsdWUgPSBvd25zKG9iamVjdCwgbmFtZSk7XG4gICAgICAgIGRlbGV0ZSBvYmplY3RbbmFtZV07XG4gICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgICB9O1xufVxuXG59KTtcbiIsIi8vIENvcHlyaWdodCAyMDA5LTIwMTIgYnkgY29udHJpYnV0b3JzLCBNSVQgTGljZW5zZVxuLy8gdmltOiB0cz00IHN0cz00IHN3PTQgZXhwYW5kdGFiXG5cbi8vIE1vZHVsZSBzeXN0ZW1zIG1hZ2ljIGRhbmNlXG4oZnVuY3Rpb24gKGRlZmluaXRpb24pIHtcbiAgICAvLyBSZXF1aXJlSlNcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgZGVmaW5lKGRlZmluaXRpb24pO1xuICAgIC8vIFlVSTNcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBZVUkgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIFlVSS5hZGQoXCJlczVcIiwgZGVmaW5pdGlvbik7XG4gICAgLy8gQ29tbW9uSlMgYW5kIDxzY3JpcHQ+XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZGVmaW5pdGlvbigpO1xuICAgIH1cbn0pKGZ1bmN0aW9uICgpIHtcblxuLyoqXG4gKiBCcmluZ3MgYW4gZW52aXJvbm1lbnQgYXMgY2xvc2UgdG8gRUNNQVNjcmlwdCA1IGNvbXBsaWFuY2VcbiAqIGFzIGlzIHBvc3NpYmxlIHdpdGggdGhlIGZhY2lsaXRpZXMgb2YgZXJzdHdoaWxlIGVuZ2luZXMuXG4gKlxuICogQW5ub3RhdGVkIEVTNTogaHR0cDovL2VzNS5naXRodWIuY29tLyAoc3BlY2lmaWMgbGlua3MgYmVsb3cpXG4gKiBFUzUgU3BlYzogaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL3B1YmxpY2F0aW9ucy9maWxlcy9FQ01BLVNUL0VjbWEtMjYyLnBkZlxuICogUmVxdWlyZWQgcmVhZGluZzogaHR0cDovL2phdmFzY3JpcHR3ZWJsb2cud29yZHByZXNzLmNvbS8yMDExLzEyLzA1L2V4dGVuZGluZy1qYXZhc2NyaXB0LW5hdGl2ZXMvXG4gKi9cblxuLy9cbi8vIEZ1bmN0aW9uXG4vLyA9PT09PT09PVxuLy9cblxuLy8gRVMtNSAxNS4zLjQuNVxuLy8gaHR0cDovL2VzNS5naXRodWIuY29tLyN4MTUuMy40LjVcblxuZnVuY3Rpb24gRW1wdHkoKSB7fVxuXG5pZiAoIUZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKSB7XG4gICAgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiBiaW5kKHRoYXQpIHsgLy8gLmxlbmd0aCBpcyAxXG4gICAgICAgIC8vIDEuIExldCBUYXJnZXQgYmUgdGhlIHRoaXMgdmFsdWUuXG4gICAgICAgIHZhciB0YXJnZXQgPSB0aGlzO1xuICAgICAgICAvLyAyLiBJZiBJc0NhbGxhYmxlKFRhcmdldCkgaXMgZmFsc2UsIHRocm93IGEgVHlwZUVycm9yIGV4Y2VwdGlvbi5cbiAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgY2FsbGVkIG9uIGluY29tcGF0aWJsZSBcIiArIHRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gMy4gTGV0IEEgYmUgYSBuZXcgKHBvc3NpYmx5IGVtcHR5KSBpbnRlcm5hbCBsaXN0IG9mIGFsbCBvZiB0aGVcbiAgICAgICAgLy8gICBhcmd1bWVudCB2YWx1ZXMgcHJvdmlkZWQgYWZ0ZXIgdGhpc0FyZyAoYXJnMSwgYXJnMiBldGMpLCBpbiBvcmRlci5cbiAgICAgICAgLy8gWFhYIHNsaWNlZEFyZ3Mgd2lsbCBzdGFuZCBpbiBmb3IgXCJBXCIgaWYgdXNlZFxuICAgICAgICB2YXIgYXJncyA9IF9BcnJheV9zbGljZV8uY2FsbChhcmd1bWVudHMsIDEpOyAvLyBmb3Igbm9ybWFsIGNhbGxcbiAgICAgICAgLy8gNC4gTGV0IEYgYmUgYSBuZXcgbmF0aXZlIEVDTUFTY3JpcHQgb2JqZWN0LlxuICAgICAgICAvLyAxMS4gU2V0IHRoZSBbW1Byb3RvdHlwZV1dIGludGVybmFsIHByb3BlcnR5IG9mIEYgdG8gdGhlIHN0YW5kYXJkXG4gICAgICAgIC8vICAgYnVpbHQtaW4gRnVuY3Rpb24gcHJvdG90eXBlIG9iamVjdCBhcyBzcGVjaWZpZWQgaW4gMTUuMy4zLjEuXG4gICAgICAgIC8vIDEyLiBTZXQgdGhlIFtbQ2FsbF1dIGludGVybmFsIHByb3BlcnR5IG9mIEYgYXMgZGVzY3JpYmVkIGluXG4gICAgICAgIC8vICAgMTUuMy40LjUuMS5cbiAgICAgICAgLy8gMTMuIFNldCB0aGUgW1tDb25zdHJ1Y3RdXSBpbnRlcm5hbCBwcm9wZXJ0eSBvZiBGIGFzIGRlc2NyaWJlZCBpblxuICAgICAgICAvLyAgIDE1LjMuNC41LjIuXG4gICAgICAgIC8vIDE0LiBTZXQgdGhlIFtbSGFzSW5zdGFuY2VdXSBpbnRlcm5hbCBwcm9wZXJ0eSBvZiBGIGFzIGRlc2NyaWJlZCBpblxuICAgICAgICAvLyAgIDE1LjMuNC41LjMuXG4gICAgICAgIHZhciBib3VuZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBib3VuZCkge1xuICAgICAgICAgICAgICAgIC8vIDE1LjMuNC41LjIgW1tDb25zdHJ1Y3RdXVxuICAgICAgICAgICAgICAgIC8vIFdoZW4gdGhlIFtbQ29uc3RydWN0XV0gaW50ZXJuYWwgbWV0aG9kIG9mIGEgZnVuY3Rpb24gb2JqZWN0LFxuICAgICAgICAgICAgICAgIC8vIEYgdGhhdCB3YXMgY3JlYXRlZCB1c2luZyB0aGUgYmluZCBmdW5jdGlvbiBpcyBjYWxsZWQgd2l0aCBhXG4gICAgICAgICAgICAgICAgLy8gbGlzdCBvZiBhcmd1bWVudHMgRXh0cmFBcmdzLCB0aGUgZm9sbG93aW5nIHN0ZXBzIGFyZSB0YWtlbjpcbiAgICAgICAgICAgICAgICAvLyAxLiBMZXQgdGFyZ2V0IGJlIHRoZSB2YWx1ZSBvZiBGJ3MgW1tUYXJnZXRGdW5jdGlvbl1dXG4gICAgICAgICAgICAgICAgLy8gICBpbnRlcm5hbCBwcm9wZXJ0eS5cbiAgICAgICAgICAgICAgICAvLyAyLiBJZiB0YXJnZXQgaGFzIG5vIFtbQ29uc3RydWN0XV0gaW50ZXJuYWwgbWV0aG9kLCBhXG4gICAgICAgICAgICAgICAgLy8gICBUeXBlRXJyb3IgZXhjZXB0aW9uIGlzIHRocm93bi5cbiAgICAgICAgICAgICAgICAvLyAzLiBMZXQgYm91bmRBcmdzIGJlIHRoZSB2YWx1ZSBvZiBGJ3MgW1tCb3VuZEFyZ3NdXSBpbnRlcm5hbFxuICAgICAgICAgICAgICAgIC8vICAgcHJvcGVydHkuXG4gICAgICAgICAgICAgICAgLy8gNC4gTGV0IGFyZ3MgYmUgYSBuZXcgbGlzdCBjb250YWluaW5nIHRoZSBzYW1lIHZhbHVlcyBhcyB0aGVcbiAgICAgICAgICAgICAgICAvLyAgIGxpc3QgYm91bmRBcmdzIGluIHRoZSBzYW1lIG9yZGVyIGZvbGxvd2VkIGJ5IHRoZSBzYW1lXG4gICAgICAgICAgICAgICAgLy8gICB2YWx1ZXMgYXMgdGhlIGxpc3QgRXh0cmFBcmdzIGluIHRoZSBzYW1lIG9yZGVyLlxuICAgICAgICAgICAgICAgIC8vIDUuIFJldHVybiB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgdGhlIFtbQ29uc3RydWN0XV0gaW50ZXJuYWxcbiAgICAgICAgICAgICAgICAvLyAgIG1ldGhvZCBvZiB0YXJnZXQgcHJvdmlkaW5nIGFyZ3MgYXMgdGhlIGFyZ3VtZW50cy5cblxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0YXJnZXQuYXBwbHkoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MuY29uY2F0KF9BcnJheV9zbGljZV8uY2FsbChhcmd1bWVudHMpKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdChyZXN1bHQpID09PSByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gMTUuMy40LjUuMSBbW0NhbGxdXVxuICAgICAgICAgICAgICAgIC8vIFdoZW4gdGhlIFtbQ2FsbF1dIGludGVybmFsIG1ldGhvZCBvZiBhIGZ1bmN0aW9uIG9iamVjdCwgRixcbiAgICAgICAgICAgICAgICAvLyB3aGljaCB3YXMgY3JlYXRlZCB1c2luZyB0aGUgYmluZCBmdW5jdGlvbiBpcyBjYWxsZWQgd2l0aCBhXG4gICAgICAgICAgICAgICAgLy8gdGhpcyB2YWx1ZSBhbmQgYSBsaXN0IG9mIGFyZ3VtZW50cyBFeHRyYUFyZ3MsIHRoZSBmb2xsb3dpbmdcbiAgICAgICAgICAgICAgICAvLyBzdGVwcyBhcmUgdGFrZW46XG4gICAgICAgICAgICAgICAgLy8gMS4gTGV0IGJvdW5kQXJncyBiZSB0aGUgdmFsdWUgb2YgRidzIFtbQm91bmRBcmdzXV0gaW50ZXJuYWxcbiAgICAgICAgICAgICAgICAvLyAgIHByb3BlcnR5LlxuICAgICAgICAgICAgICAgIC8vIDIuIExldCBib3VuZFRoaXMgYmUgdGhlIHZhbHVlIG9mIEYncyBbW0JvdW5kVGhpc11dIGludGVybmFsXG4gICAgICAgICAgICAgICAgLy8gICBwcm9wZXJ0eS5cbiAgICAgICAgICAgICAgICAvLyAzLiBMZXQgdGFyZ2V0IGJlIHRoZSB2YWx1ZSBvZiBGJ3MgW1tUYXJnZXRGdW5jdGlvbl1dIGludGVybmFsXG4gICAgICAgICAgICAgICAgLy8gICBwcm9wZXJ0eS5cbiAgICAgICAgICAgICAgICAvLyA0LiBMZXQgYXJncyBiZSBhIG5ldyBsaXN0IGNvbnRhaW5pbmcgdGhlIHNhbWUgdmFsdWVzIGFzIHRoZVxuICAgICAgICAgICAgICAgIC8vICAgbGlzdCBib3VuZEFyZ3MgaW4gdGhlIHNhbWUgb3JkZXIgZm9sbG93ZWQgYnkgdGhlIHNhbWVcbiAgICAgICAgICAgICAgICAvLyAgIHZhbHVlcyBhcyB0aGUgbGlzdCBFeHRyYUFyZ3MgaW4gdGhlIHNhbWUgb3JkZXIuXG4gICAgICAgICAgICAgICAgLy8gNS4gUmV0dXJuIHRoZSByZXN1bHQgb2YgY2FsbGluZyB0aGUgW1tDYWxsXV0gaW50ZXJuYWwgbWV0aG9kXG4gICAgICAgICAgICAgICAgLy8gICBvZiB0YXJnZXQgcHJvdmlkaW5nIGJvdW5kVGhpcyBhcyB0aGUgdGhpcyB2YWx1ZSBhbmRcbiAgICAgICAgICAgICAgICAvLyAgIHByb3ZpZGluZyBhcmdzIGFzIHRoZSBhcmd1bWVudHMuXG5cbiAgICAgICAgICAgICAgICAvLyBlcXVpdjogdGFyZ2V0LmNhbGwodGhpcywgLi4uYm91bmRBcmdzLCAuLi5hcmdzKVxuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQuYXBwbHkoXG4gICAgICAgICAgICAgICAgICAgIHRoYXQsXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MuY29uY2F0KF9BcnJheV9zbGljZV8uY2FsbChhcmd1bWVudHMpKVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuICAgICAgICBpZih0YXJnZXQucHJvdG90eXBlKSB7XG4gICAgICAgICAgICBFbXB0eS5wcm90b3R5cGUgPSB0YXJnZXQucHJvdG90eXBlO1xuICAgICAgICAgICAgYm91bmQucHJvdG90eXBlID0gbmV3IEVtcHR5KCk7XG4gICAgICAgICAgICAvLyBDbGVhbiB1cCBkYW5nbGluZyByZWZlcmVuY2VzLlxuICAgICAgICAgICAgRW1wdHkucHJvdG90eXBlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBYWFggYm91bmQubGVuZ3RoIGlzIG5ldmVyIHdyaXRhYmxlLCBzbyBkb24ndCBldmVuIHRyeVxuICAgICAgICAvL1xuICAgICAgICAvLyAxNS4gSWYgdGhlIFtbQ2xhc3NdXSBpbnRlcm5hbCBwcm9wZXJ0eSBvZiBUYXJnZXQgaXMgXCJGdW5jdGlvblwiLCB0aGVuXG4gICAgICAgIC8vICAgICBhLiBMZXQgTCBiZSB0aGUgbGVuZ3RoIHByb3BlcnR5IG9mIFRhcmdldCBtaW51cyB0aGUgbGVuZ3RoIG9mIEEuXG4gICAgICAgIC8vICAgICBiLiBTZXQgdGhlIGxlbmd0aCBvd24gcHJvcGVydHkgb2YgRiB0byBlaXRoZXIgMCBvciBMLCB3aGljaGV2ZXIgaXNcbiAgICAgICAgLy8gICAgICAgbGFyZ2VyLlxuICAgICAgICAvLyAxNi4gRWxzZSBzZXQgdGhlIGxlbmd0aCBvd24gcHJvcGVydHkgb2YgRiB0byAwLlxuICAgICAgICAvLyAxNy4gU2V0IHRoZSBhdHRyaWJ1dGVzIG9mIHRoZSBsZW5ndGggb3duIHByb3BlcnR5IG9mIEYgdG8gdGhlIHZhbHVlc1xuICAgICAgICAvLyAgIHNwZWNpZmllZCBpbiAxNS4zLjUuMS5cblxuICAgICAgICAvLyBUT0RPXG4gICAgICAgIC8vIDE4LiBTZXQgdGhlIFtbRXh0ZW5zaWJsZV1dIGludGVybmFsIHByb3BlcnR5IG9mIEYgdG8gdHJ1ZS5cblxuICAgICAgICAvLyBUT0RPXG4gICAgICAgIC8vIDE5LiBMZXQgdGhyb3dlciBiZSB0aGUgW1tUaHJvd1R5cGVFcnJvcl1dIGZ1bmN0aW9uIE9iamVjdCAoMTMuMi4zKS5cbiAgICAgICAgLy8gMjAuIENhbGwgdGhlIFtbRGVmaW5lT3duUHJvcGVydHldXSBpbnRlcm5hbCBtZXRob2Qgb2YgRiB3aXRoXG4gICAgICAgIC8vICAgYXJndW1lbnRzIFwiY2FsbGVyXCIsIFByb3BlcnR5RGVzY3JpcHRvciB7W1tHZXRdXTogdGhyb3dlciwgW1tTZXRdXTpcbiAgICAgICAgLy8gICB0aHJvd2VyLCBbW0VudW1lcmFibGVdXTogZmFsc2UsIFtbQ29uZmlndXJhYmxlXV06IGZhbHNlfSwgYW5kXG4gICAgICAgIC8vICAgZmFsc2UuXG4gICAgICAgIC8vIDIxLiBDYWxsIHRoZSBbW0RlZmluZU93blByb3BlcnR5XV0gaW50ZXJuYWwgbWV0aG9kIG9mIEYgd2l0aFxuICAgICAgICAvLyAgIGFyZ3VtZW50cyBcImFyZ3VtZW50c1wiLCBQcm9wZXJ0eURlc2NyaXB0b3Ige1tbR2V0XV06IHRocm93ZXIsXG4gICAgICAgIC8vICAgW1tTZXRdXTogdGhyb3dlciwgW1tFbnVtZXJhYmxlXV06IGZhbHNlLCBbW0NvbmZpZ3VyYWJsZV1dOiBmYWxzZX0sXG4gICAgICAgIC8vICAgYW5kIGZhbHNlLlxuXG4gICAgICAgIC8vIFRPRE9cbiAgICAgICAgLy8gTk9URSBGdW5jdGlvbiBvYmplY3RzIGNyZWF0ZWQgdXNpbmcgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgZG8gbm90XG4gICAgICAgIC8vIGhhdmUgYSBwcm90b3R5cGUgcHJvcGVydHkgb3IgdGhlIFtbQ29kZV1dLCBbW0Zvcm1hbFBhcmFtZXRlcnNdXSwgYW5kXG4gICAgICAgIC8vIFtbU2NvcGVdXSBpbnRlcm5hbCBwcm9wZXJ0aWVzLlxuICAgICAgICAvLyBYWFggY2FuJ3QgZGVsZXRlIHByb3RvdHlwZSBpbiBwdXJlLWpzLlxuXG4gICAgICAgIC8vIDIyLiBSZXR1cm4gRi5cbiAgICAgICAgcmV0dXJuIGJvdW5kO1xuICAgIH07XG59XG5cbi8vIFNob3J0Y3V0IHRvIGFuIG9mdGVuIGFjY2Vzc2VkIHByb3BlcnRpZXMsIGluIG9yZGVyIHRvIGF2b2lkIG11bHRpcGxlXG4vLyBkZXJlZmVyZW5jZSB0aGF0IGNvc3RzIHVuaXZlcnNhbGx5LlxuLy8gX1BsZWFzZSBub3RlOiBTaG9ydGN1dHMgYXJlIGRlZmluZWQgYWZ0ZXIgYEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kYCBhcyB3ZVxuLy8gdXMgaXQgaW4gZGVmaW5pbmcgc2hvcnRjdXRzLlxudmFyIGNhbGwgPSBGdW5jdGlvbi5wcm90b3R5cGUuY2FsbDtcbnZhciBwcm90b3R5cGVPZkFycmF5ID0gQXJyYXkucHJvdG90eXBlO1xudmFyIHByb3RvdHlwZU9mT2JqZWN0ID0gT2JqZWN0LnByb3RvdHlwZTtcbnZhciBfQXJyYXlfc2xpY2VfID0gcHJvdG90eXBlT2ZBcnJheS5zbGljZTtcbi8vIEhhdmluZyBhIHRvU3RyaW5nIGxvY2FsIHZhcmlhYmxlIG5hbWUgYnJlYWtzIGluIE9wZXJhIHNvIHVzZSBfdG9TdHJpbmcuXG52YXIgX3RvU3RyaW5nID0gY2FsbC5iaW5kKHByb3RvdHlwZU9mT2JqZWN0LnRvU3RyaW5nKTtcbnZhciBvd25zID0gY2FsbC5iaW5kKHByb3RvdHlwZU9mT2JqZWN0Lmhhc093blByb3BlcnR5KTtcblxuLy8gSWYgSlMgZW5naW5lIHN1cHBvcnRzIGFjY2Vzc29ycyBjcmVhdGluZyBzaG9ydGN1dHMuXG52YXIgZGVmaW5lR2V0dGVyO1xudmFyIGRlZmluZVNldHRlcjtcbnZhciBsb29rdXBHZXR0ZXI7XG52YXIgbG9va3VwU2V0dGVyO1xudmFyIHN1cHBvcnRzQWNjZXNzb3JzO1xuaWYgKChzdXBwb3J0c0FjY2Vzc29ycyA9IG93bnMocHJvdG90eXBlT2ZPYmplY3QsIFwiX19kZWZpbmVHZXR0ZXJfX1wiKSkpIHtcbiAgICBkZWZpbmVHZXR0ZXIgPSBjYWxsLmJpbmQocHJvdG90eXBlT2ZPYmplY3QuX19kZWZpbmVHZXR0ZXJfXyk7XG4gICAgZGVmaW5lU2V0dGVyID0gY2FsbC5iaW5kKHByb3RvdHlwZU9mT2JqZWN0Ll9fZGVmaW5lU2V0dGVyX18pO1xuICAgIGxvb2t1cEdldHRlciA9IGNhbGwuYmluZChwcm90b3R5cGVPZk9iamVjdC5fX2xvb2t1cEdldHRlcl9fKTtcbiAgICBsb29rdXBTZXR0ZXIgPSBjYWxsLmJpbmQocHJvdG90eXBlT2ZPYmplY3QuX19sb29rdXBTZXR0ZXJfXyk7XG59XG5cbi8vXG4vLyBBcnJheVxuLy8gPT09PT1cbi8vXG5cbi8vIEVTNSAxNS40LjQuMTJcbi8vIGh0dHA6Ly9lczUuZ2l0aHViLmNvbS8jeDE1LjQuNC4xMlxuLy8gRGVmYXVsdCB2YWx1ZSBmb3Igc2Vjb25kIHBhcmFtXG4vLyBbYnVnZml4LCBpZWx0OSwgb2xkIGJyb3dzZXJzXVxuLy8gSUUgPCA5IGJ1ZzogWzEsMl0uc3BsaWNlKDApLmpvaW4oXCJcIikgPT0gXCJcIiBidXQgc2hvdWxkIGJlIFwiMTJcIlxuaWYgKFsxLDJdLnNwbGljZSgwKS5sZW5ndGggIT0gMikge1xuICAgIHZhciBhcnJheV9zcGxpY2UgPSBBcnJheS5wcm90b3R5cGUuc3BsaWNlO1xuXG4gICAgaWYoZnVuY3Rpb24oKSB7IC8vIHRlc3QgSUUgPCA5IHRvIHNwbGljZSBidWcgLSBzZWUgaXNzdWUgIzEzOFxuICAgICAgICBmdW5jdGlvbiBtYWtlQXJyYXkobCkge1xuICAgICAgICAgICAgdmFyIGEgPSBbXTtcbiAgICAgICAgICAgIHdoaWxlIChsLS0pIHtcbiAgICAgICAgICAgICAgICBhLnVuc2hpZnQobClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYXJyYXkgPSBbXVxuICAgICAgICAgICAgLCBsZW5ndGhCZWZvcmVcbiAgICAgICAgO1xuXG4gICAgICAgIGFycmF5LnNwbGljZS5iaW5kKGFycmF5LCAwLCAwKS5hcHBseShudWxsLCBtYWtlQXJyYXkoMjApKTtcbiAgICAgICAgYXJyYXkuc3BsaWNlLmJpbmQoYXJyYXksIDAsIDApLmFwcGx5KG51bGwsIG1ha2VBcnJheSgyNikpO1xuXG4gICAgICAgIGxlbmd0aEJlZm9yZSA9IGFycmF5Lmxlbmd0aDsgLy8yMFxuICAgICAgICBhcnJheS5zcGxpY2UoNSwgMCwgXCJYWFhcIik7IC8vIGFkZCBvbmUgZWxlbWVudFxuXG4gICAgICAgIGlmKGxlbmd0aEJlZm9yZSArIDEgPT0gYXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsvLyBoYXMgcmlnaHQgc3BsaWNlIGltcGxlbWVudGF0aW9uIHdpdGhvdXQgYnVnc1xuICAgICAgICB9XG4gICAgICAgIC8vIGVsc2Uge1xuICAgICAgICAvLyAgICBJRTggYnVnXG4gICAgICAgIC8vIH1cbiAgICB9KCkpIHsvL0lFIDYvN1xuICAgICAgICBBcnJheS5wcm90b3R5cGUuc3BsaWNlID0gZnVuY3Rpb24oc3RhcnQsIGRlbGV0ZUNvdW50KSB7XG4gICAgICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBhcnJheV9zcGxpY2UuYXBwbHkodGhpcywgW1xuICAgICAgICAgICAgICAgICAgICBzdGFydCA9PT0gdm9pZCAwID8gMCA6IHN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICBkZWxldGVDb3VudCA9PT0gdm9pZCAwID8gKHRoaXMubGVuZ3RoIC0gc3RhcnQpIDogZGVsZXRlQ291bnRcbiAgICAgICAgICAgICAgICBdLmNvbmNhdChfQXJyYXlfc2xpY2VfLmNhbGwoYXJndW1lbnRzLCAyKSkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIGVsc2Ugey8vSUU4XG4gICAgICAgIEFycmF5LnByb3RvdHlwZS5zcGxpY2UgPSBmdW5jdGlvbihzdGFydCwgZGVsZXRlQ291bnQpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHRcbiAgICAgICAgICAgICAgICAsIGFyZ3MgPSBfQXJyYXlfc2xpY2VfLmNhbGwoYXJndW1lbnRzLCAyKVxuICAgICAgICAgICAgICAgICwgYWRkRWxlbWVudHNDb3VudCA9IGFyZ3MubGVuZ3RoXG4gICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIGlmKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihzdGFydCA9PT0gdm9pZCAwKSB7IC8vIGRlZmF1bHRcbiAgICAgICAgICAgICAgICBzdGFydCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihkZWxldGVDb3VudCA9PT0gdm9pZCAwKSB7IC8vIGRlZmF1bHRcbiAgICAgICAgICAgICAgICBkZWxldGVDb3VudCA9IHRoaXMubGVuZ3RoIC0gc3RhcnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGFkZEVsZW1lbnRzQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgaWYoZGVsZXRlQ291bnQgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZihzdGFydCA9PSB0aGlzLmxlbmd0aCkgeyAvLyB0aW55IG9wdGltaXNhdGlvbiAjMVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXNoLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc3RhcnQgPT0gMCkgeyAvLyB0aW55IG9wdGltaXNhdGlvbiAjMlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNoaWZ0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gQXJyYXkucHJvdG90eXBlLnNwbGljZSBpbXBsZW1lbnRhdGlvblxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IF9BcnJheV9zbGljZV8uY2FsbCh0aGlzLCBzdGFydCwgc3RhcnQgKyBkZWxldGVDb3VudCk7Ly8gZGVsZXRlIHBhcnRcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2guYXBwbHkoYXJncywgX0FycmF5X3NsaWNlXy5jYWxsKHRoaXMsIHN0YXJ0ICsgZGVsZXRlQ291bnQsIHRoaXMubGVuZ3RoKSk7Ly8gcmlnaHQgcGFydFxuICAgICAgICAgICAgICAgIGFyZ3MudW5zaGlmdC5hcHBseShhcmdzLCBfQXJyYXlfc2xpY2VfLmNhbGwodGhpcywgMCwgc3RhcnQpKTsvLyBsZWZ0IHBhcnRcblxuICAgICAgICAgICAgICAgIC8vIGRlbGV0ZSBhbGwgaXRlbXMgZnJvbSB0aGlzIGFycmF5IGFuZCByZXBsYWNlIGl0IHRvICdsZWZ0IHBhcnQnICsgX0FycmF5X3NsaWNlXy5jYWxsKGFyZ3VtZW50cywgMikgKyAncmlnaHQgcGFydCdcbiAgICAgICAgICAgICAgICBhcmdzLnVuc2hpZnQoMCwgdGhpcy5sZW5ndGgpO1xuXG4gICAgICAgICAgICAgICAgYXJyYXlfc3BsaWNlLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGFycmF5X3NwbGljZS5jYWxsKHRoaXMsIHN0YXJ0LCBkZWxldGVDb3VudCk7XG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuLy8gRVM1IDE1LjQuNC4xMlxuLy8gaHR0cDovL2VzNS5naXRodWIuY29tLyN4MTUuNC40LjEzXG4vLyBSZXR1cm4gbGVuK2FyZ0NvdW50LlxuLy8gW2J1Z2ZpeCwgaWVsdDhdXG4vLyBJRSA8IDggYnVnOiBbXS51bnNoaWZ0KDApID09IHVuZGVmaW5lZCBidXQgc2hvdWxkIGJlIFwiMVwiXG5pZiAoW10udW5zaGlmdCgwKSAhPSAxKSB7XG4gICAgdmFyIGFycmF5X3Vuc2hpZnQgPSBBcnJheS5wcm90b3R5cGUudW5zaGlmdDtcbiAgICBBcnJheS5wcm90b3R5cGUudW5zaGlmdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBhcnJheV91bnNoaWZ0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIHJldHVybiB0aGlzLmxlbmd0aDtcbiAgICB9O1xufVxuXG4vLyBFUzUgMTUuNC4zLjJcbi8vIGh0dHA6Ly9lczUuZ2l0aHViLmNvbS8jeDE1LjQuMy4yXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9pc0FycmF5XG5pZiAoIUFycmF5LmlzQXJyYXkpIHtcbiAgICBBcnJheS5pc0FycmF5ID0gZnVuY3Rpb24gaXNBcnJheShvYmopIHtcbiAgICAgICAgcmV0dXJuIF90b1N0cmluZyhvYmopID09IFwiW29iamVjdCBBcnJheV1cIjtcbiAgICB9O1xufVxuXG4vLyBUaGUgSXNDYWxsYWJsZSgpIGNoZWNrIGluIHRoZSBBcnJheSBmdW5jdGlvbnNcbi8vIGhhcyBiZWVuIHJlcGxhY2VkIHdpdGggYSBzdHJpY3QgY2hlY2sgb24gdGhlXG4vLyBpbnRlcm5hbCBjbGFzcyBvZiB0aGUgb2JqZWN0IHRvIHRyYXAgY2FzZXMgd2hlcmVcbi8vIHRoZSBwcm92aWRlZCBmdW5jdGlvbiB3YXMgYWN0dWFsbHkgYSByZWd1bGFyXG4vLyBleHByZXNzaW9uIGxpdGVyYWwsIHdoaWNoIGluIFY4IGFuZFxuLy8gSmF2YVNjcmlwdENvcmUgaXMgYSB0eXBlb2YgXCJmdW5jdGlvblwiLiAgT25seSBpblxuLy8gVjggYXJlIHJlZ3VsYXIgZXhwcmVzc2lvbiBsaXRlcmFscyBwZXJtaXR0ZWQgYXNcbi8vIHJlZHVjZSBwYXJhbWV0ZXJzLCBzbyBpdCBpcyBkZXNpcmFibGUgaW4gdGhlXG4vLyBnZW5lcmFsIGNhc2UgZm9yIHRoZSBzaGltIHRvIG1hdGNoIHRoZSBtb3JlXG4vLyBzdHJpY3QgYW5kIGNvbW1vbiBiZWhhdmlvciBvZiByZWplY3RpbmcgcmVndWxhclxuLy8gZXhwcmVzc2lvbnMuXG5cbi8vIEVTNSAxNS40LjQuMThcbi8vIGh0dHA6Ly9lczUuZ2l0aHViLmNvbS8jeDE1LjQuNC4xOFxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvYXJyYXkvZm9yRWFjaFxuXG4vLyBDaGVjayBmYWlsdXJlIG9mIGJ5LWluZGV4IGFjY2VzcyBvZiBzdHJpbmcgY2hhcmFjdGVycyAoSUUgPCA5KVxuLy8gYW5kIGZhaWx1cmUgb2YgYDAgaW4gYm94ZWRTdHJpbmdgIChSaGlubylcbnZhciBib3hlZFN0cmluZyA9IE9iamVjdChcImFcIiksXG4gICAgc3BsaXRTdHJpbmcgPSBib3hlZFN0cmluZ1swXSAhPSBcImFcIiB8fCAhKDAgaW4gYm94ZWRTdHJpbmcpO1xuXG5pZiAoIUFycmF5LnByb3RvdHlwZS5mb3JFYWNoKSB7XG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZ1biAvKiwgdGhpc3AqLykge1xuICAgICAgICB2YXIgb2JqZWN0ID0gdG9PYmplY3QodGhpcyksXG4gICAgICAgICAgICBzZWxmID0gc3BsaXRTdHJpbmcgJiYgX3RvU3RyaW5nKHRoaXMpID09IFwiW29iamVjdCBTdHJpbmddXCIgP1xuICAgICAgICAgICAgICAgIHRoaXMuc3BsaXQoXCJcIikgOlxuICAgICAgICAgICAgICAgIG9iamVjdCxcbiAgICAgICAgICAgIHRoaXNwID0gYXJndW1lbnRzWzFdLFxuICAgICAgICAgICAgaSA9IC0xLFxuICAgICAgICAgICAgbGVuZ3RoID0gc2VsZi5sZW5ndGggPj4+IDA7XG5cbiAgICAgICAgLy8gSWYgbm8gY2FsbGJhY2sgZnVuY3Rpb24gb3IgaWYgY2FsbGJhY2sgaXMgbm90IGEgY2FsbGFibGUgZnVuY3Rpb25cbiAgICAgICAgaWYgKF90b1N0cmluZyhmdW4pICE9IFwiW29iamVjdCBGdW5jdGlvbl1cIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpOyAvLyBUT0RPIG1lc3NhZ2VcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlICgrK2kgPCBsZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChpIGluIHNlbGYpIHtcbiAgICAgICAgICAgICAgICAvLyBJbnZva2UgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHdpdGggY2FsbCwgcGFzc2luZyBhcmd1bWVudHM6XG4gICAgICAgICAgICAgICAgLy8gY29udGV4dCwgcHJvcGVydHkgdmFsdWUsIHByb3BlcnR5IGtleSwgdGhpc0FyZyBvYmplY3RcbiAgICAgICAgICAgICAgICAvLyBjb250ZXh0XG4gICAgICAgICAgICAgICAgZnVuLmNhbGwodGhpc3AsIHNlbGZbaV0sIGksIG9iamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG4vLyBFUzUgMTUuNC40LjE5XG4vLyBodHRwOi8vZXM1LmdpdGh1Yi5jb20vI3gxNS40LjQuMTlcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0NvcmVfSmF2YVNjcmlwdF8xLjVfUmVmZXJlbmNlL09iamVjdHMvQXJyYXkvbWFwXG5pZiAoIUFycmF5LnByb3RvdHlwZS5tYXApIHtcbiAgICBBcnJheS5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24gbWFwKGZ1biAvKiwgdGhpc3AqLykge1xuICAgICAgICB2YXIgb2JqZWN0ID0gdG9PYmplY3QodGhpcyksXG4gICAgICAgICAgICBzZWxmID0gc3BsaXRTdHJpbmcgJiYgX3RvU3RyaW5nKHRoaXMpID09IFwiW29iamVjdCBTdHJpbmddXCIgP1xuICAgICAgICAgICAgICAgIHRoaXMuc3BsaXQoXCJcIikgOlxuICAgICAgICAgICAgICAgIG9iamVjdCxcbiAgICAgICAgICAgIGxlbmd0aCA9IHNlbGYubGVuZ3RoID4+PiAwLFxuICAgICAgICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKSxcbiAgICAgICAgICAgIHRoaXNwID0gYXJndW1lbnRzWzFdO1xuXG4gICAgICAgIC8vIElmIG5vIGNhbGxiYWNrIGZ1bmN0aW9uIG9yIGlmIGNhbGxiYWNrIGlzIG5vdCBhIGNhbGxhYmxlIGZ1bmN0aW9uXG4gICAgICAgIGlmIChfdG9TdHJpbmcoZnVuKSAhPSBcIltvYmplY3QgRnVuY3Rpb25dXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoZnVuICsgXCIgaXMgbm90IGEgZnVuY3Rpb25cIik7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSBpbiBzZWxmKVxuICAgICAgICAgICAgICAgIHJlc3VsdFtpXSA9IGZ1bi5jYWxsKHRoaXNwLCBzZWxmW2ldLCBpLCBvYmplY3QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn1cblxuLy8gRVM1IDE1LjQuNC4yMFxuLy8gaHR0cDovL2VzNS5naXRodWIuY29tLyN4MTUuNC40LjIwXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9Db3JlX0phdmFTY3JpcHRfMS41X1JlZmVyZW5jZS9PYmplY3RzL0FycmF5L2ZpbHRlclxuaWYgKCFBcnJheS5wcm90b3R5cGUuZmlsdGVyKSB7XG4gICAgQXJyYXkucHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uIGZpbHRlcihmdW4gLyosIHRoaXNwICovKSB7XG4gICAgICAgIHZhciBvYmplY3QgPSB0b09iamVjdCh0aGlzKSxcbiAgICAgICAgICAgIHNlbGYgPSBzcGxpdFN0cmluZyAmJiBfdG9TdHJpbmcodGhpcykgPT0gXCJbb2JqZWN0IFN0cmluZ11cIiA/XG4gICAgICAgICAgICAgICAgdGhpcy5zcGxpdChcIlwiKSA6XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdCxcbiAgICAgICAgICAgIGxlbmd0aCA9IHNlbGYubGVuZ3RoID4+PiAwLFxuICAgICAgICAgICAgcmVzdWx0ID0gW10sXG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgIHRoaXNwID0gYXJndW1lbnRzWzFdO1xuXG4gICAgICAgIC8vIElmIG5vIGNhbGxiYWNrIGZ1bmN0aW9uIG9yIGlmIGNhbGxiYWNrIGlzIG5vdCBhIGNhbGxhYmxlIGZ1bmN0aW9uXG4gICAgICAgIGlmIChfdG9TdHJpbmcoZnVuKSAhPSBcIltvYmplY3QgRnVuY3Rpb25dXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoZnVuICsgXCIgaXMgbm90IGEgZnVuY3Rpb25cIik7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSBpbiBzZWxmKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBzZWxmW2ldO1xuICAgICAgICAgICAgICAgIGlmIChmdW4uY2FsbCh0aGlzcCwgdmFsdWUsIGksIG9iamVjdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG59XG5cbi8vIEVTNSAxNS40LjQuMTZcbi8vIGh0dHA6Ly9lczUuZ2l0aHViLmNvbS8jeDE1LjQuNC4xNlxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvZXZlcnlcbmlmICghQXJyYXkucHJvdG90eXBlLmV2ZXJ5KSB7XG4gICAgQXJyYXkucHJvdG90eXBlLmV2ZXJ5ID0gZnVuY3Rpb24gZXZlcnkoZnVuIC8qLCB0aGlzcCAqLykge1xuICAgICAgICB2YXIgb2JqZWN0ID0gdG9PYmplY3QodGhpcyksXG4gICAgICAgICAgICBzZWxmID0gc3BsaXRTdHJpbmcgJiYgX3RvU3RyaW5nKHRoaXMpID09IFwiW29iamVjdCBTdHJpbmddXCIgP1xuICAgICAgICAgICAgICAgIHRoaXMuc3BsaXQoXCJcIikgOlxuICAgICAgICAgICAgICAgIG9iamVjdCxcbiAgICAgICAgICAgIGxlbmd0aCA9IHNlbGYubGVuZ3RoID4+PiAwLFxuICAgICAgICAgICAgdGhpc3AgPSBhcmd1bWVudHNbMV07XG5cbiAgICAgICAgLy8gSWYgbm8gY2FsbGJhY2sgZnVuY3Rpb24gb3IgaWYgY2FsbGJhY2sgaXMgbm90IGEgY2FsbGFibGUgZnVuY3Rpb25cbiAgICAgICAgaWYgKF90b1N0cmluZyhmdW4pICE9IFwiW29iamVjdCBGdW5jdGlvbl1cIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihmdW4gKyBcIiBpcyBub3QgYSBmdW5jdGlvblwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpIGluIHNlbGYgJiYgIWZ1bi5jYWxsKHRoaXNwLCBzZWxmW2ldLCBpLCBvYmplY3QpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG59XG5cbi8vIEVTNSAxNS40LjQuMTdcbi8vIGh0dHA6Ly9lczUuZ2l0aHViLmNvbS8jeDE1LjQuNC4xN1xuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvc29tZVxuaWYgKCFBcnJheS5wcm90b3R5cGUuc29tZSkge1xuICAgIEFycmF5LnByb3RvdHlwZS5zb21lID0gZnVuY3Rpb24gc29tZShmdW4gLyosIHRoaXNwICovKSB7XG4gICAgICAgIHZhciBvYmplY3QgPSB0b09iamVjdCh0aGlzKSxcbiAgICAgICAgICAgIHNlbGYgPSBzcGxpdFN0cmluZyAmJiBfdG9TdHJpbmcodGhpcykgPT0gXCJbb2JqZWN0IFN0cmluZ11cIiA/XG4gICAgICAgICAgICAgICAgdGhpcy5zcGxpdChcIlwiKSA6XG4gICAgICAgICAgICAgICAgb2JqZWN0LFxuICAgICAgICAgICAgbGVuZ3RoID0gc2VsZi5sZW5ndGggPj4+IDAsXG4gICAgICAgICAgICB0aGlzcCA9IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICAvLyBJZiBubyBjYWxsYmFjayBmdW5jdGlvbiBvciBpZiBjYWxsYmFjayBpcyBub3QgYSBjYWxsYWJsZSBmdW5jdGlvblxuICAgICAgICBpZiAoX3RvU3RyaW5nKGZ1bikgIT0gXCJbb2JqZWN0IEZ1bmN0aW9uXVwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGZ1biArIFwiIGlzIG5vdCBhIGZ1bmN0aW9uXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgaW4gc2VsZiAmJiBmdW4uY2FsbCh0aGlzcCwgc2VsZltpXSwgaSwgb2JqZWN0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xufVxuXG4vLyBFUzUgMTUuNC40LjIxXG4vLyBodHRwOi8vZXM1LmdpdGh1Yi5jb20vI3gxNS40LjQuMjFcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0NvcmVfSmF2YVNjcmlwdF8xLjVfUmVmZXJlbmNlL09iamVjdHMvQXJyYXkvcmVkdWNlXG5pZiAoIUFycmF5LnByb3RvdHlwZS5yZWR1Y2UpIHtcbiAgICBBcnJheS5wcm90b3R5cGUucmVkdWNlID0gZnVuY3Rpb24gcmVkdWNlKGZ1biAvKiwgaW5pdGlhbCovKSB7XG4gICAgICAgIHZhciBvYmplY3QgPSB0b09iamVjdCh0aGlzKSxcbiAgICAgICAgICAgIHNlbGYgPSBzcGxpdFN0cmluZyAmJiBfdG9TdHJpbmcodGhpcykgPT0gXCJbb2JqZWN0IFN0cmluZ11cIiA/XG4gICAgICAgICAgICAgICAgdGhpcy5zcGxpdChcIlwiKSA6XG4gICAgICAgICAgICAgICAgb2JqZWN0LFxuICAgICAgICAgICAgbGVuZ3RoID0gc2VsZi5sZW5ndGggPj4+IDA7XG5cbiAgICAgICAgLy8gSWYgbm8gY2FsbGJhY2sgZnVuY3Rpb24gb3IgaWYgY2FsbGJhY2sgaXMgbm90IGEgY2FsbGFibGUgZnVuY3Rpb25cbiAgICAgICAgaWYgKF90b1N0cmluZyhmdW4pICE9IFwiW29iamVjdCBGdW5jdGlvbl1cIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihmdW4gKyBcIiBpcyBub3QgYSBmdW5jdGlvblwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vIHZhbHVlIHRvIHJldHVybiBpZiBubyBpbml0aWFsIHZhbHVlIGFuZCBhbiBlbXB0eSBhcnJheVxuICAgICAgICBpZiAoIWxlbmd0aCAmJiBhcmd1bWVudHMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJyZWR1Y2Ugb2YgZW1wdHkgYXJyYXkgd2l0aCBubyBpbml0aWFsIHZhbHVlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBhcmd1bWVudHNbMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgaWYgKGkgaW4gc2VsZikge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBzZWxmW2krK107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGlmIGFycmF5IGNvbnRhaW5zIG5vIHZhbHVlcywgbm8gaW5pdGlhbCB2YWx1ZSB0byByZXR1cm5cbiAgICAgICAgICAgICAgICBpZiAoKytpID49IGxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwicmVkdWNlIG9mIGVtcHR5IGFycmF5IHdpdGggbm8gaW5pdGlhbCB2YWx1ZVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IHdoaWxlICh0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpIGluIHNlbGYpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW4uY2FsbCh2b2lkIDAsIHJlc3VsdCwgc2VsZltpXSwgaSwgb2JqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn1cblxuLy8gRVM1IDE1LjQuNC4yMlxuLy8gaHR0cDovL2VzNS5naXRodWIuY29tLyN4MTUuNC40LjIyXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9Db3JlX0phdmFTY3JpcHRfMS41X1JlZmVyZW5jZS9PYmplY3RzL0FycmF5L3JlZHVjZVJpZ2h0XG5pZiAoIUFycmF5LnByb3RvdHlwZS5yZWR1Y2VSaWdodCkge1xuICAgIEFycmF5LnByb3RvdHlwZS5yZWR1Y2VSaWdodCA9IGZ1bmN0aW9uIHJlZHVjZVJpZ2h0KGZ1biAvKiwgaW5pdGlhbCovKSB7XG4gICAgICAgIHZhciBvYmplY3QgPSB0b09iamVjdCh0aGlzKSxcbiAgICAgICAgICAgIHNlbGYgPSBzcGxpdFN0cmluZyAmJiBfdG9TdHJpbmcodGhpcykgPT0gXCJbb2JqZWN0IFN0cmluZ11cIiA/XG4gICAgICAgICAgICAgICAgdGhpcy5zcGxpdChcIlwiKSA6XG4gICAgICAgICAgICAgICAgb2JqZWN0LFxuICAgICAgICAgICAgbGVuZ3RoID0gc2VsZi5sZW5ndGggPj4+IDA7XG5cbiAgICAgICAgLy8gSWYgbm8gY2FsbGJhY2sgZnVuY3Rpb24gb3IgaWYgY2FsbGJhY2sgaXMgbm90IGEgY2FsbGFibGUgZnVuY3Rpb25cbiAgICAgICAgaWYgKF90b1N0cmluZyhmdW4pICE9IFwiW29iamVjdCBGdW5jdGlvbl1cIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihmdW4gKyBcIiBpcyBub3QgYSBmdW5jdGlvblwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vIHZhbHVlIHRvIHJldHVybiBpZiBubyBpbml0aWFsIHZhbHVlLCBlbXB0eSBhcnJheVxuICAgICAgICBpZiAoIWxlbmd0aCAmJiBhcmd1bWVudHMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJyZWR1Y2VSaWdodCBvZiBlbXB0eSBhcnJheSB3aXRoIG5vIGluaXRpYWwgdmFsdWVcIik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVzdWx0LCBpID0gbGVuZ3RoIC0gMTtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgcmVzdWx0ID0gYXJndW1lbnRzWzFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIGlmIChpIGluIHNlbGYpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gc2VsZltpLS1dO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBpZiBhcnJheSBjb250YWlucyBubyB2YWx1ZXMsIG5vIGluaXRpYWwgdmFsdWUgdG8gcmV0dXJuXG4gICAgICAgICAgICAgICAgaWYgKC0taSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInJlZHVjZVJpZ2h0IG9mIGVtcHR5IGFycmF5IHdpdGggbm8gaW5pdGlhbCB2YWx1ZVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IHdoaWxlICh0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGlmIChpIGluIHRoaXMpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW4uY2FsbCh2b2lkIDAsIHJlc3VsdCwgc2VsZltpXSwgaSwgb2JqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAoaS0tKTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG59XG5cbi8vIEVTNSAxNS40LjQuMTRcbi8vIGh0dHA6Ly9lczUuZ2l0aHViLmNvbS8jeDE1LjQuNC4xNFxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvaW5kZXhPZlxuaWYgKCFBcnJheS5wcm90b3R5cGUuaW5kZXhPZiB8fCAoWzAsIDFdLmluZGV4T2YoMSwgMikgIT0gLTEpKSB7XG4gICAgQXJyYXkucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiBpbmRleE9mKHNvdWdodCAvKiwgZnJvbUluZGV4ICovICkge1xuICAgICAgICB2YXIgc2VsZiA9IHNwbGl0U3RyaW5nICYmIF90b1N0cmluZyh0aGlzKSA9PSBcIltvYmplY3QgU3RyaW5nXVwiID9cbiAgICAgICAgICAgICAgICB0aGlzLnNwbGl0KFwiXCIpIDpcbiAgICAgICAgICAgICAgICB0b09iamVjdCh0aGlzKSxcbiAgICAgICAgICAgIGxlbmd0aCA9IHNlbGYubGVuZ3RoID4+PiAwO1xuXG4gICAgICAgIGlmICghbGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgaSA9IHRvSW50ZWdlcihhcmd1bWVudHNbMV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaGFuZGxlIG5lZ2F0aXZlIGluZGljZXNcbiAgICAgICAgaSA9IGkgPj0gMCA/IGkgOiBNYXRoLm1heCgwLCBsZW5ndGggKyBpKTtcbiAgICAgICAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgaW4gc2VsZiAmJiBzZWxmW2ldID09PSBzb3VnaHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfTtcbn1cblxuLy8gRVM1IDE1LjQuNC4xNVxuLy8gaHR0cDovL2VzNS5naXRodWIuY29tLyN4MTUuNC40LjE1XG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9sYXN0SW5kZXhPZlxuaWYgKCFBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2YgfHwgKFswLCAxXS5sYXN0SW5kZXhPZigwLCAtMykgIT0gLTEpKSB7XG4gICAgQXJyYXkucHJvdG90eXBlLmxhc3RJbmRleE9mID0gZnVuY3Rpb24gbGFzdEluZGV4T2Yoc291Z2h0IC8qLCBmcm9tSW5kZXggKi8pIHtcbiAgICAgICAgdmFyIHNlbGYgPSBzcGxpdFN0cmluZyAmJiBfdG9TdHJpbmcodGhpcykgPT0gXCJbb2JqZWN0IFN0cmluZ11cIiA/XG4gICAgICAgICAgICAgICAgdGhpcy5zcGxpdChcIlwiKSA6XG4gICAgICAgICAgICAgICAgdG9PYmplY3QodGhpcyksXG4gICAgICAgICAgICBsZW5ndGggPSBzZWxmLmxlbmd0aCA+Pj4gMDtcblxuICAgICAgICBpZiAoIWxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpID0gbGVuZ3RoIC0gMTtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBpID0gTWF0aC5taW4oaSwgdG9JbnRlZ2VyKGFyZ3VtZW50c1sxXSkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGhhbmRsZSBuZWdhdGl2ZSBpbmRpY2VzXG4gICAgICAgIGkgPSBpID49IDAgPyBpIDogbGVuZ3RoIC0gTWF0aC5hYnMoaSk7XG4gICAgICAgIGZvciAoOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgaWYgKGkgaW4gc2VsZiAmJiBzb3VnaHQgPT09IHNlbGZbaV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfTtcbn1cblxuLy9cbi8vIE9iamVjdFxuLy8gPT09PT09XG4vL1xuXG4vLyBFUzUgMTUuMi4zLjE0XG4vLyBodHRwOi8vZXM1LmdpdGh1Yi5jb20vI3gxNS4yLjMuMTRcbmlmICghT2JqZWN0LmtleXMpIHtcbiAgICAvLyBodHRwOi8vd2hhdHRoZWhlYWRzYWlkLmNvbS8yMDEwLzEwL2Etc2FmZXItb2JqZWN0LWtleXMtY29tcGF0aWJpbGl0eS1pbXBsZW1lbnRhdGlvblxuICAgIHZhciBoYXNEb250RW51bUJ1ZyA9IHRydWUsXG4gICAgICAgIGRvbnRFbnVtcyA9IFtcbiAgICAgICAgICAgIFwidG9TdHJpbmdcIixcbiAgICAgICAgICAgIFwidG9Mb2NhbGVTdHJpbmdcIixcbiAgICAgICAgICAgIFwidmFsdWVPZlwiLFxuICAgICAgICAgICAgXCJoYXNPd25Qcm9wZXJ0eVwiLFxuICAgICAgICAgICAgXCJpc1Byb3RvdHlwZU9mXCIsXG4gICAgICAgICAgICBcInByb3BlcnR5SXNFbnVtZXJhYmxlXCIsXG4gICAgICAgICAgICBcImNvbnN0cnVjdG9yXCJcbiAgICAgICAgXSxcbiAgICAgICAgZG9udEVudW1zTGVuZ3RoID0gZG9udEVudW1zLmxlbmd0aDtcblxuICAgIGZvciAodmFyIGtleSBpbiB7XCJ0b1N0cmluZ1wiOiBudWxsfSkge1xuICAgICAgICBoYXNEb250RW51bUJ1ZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIE9iamVjdC5rZXlzID0gZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAodHlwZW9mIG9iamVjdCAhPSBcIm9iamVjdFwiICYmIHR5cGVvZiBvYmplY3QgIT0gXCJmdW5jdGlvblwiKSB8fFxuICAgICAgICAgICAgb2JqZWN0ID09PSBudWxsXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdC5rZXlzIGNhbGxlZCBvbiBhIG5vbi1vYmplY3RcIik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIga2V5cyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIG9iamVjdCkge1xuICAgICAgICAgICAgaWYgKG93bnMob2JqZWN0LCBuYW1lKSkge1xuICAgICAgICAgICAgICAgIGtleXMucHVzaChuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNEb250RW51bUJ1Zykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGlpID0gZG9udEVudW1zTGVuZ3RoOyBpIDwgaWk7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBkb250RW51bSA9IGRvbnRFbnVtc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAob3ducyhvYmplY3QsIGRvbnRFbnVtKSkge1xuICAgICAgICAgICAgICAgICAgICBrZXlzLnB1c2goZG9udEVudW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ga2V5cztcbiAgICB9O1xuXG59XG5cbi8vXG4vLyBEYXRlXG4vLyA9PT09XG4vL1xuXG4vLyBFUzUgMTUuOS41LjQzXG4vLyBodHRwOi8vZXM1LmdpdGh1Yi5jb20vI3gxNS45LjUuNDNcbi8vIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBhIFN0cmluZyB2YWx1ZSByZXByZXNlbnQgdGhlIGluc3RhbmNlIGluIHRpbWVcbi8vIHJlcHJlc2VudGVkIGJ5IHRoaXMgRGF0ZSBvYmplY3QuIFRoZSBmb3JtYXQgb2YgdGhlIFN0cmluZyBpcyB0aGUgRGF0ZSBUaW1lXG4vLyBzdHJpbmcgZm9ybWF0IGRlZmluZWQgaW4gMTUuOS4xLjE1LiBBbGwgZmllbGRzIGFyZSBwcmVzZW50IGluIHRoZSBTdHJpbmcuXG4vLyBUaGUgdGltZSB6b25lIGlzIGFsd2F5cyBVVEMsIGRlbm90ZWQgYnkgdGhlIHN1ZmZpeCBaLiBJZiB0aGUgdGltZSB2YWx1ZSBvZlxuLy8gdGhpcyBvYmplY3QgaXMgbm90IGEgZmluaXRlIE51bWJlciBhIFJhbmdlRXJyb3IgZXhjZXB0aW9uIGlzIHRocm93bi5cbnZhciBuZWdhdGl2ZURhdGUgPSAtNjIxOTg3NTUyMDAwMDAsXG4gICAgbmVnYXRpdmVZZWFyU3RyaW5nID0gXCItMDAwMDAxXCI7XG5pZiAoXG4gICAgIURhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nIHx8XG4gICAgKG5ldyBEYXRlKG5lZ2F0aXZlRGF0ZSkudG9JU09TdHJpbmcoKS5pbmRleE9mKG5lZ2F0aXZlWWVhclN0cmluZykgPT09IC0xKVxuKSB7XG4gICAgRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmcgPSBmdW5jdGlvbiB0b0lTT1N0cmluZygpIHtcbiAgICAgICAgdmFyIHJlc3VsdCwgbGVuZ3RoLCB2YWx1ZSwgeWVhciwgbW9udGg7XG4gICAgICAgIGlmICghaXNGaW5pdGUodGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmcgY2FsbGVkIG9uIG5vbi1maW5pdGUgdmFsdWUuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgeWVhciA9IHRoaXMuZ2V0VVRDRnVsbFllYXIoKTtcblxuICAgICAgICBtb250aCA9IHRoaXMuZ2V0VVRDTW9udGgoKTtcbiAgICAgICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9rcmlza293YWwvZXM1LXNoaW0vaXNzdWVzLzExMVxuICAgICAgICB5ZWFyICs9IE1hdGguZmxvb3IobW9udGggLyAxMik7XG4gICAgICAgIG1vbnRoID0gKG1vbnRoICUgMTIgKyAxMikgJSAxMjtcblxuICAgICAgICAvLyB0aGUgZGF0ZSB0aW1lIHN0cmluZyBmb3JtYXQgaXMgc3BlY2lmaWVkIGluIDE1LjkuMS4xNS5cbiAgICAgICAgcmVzdWx0ID0gW21vbnRoICsgMSwgdGhpcy5nZXRVVENEYXRlKCksXG4gICAgICAgICAgICB0aGlzLmdldFVUQ0hvdXJzKCksIHRoaXMuZ2V0VVRDTWludXRlcygpLCB0aGlzLmdldFVUQ1NlY29uZHMoKV07XG4gICAgICAgIHllYXIgPSAoXG4gICAgICAgICAgICAoeWVhciA8IDAgPyBcIi1cIiA6ICh5ZWFyID4gOTk5OSA/IFwiK1wiIDogXCJcIikpICtcbiAgICAgICAgICAgIChcIjAwMDAwXCIgKyBNYXRoLmFicyh5ZWFyKSlcbiAgICAgICAgICAgIC5zbGljZSgwIDw9IHllYXIgJiYgeWVhciA8PSA5OTk5ID8gLTQgOiAtNilcbiAgICAgICAgKTtcblxuICAgICAgICBsZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuICAgICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgICAgIHZhbHVlID0gcmVzdWx0W2xlbmd0aF07XG4gICAgICAgICAgICAvLyBwYWQgbW9udGhzLCBkYXlzLCBob3VycywgbWludXRlcywgYW5kIHNlY29uZHMgdG8gaGF2ZSB0d29cbiAgICAgICAgICAgIC8vIGRpZ2l0cy5cbiAgICAgICAgICAgIGlmICh2YWx1ZSA8IDEwKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W2xlbmd0aF0gPSBcIjBcIiArIHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHBhZCBtaWxsaXNlY29uZHMgdG8gaGF2ZSB0aHJlZSBkaWdpdHMuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB5ZWFyICsgXCItXCIgKyByZXN1bHQuc2xpY2UoMCwgMikuam9pbihcIi1cIikgK1xuICAgICAgICAgICAgXCJUXCIgKyByZXN1bHQuc2xpY2UoMikuam9pbihcIjpcIikgKyBcIi5cIiArXG4gICAgICAgICAgICAoXCIwMDBcIiArIHRoaXMuZ2V0VVRDTWlsbGlzZWNvbmRzKCkpLnNsaWNlKC0zKSArIFwiWlwiXG4gICAgICAgICk7XG4gICAgfTtcbn1cblxuXG4vLyBFUzUgMTUuOS41LjQ0XG4vLyBodHRwOi8vZXM1LmdpdGh1Yi5jb20vI3gxNS45LjUuNDRcbi8vIFRoaXMgZnVuY3Rpb24gcHJvdmlkZXMgYSBTdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBEYXRlIG9iamVjdCBmb3IgdXNlIGJ5XG4vLyBKU09OLnN0cmluZ2lmeSAoMTUuMTIuMykuXG52YXIgZGF0ZVRvSlNPTklzU3VwcG9ydGVkID0gZmFsc2U7XG50cnkge1xuICAgIGRhdGVUb0pTT05Jc1N1cHBvcnRlZCA9IChcbiAgICAgICAgRGF0ZS5wcm90b3R5cGUudG9KU09OICYmXG4gICAgICAgIG5ldyBEYXRlKE5hTikudG9KU09OKCkgPT09IG51bGwgJiZcbiAgICAgICAgbmV3IERhdGUobmVnYXRpdmVEYXRlKS50b0pTT04oKS5pbmRleE9mKG5lZ2F0aXZlWWVhclN0cmluZykgIT09IC0xICYmXG4gICAgICAgIERhdGUucHJvdG90eXBlLnRvSlNPTi5jYWxsKHsgLy8gZ2VuZXJpY1xuICAgICAgICAgICAgdG9JU09TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICApO1xufSBjYXRjaCAoZSkge1xufVxuaWYgKCFkYXRlVG9KU09OSXNTdXBwb3J0ZWQpIHtcbiAgICBEYXRlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oa2V5KSB7XG4gICAgICAgIC8vIFdoZW4gdGhlIHRvSlNPTiBtZXRob2QgaXMgY2FsbGVkIHdpdGggYXJndW1lbnQga2V5LCB0aGUgZm9sbG93aW5nXG4gICAgICAgIC8vIHN0ZXBzIGFyZSB0YWtlbjpcblxuICAgICAgICAvLyAxLiAgTGV0IE8gYmUgdGhlIHJlc3VsdCBvZiBjYWxsaW5nIFRvT2JqZWN0LCBnaXZpbmcgaXQgdGhlIHRoaXNcbiAgICAgICAgLy8gdmFsdWUgYXMgaXRzIGFyZ3VtZW50LlxuICAgICAgICAvLyAyLiBMZXQgdHYgYmUgdG9QcmltaXRpdmUoTywgaGludCBOdW1iZXIpLlxuICAgICAgICB2YXIgbyA9IE9iamVjdCh0aGlzKSxcbiAgICAgICAgICAgIHR2ID0gdG9QcmltaXRpdmUobyksXG4gICAgICAgICAgICB0b0lTTztcbiAgICAgICAgLy8gMy4gSWYgdHYgaXMgYSBOdW1iZXIgYW5kIGlzIG5vdCBmaW5pdGUsIHJldHVybiBudWxsLlxuICAgICAgICBpZiAodHlwZW9mIHR2ID09PSBcIm51bWJlclwiICYmICFpc0Zpbml0ZSh0dikpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8vIDQuIExldCB0b0lTTyBiZSB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgdGhlIFtbR2V0XV0gaW50ZXJuYWwgbWV0aG9kIG9mXG4gICAgICAgIC8vIE8gd2l0aCBhcmd1bWVudCBcInRvSVNPU3RyaW5nXCIuXG4gICAgICAgIHRvSVNPID0gby50b0lTT1N0cmluZztcbiAgICAgICAgLy8gNS4gSWYgSXNDYWxsYWJsZSh0b0lTTykgaXMgZmFsc2UsIHRocm93IGEgVHlwZUVycm9yIGV4Y2VwdGlvbi5cbiAgICAgICAgaWYgKHR5cGVvZiB0b0lTTyAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJ0b0lTT1N0cmluZyBwcm9wZXJ0eSBpcyBub3QgY2FsbGFibGVcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNi4gUmV0dXJuIHRoZSByZXN1bHQgb2YgY2FsbGluZyB0aGUgW1tDYWxsXV0gaW50ZXJuYWwgbWV0aG9kIG9mXG4gICAgICAgIC8vICB0b0lTTyB3aXRoIE8gYXMgdGhlIHRoaXMgdmFsdWUgYW5kIGFuIGVtcHR5IGFyZ3VtZW50IGxpc3QuXG4gICAgICAgIHJldHVybiB0b0lTTy5jYWxsKG8pO1xuXG4gICAgICAgIC8vIE5PVEUgMSBUaGUgYXJndW1lbnQgaXMgaWdub3JlZC5cblxuICAgICAgICAvLyBOT1RFIDIgVGhlIHRvSlNPTiBmdW5jdGlvbiBpcyBpbnRlbnRpb25hbGx5IGdlbmVyaWM7IGl0IGRvZXMgbm90XG4gICAgICAgIC8vIHJlcXVpcmUgdGhhdCBpdHMgdGhpcyB2YWx1ZSBiZSBhIERhdGUgb2JqZWN0LiBUaGVyZWZvcmUsIGl0IGNhbiBiZVxuICAgICAgICAvLyB0cmFuc2ZlcnJlZCB0byBvdGhlciBraW5kcyBvZiBvYmplY3RzIGZvciB1c2UgYXMgYSBtZXRob2QuIEhvd2V2ZXIsXG4gICAgICAgIC8vIGl0IGRvZXMgcmVxdWlyZSB0aGF0IGFueSBzdWNoIG9iamVjdCBoYXZlIGEgdG9JU09TdHJpbmcgbWV0aG9kLiBBblxuICAgICAgICAvLyBvYmplY3QgaXMgZnJlZSB0byB1c2UgdGhlIGFyZ3VtZW50IGtleSB0byBmaWx0ZXIgaXRzXG4gICAgICAgIC8vIHN0cmluZ2lmaWNhdGlvbi5cbiAgICB9O1xufVxuXG4vLyBFUzUgMTUuOS40LjJcbi8vIGh0dHA6Ly9lczUuZ2l0aHViLmNvbS8jeDE1LjkuNC4yXG4vLyBiYXNlZCBvbiB3b3JrIHNoYXJlZCBieSBEYW5pZWwgRnJpZXNlbiAoZGFudG1hbilcbi8vIGh0dHA6Ly9naXN0LmdpdGh1Yi5jb20vMzAzMjQ5XG5pZiAoIURhdGUucGFyc2UgfHwgXCJEYXRlLnBhcnNlIGlzIGJ1Z2d5XCIpIHtcbiAgICAvLyBYWFggZ2xvYmFsIGFzc2lnbm1lbnQgd29uJ3Qgd29yayBpbiBlbWJlZGRpbmdzIHRoYXQgdXNlXG4gICAgLy8gYW4gYWx0ZXJuYXRlIG9iamVjdCBmb3IgdGhlIGNvbnRleHQuXG4gICAgRGF0ZSA9IChmdW5jdGlvbihOYXRpdmVEYXRlKSB7XG5cbiAgICAgICAgLy8gRGF0ZS5sZW5ndGggPT09IDdcbiAgICAgICAgZnVuY3Rpb24gRGF0ZShZLCBNLCBELCBoLCBtLCBzLCBtcykge1xuICAgICAgICAgICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIE5hdGl2ZURhdGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0ZSA9IGxlbmd0aCA9PSAxICYmIFN0cmluZyhZKSA9PT0gWSA/IC8vIGlzU3RyaW5nKFkpXG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIGV4cGxpY2l0bHkgcGFzcyBpdCB0aHJvdWdoIHBhcnNlOlxuICAgICAgICAgICAgICAgICAgICBuZXcgTmF0aXZlRGF0ZShEYXRlLnBhcnNlKFkpKSA6XG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIGhhdmUgdG8gbWFudWFsbHkgbWFrZSBjYWxscyBkZXBlbmRpbmcgb24gYXJndW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLy8gbGVuZ3RoIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3RoID49IDcgPyBuZXcgTmF0aXZlRGF0ZShZLCBNLCBELCBoLCBtLCBzLCBtcykgOlxuICAgICAgICAgICAgICAgICAgICBsZW5ndGggPj0gNiA/IG5ldyBOYXRpdmVEYXRlKFksIE0sIEQsIGgsIG0sIHMpIDpcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3RoID49IDUgPyBuZXcgTmF0aXZlRGF0ZShZLCBNLCBELCBoLCBtKSA6XG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aCA+PSA0ID8gbmV3IE5hdGl2ZURhdGUoWSwgTSwgRCwgaCkgOlxuICAgICAgICAgICAgICAgICAgICBsZW5ndGggPj0gMyA/IG5ldyBOYXRpdmVEYXRlKFksIE0sIEQpIDpcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3RoID49IDIgPyBuZXcgTmF0aXZlRGF0ZShZLCBNKSA6XG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aCA+PSAxID8gbmV3IE5hdGl2ZURhdGUoWSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOYXRpdmVEYXRlKCk7XG4gICAgICAgICAgICAgICAgLy8gUHJldmVudCBtaXh1cHMgd2l0aCB1bmZpeGVkIERhdGUgb2JqZWN0XG4gICAgICAgICAgICAgICAgZGF0ZS5jb25zdHJ1Y3RvciA9IERhdGU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gTmF0aXZlRGF0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIDE1LjkuMS4xNSBEYXRlIFRpbWUgU3RyaW5nIEZvcm1hdC5cbiAgICAgICAgdmFyIGlzb0RhdGVFeHByZXNzaW9uID0gbmV3IFJlZ0V4cChcIl5cIiArXG4gICAgICAgICAgICBcIihcXFxcZHs0fXxbXFwrXFwtXVxcXFxkezZ9KVwiICsgLy8gZm91ci1kaWdpdCB5ZWFyIGNhcHR1cmUgb3Igc2lnbiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDYtZGlnaXQgZXh0ZW5kZWQgeWVhclxuICAgICAgICAgICAgXCIoPzotKFxcXFxkezJ9KVwiICsgLy8gb3B0aW9uYWwgbW9udGggY2FwdHVyZVxuICAgICAgICAgICAgXCIoPzotKFxcXFxkezJ9KVwiICsgLy8gb3B0aW9uYWwgZGF5IGNhcHR1cmVcbiAgICAgICAgICAgIFwiKD86XCIgKyAvLyBjYXB0dXJlIGhvdXJzOm1pbnV0ZXM6c2Vjb25kcy5taWxsaXNlY29uZHNcbiAgICAgICAgICAgICAgICBcIlQoXFxcXGR7Mn0pXCIgKyAvLyBob3VycyBjYXB0dXJlXG4gICAgICAgICAgICAgICAgXCI6KFxcXFxkezJ9KVwiICsgLy8gbWludXRlcyBjYXB0dXJlXG4gICAgICAgICAgICAgICAgXCIoPzpcIiArIC8vIG9wdGlvbmFsIDpzZWNvbmRzLm1pbGxpc2Vjb25kc1xuICAgICAgICAgICAgICAgICAgICBcIjooXFxcXGR7Mn0pXCIgKyAvLyBzZWNvbmRzIGNhcHR1cmVcbiAgICAgICAgICAgICAgICAgICAgXCIoPzooXFxcXC5cXFxcZHsxLH0pKT9cIiArIC8vIG1pbGxpc2Vjb25kcyBjYXB0dXJlXG4gICAgICAgICAgICAgICAgXCIpP1wiICtcbiAgICAgICAgICAgIFwiKFwiICsgLy8gY2FwdHVyZSBVVEMgb2Zmc2V0IGNvbXBvbmVudFxuICAgICAgICAgICAgICAgIFwiWnxcIiArIC8vIFVUQyBjYXB0dXJlXG4gICAgICAgICAgICAgICAgXCIoPzpcIiArIC8vIG9mZnNldCBzcGVjaWZpZXIgKy8taG91cnM6bWludXRlc1xuICAgICAgICAgICAgICAgICAgICBcIihbLStdKVwiICsgLy8gc2lnbiBjYXB0dXJlXG4gICAgICAgICAgICAgICAgICAgIFwiKFxcXFxkezJ9KVwiICsgLy8gaG91cnMgb2Zmc2V0IGNhcHR1cmVcbiAgICAgICAgICAgICAgICAgICAgXCI6KFxcXFxkezJ9KVwiICsgLy8gbWludXRlcyBvZmZzZXQgY2FwdHVyZVxuICAgICAgICAgICAgICAgIFwiKVwiICtcbiAgICAgICAgICAgIFwiKT8pPyk/KT9cIiArXG4gICAgICAgIFwiJFwiKTtcblxuICAgICAgICB2YXIgbW9udGhzID0gW1xuICAgICAgICAgICAgMCwgMzEsIDU5LCA5MCwgMTIwLCAxNTEsIDE4MSwgMjEyLCAyNDMsIDI3MywgMzA0LCAzMzQsIDM2NVxuICAgICAgICBdO1xuXG4gICAgICAgIGZ1bmN0aW9uIGRheUZyb21Nb250aCh5ZWFyLCBtb250aCkge1xuICAgICAgICAgICAgdmFyIHQgPSBtb250aCA+IDEgPyAxIDogMDtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgbW9udGhzW21vbnRoXSArXG4gICAgICAgICAgICAgICAgTWF0aC5mbG9vcigoeWVhciAtIDE5NjkgKyB0KSAvIDQpIC1cbiAgICAgICAgICAgICAgICBNYXRoLmZsb29yKCh5ZWFyIC0gMTkwMSArIHQpIC8gMTAwKSArXG4gICAgICAgICAgICAgICAgTWF0aC5mbG9vcigoeWVhciAtIDE2MDEgKyB0KSAvIDQwMCkgK1xuICAgICAgICAgICAgICAgIDM2NSAqICh5ZWFyIC0gMTk3MClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDb3B5IGFueSBjdXN0b20gbWV0aG9kcyBhIDNyZCBwYXJ0eSBsaWJyYXJ5IG1heSBoYXZlIGFkZGVkXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBOYXRpdmVEYXRlKSB7XG4gICAgICAgICAgICBEYXRlW2tleV0gPSBOYXRpdmVEYXRlW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDb3B5IFwibmF0aXZlXCIgbWV0aG9kcyBleHBsaWNpdGx5OyB0aGV5IG1heSBiZSBub24tZW51bWVyYWJsZVxuICAgICAgICBEYXRlLm5vdyA9IE5hdGl2ZURhdGUubm93O1xuICAgICAgICBEYXRlLlVUQyA9IE5hdGl2ZURhdGUuVVRDO1xuICAgICAgICBEYXRlLnByb3RvdHlwZSA9IE5hdGl2ZURhdGUucHJvdG90eXBlO1xuICAgICAgICBEYXRlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IERhdGU7XG5cbiAgICAgICAgLy8gVXBncmFkZSBEYXRlLnBhcnNlIHRvIGhhbmRsZSBzaW1wbGlmaWVkIElTTyA4NjAxIHN0cmluZ3NcbiAgICAgICAgRGF0ZS5wYXJzZSA9IGZ1bmN0aW9uIHBhcnNlKHN0cmluZykge1xuICAgICAgICAgICAgdmFyIG1hdGNoID0gaXNvRGF0ZUV4cHJlc3Npb24uZXhlYyhzdHJpbmcpO1xuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgLy8gcGFyc2UgbW9udGhzLCBkYXlzLCBob3VycywgbWludXRlcywgc2Vjb25kcywgYW5kIG1pbGxpc2Vjb25kc1xuICAgICAgICAgICAgICAgIC8vIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgaWYgbmVjZXNzYXJ5XG4gICAgICAgICAgICAgICAgLy8gcGFyc2UgdGhlIFVUQyBvZmZzZXQgY29tcG9uZW50XG4gICAgICAgICAgICAgICAgdmFyIHllYXIgPSBOdW1iZXIobWF0Y2hbMV0pLFxuICAgICAgICAgICAgICAgICAgICBtb250aCA9IE51bWJlcihtYXRjaFsyXSB8fCAxKSAtIDEsXG4gICAgICAgICAgICAgICAgICAgIGRheSA9IE51bWJlcihtYXRjaFszXSB8fCAxKSAtIDEsXG4gICAgICAgICAgICAgICAgICAgIGhvdXIgPSBOdW1iZXIobWF0Y2hbNF0gfHwgMCksXG4gICAgICAgICAgICAgICAgICAgIG1pbnV0ZSA9IE51bWJlcihtYXRjaFs1XSB8fCAwKSxcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kID0gTnVtYmVyKG1hdGNoWzZdIHx8IDApLFxuICAgICAgICAgICAgICAgICAgICBtaWxsaXNlY29uZCA9IE1hdGguZmxvb3IoTnVtYmVyKG1hdGNoWzddIHx8IDApICogMTAwMCksXG4gICAgICAgICAgICAgICAgICAgIC8vIFdoZW4gdGltZSB6b25lIGlzIG1pc3NlZCwgbG9jYWwgb2Zmc2V0IHNob3VsZCBiZSB1c2VkXG4gICAgICAgICAgICAgICAgICAgIC8vIChFUyA1LjEgYnVnKVxuICAgICAgICAgICAgICAgICAgICAvLyBzZWUgaHR0cHM6Ly9idWdzLmVjbWFzY3JpcHQub3JnL3Nob3dfYnVnLmNnaT9pZD0xMTJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gIW1hdGNoWzRdIHx8IG1hdGNoWzhdID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDAgOiBOdW1iZXIobmV3IE5hdGl2ZURhdGUoMTk3MCwgMCkpLFxuICAgICAgICAgICAgICAgICAgICBzaWduT2Zmc2V0ID0gbWF0Y2hbOV0gPT09IFwiLVwiID8gMSA6IC0xLFxuICAgICAgICAgICAgICAgICAgICBob3VyT2Zmc2V0ID0gTnVtYmVyKG1hdGNoWzEwXSB8fCAwKSxcbiAgICAgICAgICAgICAgICAgICAgbWludXRlT2Zmc2V0ID0gTnVtYmVyKG1hdGNoWzExXSB8fCAwKSxcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0O1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgaG91ciA8IChcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbnV0ZSA+IDAgfHwgc2Vjb25kID4gMCB8fCBtaWxsaXNlY29uZCA+IDAgP1xuICAgICAgICAgICAgICAgICAgICAgICAgMjQgOiAyNVxuICAgICAgICAgICAgICAgICAgICApICYmXG4gICAgICAgICAgICAgICAgICAgIG1pbnV0ZSA8IDYwICYmIHNlY29uZCA8IDYwICYmIG1pbGxpc2Vjb25kIDwgMTAwMCAmJlxuICAgICAgICAgICAgICAgICAgICBtb250aCA+IC0xICYmIG1vbnRoIDwgMTIgJiYgaG91ck9mZnNldCA8IDI0ICYmXG4gICAgICAgICAgICAgICAgICAgIG1pbnV0ZU9mZnNldCA8IDYwICYmIC8vIGRldGVjdCBpbnZhbGlkIG9mZnNldHNcbiAgICAgICAgICAgICAgICAgICAgZGF5ID4gLTEgJiZcbiAgICAgICAgICAgICAgICAgICAgZGF5IDwgKFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF5RnJvbU1vbnRoKHllYXIsIG1vbnRoICsgMSkgLVxuICAgICAgICAgICAgICAgICAgICAgICAgZGF5RnJvbU1vbnRoKHllYXIsIG1vbnRoKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IChcbiAgICAgICAgICAgICAgICAgICAgICAgIChkYXlGcm9tTW9udGgoeWVhciwgbW9udGgpICsgZGF5KSAqIDI0ICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdXIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgaG91ck9mZnNldCAqIHNpZ25PZmZzZXRcbiAgICAgICAgICAgICAgICAgICAgKSAqIDYwO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAoXG4gICAgICAgICAgICAgICAgICAgICAgICAocmVzdWx0ICsgbWludXRlICsgbWludXRlT2Zmc2V0ICogc2lnbk9mZnNldCkgKiA2MCArXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRcbiAgICAgICAgICAgICAgICAgICAgKSAqIDEwMDAgKyBtaWxsaXNlY29uZCArIG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKC04LjY0ZTE1IDw9IHJlc3VsdCAmJiByZXN1bHQgPD0gOC42NGUxNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIE5hdGl2ZURhdGUucGFyc2UuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gRGF0ZTtcbiAgICB9KShEYXRlKTtcbn1cblxuLy8gRVM1IDE1LjkuNC40XG4vLyBodHRwOi8vZXM1LmdpdGh1Yi5jb20vI3gxNS45LjQuNFxuaWYgKCFEYXRlLm5vdykge1xuICAgIERhdGUubm93ID0gZnVuY3Rpb24gbm93KCkge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgfTtcbn1cblxuXG4vL1xuLy8gTnVtYmVyXG4vLyA9PT09PT1cbi8vXG5cbi8vIEVTNS4xIDE1LjcuNC41XG4vLyBodHRwOi8vZXM1LmdpdGh1Yi5jb20vI3gxNS43LjQuNVxuaWYgKCFOdW1iZXIucHJvdG90eXBlLnRvRml4ZWQgfHwgKDAuMDAwMDgpLnRvRml4ZWQoMykgIT09ICcwLjAwMCcgfHwgKDAuOSkudG9GaXhlZCgwKSA9PT0gJzAnIHx8ICgxLjI1NSkudG9GaXhlZCgyKSAhPT0gJzEuMjUnIHx8ICgxMDAwMDAwMDAwMDAwMDAwMTI4KS50b0ZpeGVkKDApICE9PSBcIjEwMDAwMDAwMDAwMDAwMDAxMjhcIikge1xuICAgIC8vIEhpZGUgdGhlc2UgdmFyaWFibGVzIGFuZCBmdW5jdGlvbnNcbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYmFzZSwgc2l6ZSwgZGF0YSwgaTtcblxuICAgICAgICBiYXNlID0gMWU3O1xuICAgICAgICBzaXplID0gNjtcbiAgICAgICAgZGF0YSA9IFswLCAwLCAwLCAwLCAwLCAwXTtcblxuICAgICAgICBmdW5jdGlvbiBtdWx0aXBseShuLCBjKSB7XG4gICAgICAgICAgICB2YXIgaSA9IC0xO1xuICAgICAgICAgICAgd2hpbGUgKCsraSA8IHNpemUpIHtcbiAgICAgICAgICAgICAgICBjICs9IG4gKiBkYXRhW2ldO1xuICAgICAgICAgICAgICAgIGRhdGFbaV0gPSBjICUgYmFzZTtcbiAgICAgICAgICAgICAgICBjID0gTWF0aC5mbG9vcihjIC8gYmFzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBkaXZpZGUobikge1xuICAgICAgICAgICAgdmFyIGkgPSBzaXplLCBjID0gMDtcbiAgICAgICAgICAgIHdoaWxlICgtLWkgPj0gMCkge1xuICAgICAgICAgICAgICAgIGMgKz0gZGF0YVtpXTtcbiAgICAgICAgICAgICAgICBkYXRhW2ldID0gTWF0aC5mbG9vcihjIC8gbik7XG4gICAgICAgICAgICAgICAgYyA9IChjICUgbikgKiBiYXNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IHNpemU7XG4gICAgICAgICAgICB2YXIgcyA9ICcnO1xuICAgICAgICAgICAgd2hpbGUgKC0taSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHMgIT09ICcnIHx8IGkgPT09IDAgfHwgZGF0YVtpXSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IFN0cmluZyhkYXRhW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzID0gdDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gJzAwMDAwMDAnLnNsaWNlKDAsIDcgLSB0Lmxlbmd0aCkgKyB0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHM7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBwb3coeCwgbiwgYWNjKSB7XG4gICAgICAgICAgICByZXR1cm4gKG4gPT09IDAgPyBhY2MgOiAobiAlIDIgPT09IDEgPyBwb3coeCwgbiAtIDEsIGFjYyAqIHgpIDogcG93KHggKiB4LCBuIC8gMiwgYWNjKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbG9nKHgpIHtcbiAgICAgICAgICAgIHZhciBuID0gMDtcbiAgICAgICAgICAgIHdoaWxlICh4ID49IDQwOTYpIHtcbiAgICAgICAgICAgICAgICBuICs9IDEyO1xuICAgICAgICAgICAgICAgIHggLz0gNDA5NjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlICh4ID49IDIpIHtcbiAgICAgICAgICAgICAgICBuICs9IDE7XG4gICAgICAgICAgICAgICAgeCAvPSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG47XG4gICAgICAgIH1cblxuICAgICAgICBOdW1iZXIucHJvdG90eXBlLnRvRml4ZWQgPSBmdW5jdGlvbiAoZnJhY3Rpb25EaWdpdHMpIHtcbiAgICAgICAgICAgIHZhciBmLCB4LCBzLCBtLCBlLCB6LCBqLCBrO1xuXG4gICAgICAgICAgICAvLyBUZXN0IGZvciBOYU4gYW5kIHJvdW5kIGZyYWN0aW9uRGlnaXRzIGRvd25cbiAgICAgICAgICAgIGYgPSBOdW1iZXIoZnJhY3Rpb25EaWdpdHMpO1xuICAgICAgICAgICAgZiA9IGYgIT09IGYgPyAwIDogTWF0aC5mbG9vcihmKTtcblxuICAgICAgICAgICAgaWYgKGYgPCAwIHx8IGYgPiAyMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiTnVtYmVyLnRvRml4ZWQgY2FsbGVkIHdpdGggaW52YWxpZCBudW1iZXIgb2YgZGVjaW1hbHNcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHggPSBOdW1iZXIodGhpcyk7XG5cbiAgICAgICAgICAgIC8vIFRlc3QgZm9yIE5hTlxuICAgICAgICAgICAgaWYgKHggIT09IHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJOYU5cIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSWYgaXQgaXMgdG9vIGJpZyBvciBzbWFsbCwgcmV0dXJuIHRoZSBzdHJpbmcgdmFsdWUgb2YgdGhlIG51bWJlclxuICAgICAgICAgICAgaWYgKHggPD0gLTFlMjEgfHwgeCA+PSAxZTIxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZyh4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcyA9IFwiXCI7XG5cbiAgICAgICAgICAgIGlmICh4IDwgMCkge1xuICAgICAgICAgICAgICAgIHMgPSBcIi1cIjtcbiAgICAgICAgICAgICAgICB4ID0gLXg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG0gPSBcIjBcIjtcblxuICAgICAgICAgICAgaWYgKHggPiAxZS0yMSkge1xuICAgICAgICAgICAgICAgIC8vIDFlLTIxIDwgeCA8IDFlMjFcbiAgICAgICAgICAgICAgICAvLyAtNzAgPCBsb2cyKHgpIDwgNzBcbiAgICAgICAgICAgICAgICBlID0gbG9nKHggKiBwb3coMiwgNjksIDEpKSAtIDY5O1xuICAgICAgICAgICAgICAgIHogPSAoZSA8IDAgPyB4ICogcG93KDIsIC1lLCAxKSA6IHggLyBwb3coMiwgZSwgMSkpO1xuICAgICAgICAgICAgICAgIHogKj0gMHgxMDAwMDAwMDAwMDAwMDsgLy8gTWF0aC5wb3coMiwgNTIpO1xuICAgICAgICAgICAgICAgIGUgPSA1MiAtIGU7XG5cbiAgICAgICAgICAgICAgICAvLyAtMTggPCBlIDwgMTIyXG4gICAgICAgICAgICAgICAgLy8geCA9IHogLyAyIF4gZVxuICAgICAgICAgICAgICAgIGlmIChlID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBtdWx0aXBseSgwLCB6KTtcbiAgICAgICAgICAgICAgICAgICAgaiA9IGY7XG5cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGogPj0gNykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlwbHkoMWU3LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGogLT0gNztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIG11bHRpcGx5KHBvdygxMCwgaiwgMSksIDApO1xuICAgICAgICAgICAgICAgICAgICBqID0gZSAtIDE7XG5cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGogPj0gMjMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpdmlkZSgxIDw8IDIzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGogLT0gMjM7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBkaXZpZGUoMSA8PCBqKTtcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlwbHkoMSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGRpdmlkZSgyKTtcbiAgICAgICAgICAgICAgICAgICAgbSA9IHRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlwbHkoMCwgeik7XG4gICAgICAgICAgICAgICAgICAgIG11bHRpcGx5KDEgPDwgKC1lKSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIG0gPSB0b1N0cmluZygpICsgJzAuMDAwMDAwMDAwMDAwMDAwMDAwMDAnLnNsaWNlKDIsIDIgKyBmKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChmID4gMCkge1xuICAgICAgICAgICAgICAgIGsgPSBtLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIGlmIChrIDw9IGYpIHtcbiAgICAgICAgICAgICAgICAgICAgbSA9IHMgKyAnMC4wMDAwMDAwMDAwMDAwMDAwMDAwJy5zbGljZSgwLCBmIC0gayArIDIpICsgbTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtID0gcyArIG0uc2xpY2UoMCwgayAtIGYpICsgJy4nICsgbS5zbGljZShrIC0gZik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtID0gcyArIG07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBtO1xuICAgICAgICB9XG4gICAgfSgpKTtcbn1cblxuXG4vL1xuLy8gU3RyaW5nXG4vLyA9PT09PT1cbi8vXG5cblxuLy8gRVM1IDE1LjUuNC4xNFxuLy8gaHR0cDovL2VzNS5naXRodWIuY29tLyN4MTUuNS40LjE0XG4vLyBbYnVnZml4LCBjaHJvbWVdXG4vLyBJZiBzZXBhcmF0b3IgaXMgdW5kZWZpbmVkLCB0aGVuIHRoZSByZXN1bHQgYXJyYXkgY29udGFpbnMganVzdCBvbmUgU3RyaW5nLFxuLy8gd2hpY2ggaXMgdGhlIHRoaXMgdmFsdWUgKGNvbnZlcnRlZCB0byBhIFN0cmluZykuIElmIGxpbWl0IGlzIG5vdCB1bmRlZmluZWQsXG4vLyB0aGVuIHRoZSBvdXRwdXQgYXJyYXkgaXMgdHJ1bmNhdGVkIHNvIHRoYXQgaXQgY29udGFpbnMgbm8gbW9yZSB0aGFuIGxpbWl0XG4vLyBlbGVtZW50cy5cbi8vIFwiMFwiLnNwbGl0KHVuZGVmaW5lZCwgMCkgLT4gW11cbmlmKFwiMFwiLnNwbGl0KHZvaWQgMCwgMCkubGVuZ3RoKSB7XG4gICAgdmFyIHN0cmluZ19zcGxpdCA9IFN0cmluZy5wcm90b3R5cGUuc3BsaXQ7XG4gICAgU3RyaW5nLnByb3RvdHlwZS5zcGxpdCA9IGZ1bmN0aW9uKHNlcGFyYXRvciwgbGltaXQpIHtcbiAgICAgICAgaWYoc2VwYXJhdG9yID09PSB2b2lkIDAgJiYgbGltaXQgPT09IDApcmV0dXJuIFtdO1xuICAgICAgICByZXR1cm4gc3RyaW5nX3NwbGl0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxufVxuXG4vLyBFQ01BLTI2MiwgM3JkIEIuMi4zXG4vLyBOb3RlIGFuIEVDTUFTY3JpcHQgc3RhbmRhcnQsIGFsdGhvdWdoIEVDTUFTY3JpcHQgM3JkIEVkaXRpb24gaGFzIGFcbi8vIG5vbi1ub3JtYXRpdmUgc2VjdGlvbiBzdWdnZXN0aW5nIHVuaWZvcm0gc2VtYW50aWNzIGFuZCBpdCBzaG91bGQgYmVcbi8vIG5vcm1hbGl6ZWQgYWNyb3NzIGFsbCBicm93c2Vyc1xuLy8gW2J1Z2ZpeCwgSUUgbHQgOV0gSUUgPCA5IHN1YnN0cigpIHdpdGggbmVnYXRpdmUgdmFsdWUgbm90IHdvcmtpbmcgaW4gSUVcbmlmKFwiXCIuc3Vic3RyICYmIFwiMGJcIi5zdWJzdHIoLTEpICE9PSBcImJcIikge1xuICAgIHZhciBzdHJpbmdfc3Vic3RyID0gU3RyaW5nLnByb3RvdHlwZS5zdWJzdHI7XG4gICAgLyoqXG4gICAgICogIEdldCB0aGUgc3Vic3RyaW5nIG9mIGEgc3RyaW5nXG4gICAgICogIEBwYXJhbSAge2ludGVnZXJ9ICBzdGFydCAgIHdoZXJlIHRvIHN0YXJ0IHRoZSBzdWJzdHJpbmdcbiAgICAgKiAgQHBhcmFtICB7aW50ZWdlcn0gIGxlbmd0aCAgaG93IG1hbnkgY2hhcmFjdGVycyB0byByZXR1cm5cbiAgICAgKiAgQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuICAgIFN0cmluZy5wcm90b3R5cGUuc3Vic3RyID0gZnVuY3Rpb24oc3RhcnQsIGxlbmd0aCkge1xuICAgICAgICByZXR1cm4gc3RyaW5nX3N1YnN0ci5jYWxsKFxuICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgIHN0YXJ0IDwgMCA/ICgoc3RhcnQgPSB0aGlzLmxlbmd0aCArIHN0YXJ0KSA8IDAgPyAwIDogc3RhcnQpIDogc3RhcnQsXG4gICAgICAgICAgICBsZW5ndGhcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbi8vIEVTNSAxNS41LjQuMjBcbi8vIGh0dHA6Ly9lczUuZ2l0aHViLmNvbS8jeDE1LjUuNC4yMFxudmFyIHdzID0gXCJcXHgwOVxceDBBXFx4MEJcXHgwQ1xceDBEXFx4MjBcXHhBMFxcdTE2ODBcXHUxODBFXFx1MjAwMFxcdTIwMDFcXHUyMDAyXFx1MjAwM1wiICtcbiAgICBcIlxcdTIwMDRcXHUyMDA1XFx1MjAwNlxcdTIwMDdcXHUyMDA4XFx1MjAwOVxcdTIwMEFcXHUyMDJGXFx1MjA1RlxcdTMwMDBcXHUyMDI4XCIgK1xuICAgIFwiXFx1MjAyOVxcdUZFRkZcIjtcbmlmICghU3RyaW5nLnByb3RvdHlwZS50cmltIHx8IHdzLnRyaW0oKSkge1xuICAgIC8vIGh0dHA6Ly9ibG9nLnN0ZXZlbmxldml0aGFuLmNvbS9hcmNoaXZlcy9mYXN0ZXItdHJpbS1qYXZhc2NyaXB0XG4gICAgLy8gaHR0cDovL3BlcmZlY3Rpb25raWxscy5jb20vd2hpdGVzcGFjZS1kZXZpYXRpb25zL1xuICAgIHdzID0gXCJbXCIgKyB3cyArIFwiXVwiO1xuICAgIHZhciB0cmltQmVnaW5SZWdleHAgPSBuZXcgUmVnRXhwKFwiXlwiICsgd3MgKyB3cyArIFwiKlwiKSxcbiAgICAgICAgdHJpbUVuZFJlZ2V4cCA9IG5ldyBSZWdFeHAod3MgKyB3cyArIFwiKiRcIik7XG4gICAgU3RyaW5nLnByb3RvdHlwZS50cmltID0gZnVuY3Rpb24gdHJpbSgpIHtcbiAgICAgICAgaWYgKHRoaXMgPT09IHVuZGVmaW5lZCB8fCB0aGlzID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiY2FuJ3QgY29udmVydCBcIit0aGlzK1wiIHRvIG9iamVjdFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU3RyaW5nKHRoaXMpXG4gICAgICAgICAgICAucmVwbGFjZSh0cmltQmVnaW5SZWdleHAsIFwiXCIpXG4gICAgICAgICAgICAucmVwbGFjZSh0cmltRW5kUmVnZXhwLCBcIlwiKTtcbiAgICB9O1xufVxuXG4vL1xuLy8gVXRpbFxuLy8gPT09PT09XG4vL1xuXG4vLyBFUzUgOS40XG4vLyBodHRwOi8vZXM1LmdpdGh1Yi5jb20vI3g5LjRcbi8vIGh0dHA6Ly9qc3BlcmYuY29tL3RvLWludGVnZXJcblxuZnVuY3Rpb24gdG9JbnRlZ2VyKG4pIHtcbiAgICBuID0gK247XG4gICAgaWYgKG4gIT09IG4pIHsgLy8gaXNOYU5cbiAgICAgICAgbiA9IDA7XG4gICAgfSBlbHNlIGlmIChuICE9PSAwICYmIG4gIT09ICgxLzApICYmIG4gIT09IC0oMS8wKSkge1xuICAgICAgICBuID0gKG4gPiAwIHx8IC0xKSAqIE1hdGguZmxvb3IoTWF0aC5hYnMobikpO1xuICAgIH1cbiAgICByZXR1cm4gbjtcbn1cblxuZnVuY3Rpb24gaXNQcmltaXRpdmUoaW5wdXQpIHtcbiAgICB2YXIgdHlwZSA9IHR5cGVvZiBpbnB1dDtcbiAgICByZXR1cm4gKFxuICAgICAgICBpbnB1dCA9PT0gbnVsbCB8fFxuICAgICAgICB0eXBlID09PSBcInVuZGVmaW5lZFwiIHx8XG4gICAgICAgIHR5cGUgPT09IFwiYm9vbGVhblwiIHx8XG4gICAgICAgIHR5cGUgPT09IFwibnVtYmVyXCIgfHxcbiAgICAgICAgdHlwZSA9PT0gXCJzdHJpbmdcIlxuICAgICk7XG59XG5cbmZ1bmN0aW9uIHRvUHJpbWl0aXZlKGlucHV0KSB7XG4gICAgdmFyIHZhbCwgdmFsdWVPZiwgdG9TdHJpbmc7XG4gICAgaWYgKGlzUHJpbWl0aXZlKGlucHV0KSkge1xuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfVxuICAgIHZhbHVlT2YgPSBpbnB1dC52YWx1ZU9mO1xuICAgIGlmICh0eXBlb2YgdmFsdWVPZiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHZhbCA9IHZhbHVlT2YuY2FsbChpbnB1dCk7XG4gICAgICAgIGlmIChpc1ByaW1pdGl2ZSh2YWwpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRvU3RyaW5nID0gaW5wdXQudG9TdHJpbmc7XG4gICAgaWYgKHR5cGVvZiB0b1N0cmluZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHZhbCA9IHRvU3RyaW5nLmNhbGwoaW5wdXQpO1xuICAgICAgICBpZiAoaXNQcmltaXRpdmUodmFsKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG59XG5cbi8vIEVTNSA5Ljlcbi8vIGh0dHA6Ly9lczUuZ2l0aHViLmNvbS8jeDkuOVxudmFyIHRvT2JqZWN0ID0gZnVuY3Rpb24gKG8pIHtcbiAgICBpZiAobyA9PSBudWxsKSB7IC8vIHRoaXMgbWF0Y2hlcyBib3RoIG51bGwgYW5kIHVuZGVmaW5lZFxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiY2FuJ3QgY29udmVydCBcIitvK1wiIHRvIG9iamVjdFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdChvKTtcbn07XG5cbn0pO1xuIiwidm9pZCBmdW5jdGlvbihyb290KXtcblxuXHQndXNlIHN0cmljdCdcblxuXHR2YXIgY3JlYXRlID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbihvKXtcblx0XHR2YXIgRiA9IGZ1bmN0aW9uKCl7fVxuXHRcdEYucHJvdG90eXBlID0gb1xuXHRcdHJldHVybiBuZXcgRigpXG5cdH1cblxuXHR2YXIgZXh0ZW5kID0gZnVuY3Rpb24odG8sIGZyb20pe1xuXHRcdGZvciAoIHZhciBwIGluIGZyb20gKSB0b1twXSA9IGZyb21bcF1cblx0XHRyZXR1cm4gdG9cblx0fVxuXG5cdC8vIExpYnJhcnkgb2JqZWN0IC0gYSBiYXNlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuXHR2YXIgVmlyYWwgPSB7XG5cblx0XHQvLyBjcmVhdGUgYW4gaW5oZXJpdGluZyBvYmplY3QsIHdpdGggYWRkZWQgb3IgY2hhbmdlZCBtZXRob2RzIG9yIHByb3BlcnRpZXNcblx0XHRleHRlbmQ6IGZ1bmN0aW9uKHByb3BzKXtcblx0XHRcdHJldHVybiBleHRlbmQoY3JlYXRlKHRoaXMpLCBwcm9wcylcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIGFuIG9iamVjdCwgY2FsbGluZyBhbiBpbml0IG1ldGhvZCBpZiBhdmFpbGFibGVcblx0XHRtYWtlOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIG9iaiA9IGNyZWF0ZSh0aGlzKVxuXHRcdFx0aWYgKCB0eXBlb2Ygb2JqLmluaXQgPT09ICdmdW5jdGlvbicgKSBvYmouaW5pdC5hcHBseShvYmosIGFyZ3VtZW50cylcblx0XHRcdHJldHVybiBvYmpcblx0XHR9XG5cdH1cblxuXHQvLyBtb2R1bGUgZGFuY2Vcblx0aWYgKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cyApIG1vZHVsZS5leHBvcnRzID0gVmlyYWxcblx0ZWxzZSBpZiAoIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIGRlZmluZShWaXJhbClcblx0ZWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvb3QuVmlyYWwgPSBWaXJhbFxuXG59KHRoaXMpXG4iXX0=
