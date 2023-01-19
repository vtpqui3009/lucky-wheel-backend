import express from 'express';

import {addReward, addRewardList, listRewards} from '../controller/RewardController.js';

const router = express.Router();


router.get('/', listRewards);

router.post('/add', addReward);

router.post('/add-list', addRewardList);

export {router as RewardRouter};
