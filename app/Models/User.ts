import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import BlogPost from 'App/Models/BlogPost'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public surname: string

  @column()
  public bio?: string

  @column()
  public imgUrl?: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  public static TABLE = 'authors'
  public static NAME = 'name'
  public static SURNAME = 'surname'
  public static BIO = 'bio'
  public static IMG_URL = 'imgUrl'
  public static CREATED_AT = 'createdAt'
  public static UPDATED_AT = 'updatedAt'

  @hasMany(() => BlogPost, {
    foreignKey: BlogPost.USER_ID,
  })
  public blogPosts: HasMany<typeof BlogPost>
}
