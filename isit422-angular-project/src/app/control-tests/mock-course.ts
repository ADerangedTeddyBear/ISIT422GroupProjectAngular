export interface Course {
    id: number;
    name: string;
    teacher_id: number;
    student_ids: number[];
    project_ids: number[];
}