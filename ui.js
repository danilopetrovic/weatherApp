class Ui {
    constructor() {
        this.location = document.getElementById('w-location');
        this.desc = document.getElementById('w-desc');
        this.string = document.getElementById('w-string');
        this.icon = document.getElementById('w-icon');
        this.humidity = document.getElementById('w-humidity');
        this.feelsLike = document.getElementById('w-feels-like');
        this.pressure = document.getElementById('w-pressure');
        this.wind = document.getElementById('w-wind');
        this.lastUpdated = document.getElementById('w-last-update');
        this.dateNow = document.getElementById('w-date-now');

        // Getting inputs and buttons for changing location form
        this.citySearchInput = document.getElementById('city-search-input');
        this.cityList = document.getElementById('city-list');
    }

    paint(data) {
        const location = data.location;
        const current = data.current;
        // console.log(location, '-------------------------------', current);

        this.location.textContent = `${location.country} - ${location.name}`;
        this.desc.textContent = current.condition.text;
        this.string.textContent = `${current.temp_c}° C`;
        this.icon.setAttribute('src', 'http:' + current.condition.icon);
        this.humidity.textContent = `Relative humidity: ${current.humidity}`;
        this.feelsLike.textContent = `Feels like: ${current.feelslike_c}° C`;
        this.pressure.textContent = `Pressure: ${current.pressure_mb} mb`;
        this.wind.textContent = `Wind speed: ${current.wind_kph} kmph (${current.wind_mph} mph), direction ${current.wind_dir}, ${current.wind_degree}deg`;
        this.dateNow.textContent = `Date now: ${this.getTimeNow()}`;
        this.lastUpdated.textContent = `Last update from server: ${current.last_updated}`;
    }

    getTimeNow() {
        // Create a new Date object for the current time in the local time zone
        const date = new Date();

        // Get the various date and time components
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        // Combine the components into the desired format
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        // console.log(formattedDate);
        return formattedDate;
    }

    getCityInputValue() {
        if (this.citySearchInput.value.trim() === "") {
            this.citySearchInput.placeholder = "Type City or Country name...";
        }
        return this.citySearchInput.value.trim();
    }

    setCityInputValue(locationDatasetFromList) {
        // console.log(locationDatasetFromList)
        this.citySearchInput.value = locationDatasetFromList;
        this.cityList.innerHTML = "";
    }

    listCityResults(data) {
        // console.log(this.citySearchInput, this.cityList);
        let output = this.cityList.innerHTML;
        output = "";
        data.forEach(entry => {
            // console.log(entry);
            const li = `<li onclick="setLocationFromInputSearch(this)" onkeypress="setLocationFromInputSearch(this)" tabindex="0" data-url="${entry.url}" data-country="${entry.country}" data-city="${entry.name}" data-region="${entry.region}" class="list-group-item  list-group-item-custom">${entry.name} - ${entry.country} - ${entry.region}</li>`;
            output += li;
        });
        this.cityList.innerHTML = output;
    }
}