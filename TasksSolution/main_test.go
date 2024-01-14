package main

import (
	"bytes"
	"io"
	"os"
	"reflect"
	"testing"
)

func TestTaskOne(t *testing.T) {
	input := []string{"aaaasd", "a", "aab", "aaabcd", "ef", "cssssssd", "fdz", "kf", "zc", "lklklklklklklklkl", "l"}
	expectedOutput := []string{"aaaasd", "aaabcd", "aab", "a", "lklklklklklklklkl", "cssssssd", "fdz", "ef", "kf", "zc", "l"}
	result := taskOne(input)
	if !reflect.DeepEqual(result, expectedOutput) {
		t.Errorf("Test failed. Expected %v, got %v", expectedOutput, result)
	}
}

func TestTaskTwo(t *testing.T) {
	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w

	input := 9
	expectedOutput := "9\n4\n2\n"

	taskTwo(input)

	w.Close()
	var buf bytes.Buffer
	io.Copy(&buf, r)

	os.Stdout = old

	if buf.String() != expectedOutput {
		t.Errorf("Test failed. Expected %q, got %q", expectedOutput, buf.String())
	}
}

func TestTaskThree(t *testing.T) {
	input := []string{"apple", "pie", "apple", "red", "red", "red"}
	expectedOutput := "red"

	result := TaskThree(input)
	if result != expectedOutput {
		t.Errorf("Test failed. Expected %q, got %q", expectedOutput, result)
	}
}
