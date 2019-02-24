const List = () => {}; // fake List from 'immutable-ext'

// capturing loops within loops using applicative functors
const xs = [];
const ys = [];
const zs = [];
// imperative
for (const x in xs) {
  for (const y in ys) {
    for (const z in zs) {
      // do something
      console.log (x + y + z);
    }
  }
}

// using List
const merch = () =>
  List.of (x => y => `${x}-${y}`)
  .ap (List (['tshirt', 'sweater']))
  .ap (List (['large', 'medium', 'small']));

// escentially captures nested loops, it will run
// each element with each element on the next List
// so tshirt-large, tshirt-medium, ... sweater-small
// applying more will continue nesting
const res = merch ();
console.log (res);
