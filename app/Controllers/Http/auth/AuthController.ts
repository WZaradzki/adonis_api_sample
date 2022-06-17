import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/auth/LoginValidator'

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const payload = await request.validate(LoginValidator)

    let token
    try {
      token = await auth.use('api').attempt(payload.email, payload.password, {
        expiresIn: '1day',
      })
    } catch (error) {
      throw error
    }

    return {
      authToken: token,
      me: auth.user?.serialize(),
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return {
      revoked: true,
    }
  }

  public async me({ auth }: HttpContextContract) {
    return await auth.user?.serialize()
  }
}
