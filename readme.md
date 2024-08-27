# Redvision Blogging App

This is a full-stack blogging application developed as an assignment for Redvision Technologies. It features a modern front-end with Next.js and Tailwind CSS, paired with a robust Node.js and Express.js back-end, and a MongoDB database for storage. The app also utilizes Amazon S3 for media storage.

## Tech Stack

### Frontend

- **Framework**: Next.js
- **UI Library**: ActernityUI
- **Styling**: Tailwind CSS

### Backend

- **Framework**: Node.js with Express.js
- **Database**: MongoDB
- **Media Storage**: Amazon S3

## Project Structure

The project is organized into two main folders: `frontend` (Next.js) and `backend` (Node.js and Express.js). Each folder has its own `.env.example` file for environment variable configuration.

## Setup Instructions

### Prerequisites

- Node.js (v14.x or later)
- MongoDB
- AWS S3 Bucket for media storage

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ubaish01/redvision.git
   cd redvision
   ```

2. **Install dependencies:**

   - For frontend:
     ```bash
     cd frontend
     npm install
     ```
   - For backend:
     ```bash
     cd backend
     npm install
     ```

3. **Environment Variables:**
   - Rename `.env.example` to `.env` in both `frontend` and `backend` folders and update the variables as required.

### Running the Application

1. **Start the backend server:**

   ```bash
   cd backend
   npm start
   ```

2. **Start the frontend server:**

   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the application:**
   - The frontend should be running on `http://localhost:3000`.
   - The backend API will be running on `http://localhost:5000`.

## License

This project is for educational purposes only.
