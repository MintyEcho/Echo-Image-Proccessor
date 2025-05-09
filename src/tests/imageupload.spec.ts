// src/tests/imageupload.spec.ts

import request from 'supertest';
import path from 'path';
import app from '../index'; // ensure this exports your Express app

beforeAll(() => {
  // Ensure the server is properly initialized before tests
  const fixturesDir = path.resolve(__dirname, '../../test-images'); // Adjusted path to match correct project structure
});

describe('Image Upload Endpoint', () => {
  const uploadUrl = '/api/images/upload';
  const fixturesDir = path.resolve(__dirname, '../test-images'); // Adjusted path to match project structure
  const validPng = path.join(fixturesDir, 'sample.png');
  const invalidTxt = path.join(fixturesDir, 'not-image.txt');

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

  it('should return 415 if the uploaded file is not a PNG', async () => {
    const res = await request(app).post(uploadUrl).attach('image', invalidTxt);

    expect(res.statusCode).toBe(415);
    expect(res.body).toEqual(
      jasmine.objectContaining({ error: 'Only .png files are allowed' })
    );
  });
});
