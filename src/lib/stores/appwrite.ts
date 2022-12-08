import { Client, Account, Databases, Storage, Teams, Functions, Locale, Avatars } from 'appwrite'

const client = new Client()
const account = new Account(client)
const databases = new Databases(client)
const storage = new Storage(client)
const teams = new Teams(client)
const functions = new Functions(client)
const locale = new Locale(client)
const avatars = new Avatars(client)

const url = {
	oauth: {
		success: 'http://localhost:5173/oauth/success',
		failure: 'http://localhost:5173/oauth/failure'
	}
}

client.setEndpoint('http://localhost/v1').setProject('638871b363904655d784')

export default client
export { client, account, url, databases, storage, teams, functions, locale, avatars }
