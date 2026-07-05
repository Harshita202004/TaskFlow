# TaskFlow

TaskFlow is a full-stack MERN task and productivity application with JWT authentication, MongoDB persistence, protected routes, task CRUD, dashboard metrics, calendar editing, analytics, settings, and notification badges.

## Stack

- React + Vite
- Axios
- Express.js
- MongoDB Atlas + Mongoose
- JWT auth with httpOnly cookies
- bcrypt password hashing

## Setup

Install dependencies:

```bash
cd server
npm install

cd ../client
npm install
```

Create `server/.env` from `server/.env.example`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/taskflow?retryWrites=true&w=majority
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Create `client/.env` from `client/.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run the API:

```bash
cd server
npm run dev
```

Run the client:

```bash
cd client
npm run dev
```

Open `http://localhost:5173`.

## Verification

```bash
cd client
npm run lint
npm run build

cd ../server
node -e "import('./src/app.js').then(() => console.log('server app imports ok'))"
```
