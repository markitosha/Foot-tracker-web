# Документация

## О проекте

Цель создания интерфейса: Разрабатываемый интерфейс для полуавтоматической разметки футбольных матчей является одним из
этапов в процессе расчёта ряда спортивных показателей у футболистов: «Пробег», «Средняя скорость», «Количество
ускорений», «Максимальное ускорение». С помощью данного интерфейса человек будет корректировать результаты работы
алгоритмов машинного обучения, т.к. не во всех ситуациях алгоритм способен однозначно и правильно интерпретировать
полученное изображение.

**Ссылка на деплой:** https://foot-tracker-web.vercel.app/

## Локальная сборка и запуск

Чтобы собрать и запустить проект локально, выполните следующие шаги:

1. **Клонируйте репозиторий:**
    ```bash
    git clone https://github.com/markitosha/Foot-tracker-web.git
    cd Foot-tracker-web
    ```

2. **Установите зависимости:**
    ```bash
    yarn install
    ```

3. **Соберите проект:**
    ```bash
    yarn build
    ```

4. **Запустите проект:**
    ```bash
    yarn start
    ```

## Как запустить проект для разработки

Чтобы запустить проект для разработки, выполните следующие шаги:

1. **Клонируйте репозиторий:**
    ```bash
    git clone https://github.com/markitosha/Foot-tracker-web.git
    cd Foot-tracker-web
    ```

2. **Установите зависимости:**
    ```bash
    yarn install
    ```

3. **Запустите сервер разработки:**
    ```bash
    yarn dev
    ```

## Архитектура

Проект структурирован следующим образом:

- **`src/`**: Содержит исходный код приложения.
    - **`components/`**: Содержит React-компоненты.
    - **`contexts/`**: Содержит провайдеры данных.
    - **`utils/`**: Содержит утилиты.
- **`tailwind.config.js`**: Конфигурационный файл для Tailwind CSS.
- **`index.html`**: Основной HTML-файл для приложения.

### Источники данных

Проект использует три контекста:

1. **`VideoContext`**: Загруженный URL видео и референс на видеоэлемент.
2. **`JsonContext`**: Загруженный JSON-файл. Также содержит историю изменений JSON.
3. **`TracksContext`**: Содержит производные данные из JSON-файла, такие как основной трек (список координат), список
   кандидатов, трек кандидата и т.д.

### Костыль с видео и canvas

Компонент `Video.tsx` включает костыль для управления видеоэлементом под элементом холста. Это делается путем ручного
добавления элемента canvas после видеоэлемента, чтобы можно было переиспользовать плеер, используемой
в предыдущей версии проекта. Иначе была бы необходимость переписывать весь плеер. Все элементы управления
должны находиться НАД canvas, а canvas должен быть НАД видео.

```typescript
// Пример хака в Video.tsx
if (canvasRef.current) {
    videoRef.current?.after(canvasRef.current);
    updateCanvas();
}
```

**Рекомендация:** Реализуйте собственный видеоплеер для правильной интеграции с элементом холста без использования
костылей. Это улучшит качество кода и поддерживаемость проекта.