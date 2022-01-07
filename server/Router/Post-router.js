const router = require('express').Router();
const Post = require('../Models/Post_model');
const fs = require("fs");
const authgurd = require('../authgard/authgurd');

// Creat Post

router.post('/', async (req, res) => {

    const newPost = new Post(req.body);

    try {
        const savePost = await newPost.save();
        res.status(200).json(savePost);

    } catch (error) {
        res.status(500).json(error)
    }
})

// Update Post

router.put('/:id', async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);

        if (post.username === req.body.username) {
            if (req.body.photo) {
                const oldPhoto = post.photo;
                const uploadDir = "upload/";
                const oldPhotoWithPath = uploadDir + oldPhoto;

                if (fs.existsSync(oldPhotoWithPath)) {
                    fs.unlink(oldPhotoWithPath, (err) => {
                        console.log(err);
                    });
                }
            }

            try {
                const updatePost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
                res.status(200).json(updatePost);
            }
            catch (error) {

                res.status(401).json("Upload error");
            }
        }
        else {
            res.status(403).json("You can update only your posts");
        }

    }
    catch (error) {
        res.status(500).json("databess error");
    }
});


// Delete Post

router.delete('/:id', async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                if (post.photo) {
                    const oldPhoto = post.photo;
                    const uploadDir = "upload/";
                    const oldPhotoWithPath = uploadDir + oldPhoto;

                    if (fs.existsSync(oldPhotoWithPath)) {
                        fs.unlink(oldPhotoWithPath, (err) => {
                            if (err) { new Error("Culd not delete photos") }
                        });
                    }
                }
                await post.delete()
                res.status(200).json("Post has been deleted");
            }
            catch (error) {
                res.status(401).json("Could not delete");
            }
        }
        else {
            res.status(400).json("You can delete only your posts");
        }
    }
    catch (error) {
        res.status(500).json("You can delete only your posts");
    }
});

// Get single post

router.get('/:id', async (req, res) => {

    const post = await Post.findById(req.params.id).populate("comments.user")

    try {
        res.send(post)

    } catch (error) {
        res.send(error)
    }

});

// create comments
router.put('/comments/:id', authgurd, async (req, res) => {

    const post = await Post.findById(req.params.id);

    try {

        if (post) {

            const postComment = await Post.findOneAndUpdate({ _id: req.params.id }, {
                $set: {
                    comments: [...post.comments,
                    {
                        user: req.body.userId,
                        comments: req.body.comments
                    }]

                }
            }
                , { new: true })

            res.status(200).json(postComment)

        } else {

            res.status(400).json("could not find the post")
        }

    } catch (error) {

        console.log(error)
        res.json(error)
    }

});

// update comment
router.put('/comments/eddit/:id', authgurd, async (req, res) => {

    const post = await Post.findById(req.params.id);
    const commentId = req.body.commentId
    const comment = req.body.comments

    try {
        if (post) {

            const updateAbleCom = post.comments.find((comment) => comment._id == commentId);
            const updateComment = { ...updateAbleCom._doc, comments: comment }
            const allComents = post.comments.map((comment) => comment._id == commentId ? updateComment : comment)



            const updateSingleComment = await Post.findOneAndUpdate({ _id: req.params.id }, {
                $set: {
                    comments: allComents
                }
            }, { new: true })

            res.status(200).json(updateSingleComment)
        }

    } catch (error) {
        console.log(error)
        res.send(error)
    }

});

// delete comment
router.put('/comments/delete/:id', authgurd, async (req, res) => {



    const post = await Post.findById(req.params.id);
    const commentId = req.body.commentId

    try {
        if (post) {

            const allComents = post.comments.filter((comment) => comment._id != commentId)

            const updateSingleComment = await Post.findOneAndUpdate({ _id: req.params.id }, {
                $set: {
                    comments: allComents
                }
            }, { new: true })

            res.status(200).json(updateSingleComment._doc)
        }

    } catch (error) {

        console.log(error)
        res.send(error)
    }

});


// Get all posts

router.get('/', async (req, res) => {

    const username = req.query.user;
    const catname = req.query.cat;

    try {

        let posts;

        if (username) {

            posts = await Post.find({ username });

        } else if (catname) {

            posts = await Post.find({ category: catname });

        } else {

            posts = await Post.find();

        }

        res.status(200).json(posts);


    } catch (error) {
        res.send(error);
    }

});


module.exports = router