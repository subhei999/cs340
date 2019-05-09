am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_dark);
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart_race = am4core.create("popRacediv", am4charts.PieChart);
    
    // Add data
    chart_race.data = [ {
        "Race": "Human",
         "Population": 5
    },
    {
        "Race": "Orc",
        "Population": 5
    },
    {
        "Race": "Night Elf",
        "Population": 5
    },
    {
        "Race": "Tauren",
        "Population": 5
    },
    {
        "Race": "Dwarf",
        "Population": 5
    },
    {
        "Race": "Troll",
        "Population": 5
    },
    {
        "Race": "Gnome",
        "Population": 5
    },
    {
        "Race": "Undead",
        "Population": 5
    },
     ];
    
    // Add and configure Series
    var pieSeries = chart_race.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "Population";
    pieSeries.dataFields.category = "Race";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    
    
    
    
    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
    
    var chart_class = am4core.create("popClassdiv", am4charts.PieChart);

         // Add data
    chart_class.data = [ {
        "Class": "Warrior",
         "Population": 5,
    },
    {
        "Class": "Rogue",
         "Population": 5,
         
    },
    {
        "Class": "Shaman",
         "Population": 5
    },
    {
        "Class": "Priest",
         "Population": 5
    },
    {
        "Class": "Paladin",
         "Population": 5
    },
    {
        "Class": "Mage",
         "Population": 5
    },
    {
        "Class": "Warlock",
         "Population": 5
    },
    {
        "Class": "Hunter",
         "Population": 5
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


    }); // end am4core.ready()