import { Admin } from '../model/Admin.js'

class AdminRepository {

	async createAdmin (body) {
		try {
			return await Admin.create(body)
		} catch (err) {
			console.log(err)
			throw err
		}
	}

	async findByUsername (username) {
		return await Admin.findOne({ username }) 
	} 
}

const adminRepository = new AdminRepository()
export { adminRepository }
