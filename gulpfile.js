// Основной модуль
import gulp from "gulp";

// Импорт путей
import { path } from "./gulp/config/path.js";
// Имопрт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

// Передаем значения в глобальную переменную
global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	path: path,
	gulp, gulp,
	plugins: plugins,
}

// Импорт задач
import { copy } from "./gulp/tasks/copy.js"; // Копирует файлы (если такие есть), которые не относятся к верстке напрямую
import { reset } from "./gulp/tasks/reset.js"; // Очищает папку dist перед сборкой
import { html } from "./gulp/tasks/html.js"; // Генерирует html из фрагментов
import { server } from "./gulp/tasks/server.js"; // Локакльный сервер для запуска проекта
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js"; // Переносит и сжимет все изображения, кроме изображений в папке meta-img
import { metaImages } from "./gulp/tasks/meta-images.js"; // Переносит и сжимет изображения, предназначенные для раздела head
import { ttfToWoff, fontsStyle} from "./gulp/tasks/fonts.js"; // Конвертирует шрифты в woff и woff2 форматы, генерирует стили для подключения шрифтов
import { zip } from "./gulp/tasks/zip.js"; // Собирает production версию и запаковывает ее в архив в корень проекта
import { ftp } from "./gulp/tasks/ftp.js"; // Деплой

// Наблюдатель за именениями файлов
function watcher(){
	gulp.watch(path.watch.files, copy);
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.images, images);
}

// Последовательная обработка шрифтов
const fonts = gulp.series(ttfToWoff, fontsStyle);

// Основные задачи
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

// Построение сценария выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks, metaImages);
const deployZip = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

// Экспорт сценариев
export { dev }
export { build }
export { deployZip }
export { deployFTP }

// Выполнение сценария по умолчанию
gulp.task('default', dev);
