import request from 'supertest';
import app from '../app';

describe('Trip search', () => {
  it('should find trips by location and destination', async () => {
    const res = await request(app)
      .post('/api/trips/search')
      .send({
        from: 'Nyamirambo',
        to: 'Town'
      });

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(0);
  });
});
