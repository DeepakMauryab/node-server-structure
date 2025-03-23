import { model, Schema, Document } from "mongoose";

// Define a TypeScript interface for the User document
interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  mobileNumber: string;
  password: string;
  status: 0 | 1; // Can either be "active" or "inactive"
}

// Define the User schema
const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // Ensure username is unique
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [50, "Username cannot be longer than 50 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"], // Basic email validation
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Please provide a valid 10-digit mobile number"], // Ensure it's a valid 10-digit number
  },
  password: {
    type: String,
    minlength: [6, "Password must be at least 6 characters long"],
  },
  status: {
    type: Number,
    enum: [0, 1], // Limit status to "active" or "inactive"
    default: 1, // Default to "active" status
  },
});

// Create the User model
const User = model<IUser>("User", UserSchema);

export default User;
