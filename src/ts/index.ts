/// <reference path="jquery.d.ts" />

class Calc {
  constructor(){
  }
  public clear(){

  }
  public digit(d:number){
    console.log(d)
  }
}

$(()=>{
  var calc = new Calc()
  $('#btn-0').click(()=>{ calc.digit(0); return false })
  $('#btn-1').click(()=>{ calc.digit(1); return false })
  $('#btn-2').click(()=>{ calc.digit(2); return false })
  $('#btn-3').click(()=>{ calc.digit(3); return false })
  $('#btn-4').click(()=>{ calc.digit(4); return false })
  $('#btn-5').click(()=>{ calc.digit(5); return false })
  $('#btn-6').click(()=>{ calc.digit(6); return false })
  $('#btn-7').click(()=>{ calc.digit(7); return false })
  $('#btn-8').click(()=>{ calc.digit(8); return false })
  $('#btn-9').click(()=>{ calc.digit(9); return false })
  $('#btn-plus').click(()=>{ calc.plus(); return false })
  $('#btn-minus').click(()=>{ calc.minus(); return false })
  $('#btn-multiply').click(()=>{ calc.multiply(); return false })
  $('#btn-divide').click(()=>{ calc.divide(); return false })
  $('#btn-invert').click(()=>{ calc.invert(); return false })
  $('#btn-equal').click(()=>{ calc.equal(); return false })
  $('#btn-clear').click(()=>{ calc.clear(); return false })
})
