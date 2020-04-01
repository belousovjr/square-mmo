const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req,res) =>{
    res.send('<h1>Hello!!!!</h1>');
});


app.listen(PORT, function(){
    console.log(`Listening on port ${PORT}!`)
});