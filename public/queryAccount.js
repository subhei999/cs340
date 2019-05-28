  
  
  GetRequest("/querycountries",[],[],StoreCountryNames);
  setInterval(GetCities, 5000)

  var filteredCityNames = new Array();
  var countryNames = new Array();
  
function GetCities(){
    filteredCityNames.length = 0;
    GetRequest("/querycities",['country'],[document.getElementById("country-input").value],StoreCityNames);
}


  $( function() {
    $( "#city-input" ).autocomplete({
      source: filteredCityNames
    });
  } );


  $( function() {
    $( "#country-input" ).autocomplete({
      source: countryNames
    });
  } );

function GetRequest(url,qParams,qValues,callback)
{
    var req = new XMLHttpRequest();

    var reqStr = url + '?';

    if(qParams.length != qValues.length)
    {
        console.log("Invalid Get Request");
        return;
    }

    for (let index = 0; index < qParams.length; index++) {
        const param = qParams[index];
        const value = qValues[index];

        reqStr += param + '=' + value;
        
        if(index != qParams.length - 1)
            reqStr += '&';

    }
    req.open("GET",reqStr,true);
    req.send(null);

    req.onreadystatechange = function() {//async
        if(req.readyState == 4 && req.status == 200) 
        {
            var data = JSON.parse(req.responseText);
            
            if(data.cod == "404")
            {
                alert(data.message);
            }
            else
            {
                callback(data);
               
            }
            
        }
    }
}


function StoreCityNames(data)
{
    
    data.forEach(element => {
        filteredCityNames.push(element.city);
    });
}

function StoreCountryNames(data)
{
    data.forEach(element => {
        countryNames.push(element.country);
    });
}