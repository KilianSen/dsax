import {sanitize} from "./sanitization.ts";

export type DisplayInformation = {
    title: string
    Occurrences: OccurrenceItemProps[]
}

export function deserializeDisplayInformation(data: string | undefined | null, defaultValue?: DisplayInformation): DisplayInformation {
    // Base64 decode and parse the JSON
    if (!data) {
        return defaultValue || {title: "", Occurrences: []}
    }

    const unsanitizedData = JSON.parse(atob(data))
    unsanitizedData.title = sanitize(unsanitizedData.title)
    unsanitizedData.Occurrences = unsanitizedData.Occurrences.map((occurrence: OccurrenceItemProps) => {
        occurrence.title = sanitize(occurrence.title || "")
        occurrence.comment = sanitize(occurrence.comment || "")
        occurrence.date = occurrence.date? new Date(occurrence.date): undefined // TODO: Check if this is necessary/safe
        return occurrence
    })

    return unsanitizedData
}

export function serializeDisplayInformation(data: DisplayInformation): string {
    // Stringify the JSON and base64 encode it
    data.title = sanitize(data.title)
    data.Occurrences = data.Occurrences.map((occurrence) => {
        occurrence.title = sanitize(occurrence.title || "")
        occurrence.comment = sanitize(occurrence.comment || "")
        return occurrence
    })

    return btoa(JSON.stringify(data))
}

export type OccurrenceItemProps = {
    title?: string
    date?: Date
    comment?: string
}
