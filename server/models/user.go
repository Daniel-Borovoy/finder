package models

type User struct {
	ID         uint32 `json:"id" gorm:"primary_key"`
	Email      string `json:"email"`
	Password   string `json:"password"`
	FirstName  string `json:"first_name"`
	LastName   string `json:"last_name"`
	EmailCheck bool   `json:"email_check"`
}
