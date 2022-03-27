package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"re-finder.ru/models"
	"time"
)

func main() {
	r := gin.Default()

	models.ConnectionDB()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "https://re-finder.ru"},
		AllowHeaders:     []string{"Origin", "Authorization", "Content-Type"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowCredentials: true,
		MaxAge:           1 * time.Minute,
	}))
}
