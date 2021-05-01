const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json());



app.listen(process.env.PORT || 3000, () => {
    console.log("Server started (http://localhost:3000/) !");
});


const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error("Erro opening database " + err.message);
    } else {

    }
});

// --------------------------- VEÍCULO ---------------------------
// Selecionar todos os VEÍCULOS
app.get('/automovel', (req, res) => {
    db.all('SELECT * FROM TB_AUTOMOVEL', [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        
        res.status(200).json(rows);

    });
});

// Selecionar VEÍCULO por ID
app.get("/automovel/:id", (req, res) => {
    var params = [req.params.id]
    db.get(`SELECT * FROM TB_AUTOMOVEL where ID_VEICULO = ?`, [params], (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json(row);
    });
});

// Contar todos os VEÍCULOS DISPONIVEIS
app.get('/automovel/disponivel', (req, res) => {
    db.all('SELECT COUNT(ID_VEICULO) FROM TB_AUTOMOVEL WHERE FLAG_ATIVO = 1 AND FLAG_DEVOLVIDO = 1;', [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        
        res.status(200).json(rows);

    });
});

// Contar todos os VEÍCULOS OCUPADOS
app.get('/automovel/ocupados', (req, res) => {
    db.all('SELECT COUNT(ID_VEICULO) FROM TB_AUTOMOVEL WHERE FLAG_ATIVO = 1 AND FLAG_DEVOLVIDO = 0;', [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        
        res.status(200).json(rows);

    });
});

// Contar todos os VEÍCULOS INATIVOS
app.get('/automovel/ocupados', (req, res) => {
    db.all('SELECT COUNT(ID_VEICULO) FROM TB_AUTOMOVEL WHERE FLAG_ATIVO = 0 AND FLAG_DEVOLVIDO = 1;', [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        
        res.status(200).json(rows);

    });
});

