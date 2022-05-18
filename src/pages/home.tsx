import React, {useState} from 'react';

import { Heading } from '../components/heading';
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
    }

    return (
        <main className='main-section'>
            <Heading updateHistory={updateHistory} />

            <section className="section-div debug">

            </section>
        </main>
    );
}