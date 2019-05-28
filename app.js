'use strict';

const express = require('express');
const app = express();


var mysql = require('./dbcon.js');

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Use the built-in express middleware for serving static files from './public'
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
  res.render('home.handlebars');
});

app.get('/accountcreation', (req, res) => {
  res.render('accountcreation.handlebars');
});

app.get('/itemsearch', (req, res) => {
  res.render('itemsearch.handlebars');
});

app.get('/accountstats', (req, res) => {
  res.render('accountstats.handlebars');
});

app.get('/playerstats', (req, res) => {
  res.render('playerstats.handlebars');
});

//manual db table editing 
app.get('/modify', (req, res) => {
  res.render('tablelist.handlebars');
});
app.get('/modify-account', (req, res) => {
  res.render('modify-account.handlebars');
});
app.get('/modify-character', (req, res) => {
  res.render('modify-character.handlebars');
});
app.get('/modify-class', (req, res) => {
  res.render('modify-class.handlebars');
});
app.get('/modify-faction', (req, res) => {
  res.render('modify-faction.handlebars');
});
app.get('/modify-inventory', (req, res) => {
  res.render('modify-inventory.handlebars');
});
app.get('/modify-item', (req, res) => {
  res.render('modify-item.handlebars');
});
app.get('/modify-race', (req, res) => {
  res.render('modify-race.handlebars');
});
app.get('/modify-reputation', (req, res) => {
  res.render('modify-reputation.handlebars');
});
app.get('/modify-session', (req, res) => {
  res.render('modify-session.handlebars');
});



//basic table queries
app.get('/table',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM ' + req.query.tablename +' LIMIT 1000', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(context.results);
  });
});

//basic row delete
app.get('/delete',function(req,res,next){
  var context = {};
  mysql.pool.query("DELETE FROM " + req.query.tablename +  " WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Deleted " + result.changedRows + " rows.";
    res.sendStatus(200);
  });
});


//item queries
app.get('/queryitem',function(req,res,next){
  var context = {};
  mysql.pool.query(
    "SELECT MMIT.name, MMIT.ItemLevel, MIQ.quality, MIB.Description,\
     MIC.Classname_enUS, MISC.subclass,MII.inventoryIcon,MMIT.Description as FlavorText,\
     MIQ.Color,MMIT.RequiredLevel,MIB.Description as BindingText,\
     MMIT.maxcount,MMIT.delay as attack_time, MMIT.armor, MMIT.MaxDurability\
     FROM mmo_itemTemplate MMIT\
    LEFT JOIN mmo_itemBonding MIB on MIB.id = MMIT.itemBonding_id\
    INNER JOIN mmo_itemClass MIC on MIC.ID = MMIT.itemClass_id\
    LEFT JOIN mmo_itemSubClass MISC on MISC.class_id = MIC.ID\
    INNER JOIN mmo_itemQuality MIQ on MIQ.id = MMIT.itemQuality_id\
    LEFT JOIN mmo_itemIcon MII on MII.ID = MMIT.itemIcon_id\
    WHERE MISC.subclass_id = MMIT.itemSubClass_id AND MISC.subclass like ? AND MMIT.name like ? AND MIQ.quality like ?\
    ORDER BY MMIT.ItemLevel DESC\
    LIMIT 500",
     [req.query.itemSubClass+'%',req.query.itemName+'%',req.query.itemQuality+'%'],function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(context.results);
  });
});


app.get('/queryitemdamage',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT MIT.name,MIDT.Description as dmg_type,MID.dmg_min,MID.dmg_max\
    FROM mmo_itemDmgMinMax MID\
    INNER JOIN mmo_itemTemplate MIT ON MIT.id = MID.item_id\
    INNER JOIN mmo_itemDmgType MIDT ON MIDT.id = MID.dmg_type\
    ORDER BY MIT.id, MID.dmg_type"
    ,function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(context.results);
  });
});

