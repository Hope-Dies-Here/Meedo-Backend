import { Artist } from '../model/Artist.js'

class ArtistRepositery {
  constructor(Artist){
    this.Artist = Artist;
  }
  
  async getArtists() {
    try {
      return await Artist.find() 
      
    } catch (e) {
      console.log(`ArtistRepositery - Error at getArtists()`, e)
      return Promise.reject(e);
      throw e
    }
  }
  
  async getArtistWorks(artistId) {
    // albums and singles made by the artist
  }
  
  async addArtist(data) {
    try {
      console.log(data)
      const newArtist = new Artist({
        name: data.name,
        quote: data.quote,
        profileImage: data.profileImage,
        coverImage: data.coverImage,
        signedDate: data.signedDate,
        biography: data.biography,
      })
      return await newArtist.save()
    } catch (e) {
      console.log(`ArtistRepositery - Error at addArtist()`, e)
      throw e
    }
  }
  
  async updateArtist(data) {
    try {
      const updatedArtist = await Artist.findOneAndUpdate( { id: data._id }, data )
      return updatedArtist
    } catch (e) {
      console.log(`ArtistRepositery - Error at updatedArtist()`, e)
      throw e
    }
  }
  
  async getArtistById(artistId) {
    try {
      return await Artist.findById(artistId)
    } catch (e) {
      console.log(`ArtistRepositery - Error at getArtistById()`, e)
      throw e
    }
  }
  
  async deleteArtist(artistId) {
    try {
      return await Artist.deleteOne({_id: artistId})
    } catch (e) {
      console.log(`ArtistRepositery - Error at deleteArtist()`, e)
      throw e
    }
  }
}

const artistRepositery = new ArtistRepositery(Artist)

export { ArtistRepositery, artistRepositery }