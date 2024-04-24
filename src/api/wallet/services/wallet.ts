/**
 * wallet service
 */
import { factories, Strapi } from '@strapi/strapi'
import * as crypto from 'crypto'

function services({ strapi }: { strapi: Strapi }) {
    return {
        nonce() {
            const nonce = crypto.randomBytes(16).toString('base64').slice(0, 8)
            console.log(nonce)
            return nonce
        }
    }
}

export default factories.createCoreService('api::wallet.wallet', services)
