export interface User {
  id?: string;
  name?: string;
  login: string;
  password: string;
}

export interface Board {
  id?: string;
  title: string;
  description: string;
}

export interface ColumnData {
  columnId: string;
  tasks: Task[];
}

export interface Column {
  id?: string;
  order?: number;
  title: string;
}

export interface Task {
  id?: string;
  order?: number;
  title: string;
  description: string;
  userId: string;
  boardId?: string;
  columnId?: string;
}

export interface AuthState {
  login: string | undefined;
  exp: boolean;
  mode: 'login' | 'registration';
}

export interface SettingsState {
  locale: string;
  theme: string;
  loading: boolean;
}

export interface ModalState {
  visible: Record<string, boolean>;
  id: string | null;
}
