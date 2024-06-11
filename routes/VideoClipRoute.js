import express from "express";
const router = express();

import send from "../util/customResponse.js";
import { videoClipService } from "../service/VideoClipService.js";

router.get("/", async (req, res) => {
  try {
    const results = await videoClipService.getVideoClips();
    send.success(res, results);
  } catch (e) {
    send.exception(res, e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const videoClip = await videoClipService.getVideoClipById(req.params.id);
    send.success(res, videoClip);
  } catch (e) {
    send.exception(res, e);
  }
});
router.get("/searchByArtist/:id", async (req, res) => {
  try {
    // retrives all videoClips made by the requested artist
    const videoClip = await videoClipService.getVideoClipsByArtistId(req.params.id);
    console.log(videoClip)
    send.success(res, videoClip);
  } catch (e) {
    send.exception(res, e);
  }
});

router.get("/singles", async(req, res) => {
  try {
    const singles = await videoClipService.getSingles()
    send.success(res, singles)
  } catch (e) {
    send.exception(res, e)
  }
})

router.get("/search/:name", async (req, res) => {
  //
  try {
    const videoClips = await videoClipService.searchVideoClipsByName(req.params.name);
    if (videoClips.length > 0) send.success(res, videoClips);
    else send.notFound(res, null, "No VideoClips Found");
  } catch (e) {
    send.exception(res, e);
  }
});

export default router;
