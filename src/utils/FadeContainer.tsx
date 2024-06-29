import {useEffect} from "react";
import {ReactNode} from "react";
import useFade from "./useFade.ts";

export default function FadeContainer({children, visible, initial, className}: {children: ReactNode, visible: boolean, initial?: boolean, className?: string}) {
    const [isVisible, setVisible, fadeProps] = useFade(initial || false);

    useEffect(() => {
        setVisible(visible);
    }, []);

    useEffect(() => {
        setVisible(visible);
    }, [setVisible, visible]);

    return isVisible && <div className={className} {...fadeProps}>{children}</div>
}