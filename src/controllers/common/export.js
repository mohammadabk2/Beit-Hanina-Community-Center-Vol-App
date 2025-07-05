import ExcelJS from "exceljs";
import dbConnection from "../../database/dbconnection.js";
import validateToken from "./validateToken.js";

const exportEvents = async (req, res) => {
  console.log("Exporting events");
  const { userID, userRequest } = req.query;

  if(!userID || !userRequest) {
    const message = "User Id or Request Failed.";
    console.log(message);
    return res.status(400).send({
      message: message,
      status: "fail",
    });
  }

  let roleType;
  try {
    roleType = await validateToken(req);
    console.log(`role type: ${roleType.role}`);
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).send({
      message: error,
      status: "fail",
    });
  }

  try {
    if (roleType.role !== "admin") {
      return res.status(403).send({ message: "Unauthorized", status: "fail" });
    }

    if(userRequest === "events") {    // Fetch all events (fetch all columns)
      const events = await dbConnection.getEvents(["approved", "pending", "rejected"]);
  
      // Create a new workbook and worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Events");
  
      // Add header row
      worksheet.columns = [
        { header: "ID", key: "event_id", width: 10 },
        { header: "Name", key: "event_name", width: 30 },
        { header: "Date", key: "event_date", width: 15 },
        { header: "Start Time", key: "event_start", width: 15 },
        { header: "End Time", key: "event_end", width: 15 },
        { header: "Active", key: "is_active", width: 10 },
        { header: "Org ID", key: "org_id", width: 10 },
        { header: "Max Volunteers", key: "max_number_of_vol", width: 18 },
        { header: "Current Volunteers", key: "current_number_of_vol", width: 20 },
        { header: "Location", key: "event_location", width: 20 },
        { header: "Description", key: "event_description", width: 40 },
      ];
  
      // Add data rows
      events.forEach(event => {
        worksheet.addRow(event);
      });
  
      // Set response headers for file download
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=events.xlsx"
      );
  
      // Write workbook to response
      await workbook.xlsx.write(res);
      res.end();
    }

    
    if(userRequest === "users"){
      // Fetch all users (admin only, volunteers and organizers)
      const users = await dbConnection.getUsers("admin", "volunteer");
      // Create a new workbook and worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Users");
      // Add header row
      worksheet.columns = [
        { header: "ID", key: "id", width: 10 },
        { header: "Role", key: "role", width: 12 },
        { header: "Name", key: "name", width: 30 },
        { header: "Birth Date", key: "birth_date", width: 15 },
        { header: "Sex", key: "sex", width: 8 },
        { header: "Phone Number", key: "phone_number", width: 18 },
        { header: "Email", key: "email", width: 30 },
        { header: "Address", key: "address", width: 30 },
        { header: "Insurance", key: "insurance", width: 15 },
        { header: "ID Number", key: "id_number", width: 18 },
        { header: "Username", key: "username", width: 20 },
        { header: "Skills", key: "skills", width: 30 },
        { header: "Custom Field", key: "custom_field", width: 30 },
        { header: "Org Name", key: "org_name", width: 25 },
        { header: "Org Address", key: "org_address", width: 25 },
        { header: "Org Phone", key: "org_phone_number", width: 18 },
        { header: "Org Email", key: "org_email", width: 25 },
      ];
      // Add data rows, mapping fields for both types
      users.forEach(user => {
        worksheet.addRow({
          id: user.id,
          role: user.role,
          name: user.name,
          birth_date: user.birth_date || '',
          sex: user.sex || '',
          phone_number: user.phone_number || '',
          email: user.email || '',
          address: user.address || '',
          insurance: user.insurance || '',
          id_number: user.id_number || '',
          username: user.username || '',
          skills: user.skills || '',
          custom_field: user.custom_field || '',
          org_name: user.org_name || '',
          org_address: user.org_address || '',
          org_phone_number: user.org_phone_number || '',
          org_email: user.org_email || '',
        });
      });
      // Set response headers for file download
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=users.xlsx"
      );
      // Write workbook to response
      await workbook.xlsx.write(res);
      res.end();
      return;
    }

    if(userRequest === "logs"){
      // Fetch all system logs
      const logs = await dbConnection.getSystemLogs({}); // Get all logs
      
      // Create a new workbook and worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("System Logs");
      
      // Add header row
      worksheet.columns = [
        { header: "ID", key: "id", width: 10 },
        { header: "User ID", key: "user_id", width: 12 },
        { header: "Username", key: "username", width: 20 },
        { header: "Email", key: "email", width: 30 },
        { header: "Action", key: "action", width: 25 },
        { header: "Details", key: "details", width: 40 },
        { header: "IP Address", key: "ip_address", width: 18 },
        { header: "User Agent", key: "user_agent", width: 30 },
        { header: "Log Level", key: "log_level", width: 12 },
        { header: "Created At", key: "created_at", width: 20 },
      ];
      
      // Add data rows
      logs.forEach(log => {
        worksheet.addRow({
          id: log.id,
          user_id: log.user_id || '',
          username: log.username || '',
          email: log.email || '',
          action: log.action,
          details: log.details || '',
          ip_address: log.ip_address || '',
          user_agent: log.user_agent || '',
          log_level: log.log_level,
          created_at: log.created_at,
        });
      });
      
      // Set response headers for file download
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=system_logs.xlsx"
      );
      
      // Write workbook to response
      await workbook.xlsx.write(res);
      res.end();
      return;
    }
  } catch (error) {
    console.error("Error exporting events to Excel:", error);
    res.status(500).send({ message: "Failed to export events", status: "error" });
  }
};

export default exportEvents;
