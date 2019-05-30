var chart;
var imageSeries;
var imageSeries1;
am4core.ready(function() {
// Create map instance
chart = am4core.create("mapdiv", am4maps.MapChart);

// Set map definition
chart.geodata = am4geodata_worldLow;
chart.maxZoomLevel = 1;
chart.seriesContainer.draggable = false;
chart.seriesContainer.resizable = false;
// Set projection
chart.projection = new am4maps.projections.Miller();

// Create map polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;

// Configure series
var polygonTemplate = polygonSeries.mapPolygons.template;
//polygonTemplate.tooltipText = "{name}";
polygonTemplate.fill = am4core.color("gray");

// Create hover state and set alternative fill color
//var hs = polygonTemplate.states.create("hover");
//hs.properties.fill = am4core.color("#367B25");

// Remove Antarctica
polygonSeries.exclude = ["AQ"];



// Bind "fill" property to "fill" key in data
polygonTemplate.propertyFields.fill = "fill";

// Create image series
imageSeries = chart.series.push(new am4maps.MapImageSeries());

// Create a circle image in image series template so it gets replicated to all new images
var imageSeriesTemplate = imageSeries.mapImages.template;
var circle = imageSeriesTemplate.createChild(am4core.Circle);
circle.radius = 3;
circle.fill = am4core.color("red");
circle.stroke = am4core.color("#FFFFFF");
circle.strokeWidth = 2;
circle.nonScaling = true;
circle.tooltipText = "{email}\n Ban Reason: DDOS";

// Set property fields
imageSeriesTemplate.propertyFields.latitude = "latitude";
imageSeriesTemplate.propertyFields.longitude = "longitude";


imageSeries1 = chart.series.push(new am4maps.MapImageSeries());
var imageSeriesTemplate = imageSeries1.mapImages.template;
var circle = imageSeriesTemplate.createChild(am4core.Circle);
circle.radius = 3;
circle.fill = am4core.color("green");
circle.stroke = am4core.color("#FFFFFF");
circle.strokeWidth = 2;
circle.nonScaling = true;
circle.tooltipText = "{email}\n Last active: 1 hr";

// Set property fields
imageSeriesTemplate.propertyFields.latitude = "latitude";
imageSeriesTemplate.propertyFields.longitude = "longitude";


});


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
            if(!(req.responseText === "OK"))
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
}

function UpdateActiveMap(data)
{
  imageSeries1.data = data;

}
function UpdateInactiveMap(data)
{
  imageSeries.data = data;
}

(function(window, document, undefined){


  window.onload = init;
  function init(){

     GetRequest('/queryaccountmap',['banned'],[0],UpdateActiveMap);
     GetRequest('/queryaccountmap',['banned'],[1],UpdateInactiveMap);

      
  }

})(window, document, undefined);