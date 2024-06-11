import express from "express";
import { albumService } from "../../service/AlbumService.js";
import send from "../../util/customResponse.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // const result = await albumService.addAlbum(req.body);
    const result = req.body
    console.log(result)
    setTimeout(() => {
      send.success(res, result, "Album Added");
    }, 2000)
  } catch (e) {
    send.exception(res, e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await albumService.deleteAlbum(req.params.id)
    if(result) send.success(res, result, "Album Deleted")
    else throw Error(`Couldn't delete try again`)
  } catch (e) {
    send.exception(res, e)
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const result = await albumService.updateAlbum(req.params.id, req.body)
    console.log(result)
    if(result) send.success(res, result, "Album Updated")
    else throw Error(`Couldn't update try again`)
  } catch (e) {
    send.exception(res, e)
  }
})

export default router;
