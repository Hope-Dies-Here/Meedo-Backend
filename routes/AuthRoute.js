import express from 'express'
import jwt from 'jsonwebtoken'
import { adminService } from '../service/AdminService.js'
import { verifyToken } from '../middlewares/authorize.js'
import send from "../util/customResponse.js";

const router = express()

router.post("/login", async (req, res) => {
  try {
    const admin = await adminService.login(req.body.username, req.body.password)

    const payload = { id: admin.id, username: admin.username, role: 'admin' }
    const accessKey = process.env.ACCESS_SECRET_KEY
    const refreshKey = process.env.REFRESH_SECRET_KEY
    const secretkey = process.env.SECRET_KEY

    const token = jwt.sign(payload, secretkey, { expiresIn: '1m' })
    res.cookie('authToken', token, { maxAge: 1000 * 60, secure: true, httpOnly: true })

    send.success(res, payload)
  } catch (err) {
    // send error messages according to their err code
    // 401 - password or username didnt match
    if (err.code === 401) {
      return send.unauthorized(res, err)
    }

    // 404 - no username found 
    if (err.code === 404) {
      return send.notFound(res, err)
    }

    // server err
    send.exception(res, err)
  }
})

router.get('/get-cookies', async (req, res) => {
  const cookies = req.cookies

  if (Object.keys(cookies).length === 0) {
    send.notFound(res, new Error("Cookies not found"))
  }
  send.success(res, cookies)
})

router.get('/protected-api', verifyToken, async (req, res) => {
  send.success(res, "Protected Data")
})

router.post('/register', async (req, res) => {
  try {
    const response = await adminService.registerAdmin(req.body)
    send.created(res, response)
  } catch (err) {
    // server err
    send.exception(res, err)
  }
})

router.post('/logout', (req, res) => {
  res.clearCookies
})

export default router