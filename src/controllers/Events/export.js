import ExcelJS from "exceljs";
import dbConnection from "../../database/dbconnection.js";
import validateToken from "../common/validateToken.js";

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

    // Fetch all events (fetch all columns)
    // You may need to adjust the argument to getEvents if needed
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
  } catch (error) {
    console.error("Error exporting events to Excel:", error);
    res.status(500).send({ message: "Failed to export events", status: "error" });
  }
};

export default exportEvents;
