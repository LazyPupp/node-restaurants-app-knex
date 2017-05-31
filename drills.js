'use strict';
const { DATABASE, PORT } = require('./config');
const knex = require('knex')(DATABASE);

// clear the console before each run
process.stdout.write('\\033c');

// // Sample select 
// knex.select().from('restaurants')
//   .debug(true)
//   .then(results => console.log(results));


// // Destroy the connection pool
 knex.destroy().then(() => { console.log('closed'); });