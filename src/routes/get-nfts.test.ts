import request from 'supertest';
import { app } from '../app';

it('can get empty nfts', async () => {

  const response = await request(app)
    .get('/api/nfts/')
    .send()
    .expect(200);

    expect(response.status).toEqual(200);
    expect(response.body.nfts).toEqual([]);
    expect(response.body.page).toEqual(1);
    expect(response.body.totalPages).toEqual(1);
});
