const express = require("express");
const { imageUploads } = require("../MIddleware/CarImage");
const CarDetail = require("../Model/CarDetail");
const router = express.Router()

router.post("/create",
 (req, res) => {
    imageUploads(req, res, async (err) => {
        if(err){
            return res.json({ err: "Failed to upload image" })
        }

        try{

            const { model, registration, route } = req.body;

            const carImage = req.files.carImage.map((image) => image.path)

            const carDetail = new CarDetail({
                model,
                registration,
                route,
                carImage: carImage,
            });

            await carDetail.save();

            res.json({ Message: "car details uploaded successfully "});
    
    
        } catch (error){
            console.error("Error creating car details", error);
            return res.json({ error: "Error creating car details "});
        }
    })
})

module.exports = router;