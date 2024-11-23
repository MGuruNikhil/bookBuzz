# BookBuzz

BookBuzz is a web application that allows users to discover, review, and share books. 

## Tech Stack:

- Frontend: React or Next.js
- Backend: Node.js with Express.js
- Database: PostgreSQL
- ORM: Sequelize
- Styling: Tailwind CSS, Lucide
- Image Hosting: Firebase

## Features:

1. User Authentication:
    - Users can sign up and log in.
    - Securely store user passwords.
2. Book Management:
    - Users can add new books with details like title, author, ISBN, genre, and cover image (consider using a service like Cloudinary or Imgur for image uploads).
    - Users can edit and delete existing books.
    - Implement a search functionality to find books by title, author, or ISBN.
3. Reviews:
    - Users can write reviews for books, including a rating (e.g., 1-5 stars) and a text review.
    - Display average rating for each book.
    - Users can edit or delete their own reviews.
4. Complex Logic:
    - Recommendation System: Implemented a simple recommendation system.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/MGuruNikhil/bookBuzz.git
    ```
2. Navigate to the project's frontend directory:
    ```bash
    cd bookBuzz/frontend
    ```
3. Install dependencies for frontend:
    ```bash
    npm install
    ```
4. Open ```bookBuzz/frontend/config.js``` file and comment out the first line and uncomment the second line
5. Navigate to the project's backend directory:
    ```bash
    cd bookBuzz/backend
    ```
6. Install dependencies for backend:
    ```bash
    npm install
    ```
7. Open ```bookBuzz/backend/app.js``` file and comment out the cors configuration for diploymant
    ```js
    app.use(cors({
        origin: ['https://bookbuzz-nik.vercel.app', 'https://bookbuzz-nik.vercel.app'],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    }));
    ```
    and uncomment this line
    ```js
    app.use(cors());
    ```
8. Add your Firebase Configuration at ```bookBuzz/frontend/firebaseConfig.js``` and ```VITE_FB``` at ```bookBuzz/frontend/.env```.
9. Add your cloud PostgreSQL Neon ```DATABASE_URL``` and ```SECRET``` for jwt at ```bookBuzz/backend/.env```
10. Run the below command at both ```bookBuzz/frontend``` and ```bookBuzz/backend```
    ```sh
    npm run dev
    ```
