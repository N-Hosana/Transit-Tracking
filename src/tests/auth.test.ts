



const request = require('supertest');
const app = require('../app').default;

describe('Authentication', () => {
  it('should register a user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'testuser@example.com',
        password: 'Password123',
        role: 'user'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'Password123'
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
