import { register, init, getLocaleFromNavigator, isLoading, locale, locales } from 'svelte-i18n'

register('en', () => import('./en.json'))
register('cs', () => import('./cs.json'))

export const i18n = () => init({
	fallbackLocale: 'en',
	initialLocale: getLocaleFromNavigator(),
})

export { isLoading, locale, locales }
