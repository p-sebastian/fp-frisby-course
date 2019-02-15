'use strict';
// @note Box is the identity functor
const Box = x =>
  ({
    map: f => Box (f (x)),
    fold: f => f (x),
    inspect: () => `Box (${x})`
  });

// Imperative
const moneyToFloat = str =>
  parseFloat (str.replace (/\$/g, ''));

const percentToFloat = str => {
  const replaced = str.replace (/%/g, '');
  const number = parseFloat (replaced);
  return number * 0.01;
};

const applyDiscount = (price, discount) => {
  const cost = moneyToFloat (price);
  const savings = percentToFloat (discount);
  return cost - cost * savings;
};

const result = applyDiscount ('$5.00', '20%');
console.log (result);

// Declarative with Box
// it isnt necessarily better, but the point is to
// destructure the expressions, for better readability
const moneyToFloatD = str =>
  Box (str)
  .map (s => s.replace (/\$/g, ''))
  .map (s => parseFloat (s));

const percentToFloatD = str =>
  Box (str.replace (/\$/, ''))
  .map (replaced => parseFloat (replaced))
  .map (number => number * 0.01);

// this one is a bit trickier because we need to use the
// two values on the map, which is solved by closures
// using map instead of fold here with make the box be
// two levels deep, so a box within a box
const applyDiscountD = (price, discount) =>
  moneyToFloatD (price)
  .fold (cost => // flattens the value
     percentToFloatD (discount)
     .fold (savings =>
      cost - cost * savings));

const resultD = applyDiscountD ('$5.00', '20%');
console.log (resultD);
