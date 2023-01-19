import mongoose from "mongoose";

const RewardSchema = new mongoose.Schema(
    {
        uri: {
            type: String,
            required: true,
        },
        defaultUri: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

const Reward = mongoose.model("Reward", RewardSchema);
export {Reward};
