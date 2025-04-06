package models

import "time"

type Penggajian struct {
	ID        int       `gorm:"primaryKey"`
	Nama      string    `json:"nama"`
	Jabatan   string    `json:"jabatan"`
	GajiPokok int       `json:"gaji_pokok"`
	Tindakan  int       `json:"tindakan"`
	Periksa   int       `json:"periksa"`
	Inj       int       `json:"inj"`
	EKG       int       `json:"ekg"`
	Infus     int       `json:"infus"`
	Nebu      int       `json:"nebu"`
	Total     int       `json:"total"`
	CreatedAt time.Time `json:"created_at"`
}

