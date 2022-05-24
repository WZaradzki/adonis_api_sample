import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.unique({
        table: Role.TABLE,
        column: Role.NAME,
        whereNot: { [Role.ID]: this.ctx.params.id },
      }),
    ]),
  })

  public messages: CustomMessages = {}
}
