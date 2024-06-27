import { OccurrenceItemProps } from "../../utils/dataModel.ts";
import React, {ReactElement, useEffect, useState} from "react";
import ArrowBlock from "../ArrowBlocks.tsx";
import {ClassValue} from "clsx";
import {cn} from "../../utils/twmerger.ts";

type OCIS = {
    oip: OccurrenceItemProps,
    onSubmit?: (item?: OccurrenceItemProps) => void,
    hasNoHead?: boolean,
    itemPosition: number,
    customHead?: ReactElement,
    customTail?: ReactElement,
    editable?: boolean,
    classNames?: {title?: ClassValue[], symbol?:ClassValue[], comment?: ClassValue[], date?: ClassValue[]}
}


export function OccurrenceItem(props: OCIS) {
    const [date, setDate] = useState<Date>(new Date(Date.now()))
    const [direction, setDirection] = useState<"up" | "down" | "center" | "extra">("up")

    const [displayItem, setDisplayItem] = useState<OccurrenceItemProps>()

    useEffect(() => {
        if (props.editable) {
            setDate(new Date(Date.now()))
            setDirection("extra")
            setDisplayItem(props.oip)
        } else {
            setDirection(props.itemPosition > 0 ? "up" : props.itemPosition < 0 ? "down" : props.itemPosition === 0 ? "center" : "extra")
            setDate(props.oip?.date || new Date(Date.now()))
            setDisplayItem(props.oip)
        }
    }, [props.editable, props.itemPosition, props.oip, props.oip?.date]);

    const onSubmit = () => {
        if (props.editable) {
            props.onSubmit?.(displayItem)
        } else {
            props.onSubmit?.()
        }
        setDisplayItem(props.oip)
    }

    const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.editable) {
            setDate(new Date(e.target.value))
        }
    }

    const onTextChange = (e: React.ChangeEvent<HTMLDivElement>, textType: "title" | "comment") => {
        if (props.editable) {
            setDisplayItem({
                ...displayItem,
                [textType]: e.target.innerText
            })
        }
    }

    return (
        <div className={"flex mt-2"}>
            <div className={"!aspect-square"}>{!props.customHead && !props.hasNoHead && <ArrowBlock direction={direction} />}{props.customHead}</div>
            {props.customTail}{!props.customTail &&
                <div className={cn("flex  mx-5 px-5 gap-5 grow", direction=="extra"?"hover:bg-neutral-900 rounded-full":"", props.editable ?"bg-neutral-950":"")}>
                    {(direction === "extra") && <div onMouseDown={onSubmit} className={cn("flex justify-center items-center text-3xl", props.classNames?.symbol)}>{props.editable ? "✓" : "+"}</div>}
                    <div className={"grow"}>
                        <div className={"flex justify-between gap-2 items-center"}>
                            <div onBlur={e => onTextChange(e, "title")} className={cn("flex text-4xl", props.classNames?.title)} contentEditable={props.editable}>{displayItem?.title}</div>
                        </div>
                        <div className={"flex justify-between gap-5"}>
                            {!props.editable ? <div className={cn("text-right", props.classNames?.date)}>{date.toLocaleDateString()}</div> :
                                <input onChange={onDateChange} className={cn("!text-md bg-transparent",props.classNames?.date)} style={{ font: "unset" }} type={"date"}
                                    value={date.toISOString().split("T")[0]}/>}
                            <div onBlur={e => onTextChange(e, "comment")} className={cn("px-5 text-right", props.classNames?.comment)} contentEditable={props.editable}>{displayItem?.comment}</div>
                        </div>
                    </div>
                </div>}
        </div>
    )
}