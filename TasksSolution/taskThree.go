package main

// Imported fmt package to Print the result
import "fmt"

// Defined my function with an array of strings as a parameter and a string return type
func TaskThree(myArr []string) string {
	// Created a new map to store the strings and their count
	newArr := make(map[string]int)
	// Created a variable to store the most repeated string
	mostRepeated := ""
	// Created a variable to store the count of the most repeated string
	maxCount := 0
	// Used a for loop to iterate over the array and store the strings and their count in the map
	for _, v := range myArr {
		// Used the map to store the strings and their count
		newArr[v]++
		if newArr[v] > maxCount {
			maxCount = newArr[v]
			mostRepeated = v
		}
	}
	fmt.Print("Most repeated word is:")
	return mostRepeated
}
