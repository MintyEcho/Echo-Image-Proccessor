import request from 'supertest';
import path    from 'path';
import fs      from 'fs';
import app     from '../index';

describe('POST /api/images/upload-resize', () => {
  const uploadUrl       = '/api/images/upload';
  const resizeUrl       = '/api/images/upload-resize';
  const fixturesDir     = path.resolve(__dirname, 'test-images');
  const samplePng       = path.join(fixturesDir, 'sample.png');

  beforeAll(() => {
    if (!fs.existsSync(samplePng)) {
      throw new Error(`Missing fixture: ${samplePng}`);
    }
  });

  it('→ 200 & image/png when given a valid PNG filename + dims', async () => {
    // 1) Upload the PNG so it lands in /uploads
    const up = await request(app)
      .post(uploadUrl)
      .attach('image', samplePng);
    expect(up.statusCode).toBe(200);
    const filename = up.body.filename;
    expect(typeof filename).toBe('string');

    // 2) Call upload-resize with that filename
    const res = await request(app)
      .post(resizeUrl)
      .field('image', filename)
      .field('width',  '120')
      .field('height', '80');

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/^image\/png/);
    expect(Buffer.isBuffer(res.body)).toBeTrue();
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('→ 400 if no image filename is provided', async () => {
    const res = await request(app)
      .post(resizeUrl)
      .field('width',  '100')
      .field('height', '100');

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual(
      jasmine.objectContaining({ error: 'No image filename provided' })
    );
  });

  it('→ 400 if width/height are invalid', async () => {
    // upload first
    const up = await request(app)
      .post(uploadUrl)
      .attach('image', samplePng);
    const filename = up.body.filename;

    // missing height
    let res = await request(app)
      .post(resizeUrl)
      .field('image', filename)
      .field('width', '200');
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual(
      jasmine.objectContaining({ error: 'Invalid width or height' })
    );

    // non-numeric
    res = await request(app)
      .post(resizeUrl)
      .field('image', filename)
      .field('width', 'foo')
      .field('height', 'bar');
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual(
      jasmine.objectContaining({ error: 'Invalid width or height' })
    );
  });

  it('→ 404 if image filename does not exist', async () => {
    const res = await request(app)
      .post(resizeUrl)
      .field('image', 'does-not-exist.png')
      .field('width', '100')
      .field('height', '100');

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual(
      jasmine.objectContaining({ error: 'Image file not found' })
    );
  });
});
