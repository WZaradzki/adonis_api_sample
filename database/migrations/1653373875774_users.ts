import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.string('name')
      table.string('surname')
      table.text('bio').nullable()
      table.string('img_url').nullable()

      table
        .uuid('role_id')
        .references('id')
        .inTable('roles')
        .onDelete('cascade')
        .onUpdate('cascade')
        .nullable()

      table.string('email', 255).notNullable()
      table.string('password').notNullable()
      table.string('remember_me_token').nullable()

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
