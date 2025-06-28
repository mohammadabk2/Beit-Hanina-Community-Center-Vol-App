import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __mainlevel = path.resolve(__dirname, "..", "..");

// Create logs directory
const logDir = path.join(__mainlevel, "server-logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
} else {
  console.log(`Log directory already exists at ${logDir}`);
}

// Store original console methods
const originalLog = console.log;
const originalError = console.error;
const originalWarn = console.warn;
const originalInfo = console.info;

// Import database logging function (lazy import to avoid circular dependencies)
let addSystemLog = null;
const getDbLogger = async () => {
  if (!addSystemLog) {
    try {
      const dbConnection = await import("../database/dbconnection.js");
      addSystemLog = dbConnection.default.addSystemLog;
    } catch (error) {
      originalError("Failed to import database logging function:", error);
    }
  }
  return addSystemLog;
};

// Helper function to get current date string
function getDateString() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
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
    originalError("Failed to write to log file:", error);
  }
}

// Enhanced logging function that writes to both file and database
export const logActivity = async (userId, action, details, level = 'INFO', req = null) => {
  const message = `[USER:${userId || 'SYSTEM'}] [ACTION:${action}] ${details}`;
  
  // Write to file
  writeToLog(level, message);
  
  // Write to database
  try {
    const dbLogger = await getDbLogger();
    if (dbLogger) {
      const ipAddress = req?.ip || req?.connection?.remoteAddress || req?.headers?.['x-forwarded-for'] || null;
      const userAgent = req?.headers?.['user-agent'] || null;
      
      await dbLogger(userId, action, details, ipAddress, userAgent, level);
    }
  } catch (error) {
    originalError("Failed to write to database log:", error);
  }
};

// Helper functions for common logging scenarios
export const logUserAction = async (userId, action, details, req = null) => {
  await logActivity(userId, action, details, 'INFO', req);
};

export const logError = async (userId, action, error, req = null) => {
  const errorDetails = error instanceof Error ? error.message : String(error);
  await logActivity(userId, action, `ERROR: ${errorDetails}`, 'ERROR', req);
};

export const logWarning = async (userId, action, details, req = null) => {
  await logActivity(userId, action, details, 'WARN', req);
};

export const logSystemEvent = async (action, details, level = 'INFO') => {
  await logActivity(null, action, details, level);
};

// Authentication logging helpers
export const logLogin = async (userId, username, success, req = null) => {
  const action = success ? 'LOGIN_SUCCESS' : 'LOGIN_FAILED';
  const details = success 
    ? `User ${username} logged in successfully`
    : `Failed login attempt for user ${username}`;
  const level = success ? 'INFO' : 'WARN';
  
  await logActivity(userId, action, details, level, req);
};

export const logLogout = async (userId, username, req = null) => {
  await logActivity(userId, 'LOGOUT', `User ${username} logged out`, 'INFO', req);
};

export const logRegistration = async (userId, username, userType, req = null) => {
  await logActivity(userId, 'USER_REGISTRATION', `New ${userType} registered: ${username}`, 'INFO', req);
};

// Event management logging helpers
export const logEventCreation = async (userId, eventName, eventId, req = null) => {
  await logActivity(userId, 'EVENT_CREATED', `Created event: ${eventName} (ID: ${eventId})`, 'INFO', req);
};

export const logEventUpdate = async (userId, eventName, eventId, changes, req = null) => {
  await logActivity(userId, 'EVENT_UPDATED', `Updated event: ${eventName} (ID: ${eventId}) - Changes: ${changes}`, 'INFO', req);
};

export const logEventEnrollment = async (userId, eventName, eventId, status, req = null) => {
  const action = status === 'enrolled' ? 'EVENT_ENROLLED' : 'EVENT_ENROLLMENT_CANCELLED';
  await logActivity(userId, action, `${status} for event: ${eventName} (ID: ${eventId})`, 'INFO', req);
};

