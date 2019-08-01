const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const calendarSyncOptions = {
    element_token: TOKEN,
    target_id: "cronofy-calendar-sync",
    api_domain: API_DOMAIN,
    authorization: {
        redirect_uri: `${APP_URL}/`,
        client_id: CLIENT_ID,
        scope: "read_write"
    },
    callback: cb => {
        console.log("callback", cb);
    }
};
console.log(calendarSyncOptions);
CronofyElements.CalendarSync(calendarSyncOptions);

CronofyElements.AvailabilityRules({
    element_token: TOKEN,
    target_id: "cronofy-availability-rules",
    api_domain: API_DOMAIN,
    availability_rule_id: "team_work_hours",
    tzid: timezone,
    config: {
        start_time: "08:00",
        end_time: "18:00",
        duration: 30
    },
    styles: {
        prefix: "AR1"
    }
});
