import sequelize from '../db/config/sequelize';
import 'dotenv/config';

let transaction: any;
(global as any).transaction = transaction;

beforeAll(async () => {
  await sequelize.authenticate();
});

beforeEach(async () => {
  transaction = await sequelize.transaction();
  (global as any).transaction = transaction;
});

afterEach(async () => {
  await transaction.rollback();
});



afterAll(async () => {
  await sequelize.close();
});
