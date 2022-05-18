import React, { useState } from 'react';
import openAI from 'openai';

import './heading.css';
import CompletionsHistory from '../interfaces/completionHistory';


/**
 * Given a list of keywords, calls OpenAI's API to get an entirely new site description.
 * 
 * @param prompt the prompt to send to openAI for parsing.
 * @returns the new string.
 */
const generateNewSubtitle = async (keywords: string) => {
  const openAIInfo = {
    prompt: prompt,
    temperature: 0.7,
    max_tokens: 100,
  }

  const response = await fetch(`https://api.openai.com/v1/engines/text-curie-001/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.REACT_APP_OPENAI_TOKEN,
    },
    body: JSON.stringify(openAIInfo),
  });

  const data = await response.json();
  console.log (data.choices[0].text);
  return data.choices[0].text;
}



interface HeadingProps {
  updateHistory: (newHistory: CompletionsHistory) => void;
}

/**
 * React function that generates the heading of the home page.
 * @returns the heading of the home page.
 */
export const Heading = ( {updateHistory}: HeadingProps ) => {
  const [text, setText] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('This... welcome to my bakery???');


  /** 
   * Locally updates the stored text upon change of the input field.
   * 
   * This function was designed to be used in tandem with the onChange event of the input field.
   * 
   * @param event the text modification event with the modified text.
   * @returns void
   * */
  const handleTextChange = (event: React.FormEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
    event.preventDefault();
  }

  /** 
   * Sends the modified text to the OpenAI API using Axios.
   * 
   * @param event the submit event.
   * @returns void
   * */
  const handleTextSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    generateNewSubtitle(subtitle).then((newSubtitle: string) => {
      setSubtitle(newSubtitle);

      updateHistory({
        prompt: text,
        result: newSubtitle,
      });

      setText('')
    });
    
    event.preventDefault();
  }


  return (
      <header className="header-div">
        <div className="title-div ">
          <h1 className="centered-heading"> Coco's Bakery </h1>
          <hr className="fancy-hr" />
        </div>

        <div className="subtitle-div ">    
          <p className="centered-context-text">
            {subtitle}
          </p>
        </div>

        <div className="input-field debug">
          <form>
            <input type="text" placeholder="Give me an idea, or some keywords!..." onChange={handleTextChange} />
            <input type="submit" value="Submit" onClick={handleTextSubmit} />
          </form>
        </div>
      </header>

  );
};
