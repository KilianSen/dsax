import './App.css'
import {useEffect, useState} from "react";
import {deserializeDisplayInformation, OccurrenceItemProps} from "./utils/dataModel.ts";
import {OccurrenceList} from "./components/occurrence/OccurrenceList.tsx";
import {sortByDate} from "./utils/dateSort.ts";

function MainBox({title, date}: { title: string, date: Date }) {
    const [daysSince, setDaysSince] = useState<number>(0)

    useEffect(() => {
        const date1 = new Date(date)
        const date2 = new Date()
        const diffTime = Math.abs(date2.getTime() - date1.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        setDaysSince(Math.max(0, diffDays -1))
    }, [date])

    return (
        <div className={"flex flex-col shrink border-2 rounded-[50px] py-5 mb-[6rem]"}>
            <div className={"px-10 text-4xl"}>
                <h1>Days since {title}</h1>
            </div>
            <div className={"border-[1px] my-5"}></div>
            <div className={"px-10 flex justify-center items-center aspect-video mb-5"}>
                <h1 className={"text-[14rem] text-center align-middle flex justify-center items-center leading-[0]"}>{daysSince}</h1>
            </div>
        </div>
    )
}

function App() {
    // get the DisplayInformation from the URLParams
    const [title, setTitle] = useState<string>("")
    const [ocs, setOcs] = useState<OccurrenceItemProps[]>([])

    useEffect(() => {
        const displayInformation = deserializeDisplayInformation(new URLSearchParams(window.location.search).get("ugc"))
        setOcs(sortByDate(displayInformation.Occurrences))
        setTitle(displayInformation.title)
    }, [])

    return (
        <div className={"flex flex-col items-center min-h-full pt-[25vh]"}>
            <MainBox title={title} date={ocs[0]?.date || new Date(Date.now())}/>
            <OccurrenceList items={ocs.reverse()} updateItems={(newItems) => {setOcs(sortByDate(newItems))}}/>
        </div>
    )
}



export default App
