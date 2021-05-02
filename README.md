## Endpoint e Métodos disponiveis

-- VEÍCULO
`[GET] https://api-nodejs-milhas-back-end.herokuapp.com/automovel` Lista todos veículos

`[GET] https://api-nodejs-milhas-back-end.herokuapp.com/automovel/:id` Retorna um veículo específico

`[GET] https://api-nodejs-milhas-back-end.herokuapp.com/automovel/disponivel` Contar todos os todos veículos DISPONIVEIS 

`[GET] https://api-nodejs-milhas-back-end.herokuapp.com/automovel/ocupados` Contar todos os todos veículos OCUPADOS 

`[GET] https://api-nodejs-milhas-back-end.herokuapp.com/automovel/inativos` Contar todos os todos veículos INATIVOS

`[GET] https://api-nodejs-milhas-back-end.herokuapp.com/automovel/inativos` Contar todos os todos veículos INATIVOS

`[POST] https://api-nodejs-milhas-back-end.herokuapp.com/automovel` Cadastra um novo veículo

`[PUT] https://api-nodejs-milhas-back-end.herokuapp.com/automovel/:id` Atualiza um veículo

`[PATCH] https://api-nodejs-milhas-back-end.herokuapp.com/automovel/:id` Atualiza status de Ativar e Invativar um veículo

`[DELETE] https://api-nodejs-milhas-back-end.herokuapp.com/automovel/:id` Remove um veículo



-- CLIENTE
`[GET] https://api-nodejs-milhas-back-end.herokuapp.com/cliente` Lista todos clientes

`[GET] https://api-nodejs-milhas-back-end.herokuapp.com/cliente/:id` Retorna um cliente específico

`[POST] https://api-nodejs-milhas-back-end.herokuapp.com/cliente` Cadastra um novo cliente

`[PUT] https://api-nodejs-milhas-back-end.herokuapp.com/cliente/:id` Atualiza dados de um cliente

`[DELETE] https://api-nodejs-milhas-back-end.herokuapp.com/automovel/:id` Remove um cliente



-- LOCAÇÃO
`[GET] https://api-nodejs-milhas-back-end.herokuapp.com/reserva` Lista todas reservas

`[GET] https://api-nodejs-milhas-back-end.herokuapp.com/reserva/atrasado` Conta todas reservas em atrasos

`[PATCH] https://api-nodejs-milhas-back-end.herokuapp.com/reserva/:id` Atualiza uma reserva

`[DELETE] https://api-nodejs-milhas-back-end.herokuapp.com/automovel/:id` Cadastra uma reserva


