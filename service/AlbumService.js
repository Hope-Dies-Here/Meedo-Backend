import { albumRepositery } from '../repositery/AlbumRepositery.js'

class AlbumService {
  constructor(albumRepositery){
    this.albumRepositery = albumRepositery;
  }
  
  async getAlbums() {
    /*
      pagination code goes here
    */
    const albums = await albumRepositery.getAlbums()
    return albums
  }
  
  async getAlbumById(albumId) {
    try {
      const album = await albumRepositery.getAlbumById(albumId)
      return album || null
    } catch (e) {
      console.log(`AlbumService - Error at getAlbumById()`, e)
      throw e
    }
  }
  
  async searchAlbumsByName(albumName) {
    try {
      const albums = await albumRepositery.find({ name: albumName })
      return albums
    } catch (e) {
      console.log(`AlbumService - Error at searchAlbumsByName()`, e)
      throw e
    }
  }
  
  async getTracks(albumId) {
    try {
      const results = await albumRepositery.getAlbumById(albumId)
      return results.tracks
    } catch (e) {
      console.log(`AlbumService - Error at getTracks()`, e)
      throw e
    }
  }
  
  async addAlbum(data) {
    try {
      return await albumRepositery.addAlbum(data)
    } catch (e) {
      throw e
    }
  }
  
  async filterAlbumsByArtistId(artistId) {
    const albums = await Album.getAlbums()
    const filetredAlbums = albums.filter(album => album.artist._id == artistId)
    return filetredAlbums
  }
  // or 
  async getAlbumsByArtistId(artistId) {
    return await albumRepositery.getAlbumsByArtistId(artistId)
  }
  
  async updateAlbum(id, data) {
    return await albumRepositery.updateAlbum(id, data)
  }
  async deleteAlbum(albumId) {
    return await albumRepositery.deleteAlbum(albumId)
  }
}

export const albumService = new AlbumService(albumRepositery)