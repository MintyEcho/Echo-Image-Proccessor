
import request from 'supertest';
import path from 'path';
import app from '../index'; // Adjust the path as necessary     

describe('POST /api/images/upload', () => {
  it('rejects non-png files with 400', (done) => {
    request(app)
      .post('/api/images/upload')
      // attach a JPG buffer to simulate wrong type
      .attach('image', Buffer.from('not a png'), 'bad.jpg')
      .expect(400)
      .expect(res => {
        expect(res.body.error).toMatch(/Only \.png files are allowed/);
      })
      .end(done);
  });

  it('accepts a valid .png and returns metadata', (done) => {
    const fixturePath = path.resolve(__dirname, 'fixtures/photo.png');
    request(app)
      .post('/api/images/upload')
      .attach('image', fixturePath)
      .expect(201)
      .expect(res => {
        // message, filename, and path should all be present
        expect(res.body).toEqual(jasmine.objectContaining({
          message: 'Upload successful',
          filename: jasmine.any(String),
          path: jasmine.any(String),
        }));
        // filename should end in .png
        expect(res.body.filename).toMatch(/\.png$/);
      })
      .end(done);
  });
});
