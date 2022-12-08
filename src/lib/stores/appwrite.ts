import { Client, Account, Databases, Storage, Teams, Functions, Locale, Avatars } from 'appwrite'
import settings from '../appwriteSettings'

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

client.setEndpoint(settings.endpoint).setProject(settings.project)

export default client
export { client, account, url, databases, storage, teams, functions, locale, avatars }
