import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create logs directory
const logDir = path.join(__dirname, 'server-logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

// Store original console methods
const originalLog = console.log;
const originalError = console.error;
const originalWarn = console.warn;
const originalInfo = console.info;

// Helper function to get current date string
function getDateString() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    return `${day}-${month}-${year}`;
}

// Helper function to write to log file
function writeToLog(level, message) {
    const timestamp = new Date().toLocaleTimeString();
    const dateString = getDateString();
    const logFile = path.join(logDir, `${dateString}.txt`);
    const logEntry = `[${timestamp}] [${level}] ${message}\n`;
    
    try {
        fs.appendFileSync(logFile, logEntry);
    } catch (error) {
        originalError('Failed to write to log file:', error);
    }
}

// Override console methods
console.log = function(...args) {
    const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
    ).join(' ');
    writeToLog('LOG', message);
    originalLog(...args);
};

console.error = function(...args) {
    const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
    ).join(' ');
    writeToLog('ERROR', message);
    originalError(...args);
};

console.warn = function(...args) {
    const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
    ).join(' ');
    writeToLog('WARN', message);
    originalWarn(...args);
};

console.info = function(...args) {
    const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
    ).join(' ');
    writeToLog('INFO', message);
    originalInfo(...args);
};

console.log('🚀 Console logging to file system initialized');

export const restoreConsole = () => {
    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;
    console.info = originalInfo;
};