/// <reference path="jquery.d.ts" />

enum Operator { Default, Plus, Minus, Multiply, Divide }
enum State { Init, FirstOperand, SecondOperand, Result }

class Calc {
  operator:Operator
  firstOperand:number
  secondOperand:number
  state:State
  selector:JQuery

  constructor(selector:JQuery){
    this.selector = selector
    this.clear()
    this.apply()
  }
  public clear(){
    this.operator = Operator.Default
    this.firstOperand = 0
    this.secondOperand = 0
    this.state = State.Init
    this.apply()
  }
  public equal(){
    if (this.state == State.SecondOperand) {
      this.firstOperand = this.calc()
      this.state = State.Result
    }
    this.apply()
  }
  public putOperator(operator:Operator) {
    if (this.state == State.Init) {
    } else if (this.state == State.FirstOperand || this.state == State.Result) {
      this.operator = operator
      this.secondOperand = 0
      this.state = State.SecondOperand
    } else if (this.state == State.SecondOperand) {
      this.firstOperand = this.calc()
      this.operator = operator
      this.secondOperand = 0
    }
    this.apply()
  }
  public invert(){
    if (this.state == State.FirstOperand) {
      this.firstOperand *= -1
    } else if (this.state == State.SecondOperand) {
      this.secondOperand *= -1
    }
    this.apply()
  }
  public putDigit(d:number){
    console.log(d)
    if (this.state == State.Init || this.state == State.Result) {
      this.firstOperand = d
      this.state = State.FirstOperand
    } else if (this.state == State.FirstOperand) {
      this.firstOperand = this.firstOperand * 10 + d
    } else if (this.state == State.SecondOperand) {
      this.secondOperand = this.secondOperand * 10 + d
    }
    this.apply()
  }
  private calc() {
    if (this.operator == Operator.Plus) return this.firstOperand + this.secondOperand
    else if (this.operator == Operator.Minus) return this.firstOperand - this.secondOperand
    else if (this.operator == Operator.Multiply) return this.firstOperand * this.secondOperand
    else if (this.operator == Operator.Divide) return this.firstOperand / this.secondOperand
  }
  private apply(){
    var op = ''
    if (this.operator == Operator.Plus) op = '+'
    else if (this.operator == Operator.Minus) op = '-'
    else if (this.operator == Operator.Multiply) op = '*'
    else if (this.operator == Operator.Divide) op = '/'

    if (this.state == State.Init) {
      this.selector.val('(I)')
    } else if (this.state == State.FirstOperand) {
      this.selector.val(this.firstOperand + ' (F)')
    } else if (this.state == State.SecondOperand) {
      this.selector.val(this.firstOperand + ' ' + op + ' ' + this.secondOperand + ' (S)')
    } else {
      this.selector.val(this.firstOperand + ' (R)')
    }
  }
}

$(()=>{
  var calc = new Calc($('#result'))

  $('#btn-0').click(()=>{ calc.putDigit(0); return false })
  $('#btn-1').click(()=>{ calc.putDigit(1); return false })
  $('#btn-2').click(()=>{ calc.putDigit(2); return false })
  $('#btn-3').click(()=>{ calc.putDigit(3); return false })
  $('#btn-4').click(()=>{ calc.putDigit(4); return false })
  $('#btn-5').click(()=>{ calc.putDigit(5); return false })
  $('#btn-6').click(()=>{ calc.putDigit(6); return false })
  $('#btn-7').click(()=>{ calc.putDigit(7); return false })
  $('#btn-8').click(()=>{ calc.putDigit(8); return false })
  $('#btn-9').click(()=>{ calc.putDigit(9); return false })
  $('#btn-plus').click(()=>{ calc.putOperator(Operator.Plus); return false })
  $('#btn-minus').click(()=>{ calc.putOperator(Operator.Minus); return false })
  $('#btn-multiply').click(()=>{ calc.putOperator(Operator.Multiply); return false })
  $('#btn-divide').click(()=>{ calc.putOperator(Operator.Divide); return false })
  $('#btn-invert').click(()=>{ calc.invert(); return false })
  $('#btn-equal').click(()=>{ calc.equal(); return false })
  $('#btn-clear').click(()=>{ calc.clear(); return false })
  $('#btn-dot').click(()=>{ calc.dot(); return false })

  $(document).keydown((e)=>{
    var keyCode = e.keyCode
    if (keyCode >= 48 && keyCode <= 57) {
      calc.putDigit(keyCode - 48)
    } else if (keyCode == 187) {
      if (e.shiftKey) calc.putOperator(Operator.Plus)
      else calc.equal()
    } else if (keyCode == 189) {
      calc.putOperator(Operator.Minus)
    } else if (keyCode == 222) {
      calc.putOperator(Operator.Multiply)
    } else if (keyCode == 191) {
      calc.putOperator(Operator.Divide)
    } else if (keyCode == 13) {
      calc.equal()
    } else if (keyCode == 8) {
      calc.clear()
    }
  })
})
