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
    let restaurant = JSON.parse(data)

    app.post("/api/reservations", (req, res) => {
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



/////////////
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'landingPage.html')));

app.get('/reservations', (req, res) => res.sendFile(path.join(__dirname, 'reservations.html')));

app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tables.html')));


// app.get('/api/tables', (req, res) => res.json(tables));
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));