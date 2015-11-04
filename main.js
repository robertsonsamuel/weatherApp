'use strict'


var apiUrl = 'http://api.wunderground.com/api/26d66392ff3b5bb7/'
var weatherInput;
var currentConditions
var tenDayForcast;

$(document).ready(init);



function init(){
console.log("ok");

getWeatherAtLocation();

}

function getWeatherSearch(city,zipcode){

if(city.length === 0 || zipcode.length === 0 ){
  if(zipcode.length===0 || zipcode.length < 5){
    var url = apiUrl + 'geolookup/q/'+ city +'.json';
  }else if(city.length===0){
    var url = apiUrl + 'geolookup/q/'+ zipcode +'.json';
  }else{
    var url = apiUrl + 'geolookup/q/autoip.json';
    alert('Please Enter a Valid Zipcode or City');
  }
          $.get(url)    //this is a defered object or a promise, if var x = $.get(url)
          .done(function(data){
             weatherInput = data;
          //console.log(weatherInput);
        //  console.log(weatherInput); //this worked
        writeCurrentWeatherNow(weatherInput);
              var  urlConditions = apiUrl + 'conditions/q/'+ weatherInput.location.state +'/' + weatherInput.location.city + '.json';
                $.get(urlConditions)
                .done(function(currentConditionsData){
                  currentConditions = currentConditionsData;
                //console.log(currentConditions); this worked
                  writeCurrentConditions(currentConditionsData);
                  var urlTenDay = apiUrl + 'forecast10day/q/'+ weatherInput.location.state +'/' + weatherInput.location.city + '.json';
                  $.get(urlTenDay)
                  .done(function(tenDay){
                    tenDayForcast = tenDay;
                    writeForcast(tenDayForcast);
                  // console.log(tenDayForcast);
                });
            });

          })
          .fail(function(error) {
            console.error(error);
          });
}else {
  return;
}

}

function getWeatherAtLocation() {

  var url = apiUrl + 'geolookup/q/autoip.json';
        $.get(url)    //this is a defered object or a promise, if var x = $.get(url)
        .done(function(data){
           weatherInput = data;
        //console.log(weatherInput);
      //  console.log(weatherInput); //this worked
      writeCurrentWeatherNow(weatherInput);
            var  urlConditions = apiUrl + 'conditions/q/'+ weatherInput.location.state +'/' + weatherInput.location.city + '.json';
              $.get(urlConditions)
              .done(function(currentConditionsData){
                currentConditions = currentConditionsData;
              //console.log(currentConditions); this worked
                writeCurrentConditions(currentConditionsData);
                var urlTenDay = apiUrl + 'forecast10day/q/'+ weatherInput.location.state +'/' + weatherInput.location.city + '.json';
                $.get(urlTenDay)
                .done(function(tenDay){
                  tenDayForcast = tenDay;
                  writeForcast(tenDayForcast);
                // console.log(tenDayForcast);
              });
          });

        })
        .fail(function(error) {
          console.error(error);
        });
}


// writeCurrentWeather(weatherInput);
// writeCurrentWeather(currentConditions);
// writeCurrentWeather(tenDayForcast);



function writeCurrentWeatherNow(weatherNow) {

  // writes weather and forcast to all elements on DOM, is called on load
  var currentCity = weatherNow.location.city;
  var currentState = weatherNow.location.state;
  var currentCountry = weatherNow.location.country_name;
  var currentZip = weatherNow.location.zip;
  $('#CityInfo').text(currentCity + ", " + currentState + " " + currentCountry + " " + currentZip );
}


function writeCurrentConditions(current){
  var currentTemp = currentConditions.current_observation.temp_f; // real temp
  var currentFeelsLike = currentConditions.current_observation.feelslike_f; // feels like temp
  var currentObervation = currentConditions.current_observation.weather; //clear, sunny , texas

  $('#currentWeather').text("Currently: " + currentObervation + "  " +
    currentTemp + "°F" + " Feels Like " + currentFeelsLike + "°F ");
}


function  writeForcast(someDays){
    var NextDay_Day1 = someDays.forecast.txt_forecast.forecastday[2];   //tomorrow object
    var NextDay_Day2 = someDays.forecast.txt_forecast.forecastday[4];  //after tomorrow
    var NextDay_Day3 = someDays.forecast.txt_forecast.forecastday[6]; //next next day
    var NextDay_Day4 = someDays.forecast.txt_forecast.forecastday[8];//next next next one

    var NextDay_Day1_day = NextDay_Day1.title;  //next day "wednesday"
    var NextDay_Day2_day = NextDay_Day2.title; // thursday
    var NextDay_Day3_day = NextDay_Day3.title;// etc...
    var NextDay_Day4_day = NextDay_Day4.title;

    var NextDay_Day1_text = NextDay_Day1.fcttext; //forcast for the day
    var NextDay_Day2_text = NextDay_Day2.fcttext;
    var NextDay_Day3_text = NextDay_Day3.fcttext;
    var NextDay_Day4_text = NextDay_Day4.fcttext;

    var NextDay_Day1_iconUrl = NextDay_Day1.icon_url;
    var NextDay_Day2_iconUrl = NextDay_Day2.icon_url;
    var NextDay_Day3_iconUrl = NextDay_Day3.icon_url;
    var NextDay_Day4_iconUrl = NextDay_Day4.icon_url;

    $('#Day_1').text(NextDay_Day1_day);
    $('#Day_2').text(NextDay_Day2_day);
    $('#Day_3').text(NextDay_Day3_day);
    $('#Day_4').text(NextDay_Day4_day);

    $('#forcast1').text(NextDay_Day1_text);
    $('#forcast2').text(NextDay_Day2_text);
    $('#forcast3').text(NextDay_Day3_text);
    $('#forcast4').text(NextDay_Day4_text);

    $('#weatherIcon1').attr("src",NextDay_Day1_iconUrl);
    $('#weatherIcon2').attr("src",NextDay_Day2_iconUrl);
    $('#weatherIcon3').attr("src",NextDay_Day3_iconUrl);
    $('#weatherIcon4').attr("src",NextDay_Day4_iconUrl);





   console.log(NextDay_Day1_text);

}
