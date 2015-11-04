'use strict'


var apiUrl = 'http://api.wunderground.com/api/26d66392ff3b5bb7/'

$(document).ready(init);



function init(){
alert("working!");
$('#getWeather').click(getWeather);

}


function getWeather() {
  var url = apiUrl + 'forecast/q/CA/San_Francisco.json';

        $.get(url)    //this is a defered object or a promise, if var x = $.get(url)
        .done(function(data){
          console.log(data);
        })
        .fail(function(error) {
          console.error(error);
        });

}
