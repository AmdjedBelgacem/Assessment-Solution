// This is to Indicate that this file is part of the main package.
package main

// Importing necessary packages for the server functionality.
import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux" // Importing the Gorilla Mux router package to handle HTTP requests.
	"github.com/rs/cors"     // Importing the CORS package to handle Cross-Origin Resource Sharing.
	// Basically i had an issue with the Cross-Origin Resource Sharing policy, so i had to use this package to handle it.
)

func main() {
	// Creating a new Gorilla Mux router.
	router := mux.NewRouter()
	// Creating a CORS handler with specific options.
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},                            // Allowing requests from any origin, for the sake of Testing of course.
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"}, // Allowing specific HTTP methods.
		AllowedHeaders:   []string{"Content-Type"},                 // Allowing only specified headers
		AllowCredentials: true,                                     // Allowing credentials in requests.
	})

	// Wrapping the router with the CORS handler.
	routerWithCors := corsHandler.Handler(router)

	// Defining HTTP routes and their corresponding handler functions.
	router.HandleFunc("/users", GetAllUsers).Methods("GET")        // Route to get all users.
	router.HandleFunc("/users/{id}", GetUserByID).Methods("GET")   // Route to get a user by ID.
	router.HandleFunc("/users", CreateUser).Methods("POST")        // Route to create a new user.
	router.HandleFunc("/users/{id}", UpdateUser).Methods("PUT")    // Route to update a user by ID.
	router.HandleFunc("/users/{id}", DeleteUser).Methods("DELETE") // Route to delete a user by ID.

	// Printing a message indicating that the server is running on port 8000, (for me to check).
	fmt.Println("Server running on port 8000")

	// Starting the HTTP server on port 8000 with the CORS-wrapped router.
	http.ListenAndServe(":8000", routerWithCors)
}
