import Course from "../models/course.model.js"
import AppError from "../utils/error.util.js";
import cloudinary from "cloudinary";
import fs from "fs";



const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({}).select("-lectures");

        res.status(200).json({
            success: true,
            message: "All courses fetched successfully",
            courses
        });
    } catch (error) {
        return next(new AppError("Failed to fetch courses", 500));
    }

}

const getLecturesCourseById = async (req, res, next) => {

    const { id } = req.params;

    try {
        const course = await Course.findById(id).select("lectures");

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Course lectures fetched successfully",
            lectures: course.lectures
        });
    } catch (error) {
        return next(new AppError("Failed to fetch course lectures", 500));
    }

}

const createCourse = async (req, res, next) => {
    // Implementation for creating a course
    // This function is not defined in the provided code snippet
    // You can add your logic here
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy) {
        return next(new AppError("All fields are required", 400));
    }

    const course = await Course.create({
        title,
        description,
        category,
        createdBy,
        thumbnail: {
            public_id: "dummy",
            secure_url: "dummy"
        }
    });
    if (!course) {
        return next(new AppError("Failed to create course, please try again", 500));
    }

    if (req.file) {
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: "courses",
                width: 800,
                height: 600,
                crop: "fill"
            });
            if (result) {
                course.thumbnail.public_id = result.public_id;
                course.thumbnail.secure_url = result.secure_url;
            }

            fs.rm(`uploads/${req.file.filename}`, (error) => {
                if (error) {
                    console.error("Failed to delete file :", error);
                }
            });
        } catch (error) {
            console.error("Failed to upload image to Cloudinary:", error);
        }
    }

    await course.save();

    res.status(201).json({
        success: true,
        message: "Course created successfully",
        course
    });
}

const updateCourseById = async (req, res, next) => {
    // Implementation for updating a course
    // This function is not defined in the provided code snippet
    // You can add your logic here
    try {
        const { id } = req.params;

        const course = await Course.findByIdAndUpdate(
            id,
            {
                $set: req.body
            },
            {
                runValidators: true
            });

        if (!course) {
            return next(new AppError("Course not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            course
        });
    } catch (error) {
        return next(new AppError("Failed to update course", 500));
    }
}

const removeCourse = async (req, res, next) => {
    // Implementation for removing a course
    // This function is not defined in the provided code snippet
    // You can add your logic here
    try {
        const { id } = req.params;

        const course = await Course.findByIdAndDelete(id);

        if (!course) {
            return next(new AppError("Course not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "Course removed successfully",
            course
        });
    } catch (error) {
        return next(new AppError("Failed to remove course", 500));
    }
}

const createLectureToCourseById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        if (!title || !description) {
            return next(new AppError("All fields are required", 400));
        }

        const course = await Course.findById(id);

        if (!course) {
            return next(new AppError("Course not found", 404));
        }

        const lecture = {
            title,
            description,
            video: {
                public_id: "dummy",
                secure_url: "dummy"
            }
        };
        if(req.file) {
            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: "lectures",
                    chunk_size: 5000000000,
                    resource_type: "video"
                });
                if (result) {
                    lecture.video.public_id = result.public_id;
                    lecture.video.secure_url = result.secure_url;
                }

                fs.rm(`uploads/${req.file.filename}`, (error) => {
                    if (error) {
                        console.error("Failed to delete file :", error);
                    }
                });
            } catch (error) {
                return next(new AppError("Failed to upload video to Cloudinary", 500));
            }
        }

        course.lectures.push(lecture);
        course.numberoflectures = course.lectures.length;
        await course.save();

        res.status(201).json({
            success: true,
            message: "Lecture added successfully",
            lecture
        });
    } catch (error) {
        return next(new AppError("Failed to add lecture", 500));
    }
}

 const addLectureToCourseById = async (req, res, next) => {
  const { title, description } = req.body;
  const { id } = req.params;

  let lectureData = {};

  if (!title || !description) {
    return next(new AppError('Title and Description are required', 400));
  }

  const course = await Course.findById(id);

  if (!course) {
    return next(new AppError('Invalid course id or course not found.', 400));
  }

  // Run only if user sends a file
  if (req.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'lms', // Save files in a folder named lms
        chunk_size: 5000000000, // 5 gb size
        resource_type: 'video',
        width: 1280,
        height: 720,
        crop: 'scale',
      });

      // If success
      if (result) {
        // Set the public_id and secure_url in array
        lectureData.public_id = result.public_id;
        lectureData.secure_url = result.secure_url;
      }

      // After successful upload remove the file from local storage
      fs.rm(`uploads/${req.file.filename}`);
    } catch (error) {
      // Empty the uploads directory without deleting the uploads directory
      for (const file of await fs.readdir('uploads/')) {
        await fs.unlink(path.join('uploads/', file));
      }

      // Send the error message
      return next(
        new AppError(
          JSON.stringify(error) || 'File not uploaded, please try again',
          400
        )
      );
    }
  }

  course.lectures.push({
    title,
    description,
    lecture: lectureData,
  });

  course.numberOfLectures = course.lectures.length;

  // Save the course object
  await course.save();

  res.status(200).json({
    success: true,
    message: 'Course lecture added successfully',
    course,
  });
}

 const removeLectureFromCourse = async (req, res, next) => {
  // Grabbing the courseId and lectureId from req.query
  const { courseId, lectureId } = req.query;

  console.log(courseId);

  // Checking if both courseId and lectureId are present
  if (!courseId) {
    return next(new AppError('Course ID is required', 400));
  }

  if (!lectureId) {
    return next(new AppError('Lecture ID is required', 400));
  }

  // Find the course using the courseId
  const course = await Course.findById(courseId);

  // If no course send custom message
  if (!course) {
    return next(new AppError('Invalid ID or Course does not exist.', 404));
  }

  // Find the index of the lecture using the lectureId
  const lectureIndex = course.lectures.findIndex(
    (video) => video._id.toString() === lectureId.toString()
  );

  // If returned index is -1 then send error as mentioned below
  if (lectureIndex === -1) {
    return next(new AppError('Lecture does not exist.', 404));
  }

  // Delete the lecture from cloudinary
  await cloudinary.v2.uploader.destroy(
    course.lectures[lectureIndex].video.public_id,
    {
      resource_type: 'video',
    }
  );

  // Remove the lecture from the array
  course.lectures.splice(lectureIndex, 1);

  // update the number of lectures based on lectres array length
  course.numberOfLectures = course.lectures.length;

  // Save the course object
  await course.save();

  // Return response
  res.status(200).json({
    success: true,
    message: 'Course lecture removed successfully',
  });
};

export {
    getAllCourses,
    getLecturesCourseById,
    createCourse,
    updateCourseById,
    removeCourse,
    createLectureToCourseById,
    removeLectureFromCourse
}