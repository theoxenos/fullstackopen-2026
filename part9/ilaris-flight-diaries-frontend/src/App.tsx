import {useEffect, useState} from "react";
import type {ErrorResponse, NewDiaryEntry, NonSensitiveDiaryEntry} from "./types.tsx";
import DiaryEntryList from "./components/DiaryEntryList.tsx";
import DiaryEntryForm from "./components/DiaryEntryForm.tsx";
import Notify from "./components/Notify.tsx";

const App = () => {
    const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([])
    const [messages, setMessages] = useState<string[]>([])

    useEffect(() => {
        (async () => {
            const result = await fetch('/api/diaries')
            const data: NonSensitiveDiaryEntry[] = await result.json()
            setDiaries(data)
        })()
    }, [])

    const handleNewDiaryEntry = async (newDiaryEntry: NewDiaryEntry) => {
        const response = await fetch('/api/diaries', {
            method: "POST",
            body: JSON.stringify(newDiaryEntry),
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) {
            const {error} = await response.json();
            setMessages(error.map((error: ErrorResponse) => {
                const invalidProperty = error.path[0] as keyof NewDiaryEntry;
                return `Incorrect ${invalidProperty}: ${newDiaryEntry[invalidProperty]}`
            }));
            setTimeout(() => setMessages([]), 5000);
        }
        setDiaries([...diaries, await response.json()]);
    }

    return (
        <>
            <Notify messages={messages}/>
            <DiaryEntryForm onNewDiarySubmit={handleNewDiaryEntry}/>
            <DiaryEntryList diaries={diaries}/>
        </>
    );
};

export default App
