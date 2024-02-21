import express from 'express';

interface User {
  id: number;
  name: string;
  gamertag: string;
  age: number;
}

const app = express();
const port = 3000;
const users: User[] = [];

app.use(express.json());

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Basic User API');
});

// Add a new route for GET requests
app.get('/api/users', (req, res) => {
  // This route responds with a list of users (in a real API, you'd fetch this from the database)
  res.json(users);
});

// Create a route for POST requests
app.post('/api/users', (req, res) => {
  try {
    // Attempt to parse the request body as JSON
    const newUser: User = req.body;

    // Check if newUser is valid
    if (newUser) {
      // Add the new user to the 'users' array
      users.push(newUser);

      // Respond with a success message and the user data
      res.json({ message: 'User created', user: newUser });
    } else {
      // Respond with an error message if the user data is missing or invalid
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    // Handle any parsing errors and respond with an error message
    res.status(500).json({ error: 'Server error' });
  }
});

//Route for updating user information (PUT)
app.put('/api/users/:id', (req, res) => {
  // Get the user ID from the URL
  const userID = Number(req.params.id);

  if (isNaN(userID)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  // Find the user to update
  const userToUpdate = users.find((user) => user.id === userID);

  // Check if the user exists
  if (!userToUpdate) {
    // Respond with an error, indicating that the user was not found
    return res.status(404).json({ error: 'User not found' });
  }

  // Update the user's properties
  userToUpdate.id = req.body.id;
  userToUpdate.name = req.body.name;
  userToUpdate.gamertag = req.body.gamertag;
  userToUpdate.age = req.body.age;

  // Respond with a success message and the updated user data
  res.status(200).json({
    message: `User ${userID} updated`,
    user: userToUpdate,
  });
});

// Route for deleting a user (DELETE)
app.delete('/api/users/:id', (req, res) => {
  // Get the user ID from the URL and convert it to a number
  const userID = Number(req.params.id);

  // Find the user's index in the 'users' array
  const userIndex = users.findIndex((user) => user.id === userID);

  if (userIndex === -1) {
    // If the user is not found, respond with a 404 Not Found error
    return res.status(404).json({ error: 'User not found' });
  }

  // Remove the user from the 'users' array
  users.splice(userIndex, 1);

  // Respond with a success message
  res.json({ message: `User ${userID} deleted` });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
