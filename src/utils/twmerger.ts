import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...args: ClassValue[]) {
    return twMerge(clsx(args));
}

export function cdcn(condition: boolean, className: ClassValue, elseClassName?: ClassValue) {
    return condition ? className : (elseClassName || "");
}