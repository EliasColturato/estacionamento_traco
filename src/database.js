import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

//funcão para abrir a conexão com o banco de dados
export const openDatabase = async () => {
  return await open({
    filename: './src/database.db',
    driver: sqlite3.Database,
  });
};
