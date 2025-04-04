// Class that represents an interface for the data to be scraped
class App {
    constructor(
        id = 'N/A',
        name = 'N/A',
        os = 'N/A',
        rating = 'N/A',
        downloads = 'N/A',
        ratings = 'N/A',
        reviews = 'N/A',
        developer = 'N/A',
        dev_address = 'N/A'
    ) {
        this.id = id;
        this.name = name;
        this.os = os;
        this.rating = rating;
        this.downloads = downloads;
        this.ratings = ratings;
        this.reviews = reviews;
        this.developer = developer;
        this.dev_address = dev_address;
    }

    info() {
        return [
            this.id,
            this.name,
            this.os,
            this.rating,
            this.downloads,
            this.ratings,
            this.reviews,
            this.developer,
            this.dev_address,
        ]
    }
}

export default App