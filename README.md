# react-wetherr
Тюлькиев Ален SCA-24B

React Weather App
Современное погодное приложение с автоматической сменой темы в зависимости от времени в выбранном городе.

Скриншоты
Дневная тема	Ночная тема

Особенности
Поиск города — мгновенное получение погоды для любого города мира

Текущая погода — температура, описание, иконка, min/max

Почасовой прогноз — следующие 8 часов с температурой

Прогноз на неделю — 5 дней с визуальными полосами температуры

Умная тема — автоматически переключается между дневной и ночной в зависимости от местного времени в городе

Адаптивный дизайн — отлично выглядит на всех устройствах

Стеклянные карточки — современный дизайн с blur-эффектом

Звёздное небо — анимированные звёзды в ночном режиме

Демо
Репозиторий: github.com/qw1se/react-wether-

Технологии
Frontend: React 18 (функциональные компоненты + хуки)

Сборка: Vite

Стили: CSS3 (Flexbox, градиенты, backdrop-filter)

API: OpenWeatherMap (текущая погода + прогноз)

Деплой: GitHub Pages (опционально)

Контроль версий: Git + GitHub

Установка и запуск
bash
git clone https://github.com/qw1se/react-wether-.git
cd react-wether-
npm install
npm run dev
Приложение будет доступно по адресу http://localhost:5173

Структура проекта
text
react-wether-/
├── public/
│   └── cloud.svg
├── src/
│   ├── components/
│   │   ├── HourlyForecast.jsx
│   │   ├── MainInfo.jsx
│   │   ├── SearchBox.jsx
│   │   └── WeekForecast.jsx
│   ├── services/
│   │   └── weatherApi.js
│   ├── App.css
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
Настройка API
Приложение использует OpenWeatherMap API. Ключ уже встроен в код:

text
5d44c8cb9a9e2d710e993a8839e93d21
Для замены ключа отредактируйте файл src/services/weatherApi.js:

javascript
const API_KEY = "ваш_новый_ключ";
Адаптивность
Мобильные устройства — вертикальная компоновка

Планшеты — оптимизированные отступы

Десктопы — максимальная ширина 400px для удобства чтения

Автор
Тюлькиев Ален
Группа: SCA-24B
GitHub: qw1se
