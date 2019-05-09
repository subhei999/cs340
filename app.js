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

app.get('/createaccount', (req, res) => {
  res.render('createaccount.handlebars');
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
  mysql.pool.query('SELECT * FROM ' + req.query.tablename, function(err, rows, fields){
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
  mysql.pool.query("SELECT MMIT.name, MMIT.ItemLevel, MIQ.quality, MIB.Description, MIC.Classname_enUS, MISC.subclass,MII.inventoryIcon,MMIT.Description as FlavorText,MIQ.Color,MMIT.RequiredLevel,MIB.Description as BindingText\
    FROM mmo_itemTemplate MMIT\
    INNER JOIN mmo_itemBonding MIB on MIB.id = MMIT.itemBonding_id\
    INNER JOIN mmo_itemClass MIC on MIC.ID = MMIT.itemClass_id\
    INNER JOIN mmo_itemSubClass MISC on MISC.class_id = MIC.ID\
    INNER JOIN mmo_itemQuality MIQ on MIQ.id = MMIT.itemQuality_id\
    INNER JOIN mmo_itemIcon MII on MII.ID = MMIT.itemIcon_id\
    WHERE MISC.subclass_id = MMIT.itemSubClass_id AND MIC.Classname_enUS like ? AND MMIT.name like ? AND MIQ.quality like ?\
    order by MMIT.ItemLevel desc\
    LIMIT 100", ['%'+req.query.itemClass,req.query.itemName+'%',req.query.itemQuality+"%"],function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(context.results);
  });
});


// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});


