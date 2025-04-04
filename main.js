import { collectionMapping, categoryMapping } from './collections.js'

// The shared data object contains the parameters for the scrapers, such as category, number of apps, language, country, price, and filename.
globalThis.sharedData = {
    //if term is set, the scraper will search for apps by name, otherwise it will search by category
    //term is the search term to be used in the search
    term: "news",

    //price is the price to be used in the search (term is not null).
    //The following pramters are available:
    // all: all apps (free and paid)
    // paid: only paid apps
    // free: only free apps
    price: 'all',

    //collection is the collection to be used in the search. For reference to which collection to use, the following link:
    //  For Android: https://github.com/facundoolano/google-play-scraper/blob/b7669f78766b8306896447ddbe8797fe36eae49f/lib/constants.js#L67
    //  For IOS: https://github.com/facundoolano/app-store-scraper/blob/master/lib/constants.js#L3
    //Use the mapper so it works for both Android and IOS. Can be found in collections.js
    collection: collectionMapping.TOP_FREE_IOS,

    //category is the category to be used in the search. For reference to which category to use, the following link:
    //  For Android: https://github.com/facundoolano/google-play-scraper/blob/b7669f78766b8306896447ddbe8797fe36eae49f/lib/constants.js#L10
    //  For IOS: https://github.com/facundoolano/app-store-scraper/blob/master/lib/constants.js#L19
    //Use the mapper so it works for both Android and IOS. Can be found in collections.js
    category: categoryMapping.GAMES_ACTION,

    //Number of apps to be scraped.
    //  The maximum number of apps for google play store using collections should unlimited but when using term is 250
    //  For IOS app store using category is 200 but for using term should be unlimited.
    number_of_apps: 1000,

    //language of the apps to be scraped. For reference to which language to use, the following file:
    language: 'en',

    //country of the apps to be scraped. For reference to which country to use, the following file:
    country: 'us',
    filename: 'apps.json',
    search_android_apps: true,
    search_ios_apps: true,
}

async function runScrapers() {
    if (globalThis.sharedData.search_android_apps) {
        try {
            const playStoreScraper = await import('./play_store_scraper.js')
            await playStoreScraper.default();
            console.log("Google Play scraper finished.")
        } catch (error) {
            console.error(`Error executing Google Play scraper: ${error}`)
        }
    }

    if (globalThis.sharedData.search_ios_apps) {
        try {
            const appStoreScraper = await import('./app_store_scraper.js')
            await appStoreScraper.default()
            console.log("Apple App Store scraper finished.")
        } catch (error) {
            console.error(`Error executing Apple App Store scraper: ${error}`)
        }
    }
    console.log("All scrapers finished.")
}
console.log("Initializing main script...")
runScrapers()