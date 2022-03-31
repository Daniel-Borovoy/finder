package models

import (
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"os"
)

var DB *gorm.DB

func ConnectionDB() {
	if err := godotenv.Load(); err != nil {
		panic("No .env file")
	}

	dsn, exits := os.LookupEnv("POSTGRES_CONNECT")

	if !exits {
		panic("No POSTGRES_CONNECTION env")
	}

	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic(err)
	}

	database.AutoMigrate(&User{}, &Token{}, EmailCheck{})

	DB = database
}
