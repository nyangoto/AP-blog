#! /bin/bash

sudo apt install -y nodejs npm
# Create the main project structure
mkdir -p client/public client/src/{components,pages,services,styles,utils} server/{config,controllers,models,routes,services,utils,jobs,middleware}

# Create necessary files
touch client/public/{index.html,favicon.ico}
touch client/src/{App.js,index.js}
touch client/{package.json,README.md}
touch server/{app.js,server.js,package.json}
touch server/config/database.js
touch {.gitignore,README.md,package.json}

# Create some basic files for the project
echo "# My Personal Blog Project" > README.md
echo "node_modules/" > .gitignore

# Initialize npm in the root, client, and server directories
npm init -y
cd client && npm init -y && cd ..
cd server && npm init -y && cd ..

# Create a basic structure for the React app
cat << EOF > client/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
EOF

cat << EOF > client/src/App.js
import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>My Personal Blog</h1>
    </div>
  );
}

export default App;
EOF

# Create a basic structure for the Express server
cat << EOF > server/app.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB (update the URL as needed)
mongoose.connect('mongodb://localhost/my_blog', { useNewUrlParser: true, useUnifiedTopology: true });

// Add routes here

module.exports = app;
EOF

cat << EOF > server/server.js
const app = require('./app');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
EOF

echo "Directory structure and basic files have been created."