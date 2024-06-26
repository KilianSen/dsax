import {OccurrenceItemProps} from "../../utils/dataModel.ts";
import {useEffect, useState} from "react";
import {OccurrenceItem} from "./Occurrence.tsx";

export function OccurrenceList({items, updateItems}: { items: OccurrenceItemProps[], updateItems: (items: OccurrenceItemProps[]) => void }) {
    const [occurrences, setOccurrences] = useState<OccurrenceItemProps[]>([])
    const [editMode, setEditMode] = useState(false)

    const defaultItem: OccurrenceItemProps = {title: "Add a new entry", comment: "Add a new entry", date: new Date(Date.now())}

    const [newItem, setNewItem] = useState<OccurrenceItemProps>(defaultItem)

    useEffect(() => {
        console.log(2)
        setOccurrences(items)
    }, [items]);

    useEffect(() => {
        console.log(1)
        if (!editMode) setNewItem(defaultItem)
    }, [editMode]);

    const onSubmit = () => {
        if (newItem) {
            updateItems([...occurrences, newItem])
            setNewItem(defaultItem)
        }
    }

    return (
        <div>
            {occurrences.map((occurrence, index) => {
                return <OccurrenceItem key={index}
                                       itemPosition={index === 0 ? -1 : (index === occurrences.length - 1 ? 0 : 0)}
                                       oip={occurrence}
                />
            })}
            <OccurrenceItem itemPosition={NaN}
                            oip={newItem}
                            editable={editMode}
                            hasNoHead={occurrences.length === 0}
                            onSubmit={() => {
                                if (editMode) {
                                    onSubmit()
                                }
                                setEditMode(!editMode)
                            }}
                            onChange={(v) => {setNewItem(v)}}
                            classNames={{title: ["text-2xl", "text-neutral-500"], comment: ["text-md text-neutral-500"], date: ["text-md text-neutral-500"], symbol: ["text-neutral-500"]}}
            />
        </div>
    )
}
