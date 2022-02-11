const router = require('express').Router();
const Post = require('../Models/Post_model');
const fs = require("fs");
const authgurd = require('../authgard/authgurd');
const upload = require('../Multer/Multer');
const path = require('path');


// Creat Post
router.post('/', authgurd, upload.single('files'), async (req, res) => {

    try {

        if (req.file) {

            const newPost = new Post({
                title: req.body.title,
                desc: req.body.desc,
                photo: req.file.filename,
                username: req.userName,
                category: req.body.category
            });

            const post = await newPost.save();
            res.status(200).json(post);

        } else {

            const newPost = new Post({
                title: req.body.title,
                desc: req.body.desc,
                username: req.userName,
                category: req.body.category
            });

            const post = await newPost.save();
            res.status(200).json(post);

        }

    } catch (error) {

        res.status(400).json(error)
    }
})

// Update Post

router.post('/:id', authgurd, upload.single('files'), async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if (post.username === req.userName) {

            try {

                if (req.file) {

                    const oldPhoto = post.photo;
                    const uploadDir = "upload/";
                    const oldPhotoWithPath = uploadDir + oldPhoto;

                    if (fs.existsSync(oldPhotoWithPath)) {

                        fs.unlink(oldPhotoWithPath, (err) => {
                            console.log(err);
                        });

                    } else {

                        console.log("no file to delete");
                    }

                    post.title = req.body.title;
                    post.desc = req.body.desc;
                    post.photo = req.file.filename;
                    post.category = req.body.category;

                    const updatedPost = await post.save();
                    res.status(200).json(updatedPost);

                } else {

                    const updatePost = await Post.findByIdAndUpdate(req.params.id, {
                        $set: {
                            title: req.body.title,
                            desc: req.body.desc,
                            category: req.body.category,
                        }
                    },
                        { new: true }
                    );

                    res.status(200).json(updatePost);

                }

            }
            catch (error) {

                console.log(error);
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

router.delete('/:id', authgurd, async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);
        if (post.username === req.userName) {

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

        } else {

            res.status(400).json("You can delete only your posts");
        }
    }
    catch (error) {

        res.status(500).json("You can delete only your posts");
    }
});

// Get single post

router.get('/:id', authgurd, async (req, res) => {

    const post = await Post.findById(req.params.id).populate('comments.user', "profilePic username");

    try {

        res.status(200).json(post);

    } catch (error) {

        res.status(500).json("databess error");
    }

});

// create comments
router.post('/comments/:id', authgurd, async (req, res) => {

    const post = await Post.findById(req.params.id);

    try {

        if (post) {

            await Post.findOneAndUpdate({ _id: req.params.id }, {
                $set: {
                    comments: [...post.comments,
                    {
                        user: req.userId,
                        commentData: req.body.comments
                    }]

                }
            }
                , { new: true });

            const commentedPost = await Post.findById(req.params.id).populate('comments.user', "profilepic username");

            res.status(200).json(commentedPost);

        } else {

            res.status(400).json("could not find the post")
        }

    } catch (error) {

        console.log(error)
        res.json(error)
    }

});

// update comment
router.post('/comments/eddit/:id', authgurd, async (req, res) => {

    const post = await Post.findById(req.params.id);
    const commentId = req.body.commentId
    const comment = req.body.comments

    try {
        if (post) {

            const updateAbleCom = post.comments.find((comment) => comment._id == commentId);
            const updateComment = { ...updateAbleCom._doc, commentData: comment }
            const allComents = post.comments.map((comment) => comment._id == commentId ? updateComment : comment)

            await Post.findOneAndUpdate({ _id: req.params.id }, {
                $set: {
                    comments: allComents
                }
            }, { new: true })

            const updatedCommentPost = await Post.findById(req.params.id).populate('comments.user', "profilepic username");

            res.status(200).json(updatedCommentPost);
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

            await Post.findOneAndUpdate({ _id: req.params.id }, {
                $set: {
                    comments: allComents
                }
            }, { new: true })

            const deletedCommentPost = await Post.findById(req.params.id).populate('comments.user', "profilepic username");

            res.status(200).json(deletedCommentPost);
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

            posts = await Post.find({});
        }

        res.status(200).json(posts);


    } catch (error) {

        res.send(error);
    }

});


module.exports = router