import {OccurrenceItemProps} from "../../utils/dataModel.ts";
import React, {ReactElement, useEffect, useState} from "react";
import ArrowBlock from "../ArrowBlocks.tsx";
import {ClassValue} from "clsx";
import {cn} from "../../utils/twmerger.ts";
import {Condition} from "../../utils/Condition.tsx";
import FadeContainer from "../../utils/FadeContainer.tsx";

type OccurrenceElementProps = {
    oip: OccurrenceItemProps,
    onSubmit?: (item?: OccurrenceItemProps) => void,
    hasNoHead?: boolean,
    itemPosition: number,
    customHead?: ReactElement,
    customTail?: ReactElement,
    editable?: boolean,
    classNames?: { title?: ClassValue[], symbol?: ClassValue[], comment?: ClassValue[], date?: ClassValue[] }
}


export function OccurrenceItem(props: OccurrenceElementProps) {
    const [date, setDate] = useState<Date>(new Date(Date.now()))
    const [direction, setDirection] = useState<"up" | "down" | "center" | "extra">("up")

    const [displayItem, setDisplayItem] = useState<OccurrenceItemProps>()

    const onSubmit = () => {
        if (props.editable) {
            props.onSubmit?.(displayItem)
        } else {
            props.onSubmit?.()
        }
        setDisplayItem(props.oip)
    }

    const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!props.editable) {
            return
        }
        setDisplayItem({...displayItem, date: new Date(e.target.value)})
        setDate(new Date(e.target.value))
    }
    const onTextChange = (e: React.FormEvent<HTMLDivElement>, textType: "title" | "comment") => {
        if (!props.editable) {
            return
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setDisplayItem({...displayItem, [textType]: e.target.textContent || ""})
    }

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

    return (
        <FadeContainer initial={false} visible={true} className={"flex mt-2 select-none"}>
            <div className={"!aspect-square"}>{!props.customHead && !props.hasNoHead && <ArrowBlock direction={direction}/>}{props.customHead}</div>
            <>
                <Condition condition={!!props.customTail}>
                    {props.customTail}
                </Condition>
                <Condition condition={!props.customTail}>
                    <div className={cn("flex  mx-5 px-5 gap-5 grow", direction == "extra" ? "hover:bg-neutral-900 rounded-full" : "", props.editable ? "bg-neutral-950" : "")}>
                        <Condition condition={direction === "extra"}>
                            <div onMouseDown={onSubmit} className={cn("flex justify-center items-center text-3xl", props.classNames?.symbol)}>
                                <Condition condition={!!props.editable}>✓</Condition>
                                <Condition condition={!props.editable}>+</Condition>
                            </div>
                        </Condition>
                        <div className={"grow"}>
                            <div className={"flex justify-between gap-2 items-center"}>
                                <div suppressContentEditableWarning={props.editable}
                                     onInput={e => onTextChange(e, "title")}
                                     className={cn("flex text-4xl", props.classNames?.title)}
                                     contentEditable={props.editable}
                                >
                                    <Condition condition={!props.editable} children={displayItem?.title}/>
                                    <Condition condition={!!props.editable} children={props.oip?.title}/>
                                </div>
                            </div>
                            <div className={"flex justify-between gap-5"}>
                                <>
                                    <Condition condition={!props.editable}>
                                        <div
                                            className={cn("text-right", props.classNames?.date)}>{date.toLocaleDateString()}</div>
                                    </Condition>
                                    <Condition condition={!!props.editable}>
                                        <input onChange={onDateChange}
                                               className={cn("!text-md bg-transparent", props.classNames?.date)}
                                               style={{font: "unset"}} type={"date"}
                                               value={date.toISOString().split("T")[0]}/>
                                    </Condition>
                                </>
                                <div suppressContentEditableWarning={props.editable}
                                     onInput={e => onTextChange(e, "comment")}
                                     className={cn("px-5 text-right", props.classNames?.comment)}
                                     contentEditable={props.editable}>

                                    <Condition condition={!props.editable} children={displayItem?.comment}/>
                                    <Condition condition={!!props.editable} children={props.oip.comment}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Condition>
            </>
        </FadeContainer>
    )
}