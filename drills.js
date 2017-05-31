'use strict';
const { DATABASE, PORT } = require('./config');
const knex = require('knex')(DATABASE);
const Treeize = require('treeize');


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
// knex.select('id','name','cuisine').from('restaurants').where('cuisine','Italian').limit(10)
//  .then(results => console.log(JSON.stringify(results,null,2)));

//4
// knex('restaurants').select().count().where('cuisine','Thai')
// .then(results => console.log(JSON.stringify(results,null,2)));

//5
// knex('restaurants').select().count()
// .then(results => console.log(JSON.stringify(results,null,2)));

//6
// knex('restaurants').select().count().where({cuisine:'Thai',address_zipcode:11372})
// .then(results => console.log(JSON.stringify(results,null,2)));

//7
// knex('restaurants').select().where({cuisine:'Italian',address_zipcode:10012 || 10013 || 10014}).limit(5)
// .then(results => console.log(JSON.stringify(results,null,2)));

//8
// knex('restaurants').insert({
//   name: 'Byte Cafe',
//   borough: 'Brooklyn',
//   cuisine: 'coffee',
//   address_building_number: '123',
//   address_street: 'Atlantic Avenue',
//   address_zipcode: '11231'})
// .then(results => console.log(JSON.stringify(results,null,2)));

// knex.select().from('restaurants').where({ name: 'Byte Cafe',
//   borough: 'Brooklyn',
//   cuisine: 'coffee',
//   address_building_number: '123',
//   address_street: 'Atlantic Avenue',
//   address_zipcode: '11231'})
//   .then(results => console.log(JSON.stringify(results,null,2)));

//9
// knex('restaurants').insert({
//   name: 'Flight Cafe',
//   borough: 'Brooklyn',
//   cuisine: 'Russian',
//   address_building_number: '127',
//   address_street: 'Happy Avenue',
//   address_zipcode: '11231'})
// .returning(['id','name'])
// .then(results => console.log(JSON.stringify(results,null,2)));

//10
// knex.insert([{name:'hi',borough:'Brooklyn',cuisine:'w.e.'},
//   {name:'saule\'s cafe',borough:'Brooklyn',cuisine:'w.e.'},
//   {name:'kirby',borough:'Brooklyn',cuisine:'w.e.'}])
//   .into('restaurants')
//   .returning(['id','name'])
//   .then(results => console.log(JSON.stringify(results,null,2)));

//11
// knex('restaurants').update({name:'DJ Reynolds Pub and Restaurant'}).where({nyc_restaurant_id:30191841})
// .then(results => console.log(JSON.stringify(results,null,2)));
// knex('restaurants').select().where({nyc_restaurant_id:30191841})
// .then(results => console.log(JSON.stringify(results,null,2)));

//12
// knex('grades').del().where('id',10)
// .then(results => console.log(JSON.stringify(results,null,2)));
// knex('grades').select().where('id',10)
// .then(results => console.log(JSON.stringify(results,null,2)));

//13
// knex('restaurants').del().where('id',22)
//  .then(results => console.log(JSON.stringify(results,null,2)));
 //FOREIGN KEY CONSTRAINT

 //Try IT Hydration
// knex.select('restaurants.id', 'name', 'cuisine', 'borough', 'grades.id as gradeId', 'grade', 'score')
//     .from('restaurants')
//     .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
//     .orderBy('date', 'asc')
//     .limit(10)
//     .where('restaurants.id', 2)
//     .then(results => {const hydrated = {};
//         results.forEach(row => {
//             if( !(row.id in hydrated) ) {
//                 hydrated[row.id] = {
//                     id: row.id,
//                     name:row.name,
//                     cuisine:row.cuisine,
//                     borough:row.borough,
//                     grades:[]
//                 };
//             }
//             //all the grades for that particular restaurant
//             hydrated[row.id].grades.push({
//                 name:row.grade,
//                 score:row.score,
//             });

//         });
    
// console.log(hydrated[2]);
// //console.log(hydrated);
//     });
    
////////////////////////////////// TREEIZE////////////////////////////////////////////
let restaurants = new Treeize();
knex.select('restaurants.id', 'name', 'cuisine', 'borough', 'grade as grades:name', 'score as grades:name')
    .from('restaurants')
    .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
    .orderBy('date', 'asc')
    .limit(10)
    .where('restaurants.id', 2)
    .then(results=> {
      // const a = results.map(row=>{
        
      //   return {
      //     'id': row.id,
      //     'name': row.name,
      //     'cuisine':row.cuisine,
      //     'borough': row.borough,
      //     'grades:name':row.grade,
      //     'grades:score':row.score
      //   };
      // });
      //restaurants.grow(a);
      restaurants.grow(results);
      console.log(restaurants.getData());
    });


// // Destroy the connection pool
knex.destroy().then(() => { console.log('closed'); }); 