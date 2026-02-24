import * as React from "react";
import type {NewDiaryEntry} from "../types.tsx";
import {Weather, Visibility} from "../types.tsx"

interface DiaryEntryFormProps {
    onNewDiarySubmit?: (newDiaryEntry: NewDiaryEntry) => void
}

const DiaryEntryForm = ({onNewDiarySubmit}: DiaryEntryFormProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (onNewDiarySubmit) {
            onNewDiarySubmit({
                date: e.currentTarget.date.value,
                visibility: e.currentTarget.visibility.value,
                weather: e.currentTarget.weather.value,
                comment: e.currentTarget.comment.value,
            });
        }
        
        e.currentTarget.reset();
    };

    return (
        <div>
            <h2>Diary Entry Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="date">Date</label>
                    <input type="date" id="date" name="date"/>
                </div>
                <div>
                    <label htmlFor="visibility">Visibility</label>
                    {Object.entries(Visibility).map(([key, value]) => (
                        <label key={key}>
                            <input type="radio" id={key} name="visibility" value={value}/>
                            {key}
                        </label>
                    ))}
                </div>
                <div>
                    <label htmlFor="weather">Weather</label>
                    {Object.entries(Weather).map(([key, value]) => (
                        <label key={key}>
                            <input type="radio" id={key} name="weather" value={value}/>
                            {key}
                        </label>
                    ))}
                </div>
                <div>
                    <label htmlFor="comment">Comment</label>
                    <input type="text" id="comment" name="comment"/>
                </div>
                <div>
                    <input type="submit" value="add"/>
                </div>
            </form>
        </div>
    );
};

export default DiaryEntryForm;