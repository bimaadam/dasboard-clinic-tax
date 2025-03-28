package database

import (
	"fmt"
)

func RunMigrations() {
	query := `
	CREATE TABLE IF NOT EXISTS laporan_harian (
	    id SERIAL PRIMARY KEY,
	    tanggal DATE NOT NULL,
	    nomor_resep VARCHAR(50),
	    nama_pasien VARCHAR(100),
	    dokter VARCHAR(100),
	    nama_asisten VARCHAR(100),
	    jasa DECIMAL(10,2) DEFAULT 0,
	    obat DECIMAL(10,2) DEFAULT 0,
	    lain_lain DECIMAL(10,2) DEFAULT 0,
	    tindakan DECIMAL(10,2) DEFAULT 0,
	    lab DECIMAL(10,2) DEFAULT 0,
	    nebu DECIMAL(10,2) DEFAULT 0,
		total DECIMAL(10,2) DEFAULT 0
	);
	`
	_, err := DB.Exec(query)
	if err != nil {
		fmt.Println("Error running migrations:", err)
		return
	}
	fmt.Println("Migrations completed!")
}
