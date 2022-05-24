import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Role from 'App/Models/Role'

export default class UserUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    roleId: schema.string.nullableAndOptional({}, [
      rules.exists({
        table: Role.TABLE,
        column: Role.ID,
      }),
    ]),
    name: schema.string.nullableAndOptional(),
    surname: schema.string.nullableAndOptional(),
    bio: schema.string.nullableAndOptional(),
    imgUrl: schema.string.nullableAndOptional(),
    email: schema.string.nullableAndOptional({}, [
      rules.email(),
      rules.unique({
        table: User.TABLE,
        column: User.EMAIL,
        whereNot: { [User.ID]: this.ctx.params.id },
      }),
    ]),
    password: schema.string.nullableAndOptional({}, [rules.confirmed(), rules.minLength(6)]),
  })

  public messages: CustomMessages = {}
}
