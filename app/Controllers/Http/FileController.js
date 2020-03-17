'use strict'

const Drive = use('Drive')
const Helpers = use('Helpers')
const Env = use('Env')
const fs = require('fs')
const sharp = require('sharp')
// const imgConvert = require('image-convert')

class FileController {
  async store ({ request, params, response }) {
    if (request.file('picture')) {
      const { id } = request.all()

      if (id && typeof id !== null) {
        const profilePics = request.file('picture', {
          types: ['image'],
          size: '4mb'
        })
    
        if (profilePics._files) {
          profilePics._files.forEach(pic => {
            pic.clientName = pic.tmpPath.substring(5, pic.tmpPath.length - 3)+'png'
          })
          await profilePics.moveAll(`${Helpers._appRoot}/uploads/restaurant_${id}`)
          
          if (!profilePics.movedAll()) {
            return profilePics.errors()
          }
          
          return 'Files moved'
        } else {
          profilePics.clientName = profilePics.tmpPath.substring(5, profilePics.tmpPath.length - 3)+'png'

          await profilePics.move(`${Helpers._appRoot}/uploads/restaurant_${id}`)

          if (!profilePics.moved()) {
            return profilePics.error()
          }

          return 'File moved'
        }
      }

      return response.status(400).send({errorMessage: 'The ID must be informed'})
    }

    return response.status(400).send('File not found')
  }

  async view ({ params, response }) {
    const drive = await Drive.disk('local')
    const id = params.id
    const file = params.filename
    // const finalPath = `${Helpers._appRoot}/uploads/restaurant_${id}/ab-bdb098f9-1006-4dad-96dc-d2bcdd6a0184.png`
    const finalPath = `${Helpers._appRoot}/uploads/restaurant_${id}/${file}`

    return response.download(finalPath)
  }

  async listFiles ({ request, params, response }) {
    // console.log(Helpers.publicPath())
    const id = params.id
    const path = `${Helpers._appRoot}/uploads/restaurant_${id}/`
    const readFiles = fs.readdirSync(path)
    const files = []

    readFiles.forEach((el, i, node) => {
      el = `${Helpers._appRoot}/upload/${id}/${el}`
      files.push(el)
    })
    
    return files
  }
}

module.exports = FileController
