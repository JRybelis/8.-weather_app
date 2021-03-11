const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
    
    //assign object data to variables
    // const cityDetails = data.cityDetails;
    // const weather = data.weather;

    //same as above, but using properties destructuring
    const {cityDetails, weather} = data;

    //update details template
    details.innerHTML=`
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

    //update the night/day & icon images
    const iconSource = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSource);

    let timeSource = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSource);
    

    //remove the d-none class, if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
}

const updateCity = async (city) => {
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return { cityDetails, weather };
};

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    // get city value from the form input
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the UI with the new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(error => console.log(error));


    //set local storage
    localStorage.setItem('city', city);
});

//automated check and API call for local storage data in case of page refresh  
if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then (data => updateUI(data))
    .catch(error => console.log(error));
}