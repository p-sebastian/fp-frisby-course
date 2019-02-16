// @note also referred as 'Church encoding' (Lambda Calculus)
// converts our boxed value into a function that will eventually
// return the actual value

const LazyBox = g =>
  ({
    fold: f => f (g ()),
    // function composition
    map: f => LazyBox (f (g ()))
  });

const result = LazyBox (() => ' 64 ')
                .map (s => s.trim ())
                .map (trimmed => new Number (trimmed))
                .map (number => number + 1)
                .map (x => String.fromCharCode (x))
                // up until here, none of the code has actually ran
                // its just been declared and stacked
                // calling fold is like pulling the trigger and
                // running all the functions
                // @note Observables, Promises, streams work this way
                .fold (x => x.toLowercase ());

console.log (result);