app.get('/queryitemquality',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT MIQ.quality\
    FROM mmo_itemQuality MIQ\
    ORDER BY MIQ.id"
    ,function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(context.results);
  });
});

app.get('/queryitemsubclass',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT MISC.subclass\
    FROM mmo_itemSubClass MISC\
    ORDER BY MISC.class_id"
    ,function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(context.results);
  });
});

app.get('/queryitemstats',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT MIT.name,MISV.statValue,MIST.Description as stat_type\
  FROM mmo_itemStatValue MISV\
  INNER JOIN mmo_itemTemplate MIT ON MIT.id = MISV.item_id\
  INNER JOIN mmo_itemStatType MIST ON MIST.id = MISV.statType_id\
  ORDER BY MIT.id, MISV.statType_id"
    ,function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(context.results);
  });
});

app.get('/querycharacters',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT MA.email as account, MCH.name as name, MC.name as class,\
   MR.name as race, MCH.lvl as lvl\
  FROM mmo_character MCH\
  INNER JOIN mmo_account MA ON MA.id = MCH.account_id\
  INNER JOIN mmo_race MR ON MR.id = MCH.race_id\
  INNER JOIN mmo_class MC ON MC.id = MCH.class_id\
  WHERE MR.name LIKE ? AND MC.name LIKE ?"
    ,[req.query.race+'%',req.query.class+'%'],function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(context.results);
  });
});

app.get('/queryaccount',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT MA.id,MA.email\
  FROM mmo_account MA"
    ,function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(context.results);
  });
});

app.get('/queryrace',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT MR.id,MR.name as race\
  FROM mmo_race MR"
    ,function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(context.results);
  });
});

app.get('/queryclass',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT MC.id, MC.name as class\
  FROM mmo_class MC"
    ,function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(context.results);
  });
});


app.get('/querycountries',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT DISTINCT WC.country\
  FROM worldcities WC"
    ,function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(context.results);
  });
});

app.get('/querycities',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT WC.city\
  FROM worldcities WC\
  WHERE WC.country LIKE ?",
    [req.query.country+'%'],function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(context.results);
  });
});




app.get('/countcharacterrace',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT MR.name,count(MCH.id) as race_count\
  FROM mmo_character MCH\
  INNER JOIN mmo_race MR ON MR.id = MCH.race_id\
  GROUP BY MR.name"
    ,function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(context.results);
  });
});

app.get('/countcharacterclass',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT MC.name,count(MCH.id) as class_count\
  FROM mmo_character MCH\
  INNER JOIN mmo_class MC ON MC.id = MCH.class_id\
  GROUP BY MC.name"
    ,function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(context.results);
  });
});




app.get('/insertaccount',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO mmo_account (`email`,`password`,`Banned`,`Offense`) VALUES (?,?,?,?)", 
  [req.query.email,req.query.password,req.query.banned,req.query.offense], function(err, result){
    if(err){
      next(err);
      return;
    }
    res.type("application/json");
    context.results = "Inserted id " + result.insertId;
    console.log("inserted db entry");
    res.sendStatus(200);

  });
});

app.get('/createcharacter',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO mmo_character (`account_id`,`name`,`race_id`,`class_id`) VALUES (?,?,?,?)", 
  [req.query.account,req.query.name,req.query.race,req.query.class], function(err, result){
    if(err){
      next(err);
      return;
    }
    res.type("application/json");
    context.results = "Inserted id " + result.insertId;
    console.log("inserted db entry");
    res.sendStatus(200);

  });
});

app.get('/createaccount',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO mmo_account (`email`,`password`) VALUES (?,?)", 
  [req.query.email,req.query.psw], function(err, result){
    if(err){
      next(err);
      return;
    }
    res.type("application/json");
    context.results = "Inserted id " + result.insertId;
    console.log("inserted db entry");
    res.sendStatus(200);

  });
});



// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});


