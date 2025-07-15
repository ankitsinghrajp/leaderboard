import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    totalPoints:{
        type: Number,
        default: 0,
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    },
    updatedAt:{
        type:Date,
        default: Date.now(),
    }
});

// Update timestamp before saving

userSchema.pre('save', function(next){
    this.updatedAt = Date.now();
    next();
});

const User = mongoose.model('User',userSchema);
export default User;