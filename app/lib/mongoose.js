// import mongoose from "mongoose";

// if (!MONGODB_URI) {
//     throw new Error("Please define the MONGODB_URI environment variable");
// }

// let cached = global.mongoose || { conn: null, promise: null };

// async function connectToDatabase() {
//     if (cached.conn) return cached.conn;

//     if (!cached.promise) {
//         cached.promise = mongoose.connect(MONGODB_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         }).then((mongoose) => mongoose);
//     }

//     cached.conn = await cached.promise;
//     console.log("✅ MongoDB Connected Successfully");

//     global.mongoose = cached;
//     return cached.conn;
// }

// export default connectToDatabase;
