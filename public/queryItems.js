
//const HOST = "http://flip3.engr.oregonstate.edu:8080";
//const HOST = "http://localhost:8080";
const HOST = "";


var itemDamageData;
var itemStatsData;

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


function QueryItems(itemName,itemQuality,itemSubClass)
{
    var req = new XMLHttpRequest();
    req.open("GET",HOST+"/queryitem?itemName="+itemName+"&itemQuality="+itemQuality+"&itemSubClass="+itemSubClass,true)
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
                BuildItemTable(data);
                console.log(data);
            }
            
        }
    }
}


function QueryItemDamage()
{
    var req = new XMLHttpRequest();
    req.open("GET",HOST+"/queryitemdamage",true)
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
               
                itemDamageData = data;
              
            }
            
        }
    }
}

function QueryItemStats()
{
    var req = new XMLHttpRequest();
    req.open("GET",HOST+"/queryitemstats",true)
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
                
                itemStatsData = data;
              
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


function CreateItemToolTip(itemresult,itemDamage,itemStats)
{
    var container = document.createElement("div");
    container.setAttribute("class","item-tooltip-container");



    var itemName = document.createElement("h3");
    itemName.setAttribute("class","item-name");
    itemName.style.color = itemresult.Color;
    itemName.innerText = itemresult.name;
    container.appendChild(itemName);

    var subclass_text = document.createElement("p");
    subclass_text.setAttribute("class","item-text-right");
    subclass_text.innerText = itemresult.subclass;
    container.appendChild(subclass_text);

    if(itemresult.attack_time > 0)
    {
        var speed_text = document.createElement("p");
        speed_text.setAttribute("class","item-text-right");
        speed_text.style.top = "20px";
        speed_text.innerText = "Speed "+ parseFloat(itemresult.attack_time/1000).toFixed(2);
        container.appendChild(speed_text);

    }



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

    if(itemresult.armor > 0)
    {
        var armor = document.createElement("p");
        armor.setAttribute("class","item-text");
        armor.innerText = itemresult.armor +" armor";
        container.appendChild(armor);
    }

    //append all item damages to tooltip
    if(itemDamage.length > 0)
    {
        var first_iteration = true;
        itemDamage.forEach(element => 
        {
            var dmg = document.createElement("p");
            dmg.setAttribute("class","item-text");
            if(first_iteration)
            {
                first_iteration = false;
                if(element.dmg_type == "Physical")
                {
                    dmg.innerText = element.dmg_min+" - "+element.dmg_max + " Damage";

                }
                else
                {
                    dmg.innerText = element.dmg_min+" - "+element.dmg_max + " "+element.dmg_type+ " Damage";
                }

                container.appendChild(dmg);

                var dps = Math.round((element.dmg_min+element.dmg_max)/(2*(itemresult.attack_time/1000)));
                var dps_text = document.createElement("p")
                dps_text.setAttribute("class","item-text");
                dps_text.innerText = "( " + dps + " damage per second )";
                container.appendChild(dps_text);
            }
            else
            {
                dmg.innerText = "+"+element.dmg_min+" - "+element.dmg_max +" "+element.dmg_type+" Damage";
                container.appendChild(dmg);
            }
            
            
        });
   }
    //append durability
    if(itemresult.MaxDurability != 0)
    {
        var durability_text = document.createElement("p");
        durability_text.setAttribute("class","item-text");
        durability_text.innerText = "Durability " + itemresult.MaxDurability + " / " + itemresult.MaxDurability;
        container.appendChild(durability_text);
    }

   //append added stats to item
   if(itemStats.length > 0)
   {
        itemStats.forEach(element => 
        {
            var stat = document.createElement("p");
            stat.setAttribute("class","item-text");
            stat.innerText = "+"+element.statValue + " " + element.stat_type;
            container.appendChild(stat);
        });
   }

   if(itemresult.RequiredLevel > 1)
   {

       var requiredLevel = document.createElement("p");
       requiredLevel.setAttribute("class","item-text");
       requiredLevel.innerText = "Requires Level "+ itemresult.RequiredLevel;
       container.appendChild(requiredLevel);
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

function CreateItemTableHeader()
{
    var tr = document.createElement("tr");
    tr.setAttribute("class","table-header");
    var th_icon = document.createElement("th");
    var th_name = document.createElement("th");
    var th_iLvl = document.createElement("th");
    var th_reqLvl = document.createElement("th");
    var th_type = document.createElement("th");

    th_reqLvl.innerText = "Req. Lvl";
    th_iLvl.innerText = "iLvl";
    th_name.innerText = "Item Name";
    th_type.innerText = "Type";

    tr.appendChild(th_icon);
    tr.appendChild(th_name);
    tr.appendChild(th_iLvl);
    tr.appendChild(th_reqLvl);
    tr.appendChild(th_type);


    return tr;

}

function BuildItemTable(queryResult)
{
    var table = document.getElementById("item-table");
    var queryTable = document.getElementById("item-query-result");
    queryTable.appendChild(table);
    table.appendChild(CreateItemTableHeader());

    //var itemDamage = QueryItemDamage("Gnarled Ash Staff");


    queryResult.forEach(item => {
        var itemDamage = FindElements(itemDamageData,"name",item.name);
        var itemStats = FindElements(itemStatsData,"name",item.name);

        var currentIcon = GetIcon(item.inventoryIcon);
        var itemTooltip = CreateItemToolTip(item,itemDamage,itemStats);
        currentIcon.appendChild(itemTooltip);


        var rowData = [currentIcon,item.name,item.ItemLevel,item.RequiredLevel,item.subclass];
        appendItemTableRow(rowData,table);

        currentIcon.addEventListener("mouseover", function( event ) { 

            var tooltips = currentIcon.querySelectorAll('.item-tooltip-container');
            window.onmousemove = function (e) {
                var x = (e.clientX +30) + 'px',
                    y = (e.clientY ) + 'px';
                
                tooltips[0].style.top = y;
                tooltips[0].style.left = x;
                
            };
        },false);          


    });
 
}

function FindElements(arr, propName, propValue) {
    var elements = new Array();
    for (var i=0; i < arr.length; i++)
      if (arr[i][propName] == propValue)
      {
        elements.push(arr[i]);
      }
        return elements;
  
    // will return undefined if not found; you could return a default instead
  }


function GetItemQualityList(){
    GetRequest(HOST+"/queryitemquality", [], [], SetItemQualityOptions)
}

function SetItemQualityOptions(data)
{
    var itemQualitySelect = document.getElementById("item-quality");
    data.forEach((element)=>{
        var newChild = document.createElement("option");
        newChild.value = element.quality;
        newChild.innerText = element.quality;
        itemQualitySelect.appendChild(newChild);

    });
}
function GetItemSubClassList(){
    GetRequest(HOST+"/queryitemsubclass", [], [], SetItemSubClassOptions)
}

function SetItemSubClassOptions(data)
{
    var itemQualitySelect = document.getElementById("item-subclass");
    data.forEach((element)=>{
        var newChild = document.createElement("option");
        newChild.value = element.subclass;
        newChild.innerText = element.subclass;
        itemQualitySelect.appendChild(newChild);

    });
}


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

(function(window, document, undefined){


    window.onload = init;
    
    function init(){

        //cached queries
        QueryItemStats();
        QueryItemDamage();
        GetItemQualityList();
        GetItemSubClassList();

        var itemSearchButton = document.getElementById("item-search-button");

        itemSearchButton.addEventListener('click', function(){

            
            var itemName = document.getElementById("item-name").value;

            var selectQuality = document.getElementById("item-quality");
            var qualityIdx = selectQuality.selectedIndex;
            var itemQuality = document.getElementsByTagName("option")[qualityIdx].value;

            var selectSubClass = document.getElementById("item-subclass");
            var subClassIdx = selectSubClass.selectedIndex;
            var itemSubClass = selectSubClass.getElementsByTagName("option")[subClassIdx].value;

            var table = document.getElementById("item-table");

            while (table.firstChild) {
                table.removeChild(table.firstChild);
            }

            QueryItems(itemName,itemQuality,itemSubClass);

        });
    }
    
    })(window, document, undefined);
    




