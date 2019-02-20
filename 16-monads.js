// @note a monad contains the following methods for it to
// be considered a monad
// F.of, chain (also called 'flatMap, bind, >>=')
// monad is a functor

// chain flattens the Monad result making it not nest
// when mapping multiple which would gie a result like
// Task (Task (Task (RES)));
// If we used flatMap or chain instead of every map there
// we would get
// Task (RES)

// fake box
const Box = () => {};
// Box (Box (x))
// running join on it would return
// Box (x)
// m = Monad
const join = m =>
  m.chain (x => x);

// @note first monad law
const m = Box (Box (Box (3)));
// assosiativity of joining
// inward -> outward join == outward => inward join
join (m.map (join)) === join (join (m));

// @note second monad law; == not ===
join (Box.of (m)) === join (m.map (Box.of));
