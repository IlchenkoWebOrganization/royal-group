// Функция для создания всех необходимых папок и файлов
const createFilesAndFolders = (fs, path, srcPath, newEntryPointName) => {
    try {
        // Папки для модулей и стилей
        const modulesFolder = path.join(srcPath, 'scripts', `${newEntryPointName}-scripts`);
        const stylesFolder = path.join(srcPath, 'styles', `${newEntryPointName}-styles`);

        // Пути к файлам index.html, appName.js и appName.scss
        const indexPath = path.join(srcPath, `${newEntryPointName}.html`);
        const jsPath = path.join(srcPath, `${newEntryPointName}.js`);
        const scssPath = path.join(srcPath, `${newEntryPointName}.scss`);

        // Проверяем существование файлов, если не существует -- создаём
        if (fs.existsSync(indexPath) || fs.existsSync(jsPath) || fs.existsSync(scssPath)) {
            console.error(`Файлы для точки входа '${newEntryPointName}' уже существуют.`);
            process.exit(1);
        } else {
            fs.writeFileSync(indexPath, `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${newEntryPointName}</title>
        </head>
        <body>
        
        </body>
        </html>`);

            fs.writeFileSync(jsPath, `import './${newEntryPointName}.html';
        import './${newEntryPointName}.scss';`);

            fs.writeFileSync(scssPath, `@import
                './styles/normalize',
                './styles/fonts',
                './styles/mixins',
                './styles/media',
                './styles/variables',
                './styles/utils',
                './styles/globals';`);
        }

        // Проверяем существование папок
        if (fs.existsSync(modulesFolder) || fs.existsSync(stylesFolder)) {
            console.error(`Точка входа '${newEntryPointName}' уже существует.`);
            process.exit(1); // Останавливаем процесс
        } else {
            fs.mkdirSync(modulesFolder);
            fs.mkdirSync(stylesFolder);
        }

        console.log(`Точка входа '${newEntryPointName}' успешно создана.`);
    } catch (err) {
        console.error('Ошибка при создании файлов и папок:', err);
    }
};

module.exports = createFilesAndFolders;