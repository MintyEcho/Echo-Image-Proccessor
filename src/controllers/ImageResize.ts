import sharp from "sharp";

async function resizeImage(imageBuffer: Buffer, width: number, height: number): Promise<Buffer> {
    try {
        const resizedImage = await sharp(imageBuffer)
            .resize(width, height)
            .jpeg() // Ensure the output is in jpg format
            .toBuffer();
        return resizedImage;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error("Error resizing image: " + error.message);
        } else {
            throw new Error("Error resizing image: Unknown error");
        }
    }
}

export default resizeImage;