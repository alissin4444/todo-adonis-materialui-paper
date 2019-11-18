'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with categories
 */

 const Category = use('App/Models/Category')

class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({auth}) {
    const categories = await Category.query().where('user_id', auth.user.id).fetch()
    return categories
  }

  /**
   * Create/save a new category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({auth, request }) {
    const { id } = auth.user

    const data = request.only(['title'])

    const category = await Category.create({...data, user_id: id})

    return category
  }

  /**
   * Display a single category.
   * GET categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, auth, response }) {
    const { id } = params;
    
    const category = await Category.findOrFail(id)

    await category.load('todos')

    if(category.user_id !== auth.user.id) {
      return response.status(401).json({ error: 'not authorized' })
    }
    return category
  }

  /**
   * Update category details.
   * PUT or PATCH categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    const data = request.only(['title'])
    const category = await Category.find(params.id)
    
    if(category.user_id !== auth.user.id) {
     return response.status(401).json({ error: "Not authorized" })
    }

    category.merge(data)

    await category.save()

    return category
  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
    const category = await Category.findOrFail(params.id)

    if(category.user_id !== auth.user.id) {
      return response.status(401).json({ error: "Not authorized" })
    }

    await category.delete()
  }
}

module.exports = CategoryController
