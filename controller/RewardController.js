import {Reward} from "../model/Reward.js";
import {GAME_DATA} from "../DATA/GameData.js";

// add reward
const addReward = async (req, res, next) => {
  try {
    
    const {uri, defaultUri, description} = req.body;
    
    await Reward.create({
      uri,
      defaultUri,
      description
    });
    
    return res.status(200).json({message: "reward created"});
    
  } catch (error) {
    console.log(error);
  }
};


// add reward list
const addRewardList = async (req, res, next) => {
  try {
    
    for (let i = 0; i < GAME_DATA.length; i++) {
      await Reward.create({
        uri: GAME_DATA[i].uri,
        defaultUri: GAME_DATA[i].defaultUri,
        description: GAME_DATA[i].description
      });
    }
    
    
    return res.status(200).json({message: "reward list created"});
    
  } catch (error) {
    console.log(error);
  }
};

// index rewards

const listRewards = async (req, res, next) => {
  try {
    const rewards = await Reward.find();
    
    return res.status(200).json({'rewards': rewards});
    
  } catch (error) {
    console.log(error);
  }
};

export {addReward, addRewardList, listRewards};
