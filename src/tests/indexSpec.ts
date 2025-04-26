import resizeImage from '../controllers/ImageResize'; 
import sharp from 'sharp';

describe('resizeImage', () => {
  let sourceBuffer: Buffer;

  beforeAll(async () => {
    // Create a 100×100 solid-red PNG buffer for testing
    sourceBuffer = await sharp({
      create: {
        width: 100,
        height: 100,
        channels: 3,
        background: { r: 255, g: 0, b: 0 }
      }
    })
    .jpeg()
    .toBuffer();
  });

  it('resizes the image to the specified width and height, and outputs JPEG', async () => {
    const targetWidth = 50;
    const targetHeight = 75;

    const outputBuffer = await resizeImage(sourceBuffer, targetWidth, targetHeight);
    const metadata = await sharp(outputBuffer).metadata();

    expect(metadata.width).toBe(targetWidth);
    expect(metadata.height).toBe(targetHeight);
    expect(metadata.format).toBe('jpeg');
  });

  it('rejects with an error when given invalid image data', async () => {
    const badBuffer = Buffer.from('not really an image');

    await expectAsync(resizeImage(badBuffer, 10, 10))
      .toBeRejectedWithError(/Error resizing image:/);
  });
});
