'use strict';

// Imperative
const nextCharForNumberStringImp = str => {
  const trimmed = str.trim ();
  const number = parseInt (trimmed);
  const nextNumber = number + 1;
  return String.fromCharCode (nextNumber);
};

// Boxing with an array
// Encapsulating the value in an array makes it
// easier to map the value, each assignment cant go out of its function
// this is composing
const nextCharForNumberStringABox = str =>
  [str]
  .map (s => s.trim ())
  .map (s => parseInt (s))
  .map (i => i + 1)
  .map (i => String.fromCharCode (i));

nextCharForNumberStringImp (' 64 ');
nextCharForNumberStringABox (' 64 ');

// Crating a Box type to map
/**
 * we escentially create our own box with a map function
 * which calls the function passed with the boxed value as the argument
 * and puts that result back into another box, hence allowing it to
 * continue chaining a map
 * The inspect function is an internal function of node
 * that whenever the objectwith said function is logged
 * it will run that with the return being the output
 *
 * Fold is for removing the value from the box
 * which is when we want the actual value not encapsulated anymore
 */

// @note Map is composition within a context
const Box = x =>
  ({
    map: f => Box (f (x)),
    fold: f => f (x),
    inspect: () => `Box (${x})`
  });

const nextCharForNumberStringBox = str =>
  Box (str)
  .map (s => s.trim ())
  .map (s => parseInt (s))
  .map (i => i + 1)
  .fold (i => String.fromCharCode (i));

const result = nextCharForNumberStringBox (' 64 ');
console.log (result);