// Cadastrar VEÍCULO
app.post("/automovel", (req, res) => {

    const { MARCA, MODELO, COR, RENAVAM, CHASSI, PLACA, NUMERO_PORTAS, QTD_LUGARES, COMBUSTIVEL, ANO_FABRICACAO, MOTOR, KM_ATUAL, STATUS_VEICULO, VALOR_DIARIA, DIRECAO, FLAG_ATIVO, FLAG_DEVOLVIDO, FLAG_AR, FLAG_VIDRO_ELETRICO, FLAG_TRAVA_ELETRICA, FLAG_AIRBAG, FLAG_ABS, FLAG_AUTOMATICO, FLAG_4X4 } = req.body;

    db.run(`INSERT INTO TB_AUTOMOVEL (MARCA, MODELO, COR, RENAVAM, CHASSI, PLACA, NUMERO_PORTAS, QTD_LUGARES, COMBUSTIVEL, ANO_FABRICACAO, MOTOR, KM_ATUAL, STATUS_VEICULO, VALOR_DIARIA, DIRECAO, FLAG_ATIVO, FLAG_DEVOLVIDO, FLAG_AR, FLAG_VIDRO_ELETRICO, FLAG_TRAVA_ELETRICA, FLAG_AIRBAG, FLAG_ABS, FLAG_AUTOMATICO, FLAG_4X4) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [MARCA, MODELO, COR, RENAVAM, CHASSI, PLACA, NUMERO_PORTAS, QTD_LUGARES, COMBUSTIVEL, ANO_FABRICACAO, MOTOR, KM_ATUAL, STATUS_VEICULO, VALOR_DIARIA, DIRECAO, FLAG_ATIVO, FLAG_DEVOLVIDO, FLAG_AR, FLAG_VIDRO_ELETRICO, FLAG_TRAVA_ELETRICA, FLAG_AIRBAG, FLAG_ABS, FLAG_AUTOMATICO, FLAG_4X4],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(201).json({
                "idAutomovel": this.lastID
            })
        });
});


// Editar VEÍCULO
app.put("/automovel/:id", (req, res) => {
    const { MARCA, MODELO, COR, RENAVAM, CHASSI, PLACA, NUMERO_PORTAS, QTD_LUGARES, COMBUSTIVEL, ANO_FABRICACAO, MOTOR, KM_ATUAL, STATUS_VEICULO, VALOR_DIARIA, DIRECAO, FLAG_ATIVO, FLAG_DEVOLVIDO, FLAG_AR, FLAG_VIDRO_ELETRICO, FLAG_TRAVA_ELETRICA, FLAG_AIRBAG, FLAG_ABS, FLAG_AUTOMATICO, FLAG_4X4 } = req.body;
    const { id } = req.params;

    db.run(`UPDATE TB_AUTOMOVEL SET MARCA = ?, MODELO = ?, COR = ?, RENAVAM = ?, CHASSI = ?, PLACA = ?, NUMERO_PORTAS = ?, QTD_LUGARES = ?, COMBUSTIVEL = ?, ANO_FABRICACAO = ?, MOTOR = ?, KM_ATUAL = ?, STATUS_VEICULO = ?, VALOR_DIARIA = ?, DIRECAO = ?, FLAG_ATIVO = ?, FLAG_DEVOLVIDO = ?, FLAG_AR = ?, FLAG_VIDRO_ELETRICO = ?, FLAG_TRAVA_ELETRICA = ?, FLAG_AIRBAG = ?, FLAG_ABS = ?, FLAG_AUTOMATICO = ?, FLAG_4X4 = ? WHERE ID_VEICULO = ?`,
        [MARCA, MODELO, COR, RENAVAM, CHASSI, PLACA, NUMERO_PORTAS, QTD_LUGARES, COMBUSTIVEL, ANO_FABRICACAO, MOTOR, KM_ATUAL, STATUS_VEICULO, VALOR_DIARIA, DIRECAO, FLAG_ATIVO, FLAG_DEVOLVIDO, FLAG_AR, FLAG_VIDRO_ELETRICO, FLAG_TRAVA_ELETRICA, FLAG_AIRBAG, FLAG_ABS, FLAG_AUTOMATICO, FLAG_4X4, id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ updatedID: this.changes });
        });
});

// Ativar e Invativar VEÍCULO
app.patch("/automovel/:id", (req, res) => {
    const { FLAG_ATIVO } = req.body;
    const { id } = req.params;

    db.run(`UPDATE TB_AUTOMOVEL SET FLAG_ATIVO = ? WHERE ID_VEICULO = ?`,
        [FLAG_ATIVO, id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ updatedID: this.changes });
        });
});

// Deletar VEÍCULO
app.delete("/automovel/:id", (req, res) => {
    db.run(`DELETE FROM TB_AUTOMOVEL WHERE FROM ID_VEICULO = ?`,
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ deletedID: this.changes })
        });
});



// --------------------------- CLIENTE ---------------------------
// Selecionar todos os CLIENTES
app.get('/cliente', (req, res) => {
    db.all('SELECT * FROM TB_CLIENTE', [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        
        res.status(200).json(rows);

    });
});

// Selecionar CLIENTES por ID
app.get("/cliente/:id", (req, res) => {
    var params = [req.params.id]
    db.get(`SELECT * FROM TB_CLIENTE where ID_CLIENTE = ?`, [params], (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json(row);
    });
});

// Cadastrar CLIENTE
app.post("/cliente", (req, res) => {

    const {NOME_COMPLETO, DATA_NASCIMENTO, CPF, CNH, DATA_VENCIMENTO_CNH, EMAIL, ENDERECO, NUMERO, CIDADE, CEP, COMPLEMENTO, TELEFONE_1, TELEFONE_2 } = req.body;

    db.run(`INSERT INTO TB_CLIENTE (NOME_COMPLETO, DATA_NASCIMENTO, CPF, CNH, DATA_VENCIMENTO_CNH, EMAIL, ENDERECO, NUMERO, CIDADE, CEP, COMPLEMENTO, TELEFONE_1, TELEFONE_2) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [NOME_COMPLETO, DATA_NASCIMENTO, CPF, CNH, DATA_VENCIMENTO_CNH, EMAIL, ENDERECO, NUMERO, CIDADE, CEP, COMPLEMENTO, TELEFONE_1, TELEFONE_2],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(201).json({
                "ID_CLIENTE": this.lastID
            })
        });
});

