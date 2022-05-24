import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login', 'auth/AuthController.login')
  Route.post('/logout', 'auth/AuthController.logout')
  Route.post('/create', 'adminApi/UsersController.create')
}).prefix('/auth')
