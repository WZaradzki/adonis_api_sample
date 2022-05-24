import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login', 'adminApi/UsersController.login')
}).prefix('/auth')
