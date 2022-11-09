import imagemin from "gulp-imagemin";

export const metaImages = () => {
	return app.gulp.src(`${app.path.srcFolder}/img/meta-img/*.{jpg,jpeg,png}`)
		.pipe(
			app.plugins.if(app.isBuild, imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLavel: 3 // 0 to 7
			}))
		)
		.pipe(app.gulp.dest(`${app.path.buildFolder}/img/meta-img/`))
}
