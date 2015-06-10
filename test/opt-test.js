// run with `node --allow-natives-syntax opt-test.js`
// or `node --trace_opt --trace_deopt --allow-natives-syntax ./test/opt-test.js`

var signals=require('../dist/signals');

var myObject = new MyObject();
myObject.started.add(testDispatch, this);

for(var i=0;i<100000; i++) {
  myObject.started.dispatch(1,2,3,4,5);
}

function MyObject() {
  this.started = new signals.Signal();
}

function testDispatch(a,b,c,d,e) {
  return this || a || b;
}


function printStatus(fn) {
  var name = fn.name;
  switch (%GetOptimizationStatus(fn)) {
    case 1: console.log(fn.name, "function is optimized"); break;
    case 2: console.log(fn.name, "function is not optimized"); break;
    case 3: console.log(fn.name, "function is always optimized"); break;
    case 4: console.log(fn.name, "function is never optimized"); break;
    case 6: console.log(fn.name, "function is maybe deoptimized"); break;
  }
}

printStatus(signals.Signal.prototype.dispatch);
