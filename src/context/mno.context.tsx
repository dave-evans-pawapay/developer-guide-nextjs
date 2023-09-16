"use client";
import {createContext, Dispatch, useReducer} from "react";

type ActionType = {
    type: string;
    payload: string;
}

type StateType = {
    mno: string;
    country: string;
    codeBody: string;
}

const initialState: StateType = {
    mno: '',
    country: '',
    codeBody: ''
}

const reducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'UPDATE_MNO':
            return {
                ...state,
                mno: action.payload
            }
        case 'UPDATE_COUNTRY':
            return {
                ...state,
                country: action.payload
            }
        case 'UPDATE_CODE_BODY':
            return {
                ...state,
                codeBody: action.payload
            }
        default:
            return state;
    }
}

export const MsisdnContext= createContext<{
    state: StateType;
    dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null});

export const MsisdnContextProvider = ({
    children,
}: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <MsisdnContext.Provider value={{ state, dispatch }}>
            {children}
        </MsisdnContext.Provider>
    );
};