// Editar CLIENTE
app.put("/cliente/:id", (req, res) => {
    const { NOME_COMPLETO, DATA_NASCIMENTO, CPF, CNH, DATA_VENCIMENTO_CNH, EMAIL, ENDERECO, NUMERO, CIDADE, CEP, COMPLEMENTO, TELEFONE_1, TELEFONE_2 } = req.body;
    const { id } = req.params;

    db.run(`UPDATE TB_CLIENTE SET NOME_COMPLETO = ?, DATA_NASCIMENTO = ?, CPF = ?, CNH = ?, DATA_VENCIMENTO_CNH = ?, EMAIL = ?, ENDERECO = ?, NUMERO = ?, CIDADE = ?, CEP = ?, COMPLEMENTO = ?, TELEFONE_1 = ?, TELEFONE_2 = ? WHERE ID_CLIENTE = ?`,
        [NOME_COMPLETO, DATA_NASCIMENTO, CPF, CNH, DATA_VENCIMENTO_CNH, EMAIL, ENDERECO, NUMERO, CIDADE, CEP, COMPLEMENTO, TELEFONE_1, TELEFONE_2, id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ updatedID: this.changes });
        });
});


// Deletar CLIENTE
app.delete("/cliente/:id", (req, res) => {
    db.run(`DELETE FROM TB_CLIENTE WHERE FROM ID_CLIENTE = ?`,
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ deletedID: this.changes })
        });
});



// --------------------------- LOCAÇÃO ---------------------------
// Selecionar todas LOCAÇÃO
app.get('/reserva', (req, res) => {
    db.all('SELECT * FROM TB_LOCACAO', [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        
        res.status(200).json(rows);

    });
});

// Contar RESERVA em Atrasos
app.get('/reserva', (req, res) => {
    db.all('SELECT COUNT(ID_LOCACAO) FROM TB_LOCACAO WHERE DATA_DEVOLUCAO < DATE()', [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        
        res.status(200).json(rows);

    });
});

// Selecionar RESERVA em Atrasos


