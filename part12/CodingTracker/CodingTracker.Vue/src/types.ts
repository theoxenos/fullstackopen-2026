export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  sessions: Session[];
}

export interface Session {
  id: number;
  startTime: string;
  endTime: string;
  projectId: number;
}

export type ProjectDto = Omit<Project, 'id'>;

export interface ProjectListProps {
  projects: Project[];
}

export interface ProjectFormProps {
  project: Project;
}

export interface ProjectFormEmits {
  (event: 'onCreateProject', project: ProjectDto): void;
}

export interface ProjectFormEmits {
  (event: 'onCancel'): void;
}

export interface ProjectFormEmits {
  (event: 'onDelete'): void;
}

export interface ProjectFormEmits {
  (event: 'onEdit'): void;
}

export interface ProjectFormEmits {
  (event: 'onEditProject', project: Project): void;
}
