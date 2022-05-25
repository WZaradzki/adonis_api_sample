import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import BlogPost from 'App/Models/BlogPost'
import User from 'App/Models/User'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({}, [rules.unique({ table: BlogPost.TABLE, column: BlogPost.TITLE })]),
    metaTitle: schema.string(),
    metaDescription: schema.string(),
    text: schema.string(),
    userId: schema.string({}, [rules.exists({ table: User.TABLE, column: User.ID })]),
    enabled: schema.boolean(),
  })

  public messages: CustomMessages = {}
}
