package main

// Imported Necessary Packages
import (
	"sort"
	"strings"
)

// Defined my function with an array of strings as a parameter and a return type
func taskOne(myArr []string) []string {
	// Sorted the array using the sort.Slice function
	sort.Slice(myArr, func(i, j int) bool {
		// Used the strings.Count function to count the number of "a" in each string and compared them to sort the array
		if strings.Count(myArr[i], "a") > strings.Count(myArr[j], "a") {
			return true
		} else if strings.Count(myArr[i], "a") < strings.Count(myArr[j], "a") {
			return false
		}
		// If the number of "a" is equal in both strings or doesn't exist in a string then the length of the strings is compared to sort the array
		return len(myArr[i]) > len(myArr[j])
	})
	return myArr
}
