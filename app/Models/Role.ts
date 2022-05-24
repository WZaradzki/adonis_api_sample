import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async makeUuid(role: Role) {
    role.id = uuidv4()
  }

  public static TABLE = 'roles'
  public static ID = 'id'
  public static NAME = 'name'
  public static CREATED_AT = 'createdAt'
  public static UPDATED_AT = 'updatedAt'
}
