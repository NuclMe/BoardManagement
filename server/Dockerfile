# Указываем базовый образ для Node.js
FROM node:18

# Рабочая директория
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта
COPY . .

# Открываем порт
EXPOSE 5000

# Запуск приложения
CMD ["npm", "run", "dev"]
