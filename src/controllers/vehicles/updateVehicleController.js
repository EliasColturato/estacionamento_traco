import { openDatabase } from '../../database.js';

export const UpdateVehicle = async (request, response) => {
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
  response.status(400).send(vehicle || {});
};
