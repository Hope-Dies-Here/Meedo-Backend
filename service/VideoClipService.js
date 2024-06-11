import { videoClipRepositery } from '../repositery/VideoClipRepositery.js'

class VideoClipService {
  constructor(videoClipRepositery){
    this.videoClipRepositery = videoClipRepositery;
  }
  
  async getVideoClips() {
    /*
      pagination code goes here
    */
    const videoClips = await videoClipRepositery.getVideoClips()
    return videoClips
  }
  
  async getVideoClipById(videoClipId) {
    try {
      const videoClip = await videoClipRepositery.getVideoClipById(videoClipId)
      return videoClip || null
    } catch (e) {
      console.log(`VideoClipService - Error at getVideoClipById()`, e)
      throw e
      console.log(`VideoClipService - Error at getVideoClipById()`, e)
      throw e
    }
  }
  
  async addVideoClip(data) {
    try {
      return await videoClipRepositery.addVideoClip(data)
    } catch (e) {
      console.log(`VideoClipService - Error at addVideoClip()`, e)
      throw e
    }
  }
  
  async getVideoClipsByArtistId(artistId) {
    return await videoClipRepositery.getVideoClipsByArtistId(artistId)
  }
  // or
  async filterVideoClipsByArtistId(artistId) {
    try {
      const videoClips = await VideoClip.getVideoClips()
      const filetredVideoClips = videoClips.filter(videoClip => videoClip.artist == artistId)
      return filetredVideoClips
    } catch (e) {
      console.log(`ArtistService - Error at filetrVCById()`, e)
      throw e
    }
  }
  
  async updateVideoClip(data) {
    return await videoClipRepositery.updateVideoClip(data)
  }
  async deleteVideoClip(videoClipId) {
    return await videoClipRepositery.deleteVideoClip(videoClipId)
  }
  
  async searchSongsByName(songName) {
    try {
      const songs = await videoClipRepositery.find({ name: songName })
      return songs || null
    } catch (e) {
      console.log(`VCService - Error at searchSongs()`, e)
      throw e
    }
  }
}

export const videoClipService = new VideoClipService(videoClipRepositery)