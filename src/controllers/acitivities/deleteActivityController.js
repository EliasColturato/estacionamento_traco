import { openDatabase } from '../../database.js';

export const DeleteActivity = async (request, response) => {
  const { id } = request.params;
  const db = await openDatabase();

  const data = await db.run(
    `
    DELETE FROM activities
    WHERE id = ?
  `,
    [id]
  );
  db.close();
  response.send({
    id,
    message: `Atividade ${id} removida com sucesso`,
  });
};
