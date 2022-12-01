import { Client, Account } from 'appwrite'

const client = new Client()
const account = new Account(client)

const url = {
	oauth: {
		success: 'http://localhost:5173/oauth/success',
		failure: 'http://localhost:5173/oauth/failure'
	}
}

client.setEndpoint('http://localhost/v1').setProject('638871b363904655d784')

export default client
export { client, account, url }
