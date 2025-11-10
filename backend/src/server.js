import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001

app.use(express.json());
app.use(rateLimiter)
app.use((req, res, next) => {
    console.log("We just got a new request");
    next();
})

app.use(cors())
app.use("/api/notes", notesRoutes);
app.use(rateLimiter);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT: ", PORT);
    });
});

//mongodb+srv://ztucker99_db_user:6vetnY2aaWINqOYo@cluster0.82qcpee.mongodb.net/?appName=Cluster0