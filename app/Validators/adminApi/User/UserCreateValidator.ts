import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

import Role from 'App/Models/Role'
import User from 'App/Models/User'

export default class UserCreateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    roleId: schema.string.nullableAndOptional({}, [
      rules.exists({
        table: Role.TABLE,
        column: Role.ID,
      }),
    ]),
    name: schema.string(),
    surname: schema.string(),
    email: schema.string({}, [
      rules.email(),
      rules.unique({ table: User.TABLE, column: User.EMAIL }),
    ]),
    password: schema.string({}, [rules.confirmed(), rules.minLength(6)]),
  })

  public messages: CustomMessages = {}
}
