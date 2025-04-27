import express from 'express';
import multer from 'multer';


const app = express();
const PORT = 3000;

const multerStorage = multer.memoryStorage();
