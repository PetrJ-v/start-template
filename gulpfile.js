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













// // main constants
// const { watch, src, dest, series, parallel } = require('gulp');
// const sass         = require('gulp-sass');
// const concat       = require('gulp-concat');
// const sourcemaps = require('gulp-sourcemaps'); //Были нювнсы в консоли при утановке, но написало что 0 волнений
// const del          = require('del'); // Подключаем библиотеку для удаления файлов и папок
// const minifyCSS    = require('gulp-csso'); // Подключаем пакет для минификации CSS
// const rename       = require('gulp-rename'); // Подключаем библиотеку для переименования файлов
// const uglify       = require('gulp-uglifyjs');
// const browserSync  = require('browser-sync');
// const rev          = require('gulp-rev-append');
// const autoprefixer = require('gulp-autoprefixer');

// //Image compression
// const imageminGuetzli = require('imagemin-guetzli'); //Сжатие изображений
// const imagemin     = require('gulp-imagemin'); // Подключаем библиотеку для работы с изображениями
// const pngquant     = require('imagemin-pngquant'); // Подключаем библиотеку для работы с png
// const imageResize   = require('gulp-image-resize');
// const webp 			= require('gulp-webp');
// const args 			= require('yargs').argv;
// // const addsrc 		= require('gulp-add-src');
// const cache        = require('gulp-cache'); // Подключаем библиотеку кеширования



// const
// 	  imgPreffix 		= false,
// 	//   imgPreffix 		= '54',
// 	  mySource 			= 'app/imgSourceFigma/',
// 	  moveOnly			= 'app/imgMoveOnly/',
// 	  myDest 			= 'app/img/',
// 	  progectDest 		= 'dist/img',
// 	  jpgQuality 		= 98,
// 	  webpQuality		= 90;
// let
// 	  half = false,
// 	  standart = true,
// 	  double = false;

// 	//   half = true,
// 	//   standart = false,
// 	//   double = false;


// function letSass(done) {
// 	src('app/sass/main.scss')
// 	.pipe(sass())
// 	.pipe(sourcemaps.init())
// 	.pipe(autoprefixer())
// 	.pipe(dest('app/css'))
// 	.pipe(minifyCSS()) // Сжимаем
// 	.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
// 	.pipe(dest('app/css'))
// 	.pipe(browserSync.reload({stream: true}));
// 	done();
// }
// exports.sass = letSass;


// cssLibs = function(done) {
// 	src('app/sass/libs.scss') // Выбираем файл для минификации
// 	.pipe(sass())
// 	.pipe(minifyCSS()) // Сжимаем
// 	.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
// 	.pipe(dest('app/css'));
// 	done();
// }
// exports.cssLibs = cssLibs;


// function scripts(done){
// 	src(
// 		[
// 			'app/libs/jquery/dist/jquery.min.js',
// 			'app/libs/slick-carousel/slick/slick.min.js',
// 			// 'app/libs/modernizr-custom/modernizr-custom.min.js',
// 			// 'app/libs/mmenu/jquery.mmenu.all.js',
// 			// 'app/libs/eskju-scrollflow/js/eskju.jquery.scrollflow.min.js'
// 		],
// 		{ sourcemaps: true }
// 	)
// 	.pipe(concat('libs.min.js'))
// 	.pipe(uglify())
// 	.pipe(dest('app/js', { sourcemaps: true }));
// 	done();
// }
// exports.scripts = scripts;


// function clean() {  //удаляет содержимое папки dist/
// 	return del('dist/**', {force:true});
// }


// syncBrowser = function(){
// 	browserSync.init({
// 		server: "./app"
// 	});
// }


// //Image optimisation------------------------------------------------------------start
// 	function clear (callback) {//Очищает кэш от сжатия изображений
// 		return cache.clearAll();
// 	}
// 	exports.clear = clear;

// 	/**
// 	 * Optimize image and generate webp version.
// 	 * @param {boolean} adWebp - if true, webp will be genarate. (default -false)
// 	 * @param {number} jpgQuality - any number from 85 to 100 (lower then 85 will give to lower quality)
// 	 * @param {number} webpQuality - any number from 85 to 100 (lower then 85 will give to lower quality)
// 	 * exemple: imgOptimize('', 85, ''); generate only jpg with 85% qualyti
// 	 * exemple: imgOptimize('webp', 85, '90'); generate jpg with 85% qualyti and webp with 90% qualyti
// 	 */
// 	imgOptimize = async function (adWebp, jpgQuality, webpQuality) {
// 		(async () => {//svg optimisation

