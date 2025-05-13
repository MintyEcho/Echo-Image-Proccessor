// src/tests/imageupload.spec.ts

import request from 'supertest';
import path from 'path';
import app from '../index'; // ensure this exports your Express app

describe('Image Upload Endpoint', () => {
  const uploadUrl = '/api/images/upload';
  const fixturesDir = path.resolve(__dirname, 'test-images');
  const validPng = path.join(fixturesDir, 'sample.png');

  it('should successfully upload a PNG image and return metadata', async () => {
    const res = await request(app).post(uploadUrl).attach('image', validPng);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      jasmine.objectContaining({
        message: 'Image uploaded successfully',
        filename: jasmine.any(String),
        path: jasmine.any(String),
      })
    );
  });

  it('should return 400 if no image is provided', async () => {
    const res = await request(app).post(uploadUrl);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual(
      jasmine.objectContaining({ error: 'No .png file uploaded' }) // Match the actual error message
    );
  });
});
