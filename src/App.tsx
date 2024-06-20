import './App.css'
import {ReactElement, useEffect, useState} from "react";

function MainBox() {
    return (
        <div className={"flex flex-col shrink border-2 rounded-[50px] py-5 mb-[6rem]"}>
            <div className={"px-10 text-4xl"}>
                <h1>Days since Windows Reinstall</h1>
            </div>
            <div className={"border-[1px] my-5"}></div>
            <div className={"px-10 flex justify-center items-center aspect-video mb-5"}>
                <h1 className={"text-[14rem] text-center align-middle flex justify-center items-center leading-[0]"}>30</h1>
            </div>
        </div>
    )
}

type OccurrenceItemProps = {
    title: string
    date: string
    comment: string
}

function  OccurrenceItem({oip,itemPosition, custom1, custom2}: {oip?: OccurrenceItemProps, itemPosition: number, custom1?: ReactElement, custom2?: ReactElement}) {
    // itemPosition: -1 for first, 0 for middle, 1 for last
    const isFirst = itemPosition === -1
    const isLast = itemPosition === 1
    const isMiddle = itemPosition === 0

    return (
        <>
            <div className={"flex"}>
                <div className={"!aspect-square"}>
                    {!custom1?<ABlocks top={isFirst} middle={isMiddle} bottom={isLast}/>:custom1}
                </div>
                <div>
                    {!custom2?
                        <>
                            <div className={"flex justify-between px-5 gap-2 items-center text-4xl"}>
                                <div>{oip?.date}</div>
                                <div>{oip?.title}</div>
                            </div>
                            <div className={"px-5 text-right"}>{oip?.comment}</div>
                        </> : custom2
                    }
                </div>
            </div>
        </>
    )
}

function Occurrences() {
    const [occurrences, setOccurrences] = useState<OccurrenceItemProps[]>([])

    useEffect(() => {
        setOccurrences([
            {title: "Windows Reinstall", date: "2021-09-01", comment: "Installed Windows 10"},
            {title: "Windows Reinstall", date: "2021-09-01", comment: "Installed Windows 10"},
            {title: "Windows Reinstall", date: "2021-09-01", comment: "Installed Windows 10"},
            ])
    }, []);

    return (
    <>
        <div className={""}>
            {occurrences.map((occurrence, index) => {
                return <OccurrenceItem key={index}
                                       itemPosition={index === 0 ? -1 : (index === occurrences.length - 1 ? 0 : 0)}
                                       oip={occurrence}/>
            })}
            <OccurrenceItem itemPosition={NaN} custom1={<ABlocks top={false} bottom={false} middle={false}/>}
                            custom2={<>
                                <>
                                    <div className={"flex justify-between px-5 gap-2 items-center text-4xl"}>
                                        <div>New Occurrence</div>
                                    </div>
                                    <div className={"px-5 text-right"}>Click to add a new occurrence to this counter!
                                    </div>
                                </>
                            </>}/>
            <div className={"h-0 w-full border-2 mt-[5rem]"}/>
        </div>
    </>
    )
}

function App() {

    return (
        <div className={"flex flex-col items-center min-h-full mt-[25vh]"}>
            <MainBox/>
            <Occurrences/>
        </div>
    )
}

export default App

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