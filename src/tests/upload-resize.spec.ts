import request from 'supertest';
import path from 'path';
import fs from 'fs';
import app from '../index';

describe('POST /api/images/upload-resize', () => {
  const url = '/api/images/upload-resize';
  const fixturesDir = path.resolve(__dirname, 'test-images');
  const samplePng   = path.join(fixturesDir, 'sample.png');

  beforeAll(() => {
    // Ensure our fixture exists
    if (!fs.existsSync(samplePng)) {
      throw new Error(`Missing fixture: ${samplePng}`);
    }
  });

  it('resizes a valid PNG and returns image/png (200)', async () => {
    const res = await request(app)
      .post(url)
      .attach('image', samplePng)
      .field('width', '120')
      .field('height', '80');

    // your controller sends a 200 on success
    expect(res.statusCode).toBe(200);

    // content-type must be image/png
    expect(res.headers['content-type']).toMatch(/^image\/png/);

    // body is a Buffer
    expect(Buffer.isBuffer(res.body)).toBeTrue();
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('returns 400 if no image is provided', async () => {
    const res = await request(app)
      .post(url)
      .field('width', '100')
      .field('height', '100');

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual(
      jasmine.objectContaining({ error: 'No image uploaded' })
    );
  });

  it('returns 400 if width or height are missing', async () => {
    // missing height
    let res = await request(app)
      .post(url)
      .attach('image', samplePng)
      .field('width', '200');
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual(
      jasmine.objectContaining({ error: 'Invalid width or height' })
    );

    // non-numeric dims
    res = await request(app)
      .post(url)
      .attach('image', samplePng)
      .field('width', 'abc')
      .field('height', 'xyz');
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual(
      jasmine.objectContaining({ error: 'Invalid width or height' })
    );
  });
});