// 			return src([
// 				mySource + '/**/**/*.svg'
// 			])
// 			.pipe(cache(
// 				imagemin([
// 					imagemin.svgo({
// 						plugins: [
// 							{ removeViewBox: true },
// 							{ cleanupIDs: false }
// 						]
// 					})
// 				])
// 			))
// 			.pipe(dest(progectDest));
// 		})();
// 		(async () => { //jpg And gif Opimisation
// 			var stream = src([
// 					myDest + '**/**/*.+(jpg|gif)',
// 					'!' + myDest
// 				]);

// 			stream.pipe(cache(
// 				imagemin([
// 					imageminGuetzli({
// 						quality: jpgQuality
// 					}),
// 					imagemin.gifsicle({ interlaced: true }),
// 					// imagemin.jpegtran({progressive: true})//Try to learn in later
// 				])
// 			))
// 			.pipe(dest(progectDest));
// 			// .pipe(dest('../folga/public/graphics/'+myDest));
// 			if (adWebp != false) {
// 				stream = stream.pipe(webp({
// 					quality: webpQuality
// 				}))
// 				.pipe(dest(progectDest));
// 				return stream;
// 			}
// 			else
// 				return stream;
// 		})();

// 		(async () => { //png opimisation

// 			stream = src([
// 				myDest + '**/**/*.png',
// 				'!' + myDest
// 				// mySource + '/temp/**/**/*.png'
// 			]);
// 			opimizePng = async function(){
// 				stream.pipe(cache(
// 					imagemin([
// 						pngquant({
// 							quality: [1, 1], // When used more then 70 the image wasn't saved
// 							speed: 1, // The lowest speed of optimization with the highest quality
// 							floyd: 1 // Con
// 						})
// 					])
// 				))
// 				.pipe(dest(progectDest));
// 				return stream;
// 			}
// 			await opimizePng();
// 			(async () => {
// 				if (adWebp) {
// 					stream = stream.pipe(webp({
// 						quality: webpQuality
// 					}))
// 					.pipe(dest(progectDest));
// 					return stream;
// 				}
// 				else
// 					return stream;
// 			})();
// 		})();
// 	}

// 	optimize = async function (webp) {
// 		var webp = args.webp || false;

// 		imgOptimize(webp, jpgQuality, webpQuality);
// 	}
// 	exports.optimize = optimize;

// 	const delImg = async function(){
// 		// Параметр force нужен для того, чтобы разрешить данной функции
// 		// удалять дирректории и файлы вне рабочего каталога
// 		const deletedPaths = await del(myDest, {force: true});
// 		console.log('Files and directories that would be deleted:\n', deletedPaths.join('\n'));
// 	};
// 	exports.delImg = delImg;

// 	resize = async function () {
// 		let addSuffix = async function(stream, imgPreffix){
// 			if (imgPreffix != false) {
// 				stream = stream.pipe(rename({
// 					// dirname: "main/text/ciao",
// 					// basename: "aloha",
// 					prefix: imgPreffix + '_',
// 					// suffix: '-at-1x',
// 					// extname: ".md"
// 				}))
// 				return stream;
// 			}
// 			else
// 				return stream;
// 		}
// 		// for 1x
// 		if (standart) {

// 			let stream =  src(mySource + '/1x/' + '/**/**/*.+(jpg|png)'),
// 				tempVar = false;

// 			stream = stream.pipe(imageResize({
// 				width: '25%',
// 				quality: 2,
// 				sharpen: 0.6
// 			}));

// 			tempVar = await addSuffix(stream, imgPreffix);
// 			tempVar.pipe(dest(myDest));
// 		};

// 		// for 2x
// 		if (double) {
// 			let stream =  src(mySource + '/2x/' + '/**/**/*.+(jpg|png)'),
// 				tempVar = false;

// 			stream = stream.pipe(imageResize({
// 				width: '50%',
// 				quality: 2,
// 				sharpen: 0.6
// 			}));
// 			tempVar = await addSuffix(stream, imgPreffix);
// 			tempVar.pipe(rename({
// 				suffix: '-at-2x',
// 			}))
// 			.pipe(dest(myDest));
// 		}
// 		// for 05x
// 		if (half) {
// 			let stream =  src(mySource + '/05x/' + '/**/**/*.+(jpg|png)'),
// 				tempVar = false;

