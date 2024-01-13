// This is to Indicate that this file is part of the main package.
package main

// Importing the GORM library for it to work with the database.
import (
	"github.com/jinzhu/gorm"
)

// Defining a User struct, which represents a user entity in the database.
type User struct {
	// Embedding the gorm.Model to include common fields like ID, CreatedAt, UpdatedAt, and DeletedAt.
	gorm.Model
	// Username field with a unique constraint, indicating that each username must be unique in the database.
	Username string `gorm:"unique_index"`
	// Each Field represents itself in the database for the user's information.
	FullName string
	// Email field with a unique constraint, indicating that each email must be unique in the database.
	Email       string `gorm:"unique_index"`
	Gender      string
	BirthDate   string
	PhoneNumber string
}
