const express = require('express');
const bodyParser = require('body-parser');

const { DATABASE, PORT } = require('./config');

const knex = require('knex')(DATABASE);

const app = express();
app.use(bodyParser.json());

app.get('/restaurants', (req, res) => {

    knex.select('id', 'name', 'cuisine', 'borough')
    .from('restaurants')
    .limit(10)
    .then(results => res.json(results));
});

app.get('/restaurants/:id', (req, res) => {
    // Add query and response here...)
    knex.first('restaurants.id as restaurant', 'name', 'cuisine', 'borough', 'grades.id', 'grade', 'date as inspectionDate', 'score')
    .select(knex.raw('CONCAT(address_building_number, \' \', address_street, \' \', address_zipcode ) as address'))
    .from('restaurants')
    .where('restaurants.id', req.params.id)
    .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')    
    .orderBy('date', 'desc')
    .limit(1)
    .then(results => res.json(results));
});
    
app.post('/restaurants'), (req, res) => {
    const requiredFields = ['name'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
        knex('restaurants').insert({'name':req.body.name})
    .then(results => res.status(201).json(results));
    }

};  
app.listen(PORT);
