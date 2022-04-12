const express = require('express');
//const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
   
//parse application/json

//app.use(bodyParser.json());
app.use(express.json());
   
//Database Connection

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root', /* MySQL User */
  password: 'root', /* MySQL Password */
  database: 'mysqlDatabase' /* MySQL Database */
});
   
//Shows Mysql Connect

conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected with App...');
});
   
//Get All Items
 
app.get('/api/items',(req, res) => {
  let sqlQuery = "SELECT * FROM items";
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
// Get Single Item
 

app.get('/api/items/:id',(req, res) => {
  let sqlQuery = "SELECT * FROM items WHERE id=" + req.params.id;
    
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
// Create New Item

app.post('/api/items',(req, res) => {
  let data = {title: req.body.title, body: req.body.body};
  
  let sqlQuery = "INSERT INTO items SET ?";
  
  let query = conn.query(sqlQuery, data,(err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
// Update Item

app.put('/api/items/:id',(req, res) => {
  let sqlQuery = "UPDATE items SET title='"+req.body.title+"', body='"+req.body.body+"' WHERE id="+req.params.id;
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
// Delete Item

app.delete('/api/items/:id',(req, res) => {
  let sqlQuery = "DELETE FROM items WHERE id="+req.params.id+"";
    
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
      res.send(apiResponse(results));
  });
});
  
// API Response
 
function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}
   
//Server listening

app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});