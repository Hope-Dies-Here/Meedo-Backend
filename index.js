import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import artists from './routes/ArtistRoute.js'
import albums from './routes/AlbumRoute.js'
import videoClips from './routes/VideoClipRoute.js'
import artistsAdmin from './routes/admin/ArtistRouteAdmin.js'
import albumsAdmin from './routes/admin/AlbumRouteAdmin.js'
import videoClipsAdmin from './routes/admin/VideoClipAdminRoute.js'
import { connectDatabase } from './config/dbConfig.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const DB_STRING = process.env.DB_STRING

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

connectDatabase(DB_STRING)
  .then(() => {
    app.listen(PORT, console.log(`server started @${PORT}`))
  })
  .catch(() => {
    console.log(`Faild to connnect the database!`)
  })

// routes
app.use("/api/artists/", artists)
app.use("/api/albums/", albums)
app.use("/api/videoClips/", videoClips)

// routes for admin
app.use("/api/artists/admin/", artistsAdmin)
app.use("/api/albums/admin/", albumsAdmin)
app.use("/api/videoClips/admin/", videoClipsAdmin)
