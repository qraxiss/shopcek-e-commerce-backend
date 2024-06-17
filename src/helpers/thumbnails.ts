import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import os from 'os'
import ffmpeg from 'fluent-ffmpeg'
import _ from 'lodash'

export async function getScreenshot(videoData) {
    const videoFileName = `${videoData.hash}${videoData.ext}`
    const videoPath = path.join(__dirname, '../../../public', `/uploads/${videoFileName}`)

    const tmpPath = path.join(__dirname, '../../../public/uploads/thumbnails')
    const screenshotExt = '.png'
    const screenshotFileName = videoData.hash + screenshotExt
    const screenshotPath = path.join(tmpPath, screenshotFileName)

    const relativePath = `/uploads/thumbnails/${screenshotFileName}`
    if (fs.existsSync(screenshotPath)) {
        return relativePath
    }

    ffmpeg(videoPath).screenshots({
        count: 1,
        filename: screenshotFileName,
        folder: tmpPath
    })

    return relativePath
}

// export async function syncThumbnails() {
//     const products = await strapi.entityService.findMany('api::product.product', {
//         populate: {
//             video: true
//         }
//     })

//     const videos = products.filter((product) => !!product.video).map((product) => product.video)

//     return await Promise.all(
//         videos.map(async (video) => {
//             const previewUrl = await getScreenshot(video)
//             return await strapi.services['plugin::upload.upload'].update(video.id, {
//                 previewUrl
//             })
//         })
//     )
// }
