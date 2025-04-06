package database

import (
	"fmt"
)

func RunMigrations() {
	queryLaporan := `
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

	queryPenggajian := `
	CREATE TABLE IF NOT EXISTS penggajian (
	id SERIAL PRIMARY KEY,
	nama VARCHAR(100) NOT NULL,
	jabatan VARCHAR(100) NOT NULL,
	gaji_pokok INTEGER DEFAULT 0,
	tindakan INTEGER DEFAULT 0,
	periksa INTEGER DEFAULT 0,
	inj INTEGER DEFAULT 0,
	ekg INTEGER DEFAULT 0,
	infus INTEGER DEFAULT 0,
	nebu INTEGER DEFAULT 0,
	total INTEGER DEFAULT 0,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

	`

	_, err1 := DB.Exec(queryLaporan)
	_, err2 := DB.Exec(queryPenggajian)

	if err1 != nil || err2 != nil {
		fmt.Println("Error running migrations:")
		if err1 != nil {
			fmt.Println("- Laporan Harian:", err1)
		}
		if err2 != nil {
			fmt.Println("- Penggajian:", err2)
		}
		return
	}

	fmt.Println("All migrations completed!")
}
