// Функция для удаления файлов и папок
function deleteFilesAndFolders(fs, path, srcPath, entryPointToDelete) {

    const jsFilePath = path.join(srcPath, `${entryPointToDelete}.js`);
    const scssFilePath = path.join(srcPath, `${entryPointToDelete}.scss`);
    const htmlFilePath = path.join(srcPath, `${entryPointToDelete}.html`);

    const scriptsFolderPath = path.join(srcPath, 'scripts', `${entryPointToDelete}-scripts`);
    const stylesFolderPath = path.join(srcPath, 'styles', `${entryPointToDelete}-styles`);

    if (!fs.existsSync(jsFilePath) || !fs.existsSync(scssFilePath) || !fs.existsSync(htmlFilePath) || !fs.existsSync(scriptsFolderPath) || !fs.existsSync(stylesFolderPath)) {
        console.error(`Точки входа '${entryPointToDelete}' не существует в проекте.`);
        process.exit(1); // Останавливаем процесс
    }

    fs.unlink(jsFilePath, (err) => {
        if (err) {
            console.error(`Ошибка при удалении файла ${entryPointToDelete}.js:`, err);
        } else {
            console.log(`Файл ${entryPointToDelete}.js успешно удален.`);
        }
    });

    fs.unlink(scssFilePath, (err) => {
        if (err) {
            console.error(`Ошибка при удалении файла ${entryPointToDelete}.js:`, err);
        } else {
            console.log(`Файл ${entryPointToDelete}.scss успешно удален.`);
        }
    });

    fs.unlink(htmlFilePath, (err) => {
        if (err) {
            console.error(`Ошибка при удалении файла ${entryPointToDelete}.js:`, err);
        } else {
            console.log(`Файл ${entryPointToDelete}.html успешно удален.`);
        }
    });


    fs.rmdir(path.join(srcPath, 'scripts', `${entryPointToDelete}-scripts`), { recursive: true }, (err) => {
        if (err) {
            console.error(`Ошибка при удалении папки ${entryPointToDelete}-modules:`, err);
        } else {
            console.log(`Папка ${entryPointToDelete}-scripts успешно удалена.`);
        }
    });

    fs.rmdir(path.join(srcPath, 'styles', `${entryPointToDelete}-styles`), { recursive: true }, (err) => {
        if (err) {
            console.error(`Ошибка при удалении папки ${entryPointToDelete}-styles:`, err);
        } else {
            console.log(`Папка ${entryPointToDelete}-styles успешно удалена.`);
        }
    });
};

module.exports = deleteFilesAndFolders;