'use strict';
const { DATABASE, PORT } = require('./config');
const knex = require('knex')(DATABASE);

// clear the console before each run
process.stdout.write('\\033c');

// Sample select 
// knex.select().from('restaurants')
//   .debug(true)
//   .then(results => console.log(results));

//1
// knex.select().from('restaurants')
// .then(results => console.log(JSON.stringify(results,null,2)));

//2
// knex('restaurants').select().where('cuisine','Italian')
// .then(results => console.log(JSON.stringify(results,null,2)));

//3
knex.select('id','name','cuisine').from('restaurants').where('cuisine','Italian').limit(10)
 .then(results => console.log(JSON.stringify(results,null,2)));

// // Destroy the connection pool
 knex.destroy().then(() => { console.log('closed'); });