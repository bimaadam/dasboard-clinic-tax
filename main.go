package main

import (
	"backend-clinic/database"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

var db *sql.DB

// Struct Laporan harian
type Laporan struct {
	ID         int     `json:"id"`
	Tanggal    string  `json:"tanggal"`
	NomorResep string  `json:"nomor_resep"`
	NamaPasien string  `json:"nama_pasien"`
	Dokter     string  `json:"dokter"`
	Asisten    string  `json:"asisten"`
	Total      float64 `json:"total"`
}

func connectDB() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Warning: No .env file found")
	}

	dbURL := os.Getenv("DB_URL")
	if dbURL == "" {
		log.Fatal("DB_URL is not set in .env file")
	}

	db, err = sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatal("Error connecting to database:", err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatal("Database unreachable:", err)
	}

	fmt.Println("Connected to PostgreSQL (Neon)!")
}

// CREATE - Tambah Laporan
func tambahLaporan(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Only POST method allowed", http.StatusMethodNotAllowed)
		return
	}

	var laporan Laporan
	err := json.NewDecoder(r.Body).Decode(&laporan)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	_, err = db.Exec("INSERT INTO laporan_harian (tanggal, nomor_resep, nama_pasien, dokter, nama_asisten, total) VALUES (?, ?, ?, ?, ?, ?)",
		laporan.Tanggal, laporan.NomorResep, laporan.NamaPasien, laporan.Dokter, laporan.Asisten, laporan.Total)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "Laporan ditambahkan!"})
}

// READ - Lihat Semua Laporan
func getLaporan(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("SELECT id, tanggal, nomor_resep, nama_pasien, dokter, nama_asisten, total FROM laporan_harian")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var laporanList []Laporan
	for rows.Next() {
		var laporan Laporan
		if err := rows.Scan(&laporan.ID, &laporan.Tanggal, &laporan.NomorResep, &laporan.NamaPasien, &laporan.Dokter, &laporan.Asisten, &laporan.Total); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		laporanList = append(laporanList, laporan)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(laporanList)
}

// UPDATE - Update Laporan
func updateLaporan(w http.ResponseWriter, r *http.Request) {
	if r.Method != "PUT" {
		http.Error(w, "Only PUT method allowed", http.StatusMethodNotAllowed)
		return
	}

	var laporan Laporan
	err := json.NewDecoder(r.Body).Decode(&laporan)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	_, err = db.Exec("UPDATE laporan_harian SET tanggal=?, nomor_resep=?, nama_pasien=?, dokter=?, nama_asisten=?, total=? WHERE id=?",
		laporan.Tanggal, laporan.NomorResep, laporan.NamaPasien, laporan.Dokter, laporan.Asisten, laporan.Total, laporan.ID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "Laporan diperbarui!"})
}

// DELETE - Hapus Laporan
func hapusLaporan(w http.ResponseWriter, r *http.Request) {
	if r.Method != "DELETE" {
		http.Error(w, "Only DELETE method allowed", http.StatusMethodNotAllowed)
		return
	}

	var laporan Laporan
	err := json.NewDecoder(r.Body).Decode(&laporan)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	_, err = db.Exec("DELETE FROM laporan_harian WHERE id=?", laporan.ID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "Laporan dihapus!"})
}

func main() {
	// Load .env
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: No .env file found")
	}

	// Connect ke Database
	connectDB()

	// Jalankan Migrasi
	database.ConnectDB()
	database.RunMigrations()

	// Setup Routing
	http.HandleFunc("/laporan", getLaporan)
	http.HandleFunc("/laporan/tambah", tambahLaporan)
	http.HandleFunc("/laporan/update", updateLaporan)
	http.HandleFunc("/laporan/hapus", hapusLaporan)

	// Start Server
	port := ":8080"
	fmt.Println("Server running on port", port)
	log.Fatal(http.ListenAndServe(port, nil))
}
