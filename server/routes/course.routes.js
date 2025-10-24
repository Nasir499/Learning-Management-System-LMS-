import {Router} from 'express';
import { 
     createCourse,
     createLectureToCourseById,
     getAllCourses,
     getLecturesCourseById,
     removeCourse,
     removeLectureFromCourse,
     updateCourse 
    } from '../controllers/course.controller.js';
import { authorizedRoles, authorizedSubscriber, isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from '../middlewares/multer.middleware.js';

const router = Router();

router.route('/')
    .get(getAllCourses)
    .post(
        isLoggedIn,
        authorizedRoles("ADMIN"),
        upload.single('thumbnail'),
        createCourse
    )
    .delete(
        isLoggedIn,
        authorizedRoles("ADMIN"),
        removeLectureFromCourse
    )

router.route('/:id')
    .get(
        isLoggedIn,
        authorizedSubscriber,
        getLecturesCourseById
    )
    .put(
        isLoggedIn,
        authorizedRoles("ADMIN"),
        updateCourse
    )
    .delete(
        isLoggedIn,
        authorizedRoles("ADMIN"),
        removeCourse
    )
    
    

export default router;