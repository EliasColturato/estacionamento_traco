import express, { application } from 'express';
import { openDatabase } from './database.js';

const app = express();

app.use(express.json());

app.get('/api/ping', (request, response) => {
  response.send({
    message: 'API Funcionando',
  });
});

//Endpoints Vehicles
app.get('/api/vehicles', async (request, response) => {
  // o await só pode ser utilizado aqui adicionando o "async" após o nosso link da api, na nossa "função pai"
  const db = await openDatabase();
  //db.all é responsável por trazer toda a minha lista (Utilizando o .get teria a informação de um ÚNICO item)
  const vehicles = await db.all(`
    SELECT * FROM vehicles
  `);
  db.close();
  response.send(vehicles);
});

app.post('/api/vehicles', async (request, response) => {
  //todas as informaçõs do cadastro do novo carro vem pelo body.
  const { model, label, type, owner, observation } = request.body;

  const db = await openDatabase();
  //db.run é utilizado para cadastrar o item na tabela no banco de dados
  const data = await db.run(
    `
  INSERT INTO vehicles ('model', 'label', 'type', 'owner', 'observation')
  VALUES (?, ?, ?, ?, ?)
  `,
    //é obrigatório a ordem das informações, ficando iguais no nosso "INSERT INTO" e do nosso body
    [model, label, type, owner, observation]
  );
  db.close();
  //resposta da requisição
  response.send({ id: data.lastID, model, label, type, owner, observation });
});

app.put('/api/vehicles/:id', async (request, response) => {
  // todas as informações para atualização são enviadas pelo body
  const { model, label, type, owner, observation } = request.body;
  //o id para atualização é enviado pelo req.params
  const { id } = request.params;
  const db = await openDatabase();
  const vehicle = await db.get(
    //seleciona um veículo onde o id é igual ao id passado no request.params
    `
  SELECT * FROM vehicles WHERE  id = ? 
  `,
    [id]
  );

  if (vehicle) {
    const data = await db.run(
      `
      UPDATE vehicles
        SET model = ?, label=?, type=?, owner=?, observation=?
      WHERE id = ? 
    `,
      [model, label, type, owner, observation, id]
    );
    response.send({ id, model, label, type, owner, observation });
    return;
  }
  db.close();
  response.send(vehicle || {});
});

app.delete('/api/vehicles/:id', async (request, response) => {
  const { id } = request.params;

  const db = await openDatabase();

  const data = await db.run(
    `
    DELETE FROM vehicles
    WHERE id = ?
    `,
    [id]
  );
  db.close();
  response.send({
    id,
    message: `Veículo [${id}] removido com sucesso`,
  });
});

app.listen(8000, () => {
  console.log('Servidor rodando na porta 8000');
});
