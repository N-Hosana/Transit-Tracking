import request from 'supertest';
import app from '../app';

let adminToken: string;

beforeAll(async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'admin@example.com',
      password: 'AdminPassword123'
    });

  adminToken = res.body.token;
});

describe('Admin routes', () => {
  it('should create a bus', async () => {
    const res = await request(app)
      .post('/api/admin/buses')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        plateNumber: 'RAB123A',
        capacity: 30
      });

    expect(res.status).toBe(201);
  });
});
