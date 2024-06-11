import express from "express";
import { videoClipService } from "../../service/VideoClipService.js";
import send from "../../util/customResponse.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const result = await videoClipService.addVideoClip(req.body);
    console.log(result)
    send.success(res, result, "VideoClip Added");
  } catch (e) {
    send.exception(res, e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await videoClipService.deleteVideoClip(req.params.id)
    if(result) send.success(res, result, "VideoClip Deleted")
    else throw Error(`Couldn't delete try again`)
  } catch (e) {
    send.exception(res, e)
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const result = await videoClipService.updateVideoClip(req.params.id, req.body)
    if(result) send.success(res, result, "VideoClip Updated")
    else throw Error(`Couldn't update try again`)
  } catch (e) {
    send.exception(res, e)
  }
})

export default router;
