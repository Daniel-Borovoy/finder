package services

import (
	"crypto/tls"
	"fmt"
	"github.com/gin-gonic/gin"
	"gopkg.in/gomail.v2"
	"net/http"
	"os"
	"re-finder.ru/models"
	"re-finder.ru/utilities"
)

func SendEmailUUID(email string, UUID string) {
	m := gomail.NewMessage()

	m.SetHeader("From", "ddos.guard.web.app@gmail.com")

	m.SetHeader("To", email)

	m.SetHeader("Subject", "Подтверждение электронной почты DDoS Guard Web App")

	m.SetBody("text/plain", "http://"+os.Getenv("EMAIL_HTTP")+"/api/v1/activation/"+UUID)

	d := gomail.NewDialer("smtp.gmail.com", 587, os.Getenv("EMAIL_LOGIN"), os.Getenv("EMAIL_PASSWORD"))

	// This is only needed when SSL/TLS certificate is not valid on server.
	// In production this should be set to false.
	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	if err := d.DialAndSend(m); err != nil {
		fmt.Println(err)
	}

	return
}

func Activation(c *gin.Context) {
	emailCheck := models.EmailCheck{}
	if err := models.DB.Where("uuid=?", c.Param("uuid")).First(&emailCheck).Error; err != nil {
		c.JSON(http.StatusBadRequest, utilities.RMessage("Подтверждение не существует или недействительно!"))
		return
	}

	user := models.User{}
	userUpdate := models.User{EmailCheck: true}

	if err := models.DB.Where("id=?", emailCheck.ID).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, utilities.RMessage("Аккаунт не найден!"))
		models.DB.Delete(&emailCheck)
		return
	}

	models.DB.Model(&user).Updates(userUpdate)
	models.DB.Delete(&emailCheck)

	c.JSON(http.StatusOK, utilities.RMessage("Аккаунт успешно активирован!"))
}
