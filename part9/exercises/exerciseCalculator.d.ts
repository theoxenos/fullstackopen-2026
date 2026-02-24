interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}
export declare const calculateExercises: (dailyExerciseHours: number[], target: number) => ExerciseResult;
export {};
