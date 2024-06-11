import { Album } from '../model/Album.js'

class AlbumRepositery {
  constructor(Album){
    this.Album = Album;
  }
  
  async getAlbums() {
    try {
      const result = await Album.find().populate("artist")
      return result
    } catch (e) {
      console.log(`AlbumRepositery - Error at getAlbums()`, e)
      throw e
    }
  }
  
  async addAlbum(data) {
    try {
       const tracks = data.tracks.split(',')
       data.tracks = tracks
      const newAlbum = new Album({
        name: data.name,
        image: data.image,
        artist: data.artist,
        featured: data.featured || '',
        releaseDate: data.releasedDate,
        tracks: data.tracks,
        links: data.links,
      })
       await newAlbum.save()
      return newAlbum
    } catch (e) {
      console.log(`AlbumRepositery - Error at addAlbum()`, e)
      throw e
    }
  }
  
  async updateAlbum(id, data) {
    try {
      const updatedAlbum = await Album.findOneAndUpdate( { _id: id }, data )
      return updatedAlbum
    } catch (e) {
      console.log(`AlbumRepositery - Error at updateAlbum()`, e)
      throw e
    }
  }
  
  async getAlbumById(albumId) {
    try {
      return await Album.findById(albumId)
    } catch (e) {
      console.log(`AlbumRepositery - Error at getAlbumById()`, e)
      throw e
    }
  }
  
  async getAlbumsByArtistId(artistId) {
    try {
      const albums = await Album.find({ artist: artistId }).populate('artist')
      console.log(albums)
      return albums
    } catch (e) {
      console.log(`AlbumRepositery - Error at getAlbumByArtistId()`, e)
      throw e
    }
  }
  
  async deleteAlbum(albumId) {
    try {
      return await Album.deleteOne({_id: albumId})
    } catch (e) {
      console.log(`AlbumRepositery - Error at deleteAlbum()`, e)
      throw e
    }
  }
}

const albumRepositery = new AlbumRepositery(Album)

export { albumRepositery }