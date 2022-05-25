import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'blog_posts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('meta_title').nullable()
      table.text('meta_description').nullable()
      table.string('title')
      table.text('text')

      table
        .uuid('user_id')
        .references('id')
        .inTable('users')
        .onDelete('cascade')
        .onUpdate('cascade')
        .nullable()

      table.boolean('enabled').defaultTo(0)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
