package <%= methodname %>

import (
	"net/http"

	"github.com/gorilla/mux"
)

func NewRouter(mainRouter *mux.Router) http.Handler {
	<%= methodname %>Router := mainRouter.PathPrefix("/<%= methodname %>").Subrouter().StrictSlash(true)

	<%= methodname %>Router.Path("/").Methods("GET").HandlerFunc(GetAll)
	<%= methodname %>Router.Path("/{id:[0-9]+}").Methods("GET").HandlerFunc(GetbyId)

	return <%= methodname %>Router
}
