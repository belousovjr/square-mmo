const express = require('express');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

/*
app.get('/', (req,res) =>{
    res.send('<h1>Hello!!!!</h1>');
});*/


app.listen(PORT, function(){
    console.log(`Listening on port ${PORT}!`)
});