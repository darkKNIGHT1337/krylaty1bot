# PRD: Telegram Bot — KRYLATY (@krylaty1bot)

## Описание проекта
Telegram-бот для трейдингового канала на Node.js + Telegraf.js v4.

## Архитектура
- **Язык:** Node.js v20
- **Фреймворк:** Telegraf.js v4.16.3
- **Режим:** Long Polling (polling) / Webhook (production)
- **Путь проекта:** `/app/bot/`

## Структура файлов
```
/app/bot/
├── index.js                  # Точка входа
├── package.json              # Зависимости
├── .env                      # Переменные окружения
├── .env.example              # Пример .env
├── .gitignore
├── README.md                 # Инструкция по деплою
└── src/
    ├── bot.js                # Инициализация бота
    ├── config/
    │   └── content.js        # ВСЕ ТЕКСТЫ И ССЫЛКИ
    ├── commands/
    │   └── start.js          # /start команда
    ├── handlers/
    │   └── buttons.js        # Обработчики кнопок
    └── utils/
        └── keyboards.js      # Клавиатуры
```

## Что реализовано (2025-02-xx)
- [x] /start — отправка видео-кружка (placeholder) + главное меню
- [x] 4 раздела с inline-кнопками: Про приват, Копитрейдинг, Бесплатный видеоурок, Наш инструмент
- [x] Каждый раздел: заголовок, описание, ссылка на видео, кнопка "← Назад"
- [x] Нижние кнопки: "Написать мне" + "Отзывы" (всегда в главном меню)
- [x] Поддержка deep linking (ctx.startPayload)
- [x] Центральный content.js для управления контентом
- [x] Polling и Webhook режимы
- [x] Обработка ошибок и логирование
- [x] README.md с инструкциями по деплою (Railway, Render, VPS)
- [x] .gitignore, .env.example

## Бот в Telegram
- **Имя:** KRYLATY
- **Username:** @krylaty1bot
- **ID:** 8268244907

## Бэклог
- [ ] Вставить реальный file_id видео-кружка
- [ ] Вставить реальные ссылки на видео для 4 разделов
- [ ] Вставить username канала отзывов
- [ ] Добавить статистику (количество /start)
- [ ] Добавить admin panel для управления контентом через бота
