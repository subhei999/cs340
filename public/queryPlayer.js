
var chart_race;
var chart_class;

am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_dark);
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    chart_race = am4core.create("popRacediv", am4charts.PieChart);
    
    // Add data
    chart_race.data = [ {
        "Race": "Human",
         "Population": 0
    },
    {
        "Race": "Orc",
        "Population": 0
    },
    {
        "Race": "Night Elf",
        "Population": 0
    },
    {
        "Race": "Tauren",
        "Population": 0
    },
    {
        "Race": "Dwarf",
        "Population": 0
    },
    {
        "Race": "Troll",
        "Population": 0
    },
    {
        "Race": "Gnome",
        "Population": 0
    },
    {
        "Race": "Undead",
        "Population": 0
    },
     ];
    
    // Add and configure Series
    var pieSeries = chart_race.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "Population";
    pieSeries.dataFields.category = "Race";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template.events.on("hit",function(ev){
        console.log(ev.target.dataItem.properties.category)
        GetRequest('/querycharacters', ['race','class'], [ev.target.dataItem.properties.category,''], BuildCharTable)
    });

    
    
    
    
    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
    
    chart_class = am4core.create("popClassdiv", am4charts.PieChart);

         // Add data
    chart_class.data = [ {
        "Class": "Warrior",
         "Population": 0,
    },
    {
        "Class": "Rogue",
         "Population": 0,
         
    },
    {
        "Class": "Shaman",
         "Population": 0
    },
    {
        "Class": "Priest",
         "Population": 0
    },
    {
        "Class": "Paladin",
         "Population": 0
    },
    {
        "Class": "Mage",
         "Population": 0
    },
    {
        "Class": "Warlock",
         "Population": 0
    },
    {
        "Class": "Hunter",
         "Population": 0
    },
     ];
    
    // Add and configure Series
    var pieSeries = chart_class.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "Population";
    pieSeries.dataFields.category = "Class";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    
    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
    pieSeries.slices.template.events.on("hit",function(ev){
        GetRequest('/querycharacters', ['race','class'], ['',ev.target.dataItem.properties.category], BuildCharTable)
    });

    }); // end am4core.ready()



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


function UpdateRaceChart(data)
{
    for (let index = 0; index < data.length; index++) {
        var race_name = data[index].name;
        var race_index;
        
        for (let j = 0; j < chart_race.data.length; j++) {
            if(chart_race.data[j]['Race'] == race_name)
                race_index = j; 
        }
        chart_race.data[race_index]['Population'] = data[index].race_count;
    }
    chart_race.invalidateData();

}

function UpdateClassChart(data)
{
    for (let index = 0; index < data.length; index++) {
        var class_name = data[index].name;
        var class_index;
        
        for (let j = 0; j < chart_class.data.length; j++) {
            if(chart_class.data[j]['Class'] == class_name)
                class_index = j; 
        }
        chart_class.data[class_index]['Population'] = data[index].class_count;
    }
    chart_class.invalidateData();

}

function BuildCharTable(queryResult)
{
    var table = document.getElementById("char-table");
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    var queryTable = document.getElementById("char-query-result");
    queryTable.appendChild(table);
    table.appendChild(CreateCharTableHeader());

    queryResult.forEach(char => {
        var rowData = [char.account,char.name,char.class,char.race,char.lvl];
        appendCharTableRow(rowData,table);

    });
}

function CreateCharTableHeader()
{
    var tr = document.createElement("tr");
    tr.setAttribute("class","table-header");

    var th_account = document.createElement("th");
    var th_name = document.createElement("th");
    var th_class = document.createElement("th");
    var th_race = document.createElement("th");
    var th_lvl = document.createElement("th");
    
    th_account.innerText = "Account";
    th_name.innerText = "Name";
    th_class.innerText = "Class";
    th_race.innerText = "Race";
    th_lvl.innerText = "Lvl";

    tr.appendChild(th_account);
    tr.appendChild(th_name);
    tr.appendChild(th_class);
    tr.appendChild(th_race);
    tr.appendChild(th_lvl);

    return tr;

}

function appendCharTableRow(rowData,table)
{
    var row = document.createElement("tr");
    rowData.forEach(columnData => {
        var column = document.createElement("td");
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

function GetAccountList(){
    GetRequest("/queryaccount", [], [], SetAccountOptions)
}

function SetAccountOptions(data)
{
    var select = document.getElementById("account-select");
    data.forEach((element)=>{
        var newChild = document.createElement("option");
        newChild.value = element.id;
        newChild.innerText = element.email;
        select.appendChild(newChild);

    });
}

function GetRaceList(){
    GetRequest("/queryrace", [], [], SetRaceOptions)
}

function SetRaceOptions(data)
{
    var select = document.getElementById("race-select");
    data.forEach((element)=>{
        var newChild = document.createElement("option");
        newChild.value = element.id;
        newChild.innerText = element.race;
        select.appendChild(newChild);

    });
}

function GetClassList(){
    GetRequest("/queryclass", [], [], SetClassOptions)
}

function SetClassOptions(data)
{
    var select = document.getElementById("class-select");
    data.forEach((element)=>{
        var newChild = document.createElement("option");
        newChild.value = element.id;
        newChild.innerText = element.class;
        select.appendChild(newChild);

    });
}

function CreateCharacter()
{
    var account = document.getElementsByName("Account")[0].value;
    var name = document.getElementsByName("CharName")[0].value;
    var race = document.getElementsByName("Race")[0].value;
    var char_class = document.getElementsByName("Class")[0].value;
    GetRequest('/createcharacter', ['account','name','race','class'], [account,name,race,char_class])
}

function UpdatePieCharts()
{
    GetRequest('/countcharacterrace', [], [], UpdateRaceChart);
    GetRequest('/countcharacterclass', [], [], UpdateClassChart);
}

(function(window, document, undefined){


    window.onload = init;
    function init(){

        
        UpdatePieCharts();
        GetAccountList();
        GetClassList();
        GetRaceList();

        
    }

})(window, document, undefined);

