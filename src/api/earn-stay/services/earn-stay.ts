/**
 * earn-stay service
 */

import { factories, Strapi } from '@strapi/strapi';

function services({strapi}: {strapi:Strapi}){
    const service = 'api::earn-stay.earn-stay'
    
    return {

        

    }
}

export default factories.createCoreService('api::earn-stay.earn-stay');
