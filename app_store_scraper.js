import store from 'app-store-scraper';
import fs from 'fs';
import App from 'data'

async function getAppsIdByTerm() {
    try {
        //To work like the google play store, transform the num of apps into pages
        const pages = globalThis.sharedData.number_of_apps / 50
        //save the results in an array for each page
        const results = []
        for (let i = 1; i <= pages; i++) {
            console.log(`Fetching page ${i}`)
            results.fill(await store.search({
                term: globalThis.sharedData.term,
                num: 50,
                page: i,
                country: globalThis.sharedData.country,
                lang: globalThis.sharedData.language,
                idsOnly: true
            }))
        }

        console.log(`Fetched ${results.length} apps`)
        return results

    } catch (error) {
        console.error(`Failed to search for apps: ${error}`)
        return [];
    }
}

async function getAppsIdByList() {
    try {
        const results = await store.list({
            categoy: globalThis.sharedData.category.iOS,
            collection: globalThis.sharedData.collection.iOS,

            //Maximum number of apps to get is 200
            num: globalThis.sharedData.number_of_apps,

            //Language of apps to get
            lang: globalThis.sharedData.language,

            //The regioun from which to get the apps ( important if some apps are only available in some countries )
            country: globalThis.sharedData.country,
            fullDetail: false
        })

        console.log(`Found ${results.length} apps`);
        return results;

    } catch (error) {
        console.error(`Failed to search for apps: ${error}`);
        return [];
    }
}

async function getApps(results, filename = globalThis.sharedData.filename) {
    console.log("Getting app details...");
    //Extracts all the apps from the json file and loads them into an array
    let jsonData = loadExistingData(globalThis.sharedData.filename);

    //function to check for already existing apps in the json file so we dont have to scrape them again
    const checkId = (id) => jsonData.some(item => item.id === id);

    for (const result of results) {
        //Check if the app is already in the json file
        if (checkId(result.appId) == false) {
            //If the app is not in the json file, we get the details of the app and add it to the json file
            const appInfo = await store.app({ appId: result.appId, ratings: true })
                jsonData[result.appId] = App(
                    appInfo.appId,
                    appInfo.title,
                    'ios',
                    appInfo.score,
                    "No avaliable data",
                    appInfo.ratings,
                    appInfo.reviews,
                    appInfo.developer,
                    "No avaliable data",
                    appInfo.genre
                )
        }
    }
    
    try {
        fs.writeFileSync(filename, JSON.stringify(jsonData, null, 4));
        console.log(`Data successfully saved to ${filename}`);   
    } catch (error) {
        console.error
    }
}

function loadExistingData(filename) {
    if (fs.existsSync(filename)) {
        console.log('Loading existing data from JSON file')
        return JSON.parse(fs.readFileSync(filename, 'utf-8'))
    }
    console.log('No existing data found, creating new JSON file')
    return {}
}

export default async function main() {
    console.log("Starting itunes scraper...");
  //if the term is set, the scraper will search for apps by name, otherwise it will search by category
    const results = globalThis.sharedData.term ? await getAppsIdByTerm() : await getAppsIdByList()
    await getApps(results);
    console.log("Finished itunes scraper.");
}