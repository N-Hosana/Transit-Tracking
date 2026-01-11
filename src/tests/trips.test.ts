import request from 'supertest';
import app from '../app';


describe('Trips', () => {
  it('should list available trips', async () => {
    const res = await request(app).get('/trips/available');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
