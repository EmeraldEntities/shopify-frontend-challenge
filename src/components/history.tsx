import React, {useState, useEffect} from "react";

import CompletionHistory from "../interfaces/completionHistory";

import './history.css';

/**
 * The props for the history component.
 */
interface HistoryProps {
    history: CompletionHistory[];
}

/**
 * Creates the content for the History section of the main page.
 * 
 * @param param0 the props for the history component.
 * @returns the history section of the main page
 */
export const History = ({ history }: HistoryProps) => {
    const [historyItems, setHistoryItems] = useState<CompletionHistory[]>([]);

    useEffect(() => {
        setHistoryItems(history);
    }, [history]);


    /**
     * Formats the list of history items into TSX.
     * 
     * @returns the actual history, formatted.
     */
    const formatHistoryItems = () => {
        return historyItems.map((item, index) => {
            return (
                <li key={index} className='history-list-elem'>
                    <section>
                        <p className="aside-text">You said my bakery...</p>
                        <h3>{item.prompt}</h3>
                    </section>
                    <section>
                    <p className="aside-text">so I changed my description to...</p>
                    <p className='result-description'>{item.result}</p>
                    </section>
                </li>
            );
        });
    }


    return (
        <section className='history-div'>
            <h2> Suggestions </h2>
            <p className="coco-speak"> Don't worry! I'll keep track of all your helpful renditions right here, in case you like one. </p>
            <hr className="fancy-hr"/>

            <ul className="history-list">
                {formatHistoryItems()}
            </ul>
        </section>
    );
};