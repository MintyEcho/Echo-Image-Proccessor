import express from 'express'
import multer from 'multer'

const upload = multer({ dest: 'uploads/' })

const app = express()

