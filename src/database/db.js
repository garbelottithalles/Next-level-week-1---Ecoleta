const sql = require("sqlite3").verbose()

// Criar o objeto que irá fazer operações no banco de dados
const db = new sql.Database("./src/database/database.db")

// Utilizar o objeto de banco de dados para nossas aplicações

/*
db.serialize(() => {
    // Criar uma tabela com comandos sql
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    // Inserir dados na tabela
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
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
        "Colectoria",
        "Guilherme Gembala, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]

    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }
        console.log("Cadastrado!")
        console.log(this)
    }

    // db.run(query, values, afterInsertData)

    // Consultar dados na tabela
    db.all(`SELECT name FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        } 
        console.log(rows)
    })
    
    // Deletar dados na tabela
    db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
        if(err) {
            return console.log(err)
        }
        console.log("Deleted")
    })
})
*/

module.exports = db