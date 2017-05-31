

//const DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'postgresql://restaurant_dev:hi@localhost/dev-restaurants-app';

// postgres://USERNAME:PASSWORD@stampy.db.elephantsql.com:5432/DATABASE
const DATABASE_URL = 'postgres://tirmevbf:Tw3vBsys-QkkmMn2IZbEQ06UsMvdLCkx@stampy.db.elephantsql.com:5432/tirmevbf';

exports.DATABASE = {
  client: 'pg',
  connection: DATABASE_URL,
  // debug: true
};

exports.PORT = process.env.PORT || 8080; 



// Require Knex and make connection
// const knex = require('knex')({
//   client: 'pg',
//   connection: {
//     user: 'restaurant_dev',
//     password: 'hi',
//     database: 'dev-restaurants-app'
//   },
// });

// If you're using ElephantSQL then the connection will look like this

const knex = require('knex')({
  client: 'pg',
  connection: DATABASE_URL
});

