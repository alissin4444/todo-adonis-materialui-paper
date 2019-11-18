'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
    user() {
        this.belongsTo('App/Models/User')
    }

    todos () {
        return this.hasMany('App/Models/Todo')
    }
}

module.exports = Category
