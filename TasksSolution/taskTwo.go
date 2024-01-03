package main

import "fmt"

func taskTwo(num int) int {
	if num > 1 {
		fmt.Println(num)
		taskTwo(num / 2)
	}
	return 0
}
