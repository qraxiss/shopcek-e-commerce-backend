/**
 * earn service
 */

import { factories, Strapi } from '@strapi/strapi'
import moment from 'moment'

function services({ strapi }: { strapi: Strapi }) {
    const mainService = 'api::earn.earn'

    const serviceUID = (service) => {
        return `api::earn-${service}.earn-${service}`
    }

    return {
        async createEarnForUser({ id }) {
            return await strapi.entityService.create(mainService, {
                data: {
                    user: id,
                    sessionStart: new Date(),
                    xp: 0
                }
            })
        },

        async claim({ service, earn }: { service: string; earn: number }) {
            const lastClaim = await strapi.service(mainService).getLastClaim({ service, earn })

            async function createClaim() {
                //@ts-ignore
                return await strapi.entityService.create(serviceUID(service), {
                    data: {
                        earn
                    }
                })
            }

            if (!lastClaim) {
                return createClaim()
            }

            if (moment().diff(moment(lastClaim.createdAt), 'seconds') <= 1) {
                throw new Error("You can't claim before 24 hours!")
            }

            return createClaim()
        },

        async getLastClaim({ service, earn }: { service: string; earn: number }) {
            service = serviceUID(service)

            return await strapi.db.query(service).findOne({
                where: {
                    earn
                },
                orderBy: { id: 'desc' }
            })
        },

        async getStreak({ service, earn }: { service: string; earn: number }) {
            const count = (
                await strapi.db.query(serviceUID(service)).findMany({
                    filters: {
                        earn
                    }
                })
            ).length

            const mod = count % 7

            return mod
        },


        async startSessionTime({earn}){
            return await strapi.entityService.update(mainService, earn, {
                data: {
                    sessionStart: new Date()
                }
            })
        }
    }
}

export default factories.createCoreService('api::earn.earn', services)
