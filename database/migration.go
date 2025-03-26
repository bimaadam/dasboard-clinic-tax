package database

import (
	"log"
)

// RunMigrations untuk membuat tabel di PostgreSQL (Neon)
func RunMigrations() {
	query := `
    CREATE TABLE IF NOT EXISTS laporan_harian (
        id SERIAL PRIMARY KEY,
        tanggal DATE NOT NULL,
        nomor_resep VARCHAR(50) NOT NULL,
        nama_pasien VARCHAR(100) NOT NULL, -- Tambahin kolom ini
        dokter VARCHAR(100) NOT NULL,
        keterangan TEXT,
        jasa NUMERIC(15,2) NOT NULL DEFAULT 0,
        obat NUMERIC(15,2) NOT NULL DEFAULT 0,
        lain_lain NUMERIC(15,2) NOT NULL DEFAULT 0,
        tindakan NUMERIC(15,2) NOT NULL DEFAULT 0,
        lab NUMERIC(15,2) NOT NULL DEFAULT 0,
        nebu NUMERIC(15,2) NOT NULL DEFAULT 0,
        adm_2000 NUMERIC(15,2) NOT NULL DEFAULT 0,
        adm_3000 NUMERIC(15,2) NOT NULL DEFAULT 0,
        jumlah NUMERIC(15,2) NOT NULL DEFAULT 0,
        total NUMERIC(15,2) NOT NULL DEFAULT 0,
        nama_asisten VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `
	_, err := DB.Exec(query)
	if err != nil {
		log.Fatal("Error running migration:", err)
	}

	log.Println("Database migrated successfully!")
}
