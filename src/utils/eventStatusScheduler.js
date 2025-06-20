import cron from "node-cron";
import db from "../database/db.js";

const startEventStatusScheduler = () => {
// Run every minute
cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    const today = now.toISOString().split("T")[0]; // 'YYYY-MM-DD'
    const currentTime = now.toTimeString().split(" ")[0]; // 'HH:MM:SS'

    console.log(`[CRON] Checking events at ${today} ${currentTime}`);

    // 1. Move events to 'ongoing' if they've started
    await db.query(
      `
      WITH starting_events AS (
        SELECT event_id FROM events
        WHERE event_date = $1
        AND event_start <= $2
        AND event_end > $2
        AND is_active = TRUE
      )
      UPDATE events_status
      SET ongoing = (
        SELECT array_agg(event_id) FROM starting_events
      )
      WHERE TRUE;
    `,
      [today, currentTime]
    );

    // 2. Move events from 'ongoing' to 'finished' if they're over
    const finishedEventsRes = await db.query(
      `
      SELECT event_id FROM events
      WHERE event_date = $1
      AND event_end <= $2
      AND is_active = TRUE
    `,
      [today, currentTime]
    );

    const finishedEventIds = finishedEventsRes.rows.map((row) => row.event_id);

    if (finishedEventIds.length > 0) {
      await db.query(
        `
        UPDATE events_status
        SET
          finished = array_cat(finished, $1::int[]),
          ongoing = array(
            SELECT unnest(ongoing) EXCEPT SELECT unnest($1::int[])
          )
        WHERE TRUE;
      `,
        [finishedEventIds]
      );
    }
  } catch (err) {
    console.error("[CRON ERROR]", err);
  }
});
}

export default startEventStatusScheduler;