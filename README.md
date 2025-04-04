# ASO-40

This project utilizes the Google Play Scraper and App Store Scraper to fetch app details based on a searched name, category, or collection.

## Configuration

The script uses a `sharedData` object in `main.js` to define the parameters for the scraping process. Below is a description of each parameter:

- **term**:  
  The search term to be used for finding apps. If set, the scraper will search for apps by name. If not set, the scraper will search by category.  
  Default: `"news"`

- **price**:  
  Specifies the price filter for the search. Available options are:  
  - `all`: Fetches both free and paid apps.  
  - `paid`: Fetches only paid apps.  
  - `free`: Fetches only free apps.  
  Default: `'all'`

- **collection**:  
  Defines the collection to be used in the search. Use the `collectionMapping` object to ensure compatibility with both Android and iOS.  
  Default: `collectionMapping.TOP_FREE_IOS`  
  References:  
  - [Android Collections](https://github.com/facundoolano/google-play-scraper/blob/b7669f78766b8306896447ddbe8797fe36eae49f/lib/constants.js#L67)  
  - [iOS Collections](https://github.com/facundoolano/app-store-scraper/blob/master/lib/constants.js#L3)

- **category**:  
  Specifies the category of apps to be scraped. Use the `categoryMapping` object to ensure compatibility with both Android and iOS.  
  Default: `categoryMapping.GAMES_ACTION`  
  References:  
  - [Android Categories](https://github.com/facundoolano/google-play-scraper/blob/b7669f78766b8306896447ddbe8797fe36eae49f/lib/constants.js#L10)  
  - [iOS Categories](https://github.com/facundoolano/app-store-scraper/blob/master/lib/constants.js#L19)

- **number_of_apps**:  
  The maximum number of apps to scrape.  
  - For Google Play Store:  
    - Unlimited when using collections.  
    - Maximum of 250 when using a search term.  
  - For iOS App Store:  
    - Maximum of 200 when using categories.  
    - Unlimited when using a search term.  
  Default: `1000`

- **language**:  
  The language of the apps to be scraped.  
  Default: `'en'`

- **country**:  
  The country of the apps to be scraped.  
  Default: `'us'`

- **filename**:  
  The name of the file where the scraped app data will be saved.  
  Default: `'apps.json'`

- **search_android_apps**:  
  A boolean flag to enable or disable scraping from the Google Play Store.  
  Default: `true`

- **search_ios_apps**:  
  A boolean flag to enable or disable scraping from the Apple App Store.  
  Default: `true`

## Usage

1. **Install Dependencies**  
   Ensure you have Node.js installed. Then, install the required dependencies by running:
   ```bash
   npm install