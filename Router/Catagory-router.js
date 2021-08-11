const router = require('express').Router();
const Categories = require('../Models/Categories_model');

// Create a category

router.post('/', async (req,res)=>{

     const newcategory = new Categories(req.body);

     try {
         
        await newcategory.save();
        res.status(200).json(newcategory);
         
     } catch (error) {

        res.status(500).json(error);
         
     }

})

// Get categories

router.get('/', async (req,res)=>{

     try {
        const categories = await Categories.find();

        res.status(200).json(categories);
         
     } catch (error) {

        res.status(500).json(error);
         
     }

})


module.exports = router
