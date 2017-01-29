# Google Map & DynamoDB example

This example demonstrate bounding box with Google Map and DynamoDB
Express framework used for backend part.

### Quick start with Docker

Docker used for quick developer environment setup.
Run `docker-compose up -d` to start services local.
Open `http://localhost:3020/`

### Quick start without Docker
Run `npm install` and `bower install`
For start DB_HOST, AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY 
environment properties must be provided.
Run `PORT=3020 npm start` for start.
 
### URL

Main page 
`http://localhost:3020/`

Add location page
`http://localhost:3020/add`
On this page location can be added (by moving marker over map and clicking "Add place" button)

Locations list page
`http://localhost:3020/list`
List of location, location can be removed here


