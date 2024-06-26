import {OccurrenceItemProps} from "../../utils/dataModel.ts";
import {useEffect, useState} from "react";
import {OccurrenceItem} from "./Occurrence.tsx";

type olEditState = {
    editMode: boolean
    newItem: OccurrenceItemProps
}

export function OccurrenceList({items, updateItems, defaultItem}:
                                   {
                                       items: OccurrenceItemProps[],
                                       updateItems: (items: OccurrenceItemProps[]) => void,
                                       defaultItem: OccurrenceItemProps}) {

    const [defaultNew, setDefaultNew] = useState<OccurrenceItemProps>(defaultItem)

    const [occurrences, setOccurrences] = useState<OccurrenceItemProps[]>([])
    const [editMode, setEditMode] = useState<olEditState>({editMode: false, newItem: defaultNew})

    useEffect(() => {
        if (!defaultItem) {
            setDefaultNew({title: "", date: new Date(), comment: ""})
        }
    }, [defaultItem]);

    useEffect(() => {
        setEditMode({editMode: editMode.editMode, newItem: defaultNew})
    }, [defaultNew]);

    useEffect(() => {
        setOccurrences(items)
    }, [items]);

    const onSubmit = () => {
        if (editMode.newItem != defaultNew) {
            updateItems([...occurrences, editMode.newItem])
            setEditMode({editMode: false, newItem: defaultNew})
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
                            oip={editMode.newItem}
                            editable={editMode.editMode}
                            hasNoHead={occurrences.length === 0}
                            onSubmit={() => {
                                if (editMode) {
                                    onSubmit()
                                }
                                setEditMode({editMode: !editMode.editMode, newItem: editMode.newItem})
                            }}
                            onChange={(v) => {setEditMode({editMode: editMode.editMode, newItem: v})}}
                            classNames={{title: ["text-2xl", "text-neutral-500"], comment: ["text-md text-neutral-500"], date: ["text-md text-neutral-500"], symbol: ["text-neutral-500"]}}
            />
        </div>
    )
}
