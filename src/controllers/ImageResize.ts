import sharp from 'sharp';

async function resizeImage(
  imageBuffer: Buffer,
  width: number,
  height: number,
): Promise<Buffer> {
  try {
    if (!imageBuffer || imageBuffer.length === 0) {
    throw new Error('Input buffer is invalid');
  }
    const resizedImage = await sharp(imageBuffer)
      .resize(width, height)
      .png() // Ensure the output is in png format
      .toBuffer();
    return resizedImage;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Error resizing image: ' + error.message);
    } else {
      throw new Error('Error resizing image: Unknown error');
    }
  }
}

export default resizeImage;
