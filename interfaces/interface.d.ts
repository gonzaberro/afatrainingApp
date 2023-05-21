import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { NextRouter } from "next/router";
export interface Pages {
  title?: string;
  icon: IconDefinition;
  trainerAccess: boolean;
  hidePageContainer: boolean;
  hideSideBar: boolean;
  hideNavBar: boolean;
}

export interface AsideOption {
  icon: IconDefinition;
  label: string;
  route: string;
  trainerAccess: boolean;
  redirect: (router: NextRouter, user: User) => void;
}

export interface User {
  email: string;
  displayName: string;
  photoURL: string;
  uid: string;
  isTrainer: boolean;
  isVerified: boolean;
  asignedTrainer: string;
  remote: boolean;
  objective: string;
  isAdmin: boolean;
  peso: string;
  observaciones: string;
  deporte: string;
  altura: string;
  nacimiento: string;
}

export interface Roles {
  isTrainer: boolean;
  isAdmin: boolean;
}

export interface Button {
  text?: string;
  icon?: IconDefinition;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | any) => void;
  onMouseDown?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => void;
  type: string;
}
export interface Options {
  label: string;
  value?: number | string;
}

export interface Exercise {
  name: string;
  urlVideo: string;
  description: string;
  id: string;
}

export interface ExerciseInformation {
	modified: string;
	modifiedBy: string;
	observations: string;
	weight: string;
	serie: string;
}

export interface ExerciseRecords {
	planificationName: string;
	planificationDate: string;
	planificationMonth: string;
	exerciseRecords: ExerciseInformation[];
}

export type GroupedRecords = Record<string, ExerciseRecords>;

export interface ExerciseObject {
	categories: Record<string, Record<string, Exercise[]>>;
}
export interface ExerciseState {
	categories: Record<string, Record<string, Exercise[]>>;
	userExercises: Record<string, ExerciseInformation[]>;
}

export interface Planification {
  uid: string;
  name: string;
  objective: string;
  days: number;
  duration: string;
  planificationDays: Record<string, string[]>;
}

export interface Label {
  text?: string;
  icon?: IconDefinition;
}

export interface Filters {
  show?: boolean;
  myStudents: boolean;
  remote: boolean;
  notRemote: boolean;
  verified: boolean;
  notVerified: boolean;
  trainers: boolean;
  students: boolean;
  noTrainer: boolean;
}

export type CategoryExercises = Record<string, Record<string, Exercise[]>>;

export interface InputExerciseConfiguration {
  categoryToShow: string;
  icon: IconDefinition;
  selectValueProperty?: string;
  inputValueProperty?: string;
  options?: Options[];
  title: string;
  placeholder?: string;
  hideSelect?: boolean;
  type?: string;
}

/*---------*/

export interface ExerciseSeries {
  repsInput: string;
  repsSelect: string;
  chartInput: string;
  chartSelect: string;
  stopWatchInput: string;
  stopWatchSelect: string;
  weight: string;
  pause: string;
  text: string;
}

export interface ExerciseConfiguration {
  id: string;
  category: string;
  subCategory: string;
  series: ExerciseSeries[];
}

export interface BlockExercise {
  series: number;
  macropause: string;
  exercises: ExerciseConfiguration[];
}

export type Block = Record<string, BlockExercise>;
export type PlanificationBlocks = Record<string, Block>;
