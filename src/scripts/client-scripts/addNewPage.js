const fs = require('fs');
const path = require('path');
const { parse } = require('acorn');
const escodegen = require('escodegen');

// Функция создания необходимых файлов и модулей для создания экосистемы одной страницы
const createFilesAndFolders = require('./createFilesAndFolders');

// Путь к папке src для создания всех файлов и папок
const srcPath = path.resolve(__dirname, '..', '..', '..', 'src');

// Путь к файлу конфигурации Webpack
const webpackConfigPath = path.resolve(__dirname, '..', '..', '..', 'webpack.config.js');

// Имя новой точки входа, полученное в качестве аргумента из командной строки
const newEntryPointName = process.argv[2];

// Проверка, указано ли название для точки входов
if (!newEntryPointName) {
    console.error('Не указано название точки входа.');
    process.exit(1);
}

// Вызываем функцию создания файлов и папок
createFilesAndFolders(fs, path, srcPath, newEntryPointName);

// Читаем содержимое файла конфигурации Webpack
fs.readFile(webpackConfigPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Ошибка при чтении файла:', err);
        return;
    }

    try {
        // Разбираем содержимое файла в объект JavaScript
        const webpackConfigAst = parse(data, { ecmaVersion: 'latest', sourceType: 'module' });

        // Находим объект module.exports
        const moduleExportsNode = webpackConfigAst.body.find(node =>
            node.type === 'ExpressionStatement' &&
            node.expression.type === 'AssignmentExpression' &&
            node.expression.left.type === 'MemberExpression' &&
            node.expression.left.object.name === 'module' &&
            node.expression.left.property.name === 'exports'
        );

        if (!moduleExportsNode) {
            console.error('Не удалось найти объект module.exports в конфигурации Webpack.');
            return;
        }

        // Проверяем, существует ли уже точка входа с таким же именем
        const entryNode = moduleExportsNode.expression.right.properties.find(prop =>
            prop.key.type === 'Identifier' && prop.key.name === 'entry'
        );

        if (entryNode) {
            const entryExists = entryNode.value.properties.some(prop =>
                prop.key.type === 'Identifier' && prop.key.name === newEntryPointName
            );
            if (entryExists) {
                console.error(`Точка входа с названием '${newEntryPointName}' уже существует в конфигурации Webpack.`);
                process.exit(1);
            }
        }

        // Добавляем новую точку входа к объекту entry
        if (!entryNode) {
            moduleExportsNode.expression.right.properties.push({
                type: 'Property',
                key: { type: 'Identifier', name: 'entry' },
                value: { type: 'ObjectExpression', properties: [] },
                kind: 'init',
                computed: false,
                method: false,
                shorthand: false,
            });
        }

        entryNode.value.properties.push({
            type: 'Property',
            key: { type: 'Identifier', name: newEntryPointName },
            value: {
                type: 'CallExpression',
                callee: { type: 'MemberExpression', object: { type: 'Identifier', name: 'path' }, property: { type: 'Identifier', name: 'resolve' } },
                arguments: [
                    { type: 'Identifier', name: '__dirname' },
                    { type: 'Literal', value: 'src' },
                    { type: 'Literal', value: `${newEntryPointName}.js` },
                ]
            },
            kind: 'init',
            computed: false,
            method: false,
            shorthand: false,
        });
        console.log(`Точка входа '${newEntryPointName}' успешно добавлена в конфигурацию Webpack.`);

        // Добавляем новый объект HtmlWebpackPlugin
        const pluginsNode = moduleExportsNode.expression.right.properties.find(prop =>
            prop.key.type === 'Identifier' && prop.key.name === 'plugins'
        );

        if (pluginsNode) {
            pluginsNode.value.elements.push({
                type: 'NewExpression',
                callee: { type: 'Identifier', name: 'HtmlWebpackPlugin' },
                arguments: [{
                    type: 'ObjectExpression',
                    properties: [
                        {
                            type: 'Property',
                            key: { type: 'Identifier', name: 'template' },
                            value: {
                                type: 'CallExpression',
                                callee: { type: 'MemberExpression', object: { type: 'Identifier', name: 'path' }, property: { type: 'Identifier', name: 'resolve' } },
                                arguments: [
                                    { type: 'Identifier', name: '__dirname' },
                                    { type: 'Literal', value: 'src' },
                                    { type: 'Literal', value: `${newEntryPointName}.html` },
                                ]
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
                        },
                        {
                            type: 'Property',
                            key: { type: 'Identifier', name: 'filename' },
                            value: { type: 'Literal', value: `${newEntryPointName}.html` },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
                        }
                    ]
                }]
            });
            console.log(`Объект HtmlWebpackPlugin для страницы '${newEntryPointName}' успешно добавлен в конфигурацию Webpack.`);
        } else {
            console.error('Не удалось найти массив plugins в конфигурации Webpack.');
        }

        // Преобразуем AST обратно в строку JavaScript
        const updatedConfigString = escodegen.generate(webpackConfigAst);

        // Записываем обновленную конфигурацию обратно в файл
        fs.writeFile(webpackConfigPath, updatedConfigString, 'utf8', (err) => {
            if (err) {
                console.error('Ошибка при записи файла:', err);
                return;
            }
            console.log('Webpack конфиг успешно обновлен!');
        });
    } catch (e) {
        console.error('Ошибка при обновлении webpack конфигурации:', e);
    }
});