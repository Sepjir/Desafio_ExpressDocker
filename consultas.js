require('dotenv').config()

const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})


async function nuevaTarea(nombre, descripcion, fecha) {
    try {
        const result = await pool.query("INSERT INTO todos (title, description, fecha) VALUES ($1, $2, $3) RETURNING*;",
        [`${nombre}`, `${descripcion}`, `${fecha}`]
        )
        return result.rows
    } catch (e) {
        return e
    }
}

async function getTodos() {
    try {
        const result = await pool.query("SELECT * FROM todos")
        return result.rows
    } catch (e) {
        return e
    }
}

async function eliminarTarea(id) {
    try {
        const result = await pool.query("DELETE FROM todos WHERE id = $1",
        [`${id}`]
        )
        return result.rowCount
    } catch (e) {
        return e
    }
}

module.exports = {nuevaTarea, getTodos, eliminarTarea}