/**
 * earn-spin service
 */

import { factories, Strapi } from '@strapi/strapi';

function services({strapi}: {strapi:Strapi}){
    const service = 'api::earn-spin.earn-spin'
    
    return {

        

    }
}


export default factories.createCoreService('api::earn-spin.earn-spin');
