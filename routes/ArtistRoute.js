import express from 'express'
const router = express()

import send from '../util/customResponse.js'
import { artistService } from '../service/ArtistService.js'

router.get("/", async (req, res) => {
  try {
    const results = await artistService.getArtists()
    send.success(res, results)
  } catch (e) {
    send.exception(res, e)
  }
})

router.get("/:id", async (req, res) => {
  try {
    const artist = await artistService.getArtistById(req.params.id)

    if (artist)
      send.success(res, artist)
    else
      send.notFound(res, null, 'No Artist Found')
  } catch (e) {
    send.exception(res, e)
  }
})

router.get("/search/:name", async (req, res) => {
  try {
    const artist = await artistService.searchArtistByName(req.params.name)
    if (artist.length > 0)
      send.success(res, artist)
    else 
      send.notFound(res, null, 'No Artists Found')
  } catch (e) {
    send.exception(res, e)
  }
})


router.get('/do/Dummy', async (req, res) => {
  const biography = 'Dummy is a 69 years old hiphop artist. bro came stright from compton.'
  const dummyArtist = {
    name: "Framsis",
    quote: "Believe",
    profileImage: '/img/artists/profile/dummy.jpg',
    coverImage: '/img/artists/cover/dummy.jpg',
    signedDate: Date.now(),
    biography: biography
  }
  
  try {
    //const savedData = await artistService.addArtist(dummyArtist)
    // const savedData = await artistService.updateArtist(dummyArtist)
    send.success(res, savedData, "Artist Updated Succesfully")
  } catch (e) {
    send.exception(res, e)
  }
  
})

export default router