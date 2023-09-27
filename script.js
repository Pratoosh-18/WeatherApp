const weatherbox = document.querySelector(".weather-box")
const weatherimage = document.querySelector(".weather-image")
const tempbox = document.querySelector(".temp-box")
const weathertype = document.querySelector(".weather-type")
const weatherotherdetails = document.querySelector(".weather-other-details")
const image = document.querySelector(".image")
const unit = document.querySelector("#unit")
const unitText = document.querySelector("#unitsSymbol")

const celsiusToFahrenheit =(c)=>{
    let num=(c*1.8)+32
    return num.toFixed(2);
}
const celsiusToKelvin =(c)=>{
    return (c+273.15).toFixed(2);
}

citybutton.addEventListener("click", () => {
    let city = cityinput.value
    if (city === "") {
        // console.log("Empty")
        weatherbox.classList.add("error")
        setTimeout(() => {
            weatherbox.classList.remove("error")
        }, 200);
        
    } else {
        let weather = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7d0ab1ae0565336720fbef5dd8d59d53&units=metric`)
        weather.then((response) => {
            return response.json()
        }).then((value) => {
            if (value.cod == '404') {
                // console.log("error")
                image.style.backgroundImage = "url(error.png)"
                weatherbox.style.height = "340px"
                weatherimage.style.display = "flex"
                tempbox.style.display = "none"
                weathertype.style.display = "flex"
                weatherotherdetails.style.display = "none"
                temptypeid.innerHTML = "Please enter a valid location"

            } else {
                weatherbox.style.height = "440px"
                weatherimage.style.display = "flex"
                tempbox.style.display = "flex"
                weathertype.style.display = "flex"
                weatherotherdetails.style.display = "flex"

                humidityid.innerHTML = value.main.humidity
                windid.innerHTML = value.wind.speed
                temptypeid.innerHTML = value.weather[0].main
                if(unit.value==="celsius"){
                    mtemperatureid.innerHTML =  value.main.temp
                    unitText.innerHTML="<sup>o</sup>C"
                }else if(unit.value==="fahrenheit"){
                    mtemperatureid.innerHTML =  celsiusToFahrenheit(value.main.temp)
                    unitText.innerHTML="<sup>o</sup>F"
                }else if(unit.value==="kelvin"){
                    mtemperatureid.innerHTML =  celsiusToKelvin(value.main.temp)
                    unitText.innerHTML="<sup>o</sup>K"
                }

                switch (value.weather[0].main) {
                    case "Clear":
                        image.style.backgroundImage = "url(clear.png)"
                        break
                    case "Mist":
                        image.style.backgroundImage = "url(mist.png)"
                        break
                    case "Haze":
                        image.style.backgroundImage = "url(mist.png)"
                        break
                    case "Rain":
                        image.style.backgroundImage = "url(rain.png)"
                        break
                    case "Snow":
                        image.style.backgroundImage = "url(snow.png)"
                        break
                    case "Clouds":
                        image.style.backgroundImage = "url(cloudy.png)"
                        break
                }
            }
        })
    }
})