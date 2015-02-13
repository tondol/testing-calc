var Calc = (function () {
    function Calc() {
    }
    Calc.prototype.clear = function () {
    };
    Calc.prototype.digit = function (d) {
        console.log(d);
    };
    return Calc;
})();
$(function () {
    var calc = new Calc();
    $('#btn-0').click(function () {
        calc.digit(0);
        return false;
    });
    $('#btn-1').click(function () {
        calc.digit(1);
        return false;
    });
    $('#btn-2').click(function () {
        calc.digit(2);
        return false;
    });
    $('#btn-3').click(function () {
        calc.digit(3);
        return false;
    });
    $('#btn-4').click(function () {
        calc.digit(4);
        return false;
    });
    $('#btn-5').click(function () {
        calc.digit(5);
        return false;
    });
    $('#btn-6').click(function () {
        calc.digit(6);
        return false;
    });
    $('#btn-7').click(function () {
        calc.digit(7);
        return false;
    });
    $('#btn-8').click(function () {
        calc.digit(8);
        return false;
    });
    $('#btn-9').click(function () {
        calc.digit(9);
        return false;
    });
    $('#btn-plus').click(function () {
        calc.plus();
        return false;
    });
    $('#btn-minus').click(function () {
        calc.minus();
        return false;
    });
    $('#btn-multiply').click(function () {
        calc.multiply();
        return false;
    });
    $('#btn-divide').click(function () {
        calc.divide();
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
});
