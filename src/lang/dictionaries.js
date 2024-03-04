import 'server-only'

const dictionaries = {
    en: () => import('@/dictionaries/en.json').then((module) => module.default),
    cz: () => import('@/dictionaries/cz.json').then((module) => module.default),
}

export const getDictionary = async (locale) => dictionaries[locale]()