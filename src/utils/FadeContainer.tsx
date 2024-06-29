import {Dispatch, SetStateAction, useEffect} from "react";
import {ReactNode} from "react";
import useFade from "./useFade.ts";

export default function FadeContainer({children, visible, initial, className}: {children: ReactNode, visible: boolean, initial?: boolean, className?: string}) {
    const [isVisible, setVisible, fadeProps] = useFade(initial || false);

    useEffect(() => {
        (setVisible as Dispatch<SetStateAction<boolean>>)(visible);
    }, []);

    useEffect(() => {
        (setVisible as Dispatch<SetStateAction<boolean>>)(visible);
    }, [setVisible, visible]);

    return isVisible && <div className={className} {...fadeProps as {     style: {         animation: string     },     onAnimationEnd: () => (false | void) }}>{children}</div>
}