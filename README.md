# Assessment-Solution

## User Management Project

This project is a user management system implemented with Go for the backend, TypeScript with React and Next.js for the frontend. The system includes a master view for CRUD operations on users, a detailed view for creating, editing, and deleting users, and a RESTful API to support these functionalities.

### Features

#### Master View
Lists all users in a data grid.
Supports CRUD operations with New, Edit, and Delete buttons.
Edit and Delete operations require row selection from the data grid.
#### Detailed View
Shows user fields as a form.
Form has two buttons: "Action" and "Back."
The text of the "Action" button changes based on the operation opened in the detailed view:
New: Create
Edit: Save
Delete: Delete
#### RESTful API
Returns all users.
Returns a user with the desired "id."
Saves a given user.
Updates data of the user with the desired "id."
Deletes the user with the desired "id."

### Technologies Used
#### Backend:
Go (Golang) for server-side logic.
SQLite for the database.
GORM as the ORM library for database interactions.
#### Frontend:
TypeScript with React & Next.js for the user interface.
Next.js for server-side rendering and routing.
Next-Intl for internationalization support.

##### Clone the repository:
git clone <repository-url>

##### Navigate to the project folder
cd <user-management-web-app>

##### Install dependencies
npm install

##### Run the development server
npm run dev
The application will be accessible at http://localhost:3000.

### Backend Structure

The backend is written in Go, and the main server file is located in the cmd directory.
Database schema and models are defined in the models directory.
RESTful API routes and handlers are implemented in the api directory.

### Frontend Structure
The frontend is written in TypeScript using React & Next.js.
Components are organized in the components directory.
The master view is located in the pages/index.tsx file.
The detailed view is located in the pages/details/[id].tsx file.
Internationalization files are stored in the locales directory.

### Additional Notes
The SQLite database file (user.db) is included in the project folder.
Ensure that all API paths, HTTP methods, and HTTP statuses adhere to REST API standards.
Persistence is guaranteed for all operations.
