package services

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
	"re-finder.ru/models"
	"re-finder.ru/utilities"
	"time"
)

func CreateToken(user models.User) string {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userid": user.ID,
		"email":  user.Email,
		"exp":    time.Now().Add(time.Minute * 5).Unix(),
	})

	jwtToken, _ := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	return jwtToken
}

func CreateTokenRefresh() string {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"exp": time.Now().Add(time.Hour * 7200).Unix(),
	})

	jwtToken, _ := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	return jwtToken
}

func CheckToken(token string) bool {
	type MyCustomClaims struct {
		ID    uint   `json:"userid"`
		Email string `json:"email"`
		jwt.StandardClaims
	}

	tokenParse, _ := jwt.ParseWithClaims(token, &MyCustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if _, ok := tokenParse.Claims.(*MyCustomClaims); ok && tokenParse.Valid {
		return true
	}
	return false
}

func Refresh(c *gin.Context) {
	tokenRefresh, err := c.Cookie("refresh_token")
	if err != nil {
		c.JSON(http.StatusConflict, utilities.RMessage("Рефреш токен не найден"))
		return
	}

	token := models.Token{}

	if err := models.DB.Where("refresh=?", tokenRefresh).First(&token).Error; err == nil && CheckToken(tokenRefresh) {
		user := models.User{}

		models.DB.Where("id=?", token.ID).First(&user)

		newToken := CreateToken(user)
		//хардкод - наше всё!
		newTokenStruct := models.Token{Access: newToken}

		models.DB.Model(&token).Updates(newTokenStruct)
		c.JSON(http.StatusOK, gin.H{"access": newToken})
		return
	} else if !CheckToken(tokenRefresh) {
		models.DB.Delete(&token)
	}

	c.SetCookie("refresh_token", "", -1, "/", "", false, true)
	c.JSON(http.StatusConflict, utilities.RMessage("Рефреш токен не валидный"))
}
