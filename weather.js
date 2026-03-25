// TODO: make a loader/spinner while fetching getCities() results...
class Weather {
    constructor(country, city, region, url) {
        // https://www.weatherapi.com/api-explorer.aspx
        this.apiKey = '828440c72ba74c0eb50200723232110';
        this.country = country;
        this.city = city;
        this.region = region;
        this.url = url;
        this.inputText;
    }

    // Fetch weather from API
    async getWeather(url) {
        // console.log('from weather ', url);
        this.url = url;
        url = `https://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${this.url}&days=1&aqi=yes&alerts=yes`;

        const response = await fetch(url);

        const responseData = await response.json();
        return responseData;
    }

    // Change weather location
    changeLocation(country, city, region, url) {
        this.country = country;
        this.city = city;
        this.region = region;
        this.url = url;
    }

    // Get list of Cities
    async getCities(text) {
        this.inputText = text;
        const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${this.apiKey}&q=${this.inputText}`);

        const responseData = await response.json();
        return responseData;
    }
}