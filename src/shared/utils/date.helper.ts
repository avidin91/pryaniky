export const isoToDateString = (isoString) => {
    const date = isoString.slice(0, 10); // "2023-10-27"
    const time = isoString.slice(11, 19); // "10:35:22"

    return `${date} ${time}`; // "2023-10-27 10:35:22"
}