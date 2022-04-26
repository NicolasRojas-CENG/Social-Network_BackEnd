//Require Users Model.
const { User, Thought } = require('../models');

const userController = {
    //Get all users.
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //Get an user by id.
    getUserById({params}, res) {
        User.findOne({_id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(dbUsersData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },
    //Create a new user.
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },
    //Update an user by id.
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json({message: "The user has been updated!"});
        })
        .catch(err => res.json(err))
    },
    //Delete an user by id.
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id.'});
                return;
            }
            return dbUserData;
        })
        .then(dbUserData => {
            User.updateMany({
                _id: {
                    $in: dbUserData.friends
                }
            }, {
                $pull: {
                    friends: params.userId
                }
            })
            .then(() => {
                //deletes user's thought associated with id
                Thought.deleteMany({username: dbUserData.username})
                .then(() => {res.json({message: 'User and related information deleted successfully.'});})
            })
        })
        .catch(err => {
            res.status(400).json(err);
        })
    },

    //Add a friend to a user by id.
    addFriend({params}, res) {
        User.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then(dbUsersData => {
            if (!dbUsersData) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
        res.json(dbUsersData);
        })
        .catch(err => res.json(err));
    },
    //Delete a friend from a user bt id.
    deleteFriend({ params }, res) {
        User.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'No friend found with this id!'});
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.status(400).json(err));
    }
};

//Export module users controller
module.exports = userController;