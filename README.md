Для того, чтобы запустить приложение необходимо выполнить следующие действия:
    в консоли терминала ввести команду: npm run + одну из ниже перечисленных команд.

    • "build:backend": "npm run copy:backend" – строит наш бэкенд, копирует в папку Dist.
    • "build:frontend": "webpack" – запускает webpack, который собирает проект из всех папок в одну Dist.
    • "build:prod": "npm run remove:dist && npm run build:frontend && npm run build:backend" – собирает наш проект для продакшен режима.
    • "start:prod": "npm run build:prod && concurrently \"npm run start:prod:frontend\" \"npm run start:prod:backend\"" – стартует (запускает) наш проект для продакшн режима: собирает проект и одновременно стартует http-сервер для фронтенда и с помощью ноды запускает сервер со стороны бэкенда.
    • "start:dev": "concurrently \"npm run start:dev:frontend\" \"npm run start:dev:backend\"" – стартует проект в режиме разработки (позволяет изменять код на фронтенде и бэкенде с автоматической перезагрузкой изменённых частей).