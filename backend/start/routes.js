'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/users', 'UserController.index')
Route.post('/users', 'UserController.store')

Route.post('/sessions', 'SessionController.create')

Route.resource('categorys', 'CategoryController').apiOnly().middleware('auth')

Route.group(() => {
  Route.resource('todos', 'TodoController').apiOnly().except(['store'])
  Route.post('/categorys/:id/todos', 'TodoController.store')
}).middleware('auth')