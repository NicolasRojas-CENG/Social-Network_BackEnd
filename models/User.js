//Require Mongoose.
const { Schema, model } = require('mongoose');

//User Shcema.
const UserSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([.-]?)*\w+@\w+\.\w{2,4}$/]
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
    toJSON: {
        virtuals: true,
    },
    id: false
    }
)

//Virtual for the friend count of an user.
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

//Virtual for the thought count of an user.
UserSchema.virtual('thoughtCount').get(function() {
    return this.thoughts.length;
});

const User = model('User', UserSchema);

//Export Users module
module.exports = User;