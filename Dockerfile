# Tells docker to use the node image
FROM node:16-alpine3.16 as build 
# Set working directory to 'app'
WORKDIR /app

# Copy the package.json and the package-lock.json to workdir
COPY ./package*.json ./

# Only install the exact libraries listed in the package-lock.json file, this helps to prevent diffrent versions between builds
RUN npm ci
# Now copy the rest of the files then run the build, this will build the Angular project
COPY ./ ./
RUN npm run build

# We need a web-server, so we will use an nginx server
FROM nginx:1.23.0-alpine

# We use port 880 because it is GCP CLoudRun default port
EXPOSE 8080

# We now copy the nginx config file that we have in our source code to overwrite the default nginx config file in the installed nginx server.
COPY nginx.conf /etc/nginx/nginx.conf

# We copy from the 'build' step (The first command in this Dockerfile) the results of the build (created by the RUN npnm run build command) to 'usr/share/nginx.html' which is the default html for the nginx server
COPY --from=build /app/dist/tictactoe-pwa /usr/share/nginx/html