package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Global variable to hold the MongoDB client.
var client *mongo.Client

// Initialization function that is executed once when the program starts.
func init() {
	// Set up the MongoDB client
	clientOptions := options.Client().ApplyURI("mongodb+srv://AmdjdBelgacem:67x7BP23GsAtYbS9@user-management-cluster.pmkcszj.mongodb.net/?retryWrites=true&w=majority")
	var err error
	client, err = mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		fmt.Println(err)
		return
	}

	// Check the connection
	err = client.Ping(context.Background(), nil)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("Connected to MongoDB")

	// Automatically create an index for the "username" field
	indexOptions := options.Index().SetUnique(true)
	usernameIndex := mongo.IndexModel{
		Keys:    bson.M{"username": 1},
		Options: indexOptions,
	}
	userCollection := client.Database("user-management-cluster").Collection("users")
	_, err = userCollection.Indexes().CreateOne(context.Background(), usernameIndex)
	if err != nil {
		fmt.Println(err)
		return
	}
}

// Handler function to retrieve all users from the database.
func GetAllUsers(w http.ResponseWriter, r *http.Request) {
	userCollection := client.Database("user-management-cluster").Collection("users")
	cursor, err := userCollection.Find(context.Background(), bson.M{})
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Println(err)
		return
	}
	defer cursor.Close(context.Background())

	var users []User
	err = cursor.All(context.Background(), &users)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Println(err)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(users)
}

// Handler function to retrieve a user by ID from the database.
func GetUserByID(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(err)
		return
	}

	userCollection := client.Database("user-management-cluster").Collection("users")
	var user User
	err = userCollection.FindOne(context.Background(), bson.M{"_id": id}).Decode(&user)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		fmt.Println(err)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}

// Handler function to create a new user in the database.
func CreateUser(w http.ResponseWriter, r *http.Request) {
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(err)
		return
	}

	userCollection := client.Database("user-management-cluster").Collection("users")
	_, err = userCollection.InsertOne(context.Background(), user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Println(err)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(user)
}

// Handler function to update a user in the database by ID.
func UpdateUser(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(err)
		return
	}

	var updatedUser User
	err = json.NewDecoder(r.Body).Decode(&updatedUser)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(err)
		return
	}

	userCollection := client.Database("user-management-cluster").Collection("users")
	result, err := userCollection.UpdateOne(context.Background(), bson.M{"_id": id}, bson.M{"$set": updatedUser})
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Println(err)
		return
	}

	if result.ModifiedCount == 0 {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(updatedUser)
}

// Handler function to delete a user from the database by ID.
func DeleteUser(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(err)
		return
	}

	userCollection := client.Database("user-management-cluster").Collection("users")
	result, err := userCollection.DeleteOne(context.Background(), bson.M{"_id": id})
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Println(err)
		return
	}

	if result.DeletedCount == 0 {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