// Cadastrar uma RESERVA
app.post("/reserva", (req, res) => {

    const { STATUS_LOCACAO, DATA_LOCACAO, HORA_LOCACAO, DATA_PREVISTA, HORA_PREVISTA, DATA_DEVOLUCAO, HORA_DEVOLUCAO, VALOR_LOCACAO, VALOR_CALCAO, KM_INICIAL, KM_FINAL, ID_USUARIO, ID_VEICULO, ID_CLIENTE } = req.body;

    db.run(`INSERT INTO TB_LOCACAO (STATUS_LOCACAO, DATA_LOCACAO, HORA_LOCACAO, DATA_PREVISTA, HORA_PREVISTA, DATA_DEVOLUCAO, HORA_DEVOLUCAO, VALOR_LOCACAO, VALOR_CALCAO, KM_INICIAL, KM_FINAL, ID_USUARIO, ID_VEICULO, ID_CLIENTE) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [STATUS_LOCACAO, DATA_LOCACAO, HORA_LOCACAO, DATA_PREVISTA, HORA_PREVISTA, DATA_DEVOLUCAO, HORA_DEVOLUCAO, VALOR_LOCACAO, VALOR_CALCAO, KM_INICIAL, KM_FINAL, ID_USUARIO, ID_VEICULO, ID_CLIENTE],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(201).json({
                "ID_LOCACAO": this.lastID
            })
        });
});

// Editar uma RESERVA
app.patch("/reserva/:id", (req, res) => {
    const { STATUS_LOCACAO, DATA_LOCACAO, HORA_LOCACAO, DATA_PREVISTA, HORA_PREVISTA, DATA_DEVOLUCAO, HORA_DEVOLUCAO, VALOR_LOCACAO, VALOR_CALCAO, KM_INICIAL, KM_FINAL, ID_USUARIO, ID_VEICULO, ID_CLIENTE } = req.body;
    const { id } = req.params;

    db.run(`UPDATE TB_LOCACAO SET STATUS_LOCACAO = ?, DATA_LOCACAO  = ?, HORA_LOCACAO = ?, DATA_PREVISTA = ?, HORA_PREVISTA = ?, DATA_DEVOLUCAO = ?, HORA_DEVOLUCAO = ?, VALOR_LOCACAO = ?, VALOR_CALCAO = ?, KM_INICIAL = ?, KM_FINAL = ?, ID_USUARIO = ?, ID_VEICULO = ?, ID_CLIENTE = ? WHERE ID_LOCACAO = ?`,
        [STATUS_LOCACAO, DATA_LOCACAO, HORA_LOCACAO, DATA_PREVISTA, HORA_PREVISTA, DATA_DEVOLUCAO, HORA_DEVOLUCAO, VALOR_LOCACAO, VALOR_CALCAO, KM_INICIAL, KM_FINAL, ID_USUARIO, ID_VEICULO, ID_CLIENTE, id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ updatedID: this.changes });
        });
});


















// app.get('/usuario', (req, res) => {
//     db.all('SELECT * FROM TB_USUARIO', [], (err, rows) => {
//         if (err) {
//             res.status(400).json({ "error": err.message });
//             return;
//         }
        
//         res.status(200).json(rows);

//     });
// });

// app.get("/usuario/:id", (req, res) => {
//     var params = [req.params.id]
//     db.get(`SELECT * FROM TB_USUARIO where CD_USUARIO = ?`, [params], (err, row) => {
//         if (err) {
//             res.status(400).json({ "error": err.message });
//             return;
//         }
//         res.status(200).json(row);
//     });
// });

// app.get("/cliente/:id", (req, res) => {
//     var params = [req.params.id]
//     db.get(`SELECT * FROM pessoas where pessoa_id = ?`, [params], (err, row) => {
//         if (err) {
//             res.status(400).json({ "error": err.message });
//             return;
//         }
//         res.status(200).json(row);
//     });
// });

// app.get("/pessoas/:id", (req, res) => {
//     var params = [req.params.id]
//     db.get(`SELECT * FROM pessoas where pessoa_id = ?`, [params], (err, row) => {
//         if (err) {
//             res.status(400).json({ "error": err.message });
//             return;
//         }
//         res.status(200).json(row);
//     });
// });

// app.post("/pessoas", (req, res) => {

//     const { nome, email } = req.body;

//     db.run(`INSERT INTO pessoas (nome, email) VALUES (?,?)`,
//         [nome, email],
//         function (err, result) {
//             if (err) {
//                 res.status(400).json({ "error": err.message })
//                 return;
//             }
//             res.status(201).json({
//                 "pessoa_id": this.lastID
//             })
//         });
// });

// app.patch("/pessoas/:id", (req, res) => {
//     const { nome, email } = req.body;
//     const { id } = req.params;

//     db.run(`UPDATE pessoas set nome = ?, email = ? WHERE pessoa_id = ?`,
//         [nome, email, id],
//         function (err, result) {
//             if (err) {
//                 res.status(400).json({ "error": res.message })
//                 return;
//             }
//             res.status(200).json({ updatedID: this.changes });
//         });
// });

// app.delete("/pessoas/:id", (req, res) => {
//     db.run(`DELETE FROM pessoas WHERE pessoa_id = ?`,
//         req.params.id,
//         function (err, result) {
//             if (err) {
//                 res.status(400).json({ "error": res.message })
//                 return;
//             }
//             res.status(200).json({ deletedID: this.changes })
//         });
// });


// app.post("/pagamentos", (req, res) => {

//     const { valor, idPagador, idRecebedor } = req.body;

//     db.run(`INSERT INTO pagamentos (valor, idPagador, idRecebedor) VALUES (?,?,?)`,
//         [valor, idPagador, idRecebedor],
//         function (err, result) {
//             if (err) {
//                 res.status(400).json({ "error": err.message })
//                 return;
//             }
//             res.status(201).json({
//                 "idPagamento": this.lastID
//             })
//         });
// });

// app.get('/pagamentos', (req, res) => {
//     db.all(`SELECT distinct pagamentos.valor, pagamentos.data, PAGADOR.nome as nomePagador, RECEBEDOR.nome as nomeRecebedor
//     FROM pessoas PAGADOR, pessoas RECEBEDOR
//     inner JOIN pagamentos ON PAGADOR.pessoa_id = pagamentos.idPagador
//     inner JOIN pessoas ON RECEBEDOR.pessoa_id = pagamentos.idRecebedor`, [], (err, rows) => {
//         if (err) {
//             res.status(400).json({ "error": err.message });
//             return;
//         }

//         res.status(200).json(rows);

//     });
// });

// app.get('/pagamentos/recebedor/:idRecebedor', (req, res) => {
//     var params = [req.params.idRecebedor]
//     db.all(`SELECT distinct pagamentos.valor, pagamentos.data, PAGADOR.nome as nomePagador, RECEBEDOR.nome as nomeRecebedor
//     FROM pessoas PAGADOR, pessoas RECEBEDOR
//     inner JOIN pagamentos ON PAGADOR.pessoa_id = pagamentos.idPagador
//     inner JOIN pessoas ON RECEBEDOR.pessoa_id = pagamentos.idRecebedor WHERE pagamentos.idRecebedor = ?`, [params], (err, rows) => {
//         if (err) {
//             res.status(400).json({ "error": err.message });
//             return;
//         }

//         res.status(200).json(rows);

//     });
// });


// app.get('/pagamentos/pagador/:idPagador', (req, res) => {
//     var params = [req.params.idPagador]
//     db.all(`SELECT distinct pagamentos.valor, pagamentos.data, PAGADOR.nome as nomePagador, RECEBEDOR.nome as nomeRecebedor
//     FROM pessoas PAGADOR, pessoas RECEBEDOR
//     inner JOIN pagamentos ON PAGADOR.pessoa_id = pagamentos.idPagador
//     inner JOIN pessoas ON RECEBEDOR.pessoa_id = pagamentos.idRecebedor WHERE pagamentos.idPagador = ?`, [params], (err, rows) => {
//         if (err) {
//             res.status(400).json({ "error": err.message });
//             return;
//         }

//         res.status(200).json(rows);

//     });
// });


// app.get('/pagamentos/detalhar/:idPessoa', (req, res) => {
//     const { idPessoa } = req.params;
//     let pessoa = {};
//     db.get(`SELECT * FROM pessoas where pessoa_id = ?`, [idPessoa], (err, row) => {
//         if (err) {
//             res.status(400).json({ "error": err.message });
//             return;
//         }
//         pessoa = { ...row };

//         db.all(`SELECT distinct pagamentos.valor, pagamentos.data, PAGADOR.nome as nomePagador, RECEBEDOR.nome as nomeRecebedor
//         FROM pessoas PAGADOR, pessoas RECEBEDOR
//         inner JOIN pagamentos ON PAGADOR.pessoa_id = pagamentos.idPagador
//         inner JOIN pessoas ON RECEBEDOR.pessoa_id = pagamentos.idRecebedor WHERE pagamentos.idPagador = ?`, [idPessoa], (err, rows) => {
//             if (err) {
//                 res.status(400).json({ "error": err.message });
//                 return;
//             }
//             pessoa.pagador = rows;

//             db.all(`SELECT distinct pagamentos.valor, pagamentos.data, PAGADOR.nome as nomePagador, RECEBEDOR.nome as nomeRecebedor
//     FROM pessoas PAGADOR, pessoas RECEBEDOR
//     inner JOIN pagamentos ON PAGADOR.pessoa_id = pagamentos.idPagador
//     inner JOIN pessoas ON RECEBEDOR.pessoa_id = pagamentos.idRecebedor WHERE pagamentos.idRecebedor = ?`, [idPessoa], (err, rows) => {
//                 if (err) {
//                     res.status(400).json({ "error": err.message });
//                     return;
//                 }

                
//                 pessoa.recebedor = rows;
//                 res.status(200).json(pessoa);
//             });

//         });
//     });

// });