import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

import { BaseModel, beforeCreate, BelongsTo, belongsTo, column, scope } from '@ioc:Adonis/Lucid/Orm'

import User from 'App/Models/User'

export default class BlogPost extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public metaTitle: string

  @column()
  public title: string

  @column()
  public metaDescription: string

  @column()
  public text: string

  @column()
  public userId: string

  @column()
  public enabled: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async makeUuid(blogPost: BlogPost) {
    blogPost.id = uuidv4()
  }

  public static TABLE = 'blog_posts'
  public static ID = 'id'
  public static TITLE = 'title'
  public static META_TITLE = 'metaTitle'
  public static META_DESCRIPTION = 'metaDescription'
  public static TEXT = 'text'
  public static USER_ID = 'userId'
  public static CREATED_AT = 'createdAt'
  public static UPDATED_AT = 'updatedAt'

  @belongsTo(() => User, {
    foreignKey: BlogPost.USER_ID,
  })
  public user: BelongsTo<typeof User>
}
