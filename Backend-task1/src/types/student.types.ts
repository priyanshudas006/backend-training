export interface CreateStudentDto {
  name: string;
  course: string;
  age: number;
}

export interface UpdateStudentDto {
  name?: string;
  course?: string;
  age?: number;
}

export interface Student {
  id: string;
  name: string;
  course: string;
  age: number;
  created_at?: string;
}