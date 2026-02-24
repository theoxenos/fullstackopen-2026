import type {
    CoursePart,
    CoursePartBackground,
    CoursePartBasic,
    CoursePartGroup,
    CoursePartRequirements
} from "../types.ts";
import {assertNever} from "../utils.ts";
import styles from "./Part.module.css";

function PartBasic(props: { part: CoursePartBasic }) {
    return <div className={styles["m-2"]}>
        <h2 className={styles["m-0"]}>{props.part.name} {props.part.exerciseCount}</h2>
        <em className={styles["m-0"]}>{props.part.description}</em>
    </div>;
}

function PartGroup(props: { part: CoursePartGroup }) {
    return <div className={styles["m-2"]}>
        <h2 className={styles["m-0"]}>{props.part.name} {props.part.exerciseCount}</h2>
        <p className={styles["m-0"]}>project exercises: {props.part.groupProjectCount}</p>
    </div>;
}

function PartBackground(props: { part: CoursePartBackground }) {
    return <div className={styles["m-2"]}>
        <h2 className={styles["m-0"]}>{props.part.name} {props.part.exerciseCount}</h2>
        <em className={styles["m-0"]}>{props.part.description}</em>
        <p className={styles["m-0"]}>more information: <a
            href={props.part.backgroundMaterial}>{props.part.backgroundMaterial}</a></p>
    </div>;
}

function PartSpecial(props: { part: CoursePartRequirements }) {
    return <div className={styles["m-2"]}>
        <h2 className={styles["m-0"]}>{props.part.name} {props.part.exerciseCount}</h2>
        <em className={styles["m-0"]}>{props.part.description}</em>
        <p className={styles["m-0"]}>required skills: {props.part.requirements.join(", ")}</p>
    </div>;
}

const Part = ({part}: { part: CoursePart }) => {
    switch (part.kind) {
        case "basic":
            return <PartBasic part={part}/>
        case "group":
            return <PartGroup part={part}/>
        case "background":
            return <PartBackground part={part}/>
        case "special":
            return <PartSpecial part={part}/>
        default:
            return assertNever(part)
    }
};

export default Part;