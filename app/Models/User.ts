import { DateTime, InvalidZone } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  beforeCreate,
  scope,
  belongsTo,
  BelongsTo,
} from '@ioc:Adonis/Lucid/Orm'

import { v4 as uuidv4 } from 'uuid'

import BlogPost from 'App/Models/BlogPost'
import Role from './Role'

export default class User extends BaseModel {
  public static primaryKey = 'uuid'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public roleId: string

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

  @column({ serializeAs: null })
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async makeUuid(user: User) {
    user.id = uuidv4()
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  public static TABLE = 'users'
  public static ID = 'id'
  public static ROLE_ID = 'roleId'
  public static NAME = 'name'
  public static SURNAME = 'surname'
  public static EMAIL = 'email'
  public static PASSWORD = 'password'
  public static BIO = 'bio'
  public static IMG_URL = 'imgUrl'
  public static CREATED_AT = 'createdAt'
  public static UPDATED_AT = 'updatedAt'

  @hasMany(() => BlogPost, {
    foreignKey: BlogPost.USER_ID,
  })
  public blogPosts: HasMany<typeof BlogPost>

  @belongsTo(() => Role, {
    foreignKey: User.ROLE_ID,
  })
  public role: BelongsTo<typeof Role>

  public static searchFor = scope((query, search: string) => {
    query
      .whereILike(this.NAME, `%${search}%`)
      .orWhereILike(this.SURNAME, `%${search}%`)
      .orWhereILike(this.EMAIL, `%${search}%`)
  })
}
