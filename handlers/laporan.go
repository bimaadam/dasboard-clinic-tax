package handlers

import (
	"backend-clinic/database"
	"encoding/json"
	"net/http"
)

// Struct Laporan Harian
type Laporan struct {
    ID          uint    `json:"id" gorm:"primaryKey"`
    Tanggal     string  `json:"tanggal"`
    NomorResep  *string `json:"nomor_resep,omitempty"`
    NamaPasien  *string `json:"nama_pasien,omitempty"`
    Dokter      *string `json:"dokter,omitempty"`
    NamaAsisten *string `json:"nama_asisten,omitempty"`
    Jasa        float64 `json:"jasa"`
    Obat        float64 `json:"obat"`
    LainLain    float64 `json:"lain_lain"`
    Tindakan    float64 `json:"tindakan"`
    Lab         float64 `json:"lab"`
    Nebu        float64 `json:"nebu"`
    Total       float64 `json:"total"`
}


// CREATE - Tambah Laporan
func TambahLaporan(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var laporan Laporan
	if err := json.NewDecoder(r.Body).Decode(&laporan); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	// Cek nilai NULL
	// laporan.Jasa = floatOrZero(laporan.Jasa)
	// laporan.Obat = floatOrZero(laporan.Obat)
	// laporan.LainLain = floatOrZero(laporan.LainLain)
	// laporan.Tindakan = floatOrZero(laporan.Tindakan)
	// laporan.Lab = floatOrZero(laporan.Lab)
	// laporan.Nebu = floatOrZero(laporan.Nebu)

	var newID int
	err := database.DB.QueryRow(`
		INSERT INTO laporan_harian (tanggal, nomor_resep, nama_pasien, dokter, nama_asisten, jasa, obat, lain_lain, tindakan, lab, nebu, total) 
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 
		CAST($6 AS NUMERIC) + CAST($7 AS NUMERIC) + CAST($8 AS NUMERIC) + CAST($9 AS NUMERIC) + CAST($10 AS NUMERIC) + CAST($11 AS NUMERIC)) 
		RETURNING id`,
		laporan.Tanggal, laporan.NomorResep, laporan.NamaPasien, laporan.Dokter, laporan.NamaAsisten,
		laporan.Jasa, laporan.Obat, laporan.LainLain, laporan.Tindakan, laporan.Lab, laporan.Nebu).Scan(&newID)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	laporan.ID = uint(newID)
	laporan.Total = laporan.Jasa + laporan.Obat + laporan.LainLain + laporan.Tindakan + laporan.Lab + laporan.Nebu

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(laporan)
}

// Function untuk pastikan nilai float tidak NULL
func floatOrZero(value float64) float64 {
	return value
}

// READ - Lihat Semua Laporan
func GetLaporan(w http.ResponseWriter, r *http.Request) {
	rows, err := database.DB.Query(`
		SELECT id, tanggal, nomor_resep, nama_pasien, dokter, nama_asisten, jasa, obat, lain_lain, tindakan, lab, nebu, total 
		FROM laporan_harian`)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var laporanList []Laporan
	for rows.Next() {
		var laporan Laporan
		if err := rows.Scan(&laporan.ID, &laporan.Tanggal, &laporan.NomorResep, &laporan.NamaPasien, &laporan.Dokter, &laporan.NamaAsisten,
			&laporan.Jasa, &laporan.Obat, &laporan.LainLain, &laporan.Tindakan, &laporan.Lab, &laporan.Nebu, &laporan.Total); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		laporanList = append(laporanList, laporan)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(laporanList)
}

// UPDATE - Update Laporan
func UpdateLaporan(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "Only PUT method allowed", http.StatusMethodNotAllowed)
		return
	}

	var laporan Laporan
	if err := json.NewDecoder(r.Body).Decode(&laporan); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	_, err := database.DB.Exec(`
		UPDATE laporan_harian SET tanggal=$1, nomor_resep=$2, nama_pasien=$3, dokter=$4, nama_asisten=$5, 
		jasa=$6, obat=$7, lain_lain=$8, tindakan=$9, lab=$10, nebu=$11, 
		total=CAST($6 AS NUMERIC) + CAST($7 AS NUMERIC) + CAST($8 AS NUMERIC) + CAST($9 AS NUMERIC) + CAST($10 AS NUMERIC) + CAST($11 AS NUMERIC)
		WHERE id=$12`,
		laporan.Tanggal, laporan.NomorResep, laporan.NamaPasien, laporan.Dokter, laporan.NamaAsisten,
		laporan.Jasa, laporan.Obat, laporan.LainLain, laporan.Tindakan, laporan.Lab, laporan.Nebu, laporan.ID)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "Laporan diperbarui!"})
}

// DELETE - Hapus Laporan
func HapusLaporan(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "Only DELETE method allowed", http.StatusMethodNotAllowed)
		return
	}

	var laporan Laporan
	if err := json.NewDecoder(r.Body).Decode(&laporan); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	_, err := database.DB.Exec("DELETE FROM laporan_harian WHERE id=$1", laporan.ID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "Laporan dihapus!"})
}
