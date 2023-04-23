import { Project } from './project.interface';

interface BaseWrapup {
  done: string;
  planned: string;
  blockers: string;
  day: string;
}

export interface Wrapup extends BaseWrapup {
  id: string;
}

export interface WrapupCreation extends BaseWrapup {
  projectId: Project['id'];
}
