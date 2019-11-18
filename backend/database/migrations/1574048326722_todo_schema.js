'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TodoSchema extends Schema {
  up () {
    this.table('todos', (table) => {
      table.boolean('status').defaultTo(false)
    })
  }

  down () {
    this.table('todos', (table) => {
      // reverse alternations
    })
  }
}

module.exports = TodoSchema
