import 'dotenv/config'
import mongoose from 'mongoose'

const connectDatabase = () => {
    console.log("Conectando ao banco...");
    mongoose
        .connect(
            process.env.MONGO_URL
        )
        .then(() => console.log("Conectado!"))
        .catch((error) => console.log(error));
};

export default connectDatabase;