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
		origin := r.Header.Get("Origin")

		if origin != "" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Vary", "Origin")
		}

		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

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

	mux := http.NewServeMux()

	// Endpoint root
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	fmt.Fprint(w, `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>API Bima Adam</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #e0e0e0, #ffffff);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      color: #333;
      padding: 2rem;
    }
    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.2rem;
      max-width: 600px;
      text-align: center;
      line-height: 1.6;
    }
    .badge {
      margin-top: 1.5rem;
      background: #222;
      color: #fff;
      padding: 0.4rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      opacity: 0.8;
    }
    .footer {
      position: absolute;
      bottom: 20px;
      font-size: 0.9rem;
      opacity: 0.6;
    }
  </style>
</head>
<body>
  <h1>API Klinik — Bima Adam</h1>
  <p>Selamat datang di endpoint backend resmi Klinik Setia Medika.  
    API ini digunakan untuk mengelola laporan harian dan penggajian klinik secara realtime dan efisien.  
    Dibangun dengan ❤️ oleh Bima Adam menggunakan Go & PostgreSQL.
  </p>
  <div class="badge">Made with Golang 💻</div>
  <div class="footer">© 2025 BimaAdamrin.my.id</div>
</body>
</html>`)
})

	// Routing laporan
	mux.HandleFunc("/laporan", handlers.GetLaporan)
	mux.HandleFunc("/laporan/tambah", handlers.TambahLaporan)
	mux.HandleFunc("/laporan/update", handlers.UpdateLaporan)
	mux.HandleFunc("/laporan/hapus", handlers.HapusLaporan)

	// Routing penggajian
	mux.HandleFunc("/penggajian", handlers.GetPenggajian)
	mux.HandleFunc("/penggajian/tambah", handlers.TambahPenggajian)
	mux.HandleFunc("/penggajian/update", handlers.UpdatePenggajian)
	mux.HandleFunc("/penggajian/hapus", handlers.HapusPenggajian)

	// Start server
	port := ":8080"
	fmt.Println("Server running on port", port)
	log.Fatal(http.ListenAndServe(port, corsMiddleware(mux)))
}
