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
  id: string;
  column: Column;
  tasks: Task[];
}

export interface Column {
  id?: string;
  order?: number;
  title: string;
  boardId?: string;
}

export interface Task {
  id: string;
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
  mode: 'login' | 'registration' | null;
}

export interface SettingsState {
  locale: string;
  theme: string;
  loading: boolean;
  maxHeight: number;
  showOffcanvas: boolean;
}

export interface ModalState {
  visible: Record<string, boolean>;
  data: Board | Column | Task | User | null;
}

export interface usersState {
  all: User[];
  current: User | null;
}

export interface LoginResponse {
  status: number;
  data: {
    token: string;
  };
}
