const express = require("express");
const { imageUploads } = require("../MIddleware/CarImage");
const CarDetail = require("../Model/CarDetail");
const router = express.Router()


// Router to upload car details
router.post("/create",
 (req, res) => {
    imageUploads(req, res, async (err) => {
        if(err){
            return res.json({ err: "Failed to upload image" })
        }

        try{

            const { model, registration } = req.body;

            const route = req.body.route.split(',').map(routes => routes.trim());
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
});

//router to fetch cars of a particular model
router.get("/get/fetchmodel/:model",
async (req, res) => {
    try{
        const model = new RegExp(req.params.model, 'i');

        const cars = await CarDetail.find({model});

        if(!cars || cars.length === 0 ){
            return res.json({ message: "No cars found with the specified model"})
        }

        return res.json({ data: cars });

    } catch(error){
        console.error("Error fetching car of the specified model", error);
        return res.json({ error: "Error fetching car of the specified model"})
    }
});


// Router to fetch cars using a specified route
router.get("/get/fetchroute/:route",
async (req, res) => {
    try{

        const route = new RegExp(req.params.route, 'i');

        const cars = await CarDetail.find({ route: {$in: [route]} });

        if(!cars || cars.length === 0){
            return res.json({ Message: "No car found in the specified route"});
        };

        return res.json({ data: cars });

    } catch (error){
        console.error("Error fetching car that use the specified route", error);
        return res.json({ error: "Error fetching car that use the specified route" });
    }
});

// Router to fetch car with a certain registration
router.get("/get/fetchregNo/:regNo",
async(req, res) => {
    try{
        const regNo = new RegExp(req.params.regNo, 'i');

        const car = await CarDetail.findOne({ registration: regNo})

        if(!car){
            return res.json({ Message: "There is no car with the specified registration number"})
        };

        return res.json({ data: car });

    } catch (error){
        console.error("Error fetching car with the registration number", error);
        return res.json({ error: "Error fetching car with the registration number"})
    };
});

// router to fetch cars of a specified model using a particular route
router.get("/get/model/route/:model/:route",
async (req, res) => {
    try{

        const model = new RegExp(req.params.model, 'i');
        const route = new RegExp(req.params.route, 'i');

        const cars = await CarDetail.find({ model, route: {$in : [route] } })

        if(!cars || cars.length === 0){
            return res.json({ message: "No cars found of the specified model using the specified route" });
        };

        return res.json({ data: cars});

    } catch (error){
        console.error("Error fetching car of a particular model using a particular route", error);
        return res.json({ error: "Error fetching car with particular model using a particular route" });
    }
});

//route to fetch car flying a specific routes
router.get("/get/multiple/routes",
async(req, res) =>{
    try{

        const route = req.query.route;

        const routesArray = route.split(',').map(route => new RegExp(route.trim(), 'i'));

        const cars = await CarDetail.find({ route: { $all: routesArray } });

        if (!cars || cars.length === 0) {
            return res.json({ message: "No cars found flying the specified routes" });
        }

        return res.json({ data: cars });

    }catch(error){
        console.error("Error fetching cars using more than one route", error);
        return res.json({ error: "Error fetching cars using more than one route"})
    }
});

// Router to fetch cars with specified model and routes
router.get("/get/fetch/:model",
async (req, res) => {
    try {
        const model = new RegExp(req.params.model, 'i');
        const route = req.query.route; // Assuming routes are passed as a comma-separated string in the query parameters

        if (!route) {
            return res.json({ message: "Please provide at least one route" });
        }

        const routesArray = route.split(',').map(route => new RegExp(route.trim(), 'i'));

        const cars = await CarDetail.find({ model, route: { $all: routesArray } });

        if (!cars || cars.length === 0) {
            return res.json({ message: "No cars found with the specified model and routes" });
        }

        return res.json({ data: cars });
    } catch (error) {
        console.error("Error fetching cars with a particular model and routes", error);
        return res.json({ error: "Error fetching cars with a particular model and routes" });
    }
});


// Router to fetch specified models of cars using certain routes
router.get("/get/multiple/models/routes",
async (req, res) => {
    try{

        const models = req.query.models;
        const routes = req.query.routes;

        if (!models || !routes) {
            return res.status(400).json({ error: "Both 'models' and 'routes' query parameters are required." });
        }

        const modelsArray = models.split(',').map(model => new RegExp(model.trim(), 'i')); 
        const routesArray = routes.split(',').map(route => new RegExp(route.trim(), 'i'));

        const cars = await CarDetail.find({ model: { $in: modelsArray}, route: {$all: routesArray }});

        if (!cars || cars.length === 0) {
            return res.json({ message: `No cars found for the specified models using the specified routes` });
        }

        
        return res.json({ data: cars });

    } catch (error){
        console.error("Error fetching cars of a specific using a specified route", error);
        return res.json({ error: "Error fetching cars of a specific model using specific routes" });
    }
});


module.exports = router;