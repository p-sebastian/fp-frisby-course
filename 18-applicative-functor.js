const Box = require ('./Box');
const Either = _ => {}; // fake Either

// Applies Box (2) to Box1
const res = Box (x => x + 1).ap (Box (2));
console.log (res); // Box (3)

const add = x => y => x + y;
// it allows mapping for multiple arguments, in curried form
// when applied it unboxes the value and applies it to the function
// if its curried then it returns the function
// so on first apply it returns Box (y => 2 + y), and so on
const res2 = Box (add).ap (Box (2)).ap (Box (3));
console.log (res2); // Box (5)

// Applicative Functors also follow some rules
// F -> some Functor
// @note F (x).map (f) == F (f).ap (F (x))

// example lift 2 arguments
// f -> function
// fx, fy -> functor with value
const liftA2 = (f, fx, fy) =>
  // if we do it by
  // F (f). ap (fx). ap (fy)
  // we would need to know which functor type
  // F is first hand, but it can be replaced
  // for a more generic way by
  fx.map (f).ap (fy);

liftA2 (add, Box (2), Box (4)); // Box (6)

// Apply multiple functors as arguments to a function
const $ = selector => Either.of ({ selector, height: 10 });

const getScreenSize = screen => head => foot =>
  screen - (head.height + foot.height);

// same as 'add' above, first I set the screen
// then apply the header
// then apply the footer, since they are in curried form
const res3 = Either.of (getScreenSize (800))
              .ap ($ ('header'))
              .ap ($ ('footer'));

console.log (res3); // Right (780);
// using liftA2
const res4 = liftA2 (getScreenSize (800), $ ('header'), $ ('footer'));
console.log (res4);
