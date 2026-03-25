class Storage {
    constructor(country, city, region, url) {
        this.country = country;
        this.city = city;
        this.region = region;
        this.url = url;
        this.defaultUrl = 'belgrade-central-serbia-serbia';
    }

    getLocationData() {
        const location = JSON.parse(localStorage.getItem('weatherApp'));
        if (location !== null) {
            // console.warn(location);
            this.url = location.url;
        } else {
            this.url = this.defaultUrl;
        }
        return this.url;
    }

    setLocationData(country, city, region, url) {
        this.country = country;
        this.city = city;
        this.region = region;
        this.url = url;
        const writeToLocalStorage = {country, city, region, url};
        localStorage.setItem('weatherApp', JSON.stringify(writeToLocalStorage));
    }
}