// 			stream = stream.pipe(imageResize({
// 				width: '12.5%',
// 				quality: 2,
// 				sharpen: 0.6
// 			}));
// 			tempVar = await addSuffix(stream, imgPreffix);
// 			tempVar.pipe(rename({
// 				suffix: '-at-05x',
// 			}))
// 			.pipe(dest(myDest));
// 		};
// 	};
// 	exports.resize = resize;

// 	const adminImg = async function(){
// 		return src([
// 			progectDest + '/**/**/*.+(jpg|png|gif|svg|webp)',
// 			'!' + progectDest + '/admin-img/**',
// 			'!' + progectDest + '/prev/**',
// 			'!' + progectDest + '/old/**',
// 		])
// 			.pipe(rename(function (path) {
// 				imgName = path.basename;
// 				newImgName = imgName.replace(/^[0-9]+_/, '');
// 				path.basename = newImgName;
// 				// path.dirname += "/ciao";
// 				// path.basename += "-goodbye";
// 				// path.extname = ".md";
// 			}))
// 			// .pipe(dest('../folga/resources/uncompressed-images/'+myDest+'/admin-img/'));
// 			.pipe(dest(progectDest + '/admin-img/'));

// 	}
// 	exports.adminImg = adminImg;

// 	const imgRename = async function(){
// 		return src(mySource + '/**/**/*')
// 			.pipe(rename(function (path) {
// 				imgName = path.basename;
// 				newImgName = 'favicon-' + imgName;
// 				// i++;
// 				path.basename = newImgName;
// 				// path.dirname += "/ciao";
// 				// path.basename += "-goodbye";
// 				// path.extname = ".md";
// 			}))
// 			.pipe(dest(mySource + '/' + 'favicon' + '_renamed'));

// 	}
// 	exports.imgRename = imgRename;
// //Image optimisation--------------------------------------------------------------end

// const myInit = series(scripts, cssLibs, letSass); //Желательно выполнить эту задачу в начале сборки проекта для инициализации
// exports.myInit = myInit;

// //Build functions------------------------------------------------------------start
// 	const buildCSS = async function () {
// 		return src('app/css/**/*.min.css')
// 			.pipe(dest('dist/css')) // Выгружаем в папку app/css
// 	}
// 	exports.buildCSS = buildCSS;

// 	const buildFonts = async function (){
// 		src('app/fonts/**/*') // Переносим шрифты в продакшен
// 			.pipe(dest('dist/fonts'));
// 	}


// 	const buildJs = async function buildJs() {
// 		src('app/js/**/*')
// 		.pipe(dest('dist/js'));
// 	}
// 	exports.buildJs = buildJs;

// 	const buildPhp = async function(cb) {
// 		// return src('app/*.php')
// 		src('app/*.php')
// 			.pipe(dest('dist'))
// 		cb();
// 	}


// 	const phpMailer = async function () {
// 		return src('app/phpmailer/*.*')
// 			.pipe(dest('dist/phpmailer'))
// 	}


// 	const buildHtml = async function(cb) {
// 		// return src('app/*.html')
// 		src('app/*.html')
// 			.pipe(rev()) // Добавляем хэши к подключаемым файлам чтобы избежать кэширования браузером при обновлении версии файлов
// 			.pipe(dest('dist'));
// 		cb();
// 	}
// 	exports.buildHtml = buildHtml;
// //Build functions--------------------------------------------------------------end

// function watchFiles() {
// 	syncBrowser();
// 	watch('app/sass/**/*.scss').on('change', series(letSass, browserSync.reload));
// 	watch([
// 		'app/js/**/*.js',
// 		'app/**/*.html'
// 	]).on('change', browserSync.reload);
// };

// exports.quickBuild = series(clean, parallel(letSass, cssLibs, buildFonts, buildJs, buildPhp, buildHtml), buildCSS, phpMailer);
// exports.build = series(clean, parallel(letSass, cssLibs, buildFonts, buildJs, optimize, buildPhp, buildHtml), buildCSS, phpMailer);
// exports.default = watchFiles;
