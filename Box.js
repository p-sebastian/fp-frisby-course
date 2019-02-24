// Box definition

const Box = x =>
({
  // yes, chain and fold are the same
  // makes sense, but are different names for
  // their use cases
  chain: f => f (x),
  map: f => Box (f (x)),
  fold: f => f (x),
  // Flips map, takes a second box and returns
  // the map result
  // will run Box1 function applied to Box2 x value, by mapping.
  // Box (x => x + 1).ap (Box (2))
  ap: b2 => b2.map (x),
  inspect: _ => `Box (${x})`
});

module.exports = Box;
