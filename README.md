# Стартовая сборка

## В сборке реализовано

* возможность импортировать js файли с помошью es6 синтаксиса (@import)
* Разделение задач на dev prod (в режиме dev лишние задачи не выполняются)
* конвертация изображений в webp, сжатие jpg и png
* конвертация шрифтов, положеных в src/fonts в woff и woff2 форматы из ttf и otf
* генерация стилей для подулючения данных шрифтов в файл fonts.scss
* Сборка html из фрагментов, расположенных в папке html
* autoprefixer и brousersync
* deploy по ftp (При тестирвании с моим сервером не заработал. Нуждается в доработке)

Остальные возможности понятны по папке tasks

## Команды для запуска проекта
Запуск в режиме разработки
```
npm run dev
```
Запуск сборки production версии
```
npm run build
```
Упаковать результат в архив
```
npm run zip
```

Для удобной работи с изображениями доустанавливаю в vscode плагин Path Autocomplete
После установки в редакторе перехожу в файл настроек редактора settings.json (cmd shift p и поиск по фразе settings.json) и в конец файла добавляю следующие настройки

```
 "path-autocomplete.pathMappings": {
        "@img": "${folder}/src/img", // alias for images
        "@scss": "${folder}/src/scss", // alias for scss
        "@js": "${folder}/src/js", // alias for js
    },
```

Это позволит в html, js и scss файлах писать @img/, @js/ и получать корректный autocompleat в нужную папку с файлами js и img. Пути в сниппете выше можно настроить под свое расположение каталогов

