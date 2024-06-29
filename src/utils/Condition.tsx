import {ReactElement} from "react";

export function Condition({condition, children}: {
    condition: boolean,
    children: ReactElement[] | ReactElement | string | undefined
}) {
    if (condition) {
        return <>{children}</>
    }

    return <></>
}

export function BiCondition({condition, children}: { condition: boolean, children: ReactElement[] }) {
    if (children.length < 2) {
        console.warn("BiCondition has less than 2 children, falling back to Condition component")
        return <Condition condition={condition} children={children}/>
    }
    if (children.length > 2) {
        throw new Error("BiCondition can only have 2 children")
    }

    if (condition) {
        return <>{children[0]}</>
    }
    return <>{children[1]}</>
}