import axios from 'axios'
import { config } from 'dotenv'

config()

export default axios.create({
    baseURL: 'https://api.printful.com',
    headers: {
        Authorization: `Bearer ${process.env.PRINTFUL_TOKEN}`,
        'X-PF-Store-Id': process.env.PRINTFUL_STORE_ID
    },
    withCredentials: true
})
