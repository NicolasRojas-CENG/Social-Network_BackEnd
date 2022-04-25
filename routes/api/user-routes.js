//Require express router
const router = require('express').Router();

const {
    getAllUsers, getUserById, createUser, updateUser,
    deleteUser, addFriend, deleteFriend
} = require('../../controllers/user-controller');

//Directs to the path /api/users.
router.route('/')
.get(getAllUsers)
.post(createUser);

//Directs to the path /api/users/:id.
router.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

//Directs to the path /api/users/:userId/friends/:friendId.
router.route('/:id/friends/:friendId')
.post(addFriend)
.delete(deleteFriend)

//Module export router
module.exports = router;