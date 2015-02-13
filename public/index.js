var Operator;
(function (Operator) {
    Operator[Operator["Default"] = 0] = "Default";
    Operator[Operator["Plus"] = 1] = "Plus";
    Operator[Operator["Minus"] = 2] = "Minus";
    Operator[Operator["Multiply"] = 3] = "Multiply";
    Operator[Operator["Divide"] = 4] = "Divide";
})(Operator || (Operator = {}));
var State;
(function (State) {
    State[State["Init"] = 0] = "Init";
    State[State["FirstOperand"] = 1] = "FirstOperand";
    State[State["SecondOperand"] = 2] = "SecondOperand";
    State[State["Result"] = 3] = "Result";
})(State || (State = {}));
var Calc = (function () {
    function Calc(selector) {
        this.selector = selector;
        this.clear();
        this.apply();
    }
    Calc.prototype.clear = function () {
        this.operator = 0 /* Default */;
        this.firstOperand = 0;
        this.secondOperand = 0;
        this.state = 0 /* Init */;
        this.apply();
    };
    Calc.prototype.equal = function () {
        if (this.state == 2 /* SecondOperand */) {
            this.firstOperand = this.calc();
            this.state = 3 /* Result */;
        }
        this.apply();
    };
    Calc.prototype.putOperator = function (operator) {
        if (this.state == 0 /* Init */) {
        }
        else if (this.state == 1 /* FirstOperand */ || this.state == 3 /* Result */) {
            this.operator = operator;
            this.secondOperand = 0;
            this.state = 2 /* SecondOperand */;
        }
        else if (this.state == 2 /* SecondOperand */) {
            this.firstOperand = this.calc();
            this.operator = operator;
            this.secondOperand = 0;
        }
        this.apply();
    };
    Calc.prototype.invert = function () {
        if (this.state == 1 /* FirstOperand */) {
            this.firstOperand *= -1;
        }
        else if (this.state == 2 /* SecondOperand */) {
            this.secondOperand *= -1;
        }
        this.apply();
    };
    Calc.prototype.putDigit = function (d) {
        console.log(d);
        if (this.state == 0 /* Init */ || this.state == 3 /* Result */) {
            this.firstOperand = d;
            this.state = 1 /* FirstOperand */;
        }
        else if (this.state == 1 /* FirstOperand */) {
            this.firstOperand = this.firstOperand * 10 + d;
        }
        else if (this.state == 2 /* SecondOperand */) {
            this.secondOperand = this.secondOperand * 10 + d;
        }
        this.apply();
    };
    Calc.prototype.calc = function () {
        if (this.operator == 1 /* Plus */)
            return this.firstOperand + this.secondOperand;
        else if (this.operator == 2 /* Minus */)
            return this.firstOperand - this.secondOperand;
        else if (this.operator == 3 /* Multiply */)
            return this.firstOperand * this.secondOperand;
        else if (this.operator == 4 /* Divide */)
            return this.firstOperand / this.secondOperand;
    };
    Calc.prototype.apply = function () {
        var op = '';
        if (this.operator == 1 /* Plus */)
            op = '+';
        else if (this.operator == 2 /* Minus */)
            op = '-';
        else if (this.operator == 3 /* Multiply */)
            op = '*';
        else if (this.operator == 4 /* Divide */)
            op = '/';
        if (this.state == 0 /* Init */) {
            this.selector.val('(I)');
        }
        else if (this.state == 1 /* FirstOperand */) {
            this.selector.val(this.firstOperand + ' (F)');
        }
        else if (this.state == 2 /* SecondOperand */) {
            this.selector.val(this.firstOperand + ' ' + op + ' ' + this.secondOperand + ' (S)');
        }
        else {
            this.selector.val(this.firstOperand + ' (R)');
        }
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
        calc.putOperator(1 /* Plus */);
        return false;
    });
    $('#btn-minus').click(function () {
        calc.putOperator(2 /* Minus */);
        return false;
    });
    $('#btn-multiply').click(function () {
        calc.putOperator(3 /* Multiply */);
        return false;
    });
    $('#btn-divide').click(function () {
        calc.putOperator(4 /* Divide */);
        return false;
    });
    $('#btn-invert').click(function () {
        calc.invert();
        return false;
    });
    $('#btn-equal').click(function () {
        calc.equal();
        return false;
    });
    $('#btn-clear').click(function () {
        calc.clear();
        return false;
    });
    $('#btn-dot').click(function () {
        calc.dot();
        return false;
    });
    $(document).keydown(function (e) {
        var keyCode = e.keyCode;
        if (keyCode >= 48 && keyCode <= 57) {
            calc.putDigit(keyCode - 48);
        }
        else if (keyCode == 187) {
            if (e.shiftKey)
                calc.putOperator(1 /* Plus */);
            else
                calc.equal();
        }
        else if (keyCode == 189) {
            calc.putOperator(2 /* Minus */);
        }
        else if (keyCode == 222) {
            calc.putOperator(3 /* Multiply */);
        }
        else if (keyCode == 191) {
            calc.putOperator(4 /* Divide */);
        }
        else if (keyCode == 13) {
            calc.equal();
        }
        else if (keyCode == 8) {
            calc.clear();
        }
    });
});
