import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthorListValidator from 'App/Validators/adminApi/User/UserListValidator'

import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

export default class AuthorsController {
  public async list({ request }: HttpContextContract) {
    const payload = await request.validate(AuthorListValidator)

    let query = Database.query().from(User.TABLE)

    if (payload.search) {
      query = query.where(User.NAME, 'like', `%${payload.search}%`)
    }

    return await query
  }

  public async create({}: HttpContextContract) {}

  //   public async store({ }: HttpContextContract) { }

  //   public async show({ }: HttpContextContract) { }

  //   public async edit({ }: HttpContextContract) { }

  //   public async update({ }: HttpContextContract) { }

  //   public async destroy({ }: HttpContextContract) { }
}
