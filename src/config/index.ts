import * as env from 'env-var'

export const APP_SECRET = env.get('APP_SECRET').required().asString()
export const PORT = env.get('PORT').required().asPortNumber()