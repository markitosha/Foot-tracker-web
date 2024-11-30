import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import jsonData from '../assets/tracks_and_candidates_v4.json';

export const JsonContext = createContext<{
    allTracks: FileData;
    dispatch: Dispatch<Action>;
}>({
    allTracks: {},
    dispatch: () => null,
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


type Action = {
    type: 'removeCandidate' | 'joinTracks',
    mainId: number,
    candidateId: number,
};

const reducer = (prevState: FileData, action: Action) => {
    switch (action.type) {
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
    const [allTracks, dispatch] = useReducer(reducer, jsonData as FileData)

    return (
        <JsonContext.Provider value={{
            allTracks,
            dispatch
        }}>
            {children}
        </JsonContext.Provider>
    );
}
