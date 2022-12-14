import http from 'node:http'
import url from 'node:url'

import { addUser, findAllUsers, findById } from './user/user.service'

const PORT = 8080

http.createServer(async (req, res) => {
	if (!req.url) return res.end()

	const parsedUrl = url.parse(req.url, true)
	const pathname = parsedUrl.pathname
	const [, resource, id] = pathname?.split('/') ?? []
	const method = req.method?.toUpperCase() ?? ''

	// GET http://localhost:8080/users
	// GET http://localhost:8080/users/1 [id=1]
	// POST http://localhost:8080/users { name: 'Paperoga' }
	if (resource === 'users') {
		if (method === 'GET') {
			if (id) {
				const user = await findById(id)
				if (user) {
					res.writeHead(200, {
						'Content-Type': 'application/json'
					})
					res.end(JSON.stringify(user))
				} else {
					res.writeHead(404)
					res.end()
				}
			} else {
				res.writeHead(200, {
					'Content-Type': 'application/json'
				})
				const users = await findAllUsers()
				res.end(JSON.stringify(users))
			}
		} else if (method === 'POST') {
			let data = ''
			req
				.on('data', chunk => data += chunk)
				.on('end', async () => {
					// req.headers['content-type'] === 'application/json'
					const user = await addUser(JSON.parse(data))
					res.writeHead(201, {
						'Content-Type': 'application/json'
					})
					res.end(JSON.stringify(user))
				})
				.on('error', error => {
					res.writeHead(500)
					res.end(error.message)
				})
		} else {
			res.writeHead(405)
			res.end()
		}
	} else {
		res.writeHead(404)
		res.end()
	}
})
	.listen(8080)
	.on('listening', () => console.log(`Server ready at http://localhost:${PORT}`))