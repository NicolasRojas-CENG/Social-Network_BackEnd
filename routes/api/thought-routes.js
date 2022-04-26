//Require express router
const router = require('express').Router();

const {
    getAllThoughts, getThoughtById, createThought, updateThought,
    deleteThought, addReaction, deleteReaction
} = require('../../controllers/thought-controller');

//Directs to the path /api/thoughts.
//This gets all thoughts.
router.route('/')
.get(getAllThoughts);

//Directs to the path /api/thoughts/:id.
//This gets, updates, or deletes a thought.
router.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

//Directs to the path /api/thoughts/:userId.
//This creates a new thought.
router.route('/:userId')
.post(createThought);

//Directs to the path /api/thoughts/:thoughtId/reactions.
//This creates a new reaction.
router.route('/:thoughtId/reactions')
.post(addReaction);

//Directs to the path /api/thoughts/:thoughtId/reactionId.
//This deletes a reaction.
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

//Export module router
module.exports = router;