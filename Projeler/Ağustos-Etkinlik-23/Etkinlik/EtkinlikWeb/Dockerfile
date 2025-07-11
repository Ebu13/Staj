# Temel imaj olarak Node.js kullan
FROM node:18

# Çalışma dizini oluştur
WORKDIR /app

# Paketleri yükle
COPY package.json package-lock.json ./
RUN npm install

# Proje dosyalarını kopyala
COPY . .

# Projeyi derle
RUN npm run build

# Container'ın dinleyeceği port
EXPOSE 5173

# Uygulamayı başlat
CMD ["npm", "run", "preview", "--", "--port", "5173"]
