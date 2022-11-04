import { connect } from "mongoose";

export const connectDB = async (uri: string) => {
  try {
    const conn: any = await connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host} 🌍`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
