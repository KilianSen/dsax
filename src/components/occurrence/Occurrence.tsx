import { OccurrenceItemProps } from "../../utils/dataModel.ts";
import { ReactElement, useEffect, useState } from "react";
import ArrowBlock from "../ArrowBlocks.tsx";
import {ClassValue} from "clsx";
import {cn} from "../../utils/twmerger.ts";

export function OccurrenceItem({ oip, itemPosition, customHead, customTail, hasNoHead, editable, onSubmit, onChange, classNames}:
    { oip: OccurrenceItemProps, onSubmit?: () => void, hasNoHead?: boolean, itemPosition: number, customHead?: ReactElement, customTail?: ReactElement, editable?: boolean, onChange?: (value: OccurrenceItemProps) => void, classNames?: {title?: ClassValue[], symbol?:ClassValue[], comment?: ClassValue[], date?: ClassValue[]} }) {
    const [editData, setEditData] = useState<OccurrenceItemProps>({ title: undefined, comment: undefined, date: undefined })

    useEffect(() => {
        setEditData(oip);
    }, []);

    useEffect(() => {
        onChange && onChange(editData);
        console.log(3)
    }, [editData, onChange]);

    const date = oip?.date || new Date(Date.now());
    const direction = itemPosition === -1 ? "up" : (itemPosition === 0 ? "center" : (itemPosition === 1 ? "down" : "extra"));

    return (
        <div className={"flex mt-2"}>
            <div className={"!aspect-square"}>
                {!customHead && !hasNoHead && <ArrowBlock direction={direction} />}
                {customHead}
            </div>
            {!customTail &&
                <div className={cn("flex  mx-5 px-5 gap-5 grow", direction=="extra"?"hover:bg-neutral-900 rounded-full":"", editable ?"bg-neutral-950":"")}>
                    {(direction === "extra") && <div onMouseDown={onSubmit} className={cn("flex justify-center items-center text-3xl", classNames?.symbol)}>{editable ? "✓" : "+"}</div>}
                    <div className={"grow"}>
                        <div className={"flex justify-between gap-2 items-center"}>
                            <div className={cn("flex text-4xl", classNames?.title)} contentEditable={editable} onBlur={e => setEditData({ ...editData, title: e.currentTarget.textContent || "" })}>{oip?.title}</div>
                        </div>
                        <div className={"flex justify-between gap-5"}>
                            {!editable ? <div className={cn("text-right", classNames?.date)}>{date.toLocaleDateString()}</div> :
                                <input className={cn("!text-md bg-transparent",classNames?.date)} style={{ font: "unset" }} type={"date"}
                                    value={date.toISOString().split("T")[0]} onChange={(e) => setEditData({ ...editData, date: new Date(e.currentTarget.value) })} />}
                            <div className={cn("px-5 text-right", classNames?.comment)} contentEditable={editable} onBlur={e => setEditData({ ...editData, comment: e.currentTarget.textContent || "" })}>{oip?.comment}</div>
                        </div>
                    </div>
                </div>}
            {customTail}
        </div>
    )
}