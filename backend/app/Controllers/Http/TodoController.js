'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with todos
 */
  const Todo = use('App/Models/Todo')

class TodoController {
  /**
   * Show a list of all todos.
   * GET todos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth }) {
    const todo = await Todo.query().where('user_id', auth.user.id).fetch()
    return todo
  }

  /**
   * Create/save a new todo.
   * POST todos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth, params }) {

    const data = request.only(['title'])

    const todo = Todo.create({ ...data, user_id: auth.user.id, category_id: params.id})

    return todo
  }

  /**
   * Display a single todo.
   * GET todos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, auth, response }) {
    const { id } = params

    const todo = await Todo.findOrFail(id)

    if(todo.user_id !== auth.user.id) {
      return response.status(401).json({ error: 'not authorized' })
    }

    return todo
  }

  /**
   * Update todo details.
   * PUT or PATCH todos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    const data = request.only(['title', 'status'])
    const todo = await Todo.find(params.id)
    
    if(todo.user_id !== auth.user.id) {
     return response.status(401).json({ error: "Not authorized" })
    }

    todo.merge(data)

    await todo.save()

    return todo
  }

  /**
   * Delete a todo with id.
   * DELETE todos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response, auth }) {
    const todo = await Todo.findOrFail(params.id)

    if(todo.user_id !== auth.user.id) {
      return response.status(401).json({ error: "Not authorized" })
    }

    await todo.delete()
  }
}

module.exports = TodoController
