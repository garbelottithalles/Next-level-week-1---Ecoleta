const express = require("express")
const app = express()
const db = require("./database/db")

// Config Static Files
app.use(express.static("public"))

// Config req.body for POST
app.use(express.urlencoded({ extended: true }))

// Template Engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: app,
    noCash: true
})

// Routes
app.get('/', (req, res) => {
    return res.render('index.html')
})

app.get('/create-point', (req, res) => {

    // req.query = query Strings of URL
    // console.log(req.query)

    return res.render('create-point.html')
})

app.post('/create-point', (req, res) => {
    const query = (`
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `)

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }
        console.log("Cadastrado!")
        console.log(this)
        return res.render('create-point.html', { saved: true })
    }

    db.run(query, values, afterInsertData)
})

app.get('/search-results', (req, res) => {

    const search = req.query.search

    if (search == "") {
        return res.render('search-results.html', { total: 0 })
    }
        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
            if (err) {
                console.log(err)
            }
            const total = rows.length
            return res.render('search-results.html', { places: rows, total: total })
        })
})

// Port
app.listen(3000)