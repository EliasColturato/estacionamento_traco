import { openDatabase } from '../../database.js';

export const RemoveVehicle = async (request, response) => {
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
};
