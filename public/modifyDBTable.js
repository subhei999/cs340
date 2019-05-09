const HOST = "http://localhost:8080";
function insert()
{
    var name = document.getElementById("name_input").value;
    var reps = document.getElementById("reps_input").value;
    var weight = document.getElementById("weight_input").value;
    var unit = document.getElementById("unit_input").value;
    var date = document.getElementById("date_input").value;
    
    name = name.trim();
    if (name == null || name=="")
    {
        alert("Invalid name");
        return;
    }
    var req = new XMLHttpRequest();
    req.open("GET",HOST+"/insert?name="+name+"&reps="+reps+"&weight="+weight+"&date="+date+"&unit="+unit,true);
    req.send(null);

    req.onreadystatechange = function() {//async
        if(req.readyState == 4 && req.status == 200) 
        {

            updateTable();

        }
    }
    
}


 function createHTMLTable(target_id,id,data)
  {
    row = data.length;


    var col = [];
    for (var i = 0; i < data.length; i++) {
        for (var key in data[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    column = col.length;

    var node = document.getElementById(target_id)

    var table = document.createElement("table");
    table.setAttribute('id',id);
    table.setAttribute('class',"myTable");
    node.appendChild(table);
    table.style.width="820px";
    

    var thead = document.createElement("thead");
    
    table.appendChild(thead);
    
    var tr = document.createElement("tr");
	tr.setAttribute('id','tr_header')
    thead.appendChild(tr);
    
   
    for(x=0; x<column;x++) {

      var th = document.createElement("th");
      th.setAttribute('id','th_' + x)
      th.innerHTML = col[x];
      tr.appendChild(th);
      th.style.border = 'solid #070707';
      th.style.borderWidth = 'thin';
      
    }
    
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);
    
   for(x=0; x<=row;x++) 
   {
       if(x==0)
       {
            var inputElement;
            tr = document.createElement("tr");
            tbody.appendChild(tr);
            
            for(y=0;y<column;y++)
            {

                var td = document.createElement("td");
                inputElement = document.createElement("input");
                inputElement.setAttribute("name",col[y]);
                inputElement.setAttribute("type","text");
                //inputElement.setAttribute("type","number");
                //inputElement.setAttribute("id","name_input");
                //inputElement.setAttribute("type","date"); 
                inputElement.setAttribute("size","8");
                td.appendChild(inputElement);
              
                tr.appendChild(td);

                if(y==column-1)
                {

                    var temp_td = document.createElement("td");

                    var insert_button = document.createElement("input");
                    insert_button.setAttribute("type","button");
                    insert_button.setAttribute("value","insert");
                    insert_button.setAttribute("class","button");
                    insert_button.setAttribute("id","insert-"+(x+1));
                    insert_button.setAttribute("onclick","insert()");


                    var temp_td = document.createElement("td");
                    tr.appendChild(temp_td);
                    temp_td.appendChild(insert_button);

                
                }

                td.style.border = 'solid #070707';
                td.style.borderWidth = 'thin';
            }
       }
       else
       {
            tr = document.createElement("tr");
            tr.setAttribute('id', data[x-1][col[0]]);
            tbody.appendChild(tr);
            
            for(y=0;y<column;y++)
            {
                
                var td = document.createElement("td");
                td.setAttribute('id','table1_tr' + x + '_td' + y)
                
                td.innerHTML = data[x-1][col[y]];
            
                tr.appendChild(td);



                if(y==column-1)
                {

                    var temp_td = document.createElement("td");

                    var del_button = document.createElement("input");
                    del_button.setAttribute("type","button");
                    del_button.setAttribute("value","delete");
                    del_button.setAttribute("class","button");
                    del_button.setAttribute("id","delete-"+(x+1));
                    del_button.setAttribute("onclick","del(this)");

                    var edit_button = document.createElement("input");
                    edit_button.setAttribute("type","button");
                    edit_button.setAttribute("value","edit");
                    edit_button.setAttribute("class","button");
                    edit_button.setAttribute("id","edit-"+(x+1));
                    edit_button.setAttribute("onclick","edit(this)");

                    var temp_td = document.createElement("td");
                    tr.appendChild(temp_td);
                    temp_td.appendChild(del_button);

                    temp_td = document.createElement("td");
                    tr.appendChild(temp_td);
                    temp_td.appendChild(edit_button);
                }

                td.style.border = 'solid #070707';
                td.style.borderWidth = 'thin';
            }
        }

    }
    
}  






function del(o)
{
    var tableName = document.getElementsByClassName("databaseTable")[0].id;
    var db_id = o.parentNode.parentNode.getAttribute("id");

    var req = new XMLHttpRequest();
    req.open("GET",HOST+"/delete?tablename="+tableName+"&id="+db_id,true)
    req.send(null);

    req.onreadystatechange = function() {//async
        if(req.readyState == 4 && req.status == 200) 
        {
            updateTable(tableName);
            
        }
    }
   
    
}

function edit(o)
{
    
    //transform row to editable inputs

    for(var i=0;i<5;i++)
    {
        var curVal = o.parentNode.parentNode.children[i].innerText;
        o.parentNode.parentNode.children[i].innerText = "";

        var editVal = document.createElement("input");
        editVal.setAttribute("size","5");
        switch(i)
        {
            case 0:
            editVal.setAttribute("type","text");
            editVal.setAttribute("size","8");
            break;
            case 1:
            editVal.setAttribute("type","number");
            editVal.setAttribute("size","3");
            break;
            case 2:
            editVal.setAttribute("type","number");
            editVal.setAttribute("size","3");
            break;
            case 3:
            editVal.setAttribute("type","text");
            editVal.setAttribute("size","1");
            break;
            case 4:
            editVal.setAttribute("type","date");
            editVal.setAttribute("size","5");
            break;
        }
        if (i==4)
        {
            editVal.valueAsDate = new Date(curVal);
        }
        else{
            editVal.value = curVal;
        }
        
        o.parentNode.parentNode.children[i].appendChild(editVal);
    }
    
    //replace edit button with save button
    var save_button = document.createElement("input");
    save_button.setAttribute("class","button");
    save_button.setAttribute("type","button");
    save_button.setAttribute("value","save");
    save_button.setAttribute("onclick","save(this)");
    
    o.parentNode.appendChild(save_button);
    o.remove();
    
    
    
}

function save(o)
{
    var db_id = o.parentNode.parentNode.getAttribute("id");

    var name = o.parentNode.parentNode.children[0].children[0].value;
    var reps = o.parentNode.parentNode.children[1].children[0].value;
    var weight = o.parentNode.parentNode.children[2].children[0].value;
    var unit = o.parentNode.parentNode.children[3].children[0].value;
    var date = o.parentNode.parentNode.children[4].children[0].value;

    var req = new XMLHttpRequest();
    req.open("GET",HOST+"/safe-update?id="+db_id+"&name="+name+"&reps="+reps+"&weight="+weight+"&date="+date+"&unit="+unit,true)
    req.send(null);

    req.onreadystatechange = function() {//async
        if(req.readyState == 4 && req.status == 200) 
        {

            updateTable();
            

        }
    }
  
}

function updateTable(db_table)
{
 
    if (document.getElementById(db_table+"-table") != null)
    {
        document.getElementById(db_table+"-table").remove();
    }

    var req = new XMLHttpRequest();
    req.open("GET",HOST+"/table?tablename="+db_table,true);
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
                console.log(data);
                createHTMLTable("main",db_table+"-table",data);
            
            }
        }
    }
    
    
    
}

(function(window, document, undefined){


window.onload = init;

function init(){
    var tableName = document.getElementsByClassName("databaseTable")[0].id;
    updateTable(tableName);

}

})(window, document, undefined);
