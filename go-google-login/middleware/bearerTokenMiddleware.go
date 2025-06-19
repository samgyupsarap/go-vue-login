package middleware

import (
	"crypto/sha256"
	"go-google-login/controllers"
	"go-google-login/utils"
	"log"
	"net/http"
	"os"
	"strings"
)

type Middleware struct{}

func (mw *Middleware) BearerTokenAuth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var mySigningKey = []byte(os.Getenv("JWT_SECRET_KEY"))
		secretKey := sha256.Sum256([]byte(os.Getenv("JWT_SECRET_KEY")))

		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			log.Println("Authorization header is missing")
			http.Error(w, "Authorization header missing", http.StatusUnauthorized)
			return
		}

		tokenCookie, err := controllers.GetCookieToken(r)
		if err != nil || tokenCookie == "" {
			http.Error(w, "Unauthorized: No token provided", http.StatusUnauthorized)
			return
		}

		log.Println("Authorization header:", authHeader)

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")

		decryptedToken, err := controllers.DecryptToken(tokenString, secretKey[:])
		if err != nil {
			log.Println("Failed to decrypt token:", err)
			http.Error(w, "Failed to decrypt token", http.StatusUnauthorized)
			return
		}

		log.Println("Decrypted token:", decryptedToken)

		_, err = utils.ValidateToken(decryptedToken, mySigningKey)
		if err != nil {
			log.Println("Invalid or expired token:", err)
			http.Error(w, "Invalid or expired token", http.StatusUnauthorized)
			return
		}

		log.Println("Token validated successfully")

		next.ServeHTTP(w, r)
	})
}
