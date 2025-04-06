package handlers

import (
	"backend-clinic/database"
	"backend-clinic/models"
	"encoding/json"
	"net/http"
	"strconv"
)

// GET: Ambil semua data penggajian
func GetPenggajian(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	rows, err := database.DB.Query("SELECT id, nama, jabatan, gaji_pokok, tindakan, periksa, inj, ekg, infus, nebu, total FROM penggajian")
	if err != nil {
		http.Error(w, "Gagal ambil data", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var data []models.Penggajian
	for rows.Next() {
		var p models.Penggajian
		if err := rows.Scan(
			&p.ID, &p.Nama, &p.Jabatan, &p.GajiPokok, &p.Tindakan,
			&p.Periksa, &p.Inj, &p.EKG, &p.Infus, &p.Nebu, &p.Total,
		); err != nil {
			http.Error(w, "Gagal membaca data", http.StatusInternalServerError)
			return
		}
		data = append(data, p)
	}

	json.NewEncoder(w).Encode(data)
}

// POST: Tambah data penggajian
func TambahPenggajian(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var input models.Penggajian
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Input tidak valid", http.StatusBadRequest)
		return
	}

	input.Total = input.GajiPokok + input.Tindakan + input.Periksa + input.Inj + input.EKG + input.Infus + input.Nebu

	query := `
		INSERT INTO penggajian (nama, jabatan, gaji_pokok, tindakan, periksa, inj, ekg, infus, nebu, total)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
	`

	_, err := database.DB.Exec(query,
		input.Nama, input.Jabatan, input.GajiPokok, input.Tindakan, input.Periksa,
		input.Inj, input.EKG, input.Infus, input.Nebu, input.Total,
	)

	if err != nil {
		http.Error(w, "Gagal tambah data", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "Penggajian ditambahkan"})
}

// PUT: Update data penggajian
func UpdatePenggajian(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id := r.URL.Query().Get("id")
	idInt, err := strconv.Atoi(id)
	if err != nil {
		http.Error(w, "ID tidak valid", http.StatusBadRequest)
		return
	}

	var input models.Penggajian
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Input tidak valid", http.StatusBadRequest)
		return
	}

	input.Total = input.GajiPokok + input.Tindakan + input.Periksa + input.Inj + input.EKG + input.Infus + input.Nebu

	query := `
		UPDATE penggajian SET nama=$1, jabatan=$2, gaji_pokok=$3, tindakan=$4, periksa=$5, inj=$6, ekg=$7, infus=$8, nebu=$9, total=$10
		WHERE id=$11
	`

	_, err = database.DB.Exec(query,
		input.Nama, input.Jabatan, input.GajiPokok, input.Tindakan, input.Periksa,
		input.Inj, input.EKG, input.Infus, input.Nebu, input.Total, idInt,
	)

	if err != nil {
		http.Error(w, "Gagal update data", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "Penggajian diperbarui"})
}

// DELETE: Hapus data penggajian
func HapusPenggajian(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id := r.URL.Query().Get("id")
	idInt, err := strconv.Atoi(id)
	if err != nil {
		http.Error(w, "ID tidak valid", http.StatusBadRequest)
		return
	}

	_, err = database.DB.Exec("DELETE FROM penggajian WHERE id=$1", idInt)
	if err != nil {
		http.Error(w, "Gagal hapus data", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "Penggajian dihapus"})
}
