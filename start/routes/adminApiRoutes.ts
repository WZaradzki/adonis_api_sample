import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'adminApi/UsersController.list')
    Route.post('/', 'adminApi/UsersController.create')
    Route.put('/:id', 'adminApi/UsersController.update')
  }).prefix('/users')
})
  .prefix('/admin')
  .middleware('auth:api')
