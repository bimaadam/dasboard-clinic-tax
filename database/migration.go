package database

import (
	"fmt"
)

func RunMigrations() {
	query := `
	CREATE TABLE IF NOT EXISTS laporan_harian (
		id SERIAL PRIMARY KEY,
		tanggal DATE NOT NULL,
		nomor_resep VARCHAR(50) NOT NULL,
		nama_pasien VARCHAR(100) NOT NULL,
		dokter VARCHAR(100) NOT NULL,
		nama_asisten VARCHAR(100) NOT NULL,
		total DECIMAL(10,2) NOT NULL
	);
	`
	_, err := DB.Exec(query)
	if err != nil {
		fmt.Println("Error running migrations:", err)
		return
	}
	fmt.Println("Migrations completed!")
}
