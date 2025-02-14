# Use an official Node.js image as the base
FROM node:17

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Install specific version of Vite
RUN npm install vite@5.0.0

# Copy the rest of the project files to the working directory
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Start the app
#CMD ["npm", "run", "start"]
CMD ["node", "./node_modules/vite/dist/node/cli.js", "dev", "--host", "0.0.0.0"]
