package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var DB *sql.DB

// ConnectDB untuk koneksi ke PostgreSQL Neon
func ConnectDB() {
	// Load .env
	err := godotenv.Load()
	if err != nil {
		log.Println("Warning: No .env file found")
	}

	// Ambil connection string dari .env
	dbURL := os.Getenv("DB_URL")
	if dbURL == "" {
		log.Fatal("DB_URL is not set in .env file")
	}

	// Koneksi ke PostgreSQL
	DB, err = sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatal("Error connecting to database:", err)
	}

	// Cek koneksi
	err = DB.Ping()
	if err != nil {
		log.Fatal("Database unreachable:", err)
	}

	fmt.Println("Connected to PostgreSQL (Neon) successfully!")
}
