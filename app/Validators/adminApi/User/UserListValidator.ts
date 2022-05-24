import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthorListValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    search: schema.string.nullableAndOptional(),
  })
}
