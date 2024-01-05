package main

// Imported fmt package to Print the result
import "fmt"

// Defined my function with an integer as a parameter and return type
func taskTwo(num int) int {
	// Used an if statement to check if the number is greater than 1
	if num > 1 {
		fmt.Println(num)
		// Made a recursive call to the function dividing the argument by 2 for each call
		taskTwo(num / 2)
	}
	return 0
}
