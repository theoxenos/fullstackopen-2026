import type {NonSensitiveDiaryEntry} from "../types.tsx";

const DiaryEntryList = ({diaries}: { diaries: NonSensitiveDiaryEntry[] }) => {
    return (
        <>
            <h2>Diary Entries</h2>
            {diaries.map(diary => {
                return (
                    <div key={diary.id}>
                        <h3>{diary.date}</h3>
                        <div>visibility: {diary.visibility}</div>
                        <div>weather: {diary.weather}</div>
                    </div>
                )
            })}
        </>
    )
};

export default DiaryEntryList;