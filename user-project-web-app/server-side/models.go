package main

import (
	"github.com/jinzhu/gorm"
)

type User struct {
	gorm.Model
	Username string `gorm:"unique_index"`
	Password string
	email    string `gorm:"unique_index"`
}
