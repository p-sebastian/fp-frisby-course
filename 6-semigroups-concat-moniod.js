/**
 * Semigroups are a type with a concat method that are associative
 * so an associative Box with a concat method
 * @property if a data estructure is made of semigroups then the structure
 * is a semigroup in itself
 */
// @note a Monoid is a semigroup with an special neutral element
// that when concated returns the identity of the element concating
// a semigroup is not a safe operation, but a monoid is since it allows
// to take any element we want including 'none' hence its neutral value
const Sum = x =>
  ({
    // x: sort of previous value when concating
    x,
    // destructuring Sum, taking x and naming it y
    concat: ({ x: y }) =>
      // returns new Sum with the result
      Sum (x + y),
    inspect: () => `Sum (${x})`
  });
// Neutral element, converts Sum to a monoid
Sum.empty = _ => Sum (0);

const res = Sum (1).concat (Sum (2));
console.log (res);

// Conjunction true && false = false
const All = x =>
  ({
    // x: sort of previous value when concating
    x,
    concat: ({ x: y }) =>
      All (x && y),
    inspect: () => `All (${x})`
  });

// All neutral element
All.empty = _ => All (true);
// true && true = true
// true && false = false
// hence true is the neutral element

const conj = All (true).concat (All (false));
console.log (conj);

// @note no way to promote to monoid yet
// First, ignores everything and just keeps the First value
const First = x =>
  ({
    x,
    concat: _ =>
      First (x),
    inspect: () => `First (${x})`
  });

const first = First ('hello').concat (First (' world'));
console.log (first);
