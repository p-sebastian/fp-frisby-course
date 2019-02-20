// @note any type with a map method that obeys some laws
// Rule 1: called function composition
// fx.map (f).map (g) == fx.map (x => g (f (x)))

// fake Box, use the one from the previous classes
const Box = () => {};

const res1 = Box ('squirrels')
              .map (s => s.substr (5))
              .map (s => s.toUpperCase ());

const res2 = Box ('squirrels')
              .map (s => s.substr (5).toUpperCase ());

// these two should be equal
// res1 == res2;
console.log (res1, res2);

// Second law
// fx.map (id) == id (fx)
const id = x => x; // identity
const res3 = Box ('crayons').map (id);
const res4 = id (Box ('crayons'));

// res3 == res4
console.log (res3, res4);

// @note adding the 'of' method to a functor
// makes it into a 'pointed functor'
// the of method elevates any value into the type
// of the functor
// Box.of (3) -> Box (3)
// Observable.of (3) -> Observable (3)
