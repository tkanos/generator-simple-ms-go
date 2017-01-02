package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"<%= gopath %>/<%= projectname %>/api"
)

func main() {

	r := mux.NewRouter().StrictSlash(true)

	// Create Api routes
	api.NewRouter(r)

	http.Handle("/", r)

	log.Fatal(http.ListenAndServe(":8080", nil))
}
