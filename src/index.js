import express, { application } from 'express';

const app = express();

app.use(express.json());

app.get('/api/ping', (request, response) => {
  response.send({
    message: 'pong',
  });
});

//Endpoints Vehicles
app.get('/api/vehicles', (request, response) => {
  const { id } = request.query;

  const vehicles = [
    {
      id: 1,
      name: 'Onix 1.4',
      owner: 'Marcus Vinicius',
      type: 'car',
    },
    {
      id: 2,
      name: 'Cobalt Cinza',
      owner: 'Maria Eduarda',
      type: 'car',
    },
    {
      id: 3,
      name: 'Mobi Preto',
      owner: 'Elias Colturato',
      type: 'car',
    },
  ];
  //filtra o id passado como query e retorna todos/o carro com o id
  if (id) {
    response.send(vehicles.filter(vehicle => vehicle.id == id));
    return;
  }

  response.send(vehicles);
});

app.listen(8000, () => {
  console.log('Servidor rodando na porta 8000');
});
