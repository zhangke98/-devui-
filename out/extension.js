'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const path = require('path');
const fs = require('fs');
function provideHover(document, position) {
    const fileName = document.fileName;
    const workDir = path.dirname(fileName);
    const word = document.getText(document.getWordRangeAtPosition(position));
    console.log(word);
    if (/\.html$/.test(fileName)) {
        console.log('进入provideHover方法');
        console.log("还没有匹配成功");
        const reg = new RegExp(/d-[a-zA-Z0-9]*/g);
        if (reg.test(word)) {
            console.log("匹配成功");
            console.log(word);
            // const name=word.replace('d-','');
            let destPath = `./params/${word.replace('d-', '')}.ts`;
            console.log(destPath);
            console.log("开始获取内容");
            const content = require(destPath);
            console.log("获取内容完成");
            if (content) {
                console.log('hover已生效');
                // hover内容支持markdown语法
                return new vscode_1.Hover(`* **id**：${content.id}\n* **type**：${content.type}\n`);
            }
            else {
                console.log("没找到文件路径");
            }
            console.log("本次悬停结束");
        }
    }
}
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "test" is now active!');
    context.subscriptions.push(vscode_1.languages.registerHoverProvider('html', {
        provideHover
    }));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map