import {ReactElement} from "react";
import {cn} from "../utils/twmerger.ts";
import {ClassValue} from "clsx";

export default function SizeBlock({children, w, h, ...className}: {children: ReactElement, w?: number, h?: number, className?: ClassValue[]}) {
    // Size block should only allow horizontal or vertical sizing, not both
    if (!w && !h) {
        w = Math.round(200/3)
    }

    if (w && h) {
        h = undefined
    }

    w = w? Math.max(0, Math.min(100, w)) : w
    h = h? Math.max(0, h) : h

    return (
        <div className={cn("flex", w?("flex-col justify-center"): ("flex-row items-center"),className)} style={
            {
                width: w ? `${w}%` : undefined,
                height: h ? `${h}%` : undefined
            }
        }>
            {children}
        </div>
    )
}