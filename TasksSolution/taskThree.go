package main

import "fmt"

func TaskThree(myArr []string) string {
	newArr := make(map[string]int)
	mostRepeated := ""
	maxCount := 0

	for _, v := range myArr {
		newArr[v]++
		if newArr[v] > maxCount {
			maxCount = newArr[v]
			mostRepeated = v
		}
	}
	fmt.Print("Most repeated word is:")
	return mostRepeated
}
