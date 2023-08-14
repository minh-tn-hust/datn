const Docker = require('dockerode');

class BaseLanguage {

    /** 
     * @type string Đường dẫn tới thư mục được Bind sử dụng cho máy ảo
     */ 
    baseDirectory = null;

    /** 
     * @type string File name được sử dụng để chạy trong câu lệnh complie / câu lệnh run
     */ 
    baseFileName = null;

    /** @type Docker.ExecCreateOptions */  compileOption = null;
    /** @type Docker.ExecCreateOptions */ runOption = null;
    /** @type Docker.ContainerCreateOptions */ languageConfig = null;
    /** @type Number */ memoryLimited = null;

    constructor(directoryPath, fileName = 'A.cpp', memoryLimited = 256) {
        this.setSourceFileName(fileName);
        this.setBaseDirectory(directoryPath);
        this.setMemoryLimted(memoryLimited);

        this.setCompileOption();
        this.setLanguageConfig();
        this.setRunOption();
    }

    setMemoryLimted(memory) {
        this.memoryLimited = this.memoryLimited;
    }

    setSourceFileName(fileName) {
        this.baseFileName = fileName;
    }
    
    setBaseDirectory(directoryPath) {
        this.baseDirectory = directoryPath;
    }

    setCompileOption() { }

    setRunOption() { }

    setLanguageConfig() { }

    updateFilename(fileName) {
        this.setSourceFileName(fileName);
        this.setCompileOption();
        this.setRunOption();
    }
}

module.exports = BaseLanguage;
