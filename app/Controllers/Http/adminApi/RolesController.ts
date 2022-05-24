import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CreateValidator from 'App/Validators/adminApi/Role/CreateValidator'
import UpdateValidator from 'App/Validators/adminApi/Role/UpdateValidator'

import Role from 'App/Models/Role'

export default class RolesController {
  public async list({}: HttpContextContract) {
    return await Role.query().then((response) => {
      return response.map((role) => {
        role.serialize()
      })
    })
  }

  public async single({ params }: HttpContextContract) {
    return await Role.query()
      .where(Role.ID, params.id)
      .firstOrFail()
      .then((role) => {
        return role.serialize()
      })
  }

  public async create({ request }: HttpContextContract) {
    const payload = await request.validate(CreateValidator)

    return await Role.create({
      [Role.NAME]: payload.name,
    })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const role = await Role.findOrFail(params.id)
    const payload = await request.validate(UpdateValidator)

    return await role
      .merge({
        [Role.NAME]: payload.name ?? role[Role.NAME],
      })
      .save()
      .then((role) => {
        return role.serialize()
      })
      .catch((error) => {
        throw error
      })
  }
}
