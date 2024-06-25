import './App.css'
import {ReactElement, useEffect, useState} from "react";
import ArrowBlock from "./components/ArrowBlocks.tsx";
import SizeBlock from "./components/SizeBlock.tsx";

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
                    {!custom1?<ArrowBlock direction={isFirst? "up": (isMiddle?"center": (isLast?"down": "extra"))}/>:custom1}
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
            <OccurrenceItem itemPosition={NaN} custom1={<ArrowBlock  direction={"extra"}/>}
                            custom2={<div className={"flex px-5 gap-5"}>
                                <div className={"flex justify-center items-center text-3xl"}>
                                    +
                                </div>
                                <div className={"text-neutral-500"}>
                                    <div className={"flex justify-between gap-2 items-center text-2xl"}>
                                        <div>New Occurrence</div>
                                    </div>
                                    <div className={"text-right text-sm"}>Click to add a new occurrence to this counter!</div>
                                </div>
                            </div>}/>
        </div>
    </>
    )
}

function App() {

    return (
        <div className={"flex flex-col items-center min-h-full mt-[25vh]"}>
            <MainBox/>
            <Occurrences/>
            <SizeBlock w={60}>
                <div className={"h-0 w-full border-[1px] mt-[5rem] border-neutral-500"}/>
            </SizeBlock>
        </div>
    )
}

export default App
