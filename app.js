/*
TODO:
 * Make more weather windows so every one is one instance of weather
 * Make refresh button to be animated whyle working add/remove class refresh-animate
*/

// Init Ui object
const ui = new Ui();
// Init Storage object
const storage = new Storage();
// Init weather objectcountry, city, region, url
const weather = new Weather(storage.getLocationData);

// Get Weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);
document.getElementById('refresh').addEventListener('click', () => {
    getWeather();
});

// Searching city
let typingTimer;
document.getElementById('city-search-input').addEventListener('keyup', () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(getInputSearch, 700);
});

// Preventing submitting form
document.getElementById('w-form').addEventListener('submit', (e) => {
    e.preventDefault();
});

// Focus on city search input after clicking change location
document.getElementById('change-location').addEventListener('click', () => {
    setTimeout(() => {
        document.getElementById('city-search-input').value = "";
        document.getElementById('city-search-input').focus();
    }, 700);
});

function getWeather() {
    const url = storage.getLocationData();
    // console.log('from app ', url);
    weather.getWeather(url)
        .then(data => {
            // console.log(data);

            ui.paint(data);
        })
        .catch(err => console.log(err));
}

function getInputSearch() {
    // console.warn('odlozeno');
    const recivedValue = ui.getCityInputValue();
    if (recivedValue === "" || recivedValue === null) {
        // console.log(`Value of input "city-search-input" is null!`);
        return false;
    }
    weather.getCities(recivedValue)
        .then(data => {
            console.log(data);

            ui.listCityResults(data);
        })
        .catch(err => console.log(err));
}

function setLocationFromInputSearch(locationDatasetFromList) {
    // console.log(locationDatasetFromList);
    const innerHTML = locationDatasetFromList.innerHTML;
    const country = locationDatasetFromList.dataset.country;
    const city = locationDatasetFromList.dataset.city;
    const region = locationDatasetFromList.dataset.region;
    const url = locationDatasetFromList.dataset.url;

    ui.setCityInputValue(innerHTML);

    // console.warn(country, city, region, url)
    weather.changeLocation(country, city, region, url);
    storage.setLocationData(country, city, region, url);
    getWeather();

    setTimeout( () => {
        document.getElementById('XBtn').click();
    }, 350);
}