import express, { application } from 'express';
import { Checkin } from './controllers/acitivities/checkinController.js';
import { Checkout } from './controllers/acitivities/checkoutController.js';
import { DeleteActivity } from './controllers/acitivities/deleteActivityController.js';
import { ListActivities } from './controllers/acitivities/listActivitiesController.js';
import { RegisterVehicle } from './controllers/vehicles/registerVehiclesController.js';
import { RemoveVehicle } from './controllers/vehicles/removeVehicleController.js';
import { UpdateVehicle } from './controllers/vehicles/updateVehicleController.js';
import { listVehicles } from './controllers/vehicles/vehiclesController.js';

import { openDatabase } from './database.js';

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // dentro do '*' poderia ser qual site poderia fazer a requisiçao.

  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');

  res.header(
    'Access-Control-Allow-Headers',
    'X-PINGOTHER, Content-Type, Authorization'
  );

  next();
});

app.use(express.json());

app.get('/api/ping', (request, response) => {
  response.send({
    message: 'API Funcionando',
  });
});

//Endpoints Vehicles

app.get('/api/vehicles', listVehicles);

app.post('/api/vehicles', RegisterVehicle);

app.put('/api/vehicles/:id', UpdateVehicle);

app.delete('/api/vehicles/:id', RemoveVehicle);

//Endpoints Activities
app.post('/api/activities/checkin', Checkin);

app.put('/api/activities/checkout', Checkout);

app.delete('/api/activities/:id', DeleteActivity);

app.get('/api/activities', ListActivities);

app.listen(8000, () => {
  console.log('Servidor rodando na porta 8000');
});
