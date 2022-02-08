const router = require("express").Router();
const Post = require('../Models/Post_model');

// get all categories

router.get('/getAllCategories', async (req, res) => {

    try {

        const categories = await Post.distinct('category');

        res.status(200).json(categories);

    } catch (error) {

        res.send(error);
    }

});

module.exports = router;