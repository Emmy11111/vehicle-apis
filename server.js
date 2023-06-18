require("dotenv").config();
const express = require('express');
require("./util/db")
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({origin: "*"}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
    res.send("Vehicle management apis")
});

app.use("/api/v1/users", require("./routes/users.routes"));
app.use("/api/v1/carOwners", require("./routes/carOwners.routes"));
app.use("/api/v1/vehicles", require("./routes/vehicle.routes"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});