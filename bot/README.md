# Telegram Bot — Krylaty

Telegram-бот для канала @krylaty_tyt на Node.js + Telegraf.js v4.

---

## Структура проекта

```
bot/
├── index.js                  # Точка входа
├── package.json              # Зависимости
├── .env                      # Переменные окружения (не коммитить!)
├── .env.example              # Пример .env файла
└── src/
    ├── bot.js                # Инициализация и запуск бота
    ├── config/
    │   └── content.js        # ВСЕ ТЕКСТЫ И ССЫЛКИ — редактируй здесь
    ├── commands/
    │   └── start.js          # Команда /start
    ├── handlers/
    │   └── buttons.js        # Обработчики кнопок
    └── utils/
        └── keyboards.js      # Клавиатуры (кнопки)
```

---

## Быстрый старт

### 1. Установка зависимостей

```bash
cd bot
npm install
```

### 2. Настройка .env

```bash
cp .env.example .env
```

Откройте `.env` и укажите:
- `BOT_TOKEN` — токен от @BotFather

### 3. Добавление контента

Откройте `src/config/content.js` и заполните:
- `VIDEO_NOTE_FILE_ID` — file_id вашего видео-кружка
- `videoUrl` в каждом разделе — ссылки на ваши видео
- Тексты описаний в `description` каждого раздела
- Ссылки `links.dm.url` и `links.reviews.url`

### 4. Запуск (разработка)

```bash
npm run dev
```

### 5. Запуск (продакшен)

```bash
npm start
```

---

## Как добавить видео-кружок

1. Откройте `.env` и установите `DEBUG=true`
2. Запустите бота: `npm run dev`
3. Отправьте боту видео-кружок вручную (из Telegram)
4. В логах появится: `[DEBUG] Получен video_note, file_id: DQACAgI...`
5. Скопируйте этот file_id
6. Вставьте в `src/config/content.js`:
   ```js
   VIDEO_NOTE_FILE_ID: 'DQACAgIAAxkBAAI...', // ваш file_id
   ```
7. Установите `DEBUG=false` и перезапустите бота

---

## Деплой

### Railway

1. Создайте аккаунт на [railway.app](https://railway.app)
2. Нажмите **New Project → Deploy from GitHub**
3. Выберите репозиторий
4. В **Variables** добавьте: `BOT_TOKEN=ваш_токен`
5. Railway автоматически запустит `npm start`

### Render

1. Создайте аккаунт на [render.com](https://render.com)
2. Нажмите **New → Web Service**
3. Подключите GitHub репозиторий
4. **Build Command:** `npm install`
5. **Start Command:** `npm start`
6. В **Environment Variables** добавьте `BOT_TOKEN`

### VPS (Ubuntu/Debian)

```bash
# Клонируем репозиторий
git clone https://github.com/YOUR_REPO/bot.git
cd bot

# Устанавливаем зависимости
npm install

# Создаём .env файл
cp .env.example .env
nano .env  # заполняем BOT_TOKEN

# Запускаем через pm2 (автозапуск при перезагрузке сервера)
npm install -g pm2
pm2 start index.js --name "krylaty-bot"
pm2 save
pm2 startup
```

### Webhook (для продакшена с доменом)

В `.env`:
```
BOT_MODE=webhook
WEBHOOK_URL=https://your-domain.com
WEBHOOK_PORT=3000
```

---

## Изменение контента

Весь контент находится в одном файле: **`src/config/content.js`**

| Что менять | Где в файле |
|-----------|------------|
| Видео-кружок | `VIDEO_NOTE_FILE_ID` |
| Текст приветствия | `mainMenu.welcomeText` |
| Текст кнопок | `sections.*.buttonLabel` |
| Заголовки разделов | `sections.*.title` |
| Ссылки на видео | `sections.*.videoUrl` |
| Описания разделов | `sections.*.description` |
| Ссылка "Написать мне" | `links.dm.url` |
| Ссылка "Отзывы" | `links.reviews.url` |

---

## Deep Linking

Бот поддерживает deep links. Пример:

```
https://t.me/YOUR_BOT_USERNAME?start=promo
```

Параметры deep link доступны в `ctx.startPayload` в файле `src/commands/start.js`.

---

## Переменные окружения

| Переменная | Описание | По умолчанию |
|-----------|----------|--------------|
| `BOT_TOKEN` | Токен бота от @BotFather | обязательно |
| `BOT_MODE` | Режим: `polling` или `webhook` | `polling` |
| `WEBHOOK_URL` | URL для webhook (только webhook режим) | — |
| `WEBHOOK_PORT` | Порт для webhook | `3000` |
| `DEBUG` | Логирование деталей | `false` |
