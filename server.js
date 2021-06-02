const express = require('express');
const path = require('path');
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname));



fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err
    restaurant = JSON.parse(data)

    app.post("/api/reservation", (req, res) => {
        let newRes = req.body;
        restaurant.push(newRes);
        updateData();
        console.log('Database is updated: \n' + newRes.title);
    })

    function updateData() {
        fs.writeFile("db/db.json",JSON.stringify(restaurant),err => {
                if (err) throw err;
                return true
            }
        )
    }

})
