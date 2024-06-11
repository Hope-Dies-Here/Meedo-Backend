import { VideoClip } from '../model/VideoClip.js'

class VideoClipRepositery {
  constructor(VideoClip) {
    this.VideoClip = VideoClip;
  }
  
  async getVideoClips() {
    try {
      const result = await VideoClip.find().populate("artist")
      return result
    } catch (e) {
      console.log(`VideoClipRepositery - Error at getVideoClips()`, e)
      throw e
    }
  }
  
  async getVideoClipsByArtistId(artistId) {
    try {
      return await VideoClip.find({ artist: artistId })
    } catch (e) {
      console.log(`VideoClipRepositery - Error at getVideoClipByArtistId()`, e)
      throw e
    }
  }
  
  async getSingles() {
    try {
      // get single songs only 
      return VideoClip.find({ isNewSong: true }).populate("artist")
    } catch (e) {
      console.log(`VideoClipRepositery - Error at getsingles()`, e)
      throw e
    }
  }
  
  async addVideoClip(data) {
    try {
      const newVideoClip = new VideoClip({
        name: data.name,
        image: data.image,
        artist: data.artist,
        featured: data.featured || '',
        releaseDate: data.releasedDate,
        links: data.links,
        isNewSong: data.isNewSong
      })
      // return newVideoClip
    const result = await newVideoClip.save()
      
      return newVideoClip
    } catch (e) {
      console.log(`VideoClipRepositery - Error at addVideoClip()`, e)
      throw e
    }
  }
  
  async updateVideoClip(data) {
    try {
      const updatedVideoClip = await VideoClip.findOneAndUpdate( { _id: data._id }, data )
      console.log(updatedVideoClip)
    } catch (e) {
      console.log(`VideoClipRepositery - Error at updateVideoClip()`, e)
      throw e
    }
  }
  
  async getVideoClipById(VideoClipId) {
    try {
      return await VideoClip.findById(VideoClipId).populate("artist")
    } catch (e) {
      console.log(`VideoClipRepositery - Error at getVideoClipById()`, e)
      throw e
    }
  }
  
  async deleteVideoClip(VideoClipId) {
    try {
      return await VideoClip.deleteOne(VideoClipId)
    } catch (e) {
      console.log(`VideoClipRepositery - Error at deleteVideoClip()`, e)
      throw e
    }
  }
}

const videoClipRepositery = new VideoClipRepositery(VideoClip)

export { videoClipRepositery }