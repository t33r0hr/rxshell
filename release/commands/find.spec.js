"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const ceylon_1 = require("ceylon");
const assert = require("assert");
const path = require("path");
const fs = require("fs");
const PROJECT_ROOT = path.resolve(__dirname, '../../');
const find_1 = require("./find");
const fsStat = (filename) => {
    let failed = true;
    let stats;
    try {
        stats = fs.statSync(filename);
        failed = false;
    }
    catch (e) { }
    return stats;
};
const assertFileExists = (filename) => {
    assert(fsStat(filename), `"${filename}" is not a file.`);
};
describe('test find', function () {
    let testFiles;
    before(() => {
        return find_1.find(['-type', 'file'], PROJECT_ROOT).toArray().toPromise().then(files => {
            testFiles = files;
        });
    });
    it('finds only files', function (done) {
        find_1.find(['-type', 'file'], PROJECT_ROOT).subscribe(filepath => {
            assertFileExists(filepath);
            ceylon_1.default(filepath).toExist();
        }, (error) => {
            console.error(error);
            done(error);
        }, done);
    });
});
//# sourceMappingURL=find.spec.js.map