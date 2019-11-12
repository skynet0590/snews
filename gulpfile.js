/*jshint esversion: 6 */

const autoprefixer = require('gulp-autoprefixer');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const style_main = './src/sass/main.scss'; 
const style_files = './src/sass/**/*.scss';

gulp.task('styles', (done)=>{
	gulp.src([style_main])
		.pipe(sourcemaps.init())	
		.pipe(sass({
			outputStyle:'compressed',
			includePaths: [
				require('node-normalize-scss').includePaths,
				"node_modules"
			]
		})).on('error', sass.logError)
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./public/css/'))
		.on('end', done);
});

gulp.task('vendor-scripts', (done)=>{
	gulp.src([
			"./node_modules/bootstrap/dist/js/bootstrap.min.js",
			"./node_modules/jquery/dist/jquery.min.js"
		])
		.pipe(gulp.dest('./public/imported/js/'))
		.on('end', done);

});

gulp.task('watch', gulp.series(['styles', 'vendor-scripts'], ()=>{
	gulp.watch('./src/sass/**/*.scss', gulp.series('styles'));
	console.log('watching files for changes');
}));
