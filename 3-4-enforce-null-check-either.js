// Either = Right || Left
// @note also called Disjuntion the word for ||
// Either doesnt actually do anything more than select
// one of the two options

// @note since we need to know which path to take
// the final case when folding has to take 2 functions
// for Left or Right

// with map only it is the same as the Box, the difference
// comes on the fold
const Right = x =>
  ({
    // @note difference from fold is that chain expects you
    // to run a function and return a function whereas fold
    // is for taking the value out of the box
    //
    // this will make sure that when comming from a Right
    // it wont nest into another one, hence replacing the box
    chain: f => f (x),
    map: f => Right (f (x)),
    // In case of right, take the right function
    fold: (f, g) => g (x),
    inspect: () => `Right *${x}`
  });

// Left ignores the function passed
// and just runs x on itself
const Left = x =>
  ({
    // chain in Left also ignores everything
    chain: f => Left (x),
    // escentially ignores everything
    map: f => Left (x),
    // in case of left, take the left function
    fold: (f, g) => f (x),
    inspect: () => `Right *${x}`
  });

const fromNullable = x =>
  // also catches undefined
  x != null ? Right (x) : Left (null);

// if the color exists return Right so that its usable
// if it doesnt, ignore all with left.
// @note here we see the null check, since we want to map over the
// the result later, if the value didnt exist the map would fail
// crashing the app, but since we handle it with Left
// it will just ignore every map over it
const findColor = name =>
  fromNullable ({ red: '#ff4444', blue: '#3b5998', yellow: '#fff68f' })[name];

const result = findColor ('blue')
                .map (c => c.slice (1))
                .fold (
                  e => 'no color',
                  c => c.toUpperCase ()
                );

console.log (result);

/** ********** 4 ********** */

const fs = require ('fs');

const getPort = () => {
  try {
    const str = fs.readFileSync ('config.json'); // fake file
    const lint = JSON.parse (str);
    return lint.port;
  } catch  (e) {
    return 3000;
  }
};

const tryCatch = f => {
  try {
    // passes the result of the function
    return Right (f ());
  } catch (e) { return Left (e); }
};

const getPortD = () =>
  tryCatch (() => fs.readFileSync ('config.json'))
  // we know we can map here because
  // try catch handles any errors
  // JSON.parse could also fail, but if we wrap it
  // in another try catch, it will nest a right with an either
  // thats why we add chain
  .chain (c => tryCatch (() => JSON.parse (c)))
  .fold (
    e => 3000,
    c => c.port
  );

const result2 = getPort ();
const result3 = getPortD ();
console.log (result2);
console.log (result3);
