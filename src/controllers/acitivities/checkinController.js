import { openDatabase } from '../../database.js';

export const Checkin = async (request, response) => {
  const { label } = request.body;

  const db = await openDatabase();
  const vehicle = await db.get(
    `
  SELECT * FROM vehicles WHERE label = ?
  `,
    [label]
  );
  if (vehicle) {
    const checkinAt = new Date().getTime();
    const data = await db.run(
      `
      INSERT INTO activities (vehicle_id, checkin_at)
      VALUES (?, ?)
    `,
      [vehicle.id, checkinAt]
    );
    db.close();
    response.send({
      vehicle_id: vehicle.id,
      checkin_at: checkinAt,
      message: `Veículo [${vehicle.label}] entrou no estacionamento`,
    });
    return;
  }
  db.close();
  response.status(400).send({
    message: `Veículo ${label} não cadastrado`,
  });
};
