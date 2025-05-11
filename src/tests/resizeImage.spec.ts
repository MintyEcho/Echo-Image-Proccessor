import resizeImage from '../controllers/ImageResize';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

describe('Image Resize Function', () => {
  const inputImagePath = path.resolve(
    __dirname,
    '../../src/tests/test-images/sample.png'
  ); // Adjusted path to match the correct location
  const outputImagePath = path.resolve(__dirname, './test-images/output.png');

  afterEach(() => {
    // Clean up the output file after each test
    if (fs.existsSync(outputImagePath)) {
      fs.unlinkSync(outputImagePath);
    }
  });

  it('should resize the image to the specified dimensions', async () => {
    const width = 200;
    const height = 200;

    const imageBuffer = fs.readFileSync(inputImagePath);
    const resizedBuffer = await resizeImage(imageBuffer, width, height);

    fs.writeFileSync(outputImagePath, resizedBuffer);

    const metadata = await sharp(outputImagePath).metadata();
    expect(metadata.width).toBe(width);
    expect(metadata.height).toBe(height);
  });

  it('should throw an error if the input buffer is invalid', async () => {
    const invalidBuffer = Buffer.from(''); // Empty buffer

    await expectAsync(
      resizeImage(invalidBuffer, 200, 200)
    ).toBeRejectedWithError('Error resizing image: Input buffer is invalid');
  });
});
