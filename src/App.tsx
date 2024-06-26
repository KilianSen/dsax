import './App.css'
import {useEffect, useState} from "react";
import {deserializeDisplayInformation, OccurrenceItemProps, serializeDisplayInformation} from "./utils/dataModel.ts";
import {OccurrenceList} from "./components/occurrence/OccurrenceList.tsx";
import {sortByDate} from "./utils/dateSort.ts";
import FadeContainer from "./utils/FadeContainer.tsx";
import {Editable} from "./utils/EditSpan.tsx";

function DaysSince({date}: { date: Date }) {
    const [daysSince, setDaysSince] = useState<number>(0)

    useEffect(() => {
        setDaysSince(Math.max(0, Math.ceil((Math.abs(new Date().getTime() - new Date(date).getTime())) / (1000 * 60 * 60 * 24)) -1))
    }, [date])

    return <>{daysSince}</>
}

function MainBox({title, date, setTitle}: { title?: string, date: Date, setTitle: (title: string | undefined) => void }) {
    return (
        <div className={"flex flex-col shrink border-2 rounded-[50px] py-5 mb-[6rem] select-none"}>
            <Editable prefix={"Days since "} value={title} onChange={setTitle}/>
            <div className={"border-[1px] my-5"}></div>
            <div className={"px-10 flex justify-center items-center aspect-video mb-5"}>
                <h1 className={"text-[14rem] text-center align-middle flex justify-center items-center leading-[0]"}>
                    <DaysSince date={date}/>
                </h1>
            </div>
        </div>
    )
}

export default function App() {
    // get the DisplayInformation from the URLParams
    const [title, setTitle] = useState<string | undefined>()
    const [ocs, setOcs] = useState<OccurrenceItemProps[]>([])

    const [shareURL, setShareURL] = useState<string>()

    useEffect(() => {
        const displayInformation = deserializeDisplayInformation(new URLSearchParams(window.location.search).get("import"))
        setOcs(sortByDate(displayInformation.Occurrences))
        setTitle(displayInformation.title)
        console.log(displayInformation)
    }, [])

    const share = () => {
        const s = serializeDisplayInformation({title: title || "", Occurrences: ocs})
        const url = new URL(window.location.href)
        url.searchParams.set("import", s)
        setShareURL(url.href)
    }

    useEffect(() => {
        let timeout = 0
        if (shareURL) {
            timeout = setTimeout(() => {
                setShareURL(undefined)
            }, 10000)
        }
        return () => clearTimeout(timeout)
    }, [shareURL]);

    return (
        <div className={"flex flex-col items-center min-h-full pt-[25vh]"}>
            <MainBox title={title} date={ocs[0]?.date || new Date(Date.now())} setTitle={(t) => {
                setTitle(t)
            }}/>
            <OccurrenceList items={ocs.reverse()} updateItems={(newItems) => {
                setOcs(sortByDate(newItems))
            }}/>
            <div className={"relative m-5 bottom-0 right-0 flex flex-col items-end gap-2 mt-12"}>
                <FadeContainer visible={!shareURL} initial={false}>
                    <div onMouseDown={share}
                         className={"p-4 py-2 rounded-full bg-neutral-900 select-none shrink"}>Share
                    </div>
                </FadeContainer>
                <FadeContainer initial={false} visible={!!shareURL}
                               className={"p-2 rounded-xl bg-neutral-900 select-none"}>
                    <div className={"pb-1 px-2 text-sm text-neutral-500"}>Your share URL</div>
                    <div className={"overflow-ellipsis flex items-center gap-2"}>
                        <div
                            className={"p-1 px-2 bg-neutral-950 rounded-lg text-neutral-300 max-w-[25vw] text-nowrap overflow-scroll"}>{shareURL}</div>
                        <div
                            className={"p-1 bg-neutral-950 rounded-lg"}
                            onClick={() => {
                                navigator.clipboard.writeText(shareURL || "").then(() => setShareURL(undefined))
                            }}>📋
                        </div>
                    </div>
                </FadeContainer>
            </div>
        </div>
    )
}