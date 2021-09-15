import bcrypt from  "bcryptjs";
import { secret } from "./variables"
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { IUser } from "../mongodb/models/User";

const encryptPassword = (password: string) => new Promise((resolve, reject) => {
	bcrypt.genSalt(10, (err: Error, salt: string) => {
		if (err) {
			reject(err)
			return false
		}
		bcrypt.hash(password, salt, (err: Error, hash) => {
			if (err) {
				reject(err)
				return false
			}
			resolve(hash)
			return true
		})
	})
})

const comparePassword = (password: string, hash: string) => new Promise(async (resolve, reject) => {
	try {
		const isMatch = await bcrypt.compare(password, hash)
		resolve(isMatch)
		return true
	} catch (err) {
		reject(err)
		return false
	}
})


const createToken = (userId: string) => {
	const token = sign(
		{ userId }, secret, {
			expiresIn: 604800, // 1 Week
	})

	return token
}

const getPayload =  (token: string) => {
		let payload: String | JwtPayload = "";
    try {
				payload = verify(token, secret);
        return { loggedIn: true, payload };
    } catch (err) {
        // Add Err Message
				console.error({err})
        return { loggedIn: false, payload }
    }
}

export {
  createToken,
  getPayload,
  encryptPassword,
  comparePassword
};