export const logEventStatusChange = async (userId, eventName, eventId, oldStatus, newStatus, req = null) => {
  await logActivity(userId, 'EVENT_STATUS_CHANGED', `Event ${eventName} (ID: ${eventId}) status changed from ${oldStatus} to ${newStatus}`, 'INFO', req);
};

// User management logging helpers
export const logUserApproval = async (adminId, targetUserId, targetUsername, approved, req = null) => {
  const action = approved ? 'USER_APPROVED' : 'USER_REJECTED';
  const details = approved 
    ? `User ${targetUsername} (ID: ${targetUserId}) was approved`
    : `User ${targetUsername} (ID: ${targetUserId}) was rejected`;
  
  await logActivity(adminId, action, details, 'INFO', req);
};

export const logUserBan = async (adminId, targetUserId, targetUsername, banned, reason, req = null) => {
  const action = banned ? 'USER_BANNED' : 'USER_UNBANNED';
  const details = banned 
    ? `User ${targetUsername} (ID: ${targetUserId}) was banned. Reason: ${reason}`
    : `User ${targetUsername} (ID: ${targetUserId}) was unbanned`;
  
  await logActivity(adminId, action, details, 'WARN', req);
};

export const logProfileUpdate = async (userId, username, fields, req = null) => {
  await logActivity(userId, 'PROFILE_UPDATED', `User ${username} updated profile fields: ${fields.join(', ')}`, 'INFO', req);
};

export const logPasswordChange = async (userId, username, req = null) => {
  await logActivity(userId, 'PASSWORD_CHANGED', `User ${username} changed password`, 'INFO', req);
};

// Hours and volunteer management logging helpers
export const logHoursUpdate = async (userId, targetUserId, targetUsername, hourType, hours, req = null) => {
  await logActivity(userId, 'HOURS_UPDATED', `Updated ${hourType} hours for ${targetUsername} (ID: ${targetUserId}): +${hours} hours`, 'INFO', req);
};

export const logVolunteerAssignment = async (organizerId, volunteerId, volunteerName, eventName, req = null) => {
  await logActivity(organizerId, 'VOLUNTEER_ASSIGNED', `Assigned volunteer ${volunteerName} (ID: ${volunteerId}) to event: ${eventName}`, 'INFO', req);
};

// Security logging helpers
export const logSecurityEvent = async (userId, action, details, req = null) => {
  await logActivity(userId, action, details, 'WARN', req);
};

export const logSuspiciousActivity = async (action, details, req = null) => {
  const ipAddress = req?.ip || req?.connection?.remoteAddress || 'unknown';
  await logActivity(null, 'SUSPICIOUS_ACTIVITY', `${action} from IP ${ipAddress}: ${details}`, 'ERROR', req);
};

// Override console methods (keeping existing functionality)
console.log = function (...args) {
  const message = args
    .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg)))
    .join(" ");
  writeToLog("LOG", message);
  originalLog(...args);
};

console.error = function (...args) {
  const message = args
    .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg)))
    .join(" ");
  writeToLog("ERROR", message);
  originalError(...args);
};

console.warn = function (...args) {
  const message = args
    .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg)))
    .join(" ");
  writeToLog("WARN", message);
  originalWarn(...args);
};

console.info = function (...args) {
  const message = args
    .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg)))
    .join(" ");
  writeToLog("INFO", message);
  originalInfo(...args);
};

// Restore console function for testing
export const restoreConsole = () => {
  console.log = originalLog;
  console.error = originalError;
  console.warn = originalWarn;
  console.info = originalInfo;
};

console.log("Enhanced logging system initialized with database support");

// Export all logging functions for easy importing
export default {
  logActivity,
  logUserAction,
  logError,
  logWarning,
  logSystemEvent,
  logLogin,
  logLogout,
  logRegistration,
  logEventCreation,
  logEventUpdate,
  logEventEnrollment,
  logEventStatusChange,
  logUserApproval,
  logUserBan,
  logProfileUpdate,
  logPasswordChange,
  logHoursUpdate,
  logVolunteerAssignment,
  logSecurityEvent,
  logSuspiciousActivity,
  restoreConsole
};
