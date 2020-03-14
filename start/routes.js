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

Route.get('/', () => {
  return { Application: 'Guia de Restaurante' }
})

Route.get('/welcome', () => {
  return { welcome: 'Seja bem vindo(a)!' }
})

Route.post('/register', 'AuthController.register')
Route.post('/authenticate', 'AuthController.authenticate')

Route.get('/restaurants', 'RestaurantController.index')
Route.get('/restaurantAddresses', 'RestaurantAddressController.index')
Route.get('/restaurantMenus', 'RestaurantMenuController.index')

Route.group(() => {
  Route.resource('restaurants', 'RestaurantController').apiOnly().except('index')
  Route.resource('restaurantAddresses', 'RestaurantAddressController').apiOnly().except('index')
  Route.resource('restaurantMenus', 'RestaurantMenuController').apiOnly().except('index')
}).middleware('auth')


Route.post('upload', 'FileController.store')
Route.get('upload/:id/:filename', 'FileController.view')
Route.get('upload/:id', 'FileController.listFiles')