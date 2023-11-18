require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error");
const rateLimitMiddleware = require("./middleware/rate-limit-middleware");
const authRoute = require("./routes/auth-routes");
const productRoute = require('./routes/product-route')


const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(rateLimitMiddleware);
app.use(express.json());
app.use(express.static('public'));

app.use("/auth", authRoute);
app.use('/product' ,productRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || "5000";
app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
