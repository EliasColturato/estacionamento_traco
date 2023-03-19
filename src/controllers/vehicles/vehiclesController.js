import { openDatabase } from '../../database.js';

export const listVehicles = async (requst, response) => {
  // o await só pode ser utilizado aqui adicionando o "async" após o nosso link da api, na nossa "função pai"
  const db = await openDatabase();
  //db.all é responsável por trazer toda a minha lista (Utilizando o .get teria a informação de um ÚNICO item)
  const vehicles = await db.all(`
  SELECT * FROM vehicles
  `);
  db.close();
  response.send(vehicles);
};
