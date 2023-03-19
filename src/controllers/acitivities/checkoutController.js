import { openDatabase } from '../../database.js';
export const Checkout = async (request, response) => {
  const { label, price } = request.body;

  const db = await openDatabase();
  //primeiro precisamos saber se o carro existe no nosso cadastro
  const vehicle = await db.get(
    `
  SELECT * FROM vehicles WHERE label = ?
  `,
    [label]
  );
  if (vehicle) {
    //antes de realizar uma put do checkout é necessário saber se o carro está com o checkout em aberto ainda
    const activityOpen = await db.get(
      `
    SELECT *
      FROM activities
    WHERE vehicle_id = ?
      AND checkout_at IS NULL
    `,
      [vehicle.id]
    );
    //finalizou a verificação
    if (activityOpen) {
      const checkoutAt = new Date().getTime();
      const data = await db.run(
        `
        UPDATE activities 
          SET  checkout_at  = ?,
               price = ?
        WHERE id = ?
               `,
        [checkoutAt, price, activityOpen.id]
      );
      db.close();
      response.send({
        vehicle_id: vehicle.id,
        checkout_at: checkoutAt,
        price: price,
        message: `Veículo [${vehicle.label}] saíu do estacionamento`,
      });
      return;
    }
    response.send({
      message: `Veículo não realizou nenhum check-in`,
    });
    return;
  }
  db.close();
  response.status(400).send({
    message: `Veículo ${label} não cadastrado`,
  });
};
