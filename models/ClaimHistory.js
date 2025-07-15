import mongoose from "mongoose";

const claimHistorySchema = new mongoose.Schema({
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
      },
      userName:{
        type:String,
        required:true,
      },
      points:{
        type:Number,
        required:true,
        min:1,
        max:10
      },
      claimedAt:{
        type:Date,
        default: Date.now(),
      },
});

const ClaimHistory =  mongoose.models.ClaimHistory || mongoose.model('ClaimHistory',claimHistorySchema);

export default ClaimHistory;