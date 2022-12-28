document.querySelector('.search').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if (input !== '') {

        showWarning('Loading...');

        let results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&units=metric&lang=pt_br&appid=cf872eab72f34575b8c75b8dfe60e078`);
        let json = await results.json();

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,
                weatherIcon: json.weather[0].icon,
            });

            showWarning('Done!')
        } else {
            eraseResults();
            showWarning('Lets try a valid name? ')
        }
    } else {
        showWarning('Lets try a valid name? ')
    }
});


function showWarning(char) {

    document.querySelector('.aviso').innerHTML = `${char}`;
};

function showInfo(obj) {

    document.querySelector('.city-name span').innerHTML = `${obj.name}, ${obj.country}`;
    document.querySelector('.info-temp p').innerHTML = `${obj.temp} <sup>°C</sup>`;
    document.querySelector('.info-temp img').setAttribute('src', `http://openweathermap.org/img/wn/${obj.weatherIcon}@2x.png`);

    document.querySelector('.info-wind--name').innerHTML = `Vento <br>
    ${obj.windSpeed} Km/h`;

    document.querySelector('.line-circle').style.transform = `rotate(${obj.windAngle - 90}deg)`;
    document.querySelector('.result-area').style.display = 'block';
};


function eraseResults() {
    document.querySelector('.result-area').style.display = 'none';
}