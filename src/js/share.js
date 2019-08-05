import { offsetTime } from "./utils";

const interviewSubmit = res => {
    console.log(res);
    if (res.notification.type !== "slot_selected") return;
    const slot = JSON.stringify(res.notification.slot);
    window.location.href = `/submit?slot=${slot}`;
};

const availabilityQuery = {
    participants: [
        {
            required: "all",
            members: [
                {
                    sub: SUB,
                    managed_availability: true,
                    availability_rule_ids: ["work_hours"]
                }
            ]
        }
    ],
    required_duration: { minutes: 60 },
    available_periods: [
        { start: offsetTime(1, "08:00"), end: offsetTime(1, "18:00") },
        { start: offsetTime(2, "08:00"), end: offsetTime(2, "18:00") },
        { start: offsetTime(3, "08:00"), end: offsetTime(3, "18:00") },
        { start: offsetTime(4, "08:00"), end: offsetTime(4, "18:00") },
        { start: offsetTime(5, "08:00"), end: offsetTime(5, "18:00") },
        { start: offsetTime(6, "08:00"), end: offsetTime(6, "18:00") },
        { start: offsetTime(7, "08:00"), end: offsetTime(7, "18:00") },
        { start: offsetTime(8, "08:00"), end: offsetTime(8, "18:00") },
        { start: offsetTime(9, "08:00"), end: offsetTime(9, "18:00") },
        { start: offsetTime(10, "08:00"), end: offsetTime(10, "18:00") },
        { start: offsetTime(11, "08:00"), end: offsetTime(11, "18:00") },
        { start: offsetTime(12, "08:00"), end: offsetTime(12, "18:00") }
    ]
};

const availabilityViewerOptions = {
    element_token: TOKEN,
    target_id: "cronofy-availability-viewer",
    api_domain: API_DOMAIN,
    availability_query: availabilityQuery,
    styles: {
        prefix: "AV1"
    },
    config: {
        start_time: "09:00",
        end_time: "17:00",
        interval: 30
    },
    callback: slot => interviewSubmit(slot)
};

CronofyElements.AvailabilityViewer(availabilityViewerOptions);