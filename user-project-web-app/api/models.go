// This is to Indicate that this file is part of the main package.
package main

// Importing the GORM library for it to work with the database.

// Defining a User struct, which represents a user entity in the database.
type User struct {
	ID          int    `json:"id" bson:"_id,omitempty"`
	Username    string `json:"username" bson:"username"`
	FullName    string `json:"fullName" bson:"fullName"`
	Email       string `json:"email" bson:"email"`
	Gender      string `json:"gender" bson:"gender"`
	BirthDate   string `json:"birthDate" bson:"birthDate"`
	PhoneNumber string `json:"phoneNumber" bson:"phoneNumber"`
}
