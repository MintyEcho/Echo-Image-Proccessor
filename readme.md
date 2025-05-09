# Echo Image Processor

## Overview

Echo Image Processor is a project designed to process images through various endpoints. This README provides details about the available endpoints, how to run tests, and other relevant information to help you get started.

---

## Endpoints

### 1. **Upload Image**

- **Endpoint**: `/upload`
- **Method**: POST
- **Description**: Upload an image to the server for processing.
- **Request Body**: Multipart form-data containing the image file.
- **Response**: JSON object with the status and image ID.

### 2. **Resize Image**

- **Endpoint**: `/resize`
- **Method**: POST
- **Description**: Resize an uploaded image.
- **Request Body**:
  ```json
  {
    "image_id": "string",
    "width": "integer",
    "height": "integer"
  }
  ```
- **Response**: JSON object with the status and a link to the resized image.

---

## Running Tests

### Prerequisites

- Ensure you have Node.js installed.
- Install dependencies using:
  ```
  npm install
  ```

### Running Unit Tests

To run the unit tests, execute the following command:
`     npm run test
    `
