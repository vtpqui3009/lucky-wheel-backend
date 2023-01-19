import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        rewardName: {
            type: String,
            required: true,
        },
        rewardId: {
            type: String,
            required: true,
        },
        rewardImage: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: 'Not Completed'
        },
        // loverImage: {
        //     type: String,
        //     required: true,
        // },
        // spinWheelCount: {
        //     type: Number,
        //     required: true,
        //     default: 0
        // }
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

const History = mongoose.model("History", HistorySchema);
export {History};
