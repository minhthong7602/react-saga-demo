export interface Student {
  id?: string;
  name: string;
  age: number;
  mark: string;
  gender: 'male' | 'female';
  city: string;

  createdAt?: number;
  updatedAt?: number;
}