import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserListValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    search: schema.string.nullableAndOptional(),
    page: schema.number.nullableAndOptional(),
    perPage: schema.number.nullableAndOptional(),
  })
}
