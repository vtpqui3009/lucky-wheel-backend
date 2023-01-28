import {History} from "../model/History.js";
import {User} from "../model/User.js";

// create history
const createHistory = async (req, res, next) => {
    try {
        
        const {username, userId, rewardName, rewardId, rewardImage} = req.body;
        
        const spinUser = await User.findById(userId);
        
        if (!spinUser) {
            return res.status(403).json({message: "Who are you ?"});
        }
        
        if (spinUser.pressedItemIds.length < 9) {
            spinUser.pressedItemIds.push(rewardId);
            await spinUser.save();
        } else {
            spinUser.pressedItemIds = [];
            await spinUser.save();
        }
        
        await History.create({
            username,
            userId,
            rewardName,
            rewardId,
            rewardImage
        });
        
        
        return res.status(200).json({message: "history created"});
        
    } catch (error) {
        console.log(error);
    }
};


// index history

const index = async (req, res, next) => {
    try {
        const histories = await History.find().sort('-createdAt');
        
        return res.status(200).json({'histories': histories});
        
    } catch (error) {
        console.log(error);
    }
};

export {createHistory, index};
