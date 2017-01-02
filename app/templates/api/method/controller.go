package <%= methodname %>

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func GetById(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	var id int
	var err error
	if id, err = strconv.Atoi(vars["id"]); err != nil {
		panic(err)
	}

	<%= methodname %>_model := <%= methodname %>Model{Id: id, Name: "HelloWorld"}

	json.NewEncoder(w).Encode(<%= methodname %>_model)
}

func GetAll(w http.ResponseWriter, r *http.Request) {

	<%= methodname %>_models := []<%= methodname %>Model{
		{Id: 1, Name: "Mike"},
		{Id: 2, Name: "Nadir"},
	}

	json.NewEncoder(w).Encode(<%= methodname %>_models)

}
