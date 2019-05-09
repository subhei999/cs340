const HOST = "http://flip3.engr.oregonstate.edu:8080";
//const HOST = "http://localhost:8080";

function QueryItems(itemName,itemQuality)
{
    var itemClass = ""

    var req = new XMLHttpRequest();
    req.open("GET",HOST+"/queryitem?itemName="+itemName+"&itemQuality="+itemQuality+"&itemClass="+itemClass,true)
    req.send(null);

    req.onreadystatechange = function() {//async
        if(req.readyState == 4 && req.status == 200) 
        {
            var data = JSON.parse(req.responseText);
            BuildItemTable(data);
            if(data.cod == "404")
            {
                alert(data.message);
            }
            else
            {
                console.log(data);
            }
            
        }
    }
}

function GetIcon(name)
{
    var path = "/static/icons_classic/"+name+".png";
    var icon = document.createElement("img");
    var container = document.createElement("div");
    container.setAttribute("class","item-icon");
 
    container.appendChild(icon);
    icon.setAttribute("src",path);
    return container;
}


function CreateItemToolTip(itemresult)
{
    var container = document.createElement("div");
    container.setAttribute("class","item-tooltip-container");

    var itemName = document.createElement("h3");
    itemName.setAttribute("class","item-name");
    itemName.style.color = itemresult.Color;
    itemName.innerText = itemresult.name;

    var requiredLevel = document.createElement("p");
    requiredLevel.setAttribute("class","item-text");
    requiredLevel.innerText = "Requires Level "+ itemresult.RequiredLevel;

    var bindingText = document.createElement("p");
    bindingText.setAttribute("class","item-text");
    bindingText.innerText = itemresult.BindingText;

    
    container.appendChild(itemName);
    container.appendChild(bindingText);
    container.appendChild(requiredLevel);

    if(!(itemresult.FlavorText.length === 0))
    {
        var flavorText = document.createElement("p");
        flavorText.setAttribute("class","item-text");
        flavorText.innerText = "\""+ itemresult.FlavorText + "\"";
        flavorText.style.color = "gold";
        container.appendChild(flavorText);
    }



    return container;
}

function BuildItemTable(queryResult)
{
    var i = 0;
    var j = 0;
    queryResult.forEach(item => {


        var currentIcon = GetIcon(item.inventoryIcon);
        currentIcon.style.left = i*64+"px";
        currentIcon.style.top = j*64+"px";
        currentIcon.style.position="absolute";



        var queryTable = document.getElementById("item-query-result");
        queryTable.appendChild(currentIcon);

        var itemTooltip = CreateItemToolTip(item);
        currentIcon.appendChild(itemTooltip);

        currentIcon.addEventListener("mouseover", function( event ) { 

            var tooltips = currentIcon.querySelectorAll('.item-tooltip-container');
            window.onmousemove = function (e) {
                var x = (e.clientX +30) + 'px',
                    y = (e.clientY ) + 'px';
                
                tooltips[0].style.top = y;
                tooltips[0].style.left = x;
                
            };
        },false);          

        i++;
        if(i >= 10)
        {
            i=0;
            j++;
        }

    });
    

      
}



(function(window, document, undefined){


    window.onload = init;
    
    function init(){

        var itemSearchButton = document.getElementById("item-search-button");

        itemSearchButton.addEventListener('click', function(){
            var qualityIdx = document.getElementById("item-quality").selectedIndex;
            

            var itemQuality = document.getElementsByTagName("option")[qualityIdx].value;
            var itemName = document.getElementById("item-name").value;

            var queryTable = document.getElementById("item-query-result");
            while (queryTable.firstChild) {
                queryTable.removeChild(queryTable.firstChild);
            }

            QueryItems(itemName,itemQuality);
        });
    }
    
    })(window, document, undefined);
    




