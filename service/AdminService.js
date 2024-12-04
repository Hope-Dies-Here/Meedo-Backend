import { adminRepository } from '../repositery/AdminRepository.js'
import bcrypt from 'bcrypt'

class AdminService {
	async login(username, password) {
		const admin = await adminRepository.findByUsername(username)

		if(!admin) {
			const error = new Error("No admin by this username!")
			error.code = 404
			throw error
		}

		const isMatch = await bcrypt.compare(password, admin.password)

		if(!isMatch) {
			const error = new Error("Invalid Username or Password!")
			error.code = 401
			throw error
		}

		return { admin }
	}

	async registerAdmin(body) {
		try {
			return await adminRepository.createAdmin(body)
		} catch (err) {
			throw err
		}
	}
}

const adminService = new AdminService()
export { adminService }