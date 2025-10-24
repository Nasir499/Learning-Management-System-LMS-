import { model, Schema } from 'mongoose';

const courseSchema = new Schema({
    title: {
        type: String,
        required:[true,"Title is required"],
        minLength:[3,"Title must be at least 8 characters long"],
        maxLength:[100,"Title must not exceed 100 characters"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minLength: [10, "Description must be at least 20 characters long"],
        maxLength: [500, "Description must not exceed 500 characters"],
        trim: true
    },
    category: {
        type: String,
        required: [true, "Category is required"],
    },
    thumbnail: {
        public_id: {
            type: String, 
          required: [true, "Thumbnail is required"]
        },
        secure_url: {
            type: String,
            required: [true, "Thumbnail is required"]
        },

    },
    lectures: [
        {
            title: String,
            description: String,
            video: {
                public_id: {
                    type: String,
                },
                secure_url: {
                    type: String
                }
            },
        },
        
    ],
    numberoflectures: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: String,
        required: [true, "CreatedBy is required"],
        trim: true
    },
}, { timestamps: true });

const Course = model('Course', courseSchema);
export default Course;