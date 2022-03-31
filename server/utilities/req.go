package utilities

import "github.com/gin-gonic/gin"

// RMessage - Request message
func RMessage(message interface{}) gin.H {
	return gin.H{"message": message}
}
