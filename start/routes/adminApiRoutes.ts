import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('authors', 'adminApi/AuthorsController.list')
}).prefix('/admin')
