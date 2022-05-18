import React, {useState} from 'react';

import { Heading } from '../components/heading';
import { History } from '../components/history';
import CompletionHistory from '../interfaces/completionHistory';

import "./home.css";

/**
 * Contains the entire content for the home page. This should be the only place to handle OpenAI requests.
 * 
 * @returns the full home page content.
 */
export const Home = () => {
    const [history, setHistory] = useState<CompletionHistory[]>([]);

    const updateHistory = (newHistory: CompletionHistory) => {
        setHistory([...history, newHistory]);
        console.log(history);
    }

    return (
        <main className='main-section'>
            
            <Heading updateHistory={updateHistory} />

            <History history={history} />
        </main>
    );
}