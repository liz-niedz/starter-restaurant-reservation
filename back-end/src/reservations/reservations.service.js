const knex = require("../db/connection");

function read(reservation_id) {
    return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .then((result)=> result[0]);
     
}

function list(date) {
    return knex("reservations")
    .select("*")
    .where({ reservation_date: date})
    .orderBy("reservation_time")
}

function create(reservation) {
    return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((result)=> result[0]);
}

module.exports = {
    read,
    list,
    create,
}