export type TaskType = {
    id: string;
    title: string;
    description: string;
    status: StatusButtonPropsType["status"];
    notification: boolean;
    startDate: Date;
    startTime: string;
    endDate: Date;
    endTime: string;
}


export type TaskListPropsType = {
  tasks: TaskType[];
}

export type TaskContextType = {
  openNewTask: boolean;
  setOpenNewTask: (value: boolean) => void;
  openCalendar: boolean;
  setOpenCalendar: (value: boolean) => void;
  tasks: TaskType[];
  setTasks: (tasks: TaskType[]) => void;
  addTask: (task: TaskType) => void;
  getTaskById: (id: string) => TaskType;
  deleteTaskById: (id: string) => TaskType[];
  editTaskById: (id: string, updatedTask: TaskType) => void;
  filterByDate: (date: Date) => void;
  filterTasks: TaskType[];
  setFilterTasks: (tasks: TaskType[]) => void;
} 

export type PopupPropsType = {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: React.ReactNode
  }

export type ModalPropsType = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export type CalendarHeaderPropsType = {
    currentDate: Date;
    onMonthChange: (monthIndex: number) => void;
    onYearChange: (year: number) => void;
}

export type CalendarGridPropsType = {
  days: (Date | null)[];
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

export type DropDownPropsType = {
  items: Array<{ label: string; value: string | number }>;
  selected: string | number;
  onSelect: (value: string | number) => void;
  disabled?: boolean;
  headerStyled?: boolean;
}

export type DateTimePopupPropsType = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (date: Date) => void;
  value: string;
  chooseDate?: Date;
  onCancel?: () => void;
  onChange: (time: string) => void;
}

export type DateTimeButtonPropsType = {
  value: string;
  onClick: () => void;
}

export type TaskInputPropsType = {
  type?: 'text' | 'textarea';
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export type StatusButtonPropsType = {
  status: 'To Do' | 'Not Start' | 'Processing' | 'Completed';
  onChange: (status: string | number) => void;
  addStage?: boolean
}

export type NotificationPropsType = {
  isEnabled: boolean;
  setIsEnabled: () => void;
}

export type CalendarPropsType = {
  selectedDate: Date;
  onChange: (date: Date) => void
}

export type DayHeaderPropsType =  CalendarPropsType

export type AlertPopupPropsType = {
  message?: string,
  type?: "success" | "error",
  duration?: number,
  onClose?: () => void,
  show?: boolean
}

export type AlertType = "success" | "error";

export type AlertContextPropsType = {
  showAlert: (message: string, type?: AlertType) => void
  hideAlert: () => void
  message: string,
  type: AlertType,
  isVisible: boolean
}