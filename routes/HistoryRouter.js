import express from 'express';

import {createHistory, index} from '../controller/HistoryController.js';

const router = express.Router();


router.post('/', createHistory);

router.get('/', index);



export {router as HistoryRouter};
