import {Condition} from "./Condition.tsx";
import {useEffect, useState} from "react";

type EditSpanProps = {
    prefix?: string
    placeholder?: string
    value?: string
    defaultValue?: string
    readonly?: boolean

    onChange?: (value?: string) => void
}

export function EditSpan(props: EditSpanProps) {
    const [displayValue, setDisplayValue] = useState(props.defaultValue)

    useEffect(() => {
        if (props.onChange) {
            props.onChange(displayValue)
        }
    }, [displayValue, props]);

    useEffect(() => {
        if (props.value && props.readonly) {
            setDisplayValue(props.value)
        }
    }, [props.value, props.readonly]);

    return <label>
        <span>{props.prefix}</span>
        <Condition condition={!props.readonly}>
            <input
                className={
                    "outline-none bg-transparent"
                }
                readOnly={props.readonly}
                value={props.value || displayValue}
                placeholder={props.placeholder}
                style={{width: displayValue?.length.toString() + "ch"}}
                onInput={(e) => setDisplayValue((e.target as HTMLInputElement).value)}
            />
        </Condition>
        <Condition condition={!!props.readonly}>
            <span>{displayValue}</span>
        </Condition>
    </label>
}

type EditableProps = {
    value?: string
    prefix?: string
    defaultValue?: string

    onChange?: (value: string | undefined) => void
    onSave?: (value: string | undefined) => void
}

export function Editable(props: EditableProps) {
    const [hoverTitle, setHoverTitle] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const [DisplayText, setDisplayText] = useState<string | undefined>(props.value)

    useEffect(() => {
        if (!editMode && props.onSave) {
            props.onSave(DisplayText)
        }
    }, [editMode]);

    useEffect(() => {
        if (props.onChange) {
            props.onChange(DisplayText)
        }
    }, [DisplayText, props.onChange]);

    return (
        <div className={"px-10 text-4xl"} onMouseEnter={() => setHoverTitle(true)}
             onMouseLeave={() => setHoverTitle(false)}>
            <div className={"relative flex gap-1.5"}>
                <h1>
                    <EditSpan
                        readonly={!editMode}
                        value={props.value}
                        defaultValue={props.value}
                        prefix={props.prefix}
                        onChange={(v) => setDisplayText(v)}
                    />
                </h1>
                <Condition condition={hoverTitle || editMode}>
                    <div
                        className={"absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 bg-neutral-900 rounded-full p-1 px-2 text-sm"}
                        onMouseDown={() => setEditMode(!editMode && hoverTitle)}
                    >
                        <Condition condition={!editMode}>✎</Condition>
                        <Condition condition={editMode}>✓</Condition>
                    </div>
                </Condition>
            </div>
        </div>
    )
}
