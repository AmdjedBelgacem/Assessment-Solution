package main

import (
	"github.com/jinzhu/gorm"
)

type User struct {
	gorm.Model
	Username    string `gorm:"unique_index"`
	FullName    string
	Email       string `gorm:"unique_index"`
	Gender      string
	BirthDate   string
	PhoneNumber string
}
