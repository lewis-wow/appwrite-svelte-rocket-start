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
		success: `${import.meta.env.VITE_HOSTNAME}/oauth/success`,
		failure: `${import.meta.env.VITE_HOSTNAME}/oauth/failure`
	}
}

client.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT).setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)

export default client
export { client, account, url, databases, storage, teams, functions, locale, avatars }
