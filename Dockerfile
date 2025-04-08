# Gunain image Go resmi
FROM golang:1.24

WORKDIR /app

# Copy semua file
COPY . .

# Download deps (pastikan lu pake go mod ya)
RUN go mod tidy

# Build app lu
RUN go build -o main .

# Port yang dibuka (sesuaikan ama di backend lu)
EXPOSE 8080

CMD ["./main"]
