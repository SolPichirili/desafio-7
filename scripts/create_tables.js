const { optionsMySQL, optionsSQLite } = require('../src/models/dataBasesConfig');
const knexMySQL = require('knex')(optionsMySQL);
const knexSQLite = require('knex')(optionsSQLite);

knexMySQL.schema.createTable('products', (table) =>{
    table.increments('id');
    table.string('name');
    table.string('description');
    table.integer('code');
    table.string('photo');
    table.integer('price');
    table.integer('stock');
})

.then(()=> console.log('table created'))
.catch((error)=>{console.log(error); throw error})
.finally(()=>{
    knexMySQL.destroy();
});

knexSQLite.schema.createTable('messages', (table) =>{
    table.increments('id');
    table.string('date');
    table.string('mail');
    table.string('message');
})

.then(()=> console.log('table created'))
.catch((error)=>{console.log(error); throw error})
.finally(()=>{
    knexSQLite.destroy();
});