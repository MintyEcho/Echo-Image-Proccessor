import request from 'supertest';
import path from 'path';
import app from '../index'; // Adjust the path as necessary
describe('Image Upload Endpoint', () => {
  it('should successfully upload an image and return a 200 status', async (done) => {
    const imagePath = path.resolve(__dirname, './test-images/sample.jpg'); // Adjust the path to your test image
    request(app)
      .post('/api/images/upload') // Adjust the endpoint as necessary
      .attach('image', imagePath)
      .end((err, response) => {
        expect(response.status).toBe(200);
        if (!response.body || !response.body.message) {
          throw new Error(
            'Response body does not contain the expected "message" property',
          );
        }
        if (response.body.message !== 'Image uploaded successfully') {
          throw new Error(
            `Expected message to be "Image uploaded successfully", but got "${response.body.message}"`,
          );
        }
        done();
      });
  });

  it('should return a 400 status if no image is provided', async (done) => {
    request(app)
      .post('/api/images/upload') // Adjust the endpoint as necessary
      .end((err, response) => {
        expect(response.status).toBe(400);
        if (
          !response.body ||
          response.body.error !== 'No image file provided'
        ) {
          throw new Error(
            'Expected error message "No image file provided" but got something else',
          );
        }
        done();
      });
  });

  it('should return a 415 status if the uploaded file is not an image', async (done) => {
    const nonImagePath = path.resolve(__dirname, './test-files/sample.txt'); // Adjust the path to your test file
    request(app)
      .post('/api/images/upload') // Adjust the endpoint as necessary
      .attach('image', nonImagePath)
      .end((err, response) => {
        if (response.status !== 415) {
          throw new Error(`Expected status 415 but got ${response.status}`);
        }
        if (!response.body || response.body.error !== 'Unsupported file type') {
          throw new Error(
            'Expected error message "Unsupported file type" but got something else',
          );
        }
        done();
      });
  });
});
