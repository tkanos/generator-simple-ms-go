package api

import (
	"net/http"

	"github.com/gorilla/mux"
	"<%= gopath %>/<%= projectname %>/api/<%= methodname %>"
)

func NewRouter(mainRouter *mux.Router) http.Handler {
	apiRouter := mainRouter.PathPrefix("/api").Subrouter().StrictSlash(true)

	//Create User Routes
	search.NewRouter(apiRouter)

	return apiRouter
}
