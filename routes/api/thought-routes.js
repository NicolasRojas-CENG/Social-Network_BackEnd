//Require express router
const router = require('express').Router();

const {
    getAllThoughts, getThoughtById, createThought, updateThought,
    deleteThought, addReaction, deleteReaction
} = require('../../controllers/thought-controller');

//Directs to the path /api/thoughts.
router.route('/').get(getAllThoughts);

//Directs to the path /api/thoughts/:id.
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

//Directs to the path /api/thoughts/:userId.
router.route('/:userId').post(createThought);

//Directs to the path /api/thoughts/:thoughtId/reactions.
router.route('/:thoughtId/reactions').post(addReaction);

//Directs to the path /api/thoughts/:thoughtId/reactionId.
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

//Export module router
module.exports = router;