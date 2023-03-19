import { openDatabase } from '../../database.js';

export const ListActivities = async (request, response) => {
  const db = await openDatabase();
  const activities = await db.all(`
    SELECT * FROM activities
  `);
  db.close();
  response.send(activities);
};
