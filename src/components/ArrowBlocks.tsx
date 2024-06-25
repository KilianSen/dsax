export default function ArrowBlock({direction}: {direction: "up" | "down" | "center" | "extra" }) {
    if (direction === "extra") {
        return <ABlocks top={false} bottom={false} middle={false}/>
    }
    return <ABlocks top={direction === "up"} middle={direction === "center"} bottom={direction === "down"}/>
}


function ABlocks({top,middle,bottom}: {top: boolean, middle: boolean, bottom: boolean}) {
    if (middle) {
        return (
            <div className={"flex flex-col items-start h-full w-[32px]"}>
            <div className={"border-l-4 h-full w-full flex items-center"}>
            <div className={"border-2 w-full h-0"}/>
        </div>
        </div>
    )
    }

    if (top) {
        return (
            <div className={"flex items-end h-full w-[32px]"}>
            <div className={"border-4 w-full h-1/2 flex flex-end justify-end items-end border-b-0 border-r-0 rounded-tl-2xl"}/>
        </div>
    )
    }

    if (bottom) {
        return (
            <div className={"flex items-start h-full w-[32px]"}>
            <div className={"border-4 w-full h-1/2 flex flex-start justify-end items-start border-t-0 border-r-0 rounded-bl-2xl"}/>
        </div>
    )
    }

    return (
        <div className={"flex items-start h-full w-[32px]"}>
        <div className={"border-4 w-full h-[100%] -translate-y-1/2 flex flex-start justify-end items-start border-t-0 border-r-0 rounded-bl-2xl border-dashed"}/>
    </div>
)
}