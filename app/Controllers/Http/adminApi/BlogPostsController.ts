import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CreateValidator from 'App/Validators/adminApi/BlogPost/CreateValidator'
import ListValidator from 'App/Validators/adminApi/BlogPost/ListValidator'
import UpdateValidator from 'App/Validators/adminApi/BlogPost/UpdateValidator'

import User from 'App/Models/User'
import BlogPost from 'App/Models/BlogPost'

export default class UsersController {
  public async list({ request }: HttpContextContract) {
    const payload = await request.validate(ListValidator)

    return await BlogPost.query()
      .preload('user')
      .if(payload.search, (query) => {
        query.whereILike(BlogPost.TITLE, `%${payload.search}%`).orWhereHas('user', (userQuery) => {
          userQuery
            .whereILike(User.NAME, `%${payload.search}%`)
            .orWhereILike(User.SURNAME, `%${payload.search}%`)
            .orWhereILike(User.EMAIL, `%${payload.search}%`)
        })
      })
      .paginate(payload.page ?? 1, payload.perPage ?? 10)
      .then((response) => {
        return response.serialize()
      })
  }

  public async single({ params }: HttpContextContract) {
    return await BlogPost.query()
      .preload('user')
      .where(BlogPost.ID, params.id)
      .firstOrFail()
      .then((blogPost) => {
        return blogPost.serialize()
      })
  }

  public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateValidator)

    return await BlogPost.create(payload).then((blogPost) => {
      return {
        status: response.status(201),
        blogPost: blogPost,
      }
    })
  }

  public async update({ params, request }: HttpContextContract) {
    const blogPost = await BlogPost.findOrFail(params.id)
    const payload = await request.validate(UpdateValidator)

    return await blogPost
      .merge(payload)
      .save()
      .then((user) => {
        return user.serialize()
      })
      .catch((error) => {
        throw error
      })
  }
}
