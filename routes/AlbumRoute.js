import express from "express";
const router = express();

import send from "../util/customResponse.js";
import { albumService } from "../service/AlbumService.js";

router.get("/", async (req, res) => {
  try {
    const results = await albumService.getAlbums();
    send.success(res, results);
  } catch (e) {
    send.exception(res, e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const album = await albumService.getAlbumById(req.params.id);
    send.success(res, album);
  } catch (e) {
    send.exception(res, e);
  }
});
router.get("/searchByArtist/:id", async (req, res) => {
  try {
    // retrives all albums made by the requested artist
    const album = await albumService.getAlbumsByArtistId(req.params.id);
    send.success(res, album);
  } catch (e) {
    send.exception(res, e);
  }
});

router.get("/search/:name", async (req, res) => {
  //
  try {
    const albums = await albumService.searchAlbumsByName(req.params.name);
    if (albums.length > 0) send.success(res, albums);
    else send.notFound(res, null, "No Albums Found");
  } catch (e) {
    send.exception(res, e);
  }
});

export default router;
