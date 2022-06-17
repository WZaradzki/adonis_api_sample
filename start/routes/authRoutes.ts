import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/me', 'auth/AuthController.me')
  Route.post('/login', 'auth/AuthController.login')
  Route.post('/logout', 'auth/AuthController.logout')
  Route.post('/create', 'adminApi/UsersController.create')
}).prefix('/auth')
