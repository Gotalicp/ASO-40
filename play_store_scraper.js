import gplay from 'google-play-scraper';
import fs from 'fs';
import App from './data.js';

async function getAppsIdByTerm() {
    try {
        const results = await gplay.search({
            term: globalThis.sharedData.term,

            // Maximum number of apps to get is 250
            num:  globalThis.sharedData.number_of_apps > 250 ? 250 : globalThis.sharedData.number_of_apps,

            // Language of apps to get
            lang: globalThis.sharedData.language,

            // The regioun from which to get the apps ( important if some apps are only available in some countries )
            country: globalThis.sharedData.country,
            fullDetail: false,
            price: globalThis.sharedData.price,

            // Waits for 1 second between number of requests to avoid getting blocked by captchas
            throttle: 5,
        })

        console.log(`Found ${results.length} apps`);
        return results;

    } catch (error) {
        console.error(`Failed to search for apps: ${error}`);
        return [];
    }
}

async function getAppsIdByList() {
    try {
        const results = await gplay.list({
            categoy: globalThis.sharedData.category.Android,
            collection: globalThis.sharedData.collection.Android,

            //Maximum number of apps to get is 250
            num: globalThis.sharedData.number_of_apps,

            //Language of apps to get
            lang: globalThis.sharedData.language,

            //The regioun from which to get the apps ( important if some apps are only available in some countries )
            country: globalThis.sharedData.country,
            fullDetail: false,

            // Waits for 1 second between number of requests to avoid getting blocked by captchas
            throttle: 5,
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
    let jsonData = loadExistingData(globalThis.sharedData.filename)

    for (const result of results) {
        //Check if the app is already in the json file
        if (jsonData[result.appId] != undefined) continue
        //If the app is not in the json file, we get the details of the app and add it to the json file
        const appInfo = await gplay.app({ appId: result.appId })
        jsonData[result.appId] = new App(
            appInfo.appId,
            appInfo.title,
            'andproids',
            appInfo.score,
            appInfo.maxInstalls,
            appInfo.ratings,
            appInfo.reviews,
            appInfo.developer,
            appInfo.developerAddress,
        )
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
    return JSON.parse("{}")
}

//Main function that runs the scraper
//This function will be called from the main.js file
export default async function main() {
    console.log("Starting Google Play scraper...");
    //if the term is set, the scraper will search for apps by name, otherwise it will search by category
    const results = globalThis.sharedData.term ? await getAppsIdByTerm() : await getAppsIdByList()
    await getApps(results);
    console.log("Finished google play scraper.")
}