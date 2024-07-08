import mongoose from "mongoose";

type ConnectionObject ={
    isConnected?: number
}

const connection: ConnectionObject ={}

async function dbConnect ():Promise<void>{
    if (connection.isConnected) {
        console.log("Already connected to database")
        return
    }
    try {
        console.log(process.env.MONGO_URL)
        const db = await mongoose.connect(process.env.MONGO_URL || '',{})
        connection.isConnected = db.connections[0].readyState

        console.log("Database connected successfully")
        
    } catch (error) {
        console.log("Database connection failed", error)
        process.exit(1)
    }
}

export default dbConnect