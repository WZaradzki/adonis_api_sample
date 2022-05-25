import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import UserCreateValidator from 'App/Validators/adminApi/User/UserCreateValidator'
import UserListValidator from 'App/Validators/adminApi/User/UserListValidator'

import User from 'App/Models/User'
import UserUpdateValidator from 'App/Validators/adminApi/User/UserUpdateValidator'
import Role from 'App/Models/Role'

export default class UsersController {
  public async list({ request }: HttpContextContract) {
    const payload = await request.validate(UserListValidator)

    return await User.query()
      .preload('role', (query) => {
        query.select([Role.ID, Role.NAME])
      })
      .if(payload.search, (query) => {
        query.withScopes((scopes) => scopes.searchFor(payload.search))
      })
      .paginate(payload.page ?? 1, payload.perPage ?? 10)
      .then((response) => {
        return response.serialize()
      })
  }

  public async single({ request, params, response }: HttpContextContract) {
    return await User.query()
      .preload('role', (query) => {
        query.select([Role.ID, Role.NAME])
      })
      .where(User.ID, params.id)
      .firstOrFail()
      .then((user) => {
        return user.serialize()
      })
  }

  public async create({ request }: HttpContextContract) {
    const payload = await request.validate(UserCreateValidator)

    return await User.create({
      name: payload.name,
      surname: payload.surname,
      email: payload.email,
      password: payload.password,
    })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    const payload = await request.validate(UserUpdateValidator)

    return await user
      .merge({
        [User.NAME]: payload.name ?? user[User.NAME],
        [User.SURNAME]: payload.surname ?? user[User.SURNAME],
        [User.EMAIL]: payload.email ?? user[User.EMAIL],
        [User.BIO]: payload.bio ?? user[User.BIO],
        [User.IMG_URL]: payload.imgUrl ?? user[User.IMG_URL],
        [User.ROLE_ID]: payload.roleId ?? user[User.ROLE_ID],
        [User.PASSWORD]: payload.password ?? user[User.PASSWORD],
      })
      .save()
      .then((user) => {
        return user.serialize()
      })
      .catch((error) => {
        throw error
      })
  }
}
