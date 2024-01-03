package main

import (
	"fmt"
	"sort"
	"strings"
)

func taskOne(myArr []string) []string {
	sort.Slice(myArr, func(i, j int) bool {
		if strings.Count(myArr[i], "a") > strings.Count(myArr[j], "a") {
			return true
		} else if strings.Count(myArr[i], "a") < strings.Count(myArr[j], "a") {
			return false
		}
		return len(myArr[i]) > len(myArr[j])
	})
	fmt.Print("Sorted Array:")
	return myArr
}
