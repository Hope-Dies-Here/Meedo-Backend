import express from 'express'
const router = express()

/* import auth middleware here */

import send from '../../util/customResponse.js'
import { artistService } from '../../service/ArtistService.js'

router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    // const newArtist = await artistService.addArtist(req.body)
    send.success(res, req.body)
  } catch (e) {
    send.exception(res, e)
  }
})

router.patch("/:id", async (req, res) => {
  try {
    // const updated = await artistService.updateArtist(req.params.id)
    const updated = req.body
    console.log(updated)
    send.success(res, updated)
  } catch (e) {
    send.exception(res, e)  
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await artistService.deleteArtist(req.params.id)
    send.success(res, deleted)
  } catch (e) {
    send.exception(res, e)  
  }
})

export default router