package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"re-finder.ru/models"
	"re-finder.ru/services"
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

	v1 := r.Group("/api/v1")
	{
		v1.POST("/register", services.Register)
		v1.POST("/login", services.Login)
		v1.POST("/logout", services.Logout)
		v1.POST("/refresh", services.Refresh)
		v1.GET("/activation/:uuid", services.Activation)
	}

	r.Run()
}
