package main

import (
	"backend-clinic/database"
	"backend-clinic/handlers"
	"fmt"
	"log"
	"net/http"
)

func main() {
	database.ConnectDB()

	// Migrasi
	database.RunMigrations()

	// Routing
	http.HandleFunc("/laporan", handlers.GetLaporan)
	http.HandleFunc("/laporan/tambah", handlers.TambahLaporan)
	http.HandleFunc("/laporan/update", handlers.UpdateLaporan)
	http.HandleFunc("/laporan/hapus", handlers.HapusLaporan)

	// Start Server
	port := ":8080"
	fmt.Println("Server running on port", port)
	log.Fatal(http.ListenAndServe(port, nil))
}
