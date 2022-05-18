import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { Heading } from '../components/heading';
import { History } from '../components/history';
import CompletionHistory from '../interfaces/completionHistory';

import './home.css';

/**
 * Contains the entire content for the home page. This should be the only place to handle OpenAI requests.
 *
 * @returns the full home page content.
 */
export const Home = () => {
  const [history, setHistory] = useState<CompletionHistory[]>([]);
  const [cookies, setCookies] = useCookies<any>(['user']);
  const [curDescription, setCurDescription] = useState<string>('');


  // Loads in the cookie, and if there is an existing cookie, loads 
  // that in as history and curDescription.
  useEffect(() => {
    if (cookies.history) {
      try { // I don't want malformed cookies!
        const h: CompletionHistory = cookies.history;
        setHistory([h]);
        setCurDescription(h.result);
      } catch (e) {
        console.error(e);
      }
    }
  }, [cookies]);


  const updateHistory = (newHistory: CompletionHistory[]) => {
    setHistory([...newHistory, ...history]);

    // we dont store all history so that we don't run the risk of 
    // going over cookie size limits
    setCookies(
      'history',
      JSON.stringify({
        prompt: newHistory[0].prompt,
        result: newHistory[0].result,
      }),
      { path: '/' }
    );
  };

  
  return (
    <main className="main-section">
      <Heading
        updateHistory={updateHistory}
        description={curDescription === '' ? undefined : curDescription}
      />

      <History history={history} />
    </main>
  );
};
