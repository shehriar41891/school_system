import React, { createContext, useContext, useReducer } from 'react';
import { mockStudents, mockTeachers, mockClasses, mockFees, mockNotices, Student, Teacher } from '../data/mockData';

interface DataState {
  students: Student[];
  teachers: Teacher[];
  classes: typeof mockClasses;
  fees: typeof mockFees;
  notices: typeof mockNotices;
}

type DataAction = 
  | { type: 'ADD_STUDENT'; payload: Student }
  | { type: 'UPDATE_STUDENT'; payload: Student }
  | { type: 'DELETE_STUDENT'; payload: string };

const DataContext = createContext<{
  state: DataState;
  dispatch: React.Dispatch<DataAction>;
} | undefined>(undefined);

function dataReducer(state: DataState, action: DataAction): DataState {
  switch (action.type) {
    case 'ADD_STUDENT':
      return { ...state, students: [...state.students, action.payload] };
    case 'UPDATE_STUDENT':
      return {
        ...state,
        students: state.students.map(s => s.id === action.payload.id ? action.payload : s)
      };
    case 'DELETE_STUDENT':
      return {
        ...state,
        students: state.students.filter(s => s.id !== action.payload)
      };
    default:
      return state;
  }
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(dataReducer, {
    students: mockStudents,
    teachers: mockTeachers,
    classes: mockClasses,
    fees: mockFees,
    notices: mockNotices
  });

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
