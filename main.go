package main

import (
	"backend-clinic/database"
	"backend-clinic/handlers"
	"fmt"
	"log"
	"net/http"
)

// Middleware buat handle CORS
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin") // Ambil origin dari request

		// Cek kalau origin ada biar ga error
		if origin != "" {
			w.Header().Set("Access-Control-Allow-Origin", origin) // Izinkan origin yang request
			w.Header().Set("Vary", "Origin") // Biar caching di browser ga masalah
		}

		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		// Handle preflight request
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}


func main() {
	database.ConnectDB()
	database.RunMigrations()

	// Routing pakai ServeMux
	mux := http.NewServeMux()
	mux.HandleFunc("/laporan", handlers.GetLaporan)
	mux.HandleFunc("/laporan/tambah", handlers.TambahLaporan)
	mux.HandleFunc("/laporan/update", handlers.UpdateLaporan)
	mux.HandleFunc("/laporan/hapus", handlers.HapusLaporan)
// Penggajian routing
	mux.HandleFunc("/penggajian", handlers.GetPenggajian)
mux.HandleFunc("/penggajian/tambah", handlers.TambahPenggajian)
mux.HandleFunc("/penggajian/update", handlers.UpdatePenggajian)
mux.HandleFunc("/penggajian/hapus", handlers.HapusPenggajian)


	// Start Server dengan middleware CORS
	port := ":8080"
	fmt.Println("Server running on port", port)
	log.Fatal(http.ListenAndServe(port, corsMiddleware(mux)))
}

