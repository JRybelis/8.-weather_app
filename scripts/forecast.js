const key = '0NgOGbuwAGJZ1KYiF5WHy73r1A50LOGz';

//get weather information
const getWeather = async (locationId) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${locationId}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};


//get city information
const getCity = async (city) => {

    const baseUrl = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(baseUrl + query);
    const data = await response.json();

    return(data[0]);

};


getCity('Singapore').then( data => {
    return getWeather(data.Key);
}).then(data => {
    console.log(data);
}).catch(error => console.log(error));

