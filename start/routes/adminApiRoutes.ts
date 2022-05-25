import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'adminApi/UsersController.list')
    Route.get('/:id', 'adminApi/UsersController.single')
    Route.post('/', 'adminApi/UsersController.create')
    Route.put('/:id', 'adminApi/UsersController.update')
  }).prefix('/users')
  Route.group(() => {
    Route.get('/', 'adminApi/RolesController.list')
    Route.get('/:id', 'adminApi/RolesController.single')
    Route.post('/', 'adminApi/RolesController.create')
    Route.put('/:id', 'adminApi/RolesController.update')
  }).prefix('/roles')
  Route.group(() => {
    Route.get('/', 'adminApi/BlogPostsController.list')
    Route.get('/:id', 'adminApi/BlogPostsController.single')
    Route.post('/', 'adminApi/BlogPostsController.create')
    Route.put('/:id', 'adminApi/BlogPostsController.update')
  }).prefix('/blog-posts')
})
  .prefix('/admin')
  .middleware('auth:api')
