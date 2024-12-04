import { param, body, validationResult } from 'express-validator'
import { verifyToken } from '../middlewares/authorize.js'
import express from 'express'

const router = express()

import send from '../util/customResponse.js'
import { artistService } from '../service/ArtistService.js'

router.get("/", async (req, res) => {
    try {
        console.log('requested')
        const results = await artistService.getArtists()
        setTimeout(function() {
            
        }, 1000);
        send.success(res, results)
    } catch (e) {
        send.exception(res, e)
    }
})

router.get("/:id", [
    param('id').isMongoId().withMessage('Invalid Id'),
    async (req, res) => {
        try {
            // check for validation err
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                console.log(errors)
                return send.badRequest(res, errors.errors)
            }

            // validation passed
            const artist = await artistService.getArtistById(req.params.id)

            if (artist)
                send.success(res, artist)
            else
                send.notFound(res, null, 'No Artist Found')
        } catch (e) {
            send.exception(res, e)
        }
    }
])

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

// add new artist
router.post('/', verifyToken, async (req, res) => {
    try {
        console.log(req.body)
        const newArtist = await artistService.addArtist(req.body)
        // send.success(res, req.body)
        send.created(res, newArtist)
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