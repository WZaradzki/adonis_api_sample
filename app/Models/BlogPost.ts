import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Author from 'App/Models/Author'

export default class BlogPost extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public title: string

  @column()
  public text: string

  @column()
  public user_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static TABLE = 'blog_posts'
  public static ID = 'id'
  public static TITLE = 'title'
  public static TEXT = 'text'
  public static USER_ID = 'userId'
  public static CREATED_AT = 'createdAt'
  public static UPDATED_AT = 'updatedAt'

  @belongsTo(() => Author, {
    foreignKey: BlogPost.USER_ID,
  })
  public author: BelongsTo<typeof Author>
}
