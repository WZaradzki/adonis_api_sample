import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/auth/LoginValidator'

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const payload = await request.validate(LoginValidator)

    try {
      return await auth.use('api').attempt(payload.email, payload.password, {
        expiresIn: '1day',
      })
    } catch (error) {
      throw error
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return {
      revoked: true,
    }
  }
}
