const express = require("express")
const app = express()
const exphbs = require("express-handlebars")
const moment = require("moment")
const {nuevaTarea, getTodos, eliminarTarea} = require("./consultas")

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist/css"))
app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist/js"))
app.use("/public", express.static(__dirname + "/public/"))

app.set("view engine", "handlebars")

app.engine("handlebars", exphbs.engine({
    layoutsDir: __dirname + "/views",
    partialsDir: __dirname + "/views/components"
}))

app.get("/", async (_, res) => {
    const todos = await getTodos()
    res.render("inicio", {
        layout: "inicio",
        todos
    })
})

app.get("/todos", async (_, res) => {
    const tareas = await getTodos()
    res.send(JSON.stringify(tareas))
})

app.get("/todo-create", (_, res) => {
    res.render("create", {
        layout: "create"
    })
})

app.post("/todos", async (req, res) => {
    const {nombre, descripcion} = req.body
    const fecha = moment().locale("es").format('LLL')
    await nuevaTarea(nombre, descripcion, fecha)
    res.redirect("/")

})

app.get("/todo-delete", (req, res) => {
    const {id} = req.query
    res.render("eliminar", {
        layout: "eliminar",
        id
    })
})

app.get("/todo", async (req, res) => {
    const {id} = req.query
    await eliminarTarea(id)
    res.redirect("/")
})

app.listen(4000, () => console.log("Servidor levantado en dirección: http://localhost:4000/"))