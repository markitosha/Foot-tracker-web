import { createContext, Dispatch, ReactNode, useCallback, useReducer, useState } from 'react';

export const JsonContext = createContext<{
    allTracks: FileData;
    dispatch: Dispatch<Action>;
    history: Action[];
    restoreTheHistory: (index: number) => void;
}>({
    allTracks: {},
    dispatch: () => null,
    history: [],
    restoreTheHistory: () => null,
});

type BBox = {
    timestamp: string;
    x: number;
    y: number;
    w: number;
    h: number;
};

export type JsonData = {
    box_info: BBox[];
    candidates_list: number[];
}

type FileData = Record<number, JsonData>;

export type Action = {
    type: 'removeCandidate' | 'joinTracks',
    mainId: number,
    candidateId: number,
} | {
    type: 'removeId',
    id: number,
} | {
    type: 'uploadJson',
    data: FileData,
};

const reducer = (prevState: FileData, action: Action) => {
    switch (action.type) {
        case 'uploadJson': {
            return action.data;
        }
        case 'removeId': {
            const newState = structuredClone(prevState);
            delete newState[action.id];

            for (const key in newState) {
                newState[key].candidates_list = newState[key]
                    .candidates_list
                    .filter(value => value !== action.id);
            }

            return newState;
        }
        case 'removeCandidate': {
            return {
                ...prevState,
                [action.mainId]: {
                    ...prevState[action.mainId],
                    candidates_list: prevState[action.mainId]
                        ?.candidates_list
                        .filter(value => value !== action.candidateId)
                }
            };
        }
        case 'joinTracks': {
            const mainTrack = structuredClone(prevState[action.mainId]);
            const candidateTrack = prevState[action.candidateId];

            mainTrack.box_info = mainTrack.box_info.concat(candidateTrack.box_info);
            mainTrack.candidates_list = candidateTrack.candidates_list;

            const newState = structuredClone(prevState);
            newState[action.mainId] = mainTrack;
            delete newState[action.candidateId];

            for (const key in newState) {
                newState[key].candidates_list = newState[key]
                    .candidates_list
                    .filter(value => value !== action.candidateId);
            }

            return newState;
        }
        default: {
            return prevState;
        }
    }
};

export default function JsonProvider({ children }: { children: ReactNode }) {
    // data from the uploaded json
    const [allTracks, dispatch] = useReducer(reducer, {})
    const [history, setHistory] = useState<Action[]>([]);

    const dispatchWithHistory = useCallback((action: Action) => {
        setHistory(history => [...history, action]);
        dispatch(action);
    }, [dispatch, setHistory]);

    const restoreTheHistory = useCallback((index: number) => {
        const newHistory = history.slice(0, index + 1);

        for (let i = 0; i < newHistory.length; i++) {
            dispatch(newHistory[i]);
        }

        setHistory(newHistory);
    }, [history, setHistory, dispatch]);

    return (
        <JsonContext.Provider value={{
            allTracks,
            dispatch: dispatchWithHistory,
            history,
            restoreTheHistory
        }}>
            {children}
        </JsonContext.Provider>
    );
}
