//const HOST = "http://flip3.engr.oregonstate.edu:8080";
const HOST = "http://localhost:8080";

function appendItemTableRow(rowData,table)
{
    var row = document.createElement("tr");
    rowData.forEach(columnData => {
        var column = document.createElement("td");
        //column.innerText = columnData;
        if(typeof columnData === 'object')
        {
            column.appendChild(columnData);
        }
        else
        {
            column.innerText = columnData;
        }
        row.appendChild(column);
      });
    table.appendChild(row);
}


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
    container.appendChild(itemName);

    var requiredLevel = document.createElement("p");
    requiredLevel.setAttribute("class","item-text");
    requiredLevel.innerText = "Requires Level "+ itemresult.RequiredLevel;

    if(!(itemresult.BindingText === "No binding"))
    {
        var bindingText = document.createElement("p");
        bindingText.setAttribute("class","item-text");
        bindingText.innerText = itemresult.BindingText;
        container.appendChild(bindingText);
    }

   


    if(itemresult.maxcount == 1)
    {
        var unique = document.createElement("p");
        unique.setAttribute("class","item-text");
        unique.innerText = "Unique";
        container.appendChild(unique);
    }

    container.appendChild(requiredLevel);

    if(itemresult.dmg_min1>0)
    {
        var physicalDamage = document.createElement("p");
        physicalDamage.setAttribute("class","item-text");
        physicalDamage.innerText = "Damage "+itemresult.dmg_min1+" - "+itemresult.dmg_max1;
        container.appendChild(physicalDamage);
    }
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

    var table = document.getElementById("item-table");
   
    var queryTable = document.getElementById("item-query-result");
    queryTable.appendChild(table);


    queryResult.forEach(item => {


        var currentIcon = GetIcon(item.inventoryIcon);
        var itemTooltip = CreateItemToolTip(item);
        currentIcon.appendChild(itemTooltip);


        var rowData = [currentIcon,item.name,item.ItemLevel,item.RequiredLevel,item.subclass];
        appendItemTableRow(rowData,table);
        
        //queryTable.appendChild(currentIcon);



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

function GetItemDamage(item)
{
    var minDmg;

}


(function(window, document, undefined){


    window.onload = init;
    
    function init(){

        var itemSearchButton = document.getElementById("item-search-button");

        itemSearchButton.addEventListener('click', function(){
            var qualityIdx = document.getElementById("item-quality").selectedIndex;
            

            var itemQuality = document.getElementsByTagName("option")[qualityIdx].value;
            var itemName = document.getElementById("item-name").value;

            var table = document.getElementById("item-table");
            while (table.firstChild) {
                table.removeChild(table.firstChild);
            }

            QueryItems(itemName,itemQuality);
        });
    }
    
    })(window, document, undefined);
    




