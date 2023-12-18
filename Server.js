const express = require("express");
const mongoose = require("mongoose");
const CarDetailsRoutes = require("./src/Components/Backend/Routes/CarDetails");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
    'mongodb://carwrap:carwrap@ac-bludfzz-shard-00-00.ncbvigm.mongodb.net:27017,ac-bludfzz-shard-00-01.ncbvigm.mongodb.net:27017,ac-bludfzz-shard-00-02.ncbvigm.mongodb.net:27017/carwrap?ssl=true&replicaSet=atlas-13139h-shard-0&authSource=admin&retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true}
).then(() => {
    console.log('Connected to MongoDb Atlas!');
}).catch((err) => {
    console.log('Error connecting to MongoDB Atlas:', err)
});

app.use("/carwrap", CarDetailsRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})