# LMS Platform

A full-stack Learning Management System (LMS) with a React + Vite frontend and an Express + MongoDB backend.

## Project Overview

This repository contains two main parts:

- `LMS(frontend)` — React application built with Vite, Tailwind CSS, React Router, Redux, and payment integration.
- `server` — Node.js/Express backend with MongoDB, JWT authentication, Cloudinary media support, and Razorpay payment integration.

## Tech Stack

### Frontend
- React
- Vite
- Redux Toolkit
- Tailwind CSS + DaisyUI
- React Router DOM
- Axios
- React Icons
- Chart.js

### Backend
- Node.js
- Express
- MongoDB / Mongoose
- JWT Authentication
- Razorpay
- Cloudinary
- CORS
- Cookie Parser
- Morgan
- Multer
- Nodemailer

## Repository Structure

- `LMS(frontend)/` — frontend source code and Vite config
- `server/` — backend API, models, controllers, routes, and utilities
- `server/app.js` — Express app setup and route registration
- `server/server.js` — server startup, Cloudinary config, Razorpay config
- `server/config/dbConnection.js` — MongoDB connection logic

## Prerequisites

- Node.js 18+
- npm
- MongoDB database URI
- Razorpay account credentials
- Cloudinary account credentials

## Setup

### Frontend

```bash
cd "LMS(frontend)"
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

### Backend

```bash
cd server
npm install
npm run dev
```

The backend listens on `PORT` from environment or defaults to `8080`.

## Environment Variables

Create a `.env` file in the `server/` directory with at least:

```env
PORT=8080
MONGO_URI=<your-mongo-uri>
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRY=<jwt-expiry-duration>
FRONTEND_URL=<frontend-url>
CLOUDINARY_CLOUD_NAME=<cloudinary-cloud-name>
CLOUDINARY_API_KEY=<cloudinary-api-key>
CLOUDINARY_API_SECRET=<cloudinary-api-secret>
RAZORPAY_KEY_ID=<razorpay-key-id>
RAZORPAY_SECRET=<razorpay-secret>
```

## API Routes

### User routes (`/api/v1/user`)
- `POST /register`
- `POST /login`
- `GET /logout`
- `GET /me`
- `POST /reset`
- `POST /reset/:resetId`
- `POST /change-password`
- `PUT /update/:id`

### Course routes (`/api/v1/course`)
- `GET /`
- `POST /` (admin only)
- `DELETE /`
- `GET /:id`
- `PUT /:id` (admin only)
- `POST /:id` (admin only)
- `DELETE /:id`

### Payment routes (`/api/v1/payments`)
- `GET /razorpay-key`
- `POST /subscribe`
- `POST /verify`
- `POST /unsubscribe`
- `GET /` (admin only)

### Miscellaneous routes (`/api/v1`)
- `POST /contact`
- `GET /admin/stats/users` (admin only)

The frontend is configured to consume these endpoints via the backend `FRONTEND_URL` and CORS settings.

## Notes

- The frontend is a Vite app and runs independently from the backend.
- The backend uses JWT for authentication and MongoDB for data storage.
- Payment and file upload services rely on Razorpay and Cloudinary configuration.
