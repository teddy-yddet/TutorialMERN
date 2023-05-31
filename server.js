const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Cconectado ao banco de dados!");
  })
  .catch((err) => {
    console.log("Erro ao conectar com o banco de dados!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bem vindo o servidor IFSP" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor  rodando em http://localhost:${PORT}.`);
});
