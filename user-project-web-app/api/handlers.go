// This is to Indicate that this file is part of the main package.
package handler

// Importing necessary packages for the server functionality.
import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux" // Importing the Gorilla Mux router package for handling HTTP requests.
	"gorm.io/driver/sqlite"  // Importing the SQLite driver for GORM.
	"gorm.io/gorm"           // Importing the GORM library for database interaction.
)

// Global variables to hold the GORM database connection and potential initialization error.
var db *gorm.DB
var err error

// Initialization function that is executed once when the program starts.
func init() {
	// Opening a connection to an SQLite database file named "user.db".
	db, err = gorm.Open(sqlite.Open("user.db"), &gorm.Config{})
	if err != nil {
		fmt.Println(err)
	}

	// Automatically applying any pending migrations to the User model.
	db.AutoMigrate(&User{})
}

// Handler function to retrieve all users from the database.
func GetAllUsers(w http.ResponseWriter, r *http.Request) {
	// Declaring a slice to hold user objects.
	var users []User

	// Querying the database to retrieve all user records.
	db.Find(&users)

	// Setting the HTTP response status code to 200 (OK).
	w.WriteHeader(http.StatusOK)

	// Encoding the retrieved user data as JSON and writing it to the response.
	json.NewEncoder(w).Encode(&users)
}

// Handler function to retrieve a user by ID from the database.
func GetUserByID(w http.ResponseWriter, r *http.Request) {
	// Extracting parameters from the request URL, I'm targeting the User Id in this case.
	params := mux.Vars(r)

	// Declaring a variable to hold the user object.
	var user User

	// Querying the database to retrieve a user by their ID.
	result := db.First(&user, params["id"])

	// Checking if the query result contains an error (user not found).
	if result.Error != nil {
		// Setting the HTTP response status code to 404 (Not Found).
		w.WriteHeader(http.StatusNotFound)
	} else {
		// Setting the HTTP response status code to 200 (OK).
		w.WriteHeader(http.StatusOK)

		// Encoding the retrieved user data as JSON and writing it to the response.
		json.NewEncoder(w).Encode(&user)
	}
}

// Handler function to create a new user in the database.
func CreateUser(w http.ResponseWriter, r *http.Request) {
	// Declaring a variable to hold the user object.
	var user User

	// Decoding the JSON request body into the user object.
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		// Setting the HTTP response status code to 400 (Bad Request) if decoding fails.
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Creating a new user record in the database.
	db.Create(&user)

	// Setting the HTTP response status code to 201 (Created).
	w.WriteHeader(http.StatusCreated)

	// Encoding the created user data as JSON and writing it to the response.
	json.NewEncoder(w).Encode(&user)
}

// Handler function to update a user in the database by ID.
func UpdateUser(w http.ResponseWriter, r *http.Request) {
	// Extracting parameters (in this case, the "id" parameter) from the request URL.
	params := mux.Vars(r)

	// Declaring a variable to hold the user object.
	var user User

	// Querying the database to retrieve a user by their ID.
	result := db.First(&user, params["id"])

	// Checking if the query result contains an error (user not found).
	if result.Error != nil {
		// Setting the HTTP response status code to 404 (Not Found).
		w.WriteHeader(http.StatusNotFound)
		return
	}

	// Decoding the JSON request body into the user object.
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		// Setting the HTTP response status code to 400 (Bad Request) if decoding fails.
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Saving the updated user record in the database.
	db.Save(&user)

	// Setting the HTTP response status code to 200 (OK).
	w.WriteHeader(http.StatusOK)

	// Encoding the updated user data as JSON and writing it to the response.
	json.NewEncoder(w).Encode(&user)
}

// Handler function to delete a user from the database by ID.
func DeleteUser(w http.ResponseWriter, r *http.Request) {
	// Extracting parameters (in this case, the "id" parameter) from the request URL.
	params := mux.Vars(r)

	// Converting the "id" parameter to an integer.
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		// Setting the HTTP response status code to 400 (Bad Request) if conversion fails.
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Deleting the user record from the database by ID.
	result := db.Delete(&User{}, id)

	// Checking if the delete operation affected any rows (user not found).
	if result.RowsAffected == 0 {
		// Setting the HTTP response status code to 404 (Not Found).
		w.WriteHeader(http.StatusNotFound)
		return
	}

	// Setting the HTTP response status code to 204 (No Content) as the resource is successfully deleted.
	w.WriteHeader(http.StatusNoContent)
}
