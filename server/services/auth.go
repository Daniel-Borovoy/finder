package services

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"net/http"
	"os"
	"re-finder.ru/models"
	"re-finder.ru/utilities"
)

func Register(c *gin.Context) {
	var input models.UserRegisterData

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, utilities.RMessage(err))
		return
	}

	var userCheck models.User

	if err := models.DB.Where("email=?", input.Email).First(&userCheck).Error; err == nil {
		c.JSON(http.StatusConflict, utilities.RMessage("Электронная почта уже занята"))
		return
	}

	user := models.User{Email: input.Email, Password: input.Password, FirstName: input.FirstName, LastName: input.LastName, EmailCheck: false}
	models.DB.Create(&user)

	emailCheck := models.EmailCheck{ID: user.ID, UUID: uuid.New().String()}
	models.DB.Create(&emailCheck)

	SendEmailUUID(user.Email, emailCheck.UUID)

	c.JSON(http.StatusOK, utilities.RMessage("Мы отправили письмо с подтверждением на вашу электронную почту. Вы сможете зайти на аккант только после подтверждения."))
}

func Login(c *gin.Context) {
	var input models.UserLoginData

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, utilities.RMessage(err))
		return
	}

	var user models.User

	if err := models.DB.Where("email=?", input.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, utilities.RMessage("Пользователь не найден!"))
		return
	}

	if user.Password != input.Password {
		c.JSON(http.StatusForbidden, utilities.RMessage("Неверный пароль!"))
		return
	}

	if !user.EmailCheck {
		c.JSON(http.StatusForbidden, utilities.RMessage("Подтвердите адрес электронной почты!"))
		return
	}

	token := models.Token{}
	tokens := models.Token{ID: user.ID, Access: CreateToken(user), Refresh: CreateTokenRefresh()}

	if err := models.DB.Where("id=?", user.ID).First(&token).Error; err != nil {
		models.DB.Create(&tokens)
		c.SetCookie("refresh_token", tokens.Refresh, 60*60*24*30, "/", os.Getenv("cookie_http"), false, true) // if https: secure = true
		c.JSON(http.StatusOK, gin.H{"access": tokens.Access})
		return
	}

	models.DB.Model(&token).Updates(tokens)
	c.SetCookie("refresh_token", tokens.Refresh, 60*60*24*30, "/", os.Getenv("cookie_http"), false, true) // if https: secure = true
	c.JSON(http.StatusOK, gin.H{"access": tokens.Access})
}

func Logout(c *gin.Context) {

	token := models.Token{}

	refreshToken, err := c.Cookie("refresh_token")

	if err != nil {
		c.JSON(http.StatusBadRequest, utilities.RMessage(err))
		return
	}

	if err := models.DB.Where("refresh=?", refreshToken).First(&token).Error; err == nil {
		models.DB.Delete(&token)
	}

	c.SetCookie("refresh_token", "", -1, "/", "", false, true)
	c.JSON(http.StatusOK, utilities.RMessage("Вы успешно вышли из системы"))
}
