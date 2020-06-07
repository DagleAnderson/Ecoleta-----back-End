import Knex from 'knex';

export  async function up(Knex : Knex){
    return  Knex.schema.createTable('points_items',table=>{
        table.increments('id').primary;
        table.integer('point_id')
        .notNullable()
        .references('id')
        .inTable('points');

        table.integer('items_id')
        .notNullable()
        .references('id')
        .inTable('items');
    });
}

export async function down(Knex : Knex){
    return Knex.schema.dropTable('items'); 
}