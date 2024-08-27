# Project Setup Instructions


# Step 1: Clone the repository
echo "Cloning the repository..."
git clone https://github.com/yazanOthman/historical-app.git
cd <repository-name> # Replace <repository-name> with the actual directory name after cloning

# Step 2: Backend setup
echo "Setting up the backend..."
cd backend
npm install

# Step 3: Replace the MongoDB URI in connectDB function with the provided URI

# Step 4: Start the backend server using Nodemon
echo "Starting the backend server..."
nodemon index.js &

# Step 5: Client setup
echo "Setting up the client..."
cd client/
npm install

# Step 6: Start the client application
echo "Starting the client application..."
npm start

