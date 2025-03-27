package handlers

import (
	"backend-clinic/database"
	"encoding/json"
	"net/http"
)

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

// CREATE - Tambah Laporan
func TambahLaporan(w http.ResponseWriter, r *http.Request) {
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

	_, err = database.DB.Exec("INSERT INTO laporan_harian (tanggal, nomor_resep, nama_pasien, dokter, nama_asisten, total) VALUES ($1, $2, $3, $4, $5, $6)",
		laporan.Tanggal, laporan.NomorResep, laporan.NamaPasien, laporan.Dokter, laporan.Asisten, laporan.Total)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "Laporan ditambahkan!"})
}

// READ - Lihat Semua Laporan
func GetLaporan(w http.ResponseWriter, r *http.Request) {
	rows, err := database.DB.Query("SELECT id, tanggal, nomor_resep, nama_pasien, dokter, nama_asisten, total FROM laporan_harian")
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
func UpdateLaporan(w http.ResponseWriter, r *http.Request) {
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

	_, err = database.DB.Exec("UPDATE laporan_harian SET tanggal=$1, nomor_resep=$2, nama_pasien=$3, dokter=$4, nama_asisten=$5, total=$6 WHERE id=$7",
		laporan.Tanggal, laporan.NomorResep, laporan.NamaPasien, laporan.Dokter, laporan.Asisten, laporan.Total, laporan.ID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "Laporan diperbarui!"})
}

// DELETE - Hapus Laporan
func HapusLaporan(w http.ResponseWriter, r *http.Request) {
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

	_, err = database.DB.Exec("DELETE FROM laporan_harian WHERE id=$1", laporan.ID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "Laporan dihapus!"})
}
