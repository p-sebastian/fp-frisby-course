const Task = require ('data.task'); // @note old library from folktale

// launching a missile is considered a side effect here
// which becomes lazy because of task. this is pretty much a promise

const launchMissiles = _ =>
  new Task ((reject, resolve) => {
    console.log ('launch missiles!');
    resolve ('missile');
  });

// works the same as LazyBox which deferres excecution
const app = launchMissiles ().map (x => x + '!');

// and allows to continue composing outside the definition
// fork pulls the lever, like calling fold
app.map (x => x + '!').fork (e => console.log ('err', e),
                            x => console.log ('success', x));
