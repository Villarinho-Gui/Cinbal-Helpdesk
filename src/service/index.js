import express from 'express';
const app = express();

import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: false }));


app.post("/cadastro", (req, res)=>{
    const nome = req.body.nome;
    const email = req.body.email;
    const password = req.body.password;
    const ramal = req.body.ramal;
    const funcao = req.body.funcao;
    const setor = req.body.setor;
    const filial = req.body.filial;
    res.send("formulario recebido!")
    console.log(req)
});

app.listen(8181, function (erro) {
    if (erro) {
        console.log('erro');
    }
    else {
        console.log('Servidor iniciado com sucesso!');
    }

});

