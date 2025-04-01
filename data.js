//Class that represent an interface for the data to be scraped
class App {
    constructor(id, name, os, rating, downloads, ratings, reviews, dev_address, categories) {
        this._id = id;
        this._name = name;
        this._os = os;
        this._rating = rating;
        this._downloads = downloads
        this._ratings = ratings
        this._reviews = reviews
        this._developer = developer
        this._dev_address = dev_address
        this._categories = categories
    }

    info() {
        return [
            this._id,
            this._name,
            this._os,
            this._rating,
            this._downloads,
            this._ratings,
            this._reviews,
            this._developer,
            this._dev_address,
            this._categories
        ]
    };
};