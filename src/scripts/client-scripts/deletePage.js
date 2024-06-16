const fs = require('fs');
const path = require('path');
const { parse } = require('acorn');
const { generate } = require('escodegen');

const deleteFilesAndFolders = require('./deleteFilesAndFolders');

// Импортируем конфигурацию Webpack
const webpackConfigPath = path.resolve(__dirname, '..', '..', '..', 'webpack.config.js');

// Путь к папке src для создания всех файлов и папок
const srcPath = path.resolve(__dirname, '..', '..', '..', 'src');

// Имя новой точки входа, полученное в качестве аргумента из командной строки
const entryToDelete = process.argv[2];

// Проверка, указано ли название для точки входов
if (!entryToDelete) {
    console.error('Не указано название точки входа.');
    process.exit(1);
}

// Читаем содержимое файла конфигурации Webpack
fs.readFile(webpackConfigPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Ошибка при чтении файла:', err);
        return;
    }

    try {
        // Разбираем содержимое файла в объект JavaScript
        const webpackConfigAst = parse(data, { sourceType: 'module', ecmaVersion: 'latest' });

        // Находим экспортируемый объект module.exports
        const moduleExportsNode = webpackConfigAst.body.find(node =>
            node.type === 'ExpressionStatement' &&
            node.expression.type === 'AssignmentExpression' &&
            node.expression.left.type === 'MemberExpression' &&
            node.expression.left.object.name === 'module' &&
            node.expression.left.property.name === 'exports'
        );

        if (!moduleExportsNode) {
            console.error('Не удалось найти экспортируемый объект module.exports в конфигурации Webpack.');
            return;
        }

        // Удаление точки входа из объекта entry
        const entryNode = moduleExportsNode.expression.right.properties.find(prop =>
            prop.key.type === 'Identifier' && prop.key.name === 'entry'
        );

        if (entryNode) {
            entryNode.value.properties = entryNode.value.properties.filter(prop =>
                prop.key.type === 'Identifier' && prop.key.name !== entryToDelete
            );
        } else {
            console.error('Точки входа, которую Вы пытаетесь удалить не существует');
            process.exit(1);
        }

        // Удаление объекта HtmlWebpackPlugin с указанным шаблоном
        const pluginsNode = moduleExportsNode.expression.right.properties.find(prop =>
            prop.key.type === 'Identifier' && prop.key.name === 'plugins'
        );

        if (pluginsNode) {
            pluginsNode.value.elements = pluginsNode.value.elements.filter(element => {
                if (element.type === 'NewExpression' && element.callee.name === 'HtmlWebpackPlugin') {
                    const filenameProperty = element.arguments[0].properties.find(prop =>
                        prop.key.type === 'Identifier' && prop.key.name === 'filename'
                    );
                    if (filenameProperty && filenameProperty.value && typeof filenameProperty.value.value === 'string' && filenameProperty.value.value === entryToDelete + '.html') {
                        return false;
                    }
                }
                return true;
            });
        }

        // Преобразуем AST обратно в строку JavaScript
        const updatedConfigString = generate(webpackConfigAst);

        // Записываем обновленную конфигурацию обратно в файл
        fs.writeFile(webpackConfigPath, updatedConfigString, 'utf8', (err) => {
            if (err) {
                console.error('Ошибка при записи файла:', err);
                return;
            }
            console.log(`Точка входа '${entryToDelete}' и страница '${entryToDelete}.html' успешно удалены из конфигурации Webpack.`);
        });
    } catch (e) {
        console.error('Ошибка при обновлении webpack конфигурации:', e);
    }
});

// Вызываем функцию создания файлов и папок
deleteFilesAndFolders(fs, path, srcPath, entryToDelete);