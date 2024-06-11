import { artistRepositery } from '../repositery/ArtistRepositery.js'

class ArtistService {
  constructor(artistRepositery){
    this.artistRepositery = artistRepositery;
  }
  
  async getArtists() {
    /*
      pagination code goes here
    */
    try {
    const artists = await artistRepositery.getArtists()
    
    return artists
      /* code */
    } catch (e) {
      return Promise.reject(e);
    }
  }
  
  async getArtistById(artistId) {
    try {
      const artist = await artistRepositery.getArtistById(artistId)
      return artist || null
    } catch (e) {
      console.log(`ArtistService - Error at getArtistById()`, e)
      throw e
    }
  }
  
  async searchArtistByName(name) {
    try {
      const artists = await artistRepositery.getArtists()
      const filteredArtist = artists.filter(artist => artist.name === name)
      return filteredArtist
    } catch (e) {
      console.log(`ArtistService - Error at searchArtistByName()`, e)
      throw e
    }
  }
  
  async addArtist(data) {
    return await artistRepositery.addArtist(data)
  }
  
  async updateArtist(data) {
    return await artistRepositery.updateArtist(data)
  }
  async deleteArtist(artistId) {
    return await artistRepositery.deleteArtist(artistId)
  }
}

const artistService = new ArtistService(artistRepositery)
export { artistService }