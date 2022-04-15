import moment from "moment";

type TimeMode = "morning" | "evening"

export const getCurrentTimeMode = (): TimeMode => {
    let mode: TimeMode = "morning";
    const morning = 7;
    const evening = 18;
    const currentHour = Number(moment().format("HH"));
    if (currentHour >= morning && currentHour < evening) {
        mode = "morning";
    }
    if (currentHour >= evening || currentHour < morning) {
        mode = "evening"
    }
    return mode;
}