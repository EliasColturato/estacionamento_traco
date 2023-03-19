import express, { application } from 'express';
import { openDatabase } from './database.js';

const app = express();

app.use(express.json());

app.get('/api/ping', (request, response) => {
  response.send({
    message: 'pong',
  });
});

//Endpoints Vehicles
app.get('/api/vehicles', async (request, response) => {
  // o await só pode ser utilizado aqui adicionando o "async" após o nosso link da api, na nossa "função pai"
  const db = await openDatabase();
  const vehicles = await db.all(`
    SELECT * FROM vehicles
  `);
  db.close();
  response.send(vehicles);
});

app.post('/api/vehicles', async (request, response) => {
  const db = await openDatabase();
  const vehicles = await db.run(`
    INSET INTO vehicles
  `);
  db.close();
  response.send(vehicles);
});

app.put('/api/vehicles/:id', (request, response) => {});

app.delete('/api/vehicles/:id', (request, response) => {});

app.listen(8000, () => {
  console.log('Servidor rodando na porta 8000');
});
