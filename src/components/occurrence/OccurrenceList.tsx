import {OccurrenceItemProps} from "../../utils/dataModel.ts";
import {useEffect, useState} from "react";
import {OccurrenceItem} from "./Occurrence.tsx";


export function OccurrenceList({items, updateItems}: { items: OccurrenceItemProps[], updateItems: (items: OccurrenceItemProps[]) => void}) {

    const [occurrences, setOccurrences] = useState<OccurrenceItemProps[]>([])

    useEffect(() => {
        setOccurrences(items)
    }, [items]);

    const [editMode, setEditMode] = useState<boolean>(false)

    return (
        <div>
            {occurrences.map((occurrence, index) => {
                return <OccurrenceItem key={index}
                                       itemPosition={index == 0 ? 1 : (index === occurrences.length - 1 ? -1 : 0)}
                                       oip={occurrence}
                />
            })}
            <OccurrenceItem itemPosition={NaN}
                            oip={!editMode?
                                {title: "Add new item", date: new Date(Date.now()), comment: "Click on the plus"}:
                                {title: "New item", date: new Date(Date.now()), comment: "Click on the checkmark"}
                            }
                            editable={editMode}
                            hasNoHead={occurrences.length === 0}
                            onSubmit={(item) => {
                                if (item) {
                                    updateItems([...occurrences, item])
                                }
                                setEditMode(!editMode) // Toggle edit mode
                            }}
                            classNames={{title: ["text-2xl", "text-neutral-500"], comment: ["text-md text-neutral-500"], date: ["text-md text-neutral-500"], symbol: ["text-neutral-500"]}}
            />
        </div>
    )
}
