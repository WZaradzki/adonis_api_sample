import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'

import UserCreateValidator from 'App/Validators/adminApi/User/UserCreateValidator'
import UserLoginValidator from 'App/Validators/adminApi/User/UserLoginValidator'
import UserListValidator from 'App/Validators/adminApi/User/UserListValidator'

import User from 'App/Models/User'

export default class UsersController {
  public async list({ request }: HttpContextContract) {
    const payload = await request.validate(UserListValidator)

    return await User.query()
      .if(payload.search, (query) => {
        query.withScopes((scopes) => scopes.searchFor(payload.search))
      })
      .paginate(payload.page ?? 1, payload.perPage ?? 10)
      .then((response) => {
        return response.serialize()
      })
  }

  public async create({ request }: HttpContextContract) {
    const payload = await request.validate(UserCreateValidator)

    return await User.create({
      name: payload.name,
      surname: payload.surname,
      email: payload.email,
      password: await Hash.make(payload.password),
    })
  }

  public async login({ request, auth, response }: HttpContextContract) {
    const payload = await request.validate(UserLoginValidator)

    try {
      return await auth.attempt(payload.email, payload.password, {
        expiresIn: '1hour',
      })
    } catch (error) {
      return error
    }
  }

  public async update({ params, request }: HttpContextContract) {
    return request
  }
}
