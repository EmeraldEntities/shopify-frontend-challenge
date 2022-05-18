import React from "react";

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

    // use the list of history items and format
    const historyItems = history.map((item, index) => {
        return (
            <li key={index} className='history-list-elem'>
                <div className='left-aligned-div'>
                    <p className="aside-text">You said my bakery...</p>
                    <h3>{item.prompt}</h3>
                    <p className="aside-text">so I changed my description to...</p>
                </div>
                <p className='result-description'>{item.result}</p>
            </li>
        );
    }).reverse();

    return (
        <section className='history-div'>
            <h2> Suggestions </h2>
            <p className="coco-speak"> Don't worry! I'll keep track of all your helpful renditions right here, in case you like one. </p>
            <hr className="fancy-hr"/>

            <ul className="history-list">
                {historyItems}
            </ul>
        </section>
    );
};