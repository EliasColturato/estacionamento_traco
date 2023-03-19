import { openDatabase } from '../../database.js';

export const RegisterVehicle = async (request, response) => {
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
};
