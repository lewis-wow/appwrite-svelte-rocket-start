import { register, init, getLocaleFromNavigator, isLoading, locale, locales } from 'svelte-i18n'
import registers from './locales/languages'

Object.entries(registers).forEach(([key, file]) => register(key, file))

export const i18n = () => init({
	fallbackLocale: 'en',
	initialLocale: getLocaleFromNavigator(),
})

export { isLoading, locale, locales }
