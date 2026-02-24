import type {CoursePart} from "../types.ts";
import Part from "./Part.tsx";

const Content = ({courseParts}: { courseParts: CoursePart[] }) => {
    return (
        <>
            {courseParts.map((part, index) => (
                <Part key={index} part={part}/>
            ))}
        </>
    );
};

export default Content;