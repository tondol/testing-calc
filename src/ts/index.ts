/// <reference path="jquery.d.ts" />

declare function require(x:string):any
declare class Rational {
  public add(r:Rational):Rational
  public sub(r:Rational):Rational
  public mul(r:Rational):Rational
  public div(r:Rational):Rational
  public toString():string
  public val():number
}
var r = require('rationals')

enum Operator { Plus, Minus, Multiply, Divide }
enum State { Init, Process, Result }

class Calc {
  selector:JQuery
  expression:string
  state:State

  constructor(selector:JQuery){
    this.selector = selector
    this.clear()
    this.apply()
  }
  public clear(){
    this.expression = ''
    this.state = State.Init
    this.apply()
  }
  public equal(){
    this.expression = this.eval().toString().replace(/\/1$/, '')

    this.state = State.Result
    this.apply()
  }
  public putOperator(operator:string) {
    this.expression += operator
    this.state = State.Process
    this.apply()
  }
  public putDigit(d:number){
    if (this.state == State.Result) {
      this.expression = ''
    }
    this.expression += d.toString()
    this.state = State.Process
    this.apply()
  }
  private apply(){
    this.selector.val(this.expression)
  }

  private isDigit(e:string, i:number){
    return e.charCodeAt(i) >= '0'.charCodeAt(0) &&
        e.charCodeAt(i) <= '9'.charCodeAt(0)
  }
  private toDigit(e:string, i:number){
    return e.charCodeAt(i) - '0'.charCodeAt(0)
  }
  private evalNumber(e:string, i:number):[Rational, number]{
    var n = 0
    while (this.isDigit(e, i)) {
      n = n * 10 + this.toDigit(e, i)
      i++
    }
    return [r(n), i]
  }
  private evalTerm(e:string, i:number):[Rational, number]{
    if (e.charAt(i) == '(') {
      var tuple = this.evalExpression(e, i + 1)
      tuple[1]++
      return tuple
    } else {
      return this.evalNumber(e, i)
    }
  }
  private evalFactor(e:string, i:number):[Rational, number]{
    var left = this.evalTerm(e, i)
    while (e.charAt(left[1]) == '*' ||
        e.charAt(left[1]) == '/') {
      if (e.charAt(left[1]) == '*') {
        var right = this.evalTerm(e, left[1] + 1)
        left[0] = left[0].mul(right[0])
        left[1] = right[1]
      } else {
        var right = this.evalTerm(e, left[1] + 1)
        left[0] = left[0].div(right[0])
        left[1] = right[1]
      }
    }
    return left
  }
  private evalExpression(e:string, i:number):[Rational, number]{
    var left = this.evalFactor(e, i)
    while (e.charAt(left[1]) == '+' ||
        e.charAt(left[1]) == '-') {
      if (e.charAt(left[1]) == '+') {
        var right = this.evalFactor(e, left[1] + 1)
        left[0] = left[0].add(right[0])
        left[1] = right[1]
      } else {
        var right = this.evalFactor(e, left[1] + 1)
        left[0] = left[0].sub(right[0])
        left[1] = right[1]
      }
    }
    return left
  }
  private eval():Rational{
    var tuple = this.evalExpression(this.expression, 0)
    return tuple[0]
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
  $('#btn-plus').click(()=>{ calc.putOperator('+'); return false })
  $('#btn-minus').click(()=>{ calc.putOperator('-'); return false })
  $('#btn-multiply').click(()=>{ calc.putOperator('*'); return false })
  $('#btn-divide').click(()=>{ calc.putOperator('/'); return false })
  $('#btn-equal').click(()=>{ calc.equal(); return false })
  $('#btn-clear').click(()=>{ calc.clear(); return false })
  $('#btn-left').click(()=>{ calc.putOperator('('); return false })
  $('#btn-right').click(()=>{ calc.putOperator(')'); return false })

  $(document).keypress((e)=>{
    switch (e.keyCode) {
      case 48: case 49: case 50: case 51: case 52:
      case 53: case 54: case 55: case 56: case 57:
        calc.putDigit(e.keyCode - 48); break
      case 43:
        calc.putOperator('+'); break
      case 45:
        calc.putOperator('-'); break
      case 42:
        calc.putOperator('*'); break
      case 47:
        calc.putOperator('/'); break
      case 13: case 61:
        calc.equal(); break
      case 40:
        calc.putOperator('('); break
      case 41:
        calc.putOperator(')'); break
    }
  })

  $('#btn-equal').focus()
})
