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
    prompt: `Give me a description of my bakery that ${keywords}.`,
    temperature: 0.7,
    max_tokens: 100,
  };

  console.log(`Give me a description of my bakery that ${keywords}.`);

  const response = await fetch(
    `https://api.openai.com/v1/engines/text-curie-001/completions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + process.env.REACT_APP_OPENAI_TOKEN,
      },
      body: JSON.stringify(openAIInfo),
    }
  );

  const data = await response.json();
  console.log(data.choices[0].text);
  return data.choices[0].text;
};

/**
 * The props for the heading component.
 */
interface HeadingProps {
  updateHistory: (newHistory: CompletionsHistory) => void;
}

/**
 * React function that generates the heading of the home page.
 * @returns the heading of the home page.
 */
export const Heading = ({ updateHistory }: HeadingProps) => {
  const [text, setText] = useState<string>(
    'is fun, sells cookies, and is a great place to be!'
  );
  const [subtitle, setSubtitle] = useState<string>(
    'Welcome to the new site of my bakery! Help me generate a better description...'
  );

  /**
   * Locally updates the stored text upon change of the input field.
   *
   * This function was designed to be used in tandem with the onChange event of the input field.
   *
   * @param event the text modification event with the modified text.
   * */
  const handleTextChange = (event: React.FormEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
    event.preventDefault();
  };

  /**
   * Sends the modified text to the OpenAI API using Axios.
   *
   * @param event the submit event.
   * */
  const handleTextSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    generateNewSubtitle(text).then((newSubtitle: string) => {
      setSubtitle(newSubtitle);

      updateHistory({
        prompt: text,
        result: newSubtitle,
      });
    });

    event.preventDefault();
  };

  /**
   * Formats the subtitles for display by splitting at periods.
   *
   * @returns a formatted list of TSX elements, each with a sentence of description.
   */
  const formatSubtitle = () => {
    const subtitleList = subtitle
      .trim()
      .split('.')
      .filter((s) => s.length > 0);

    return subtitleList.map((sItem: string, index: number) => {
      return (
        <p key={index} className="centered-context-text">
          {sItem + '.'}
        </p>
      );
    });
  };

  return (
    <header className="header-div ">
      <div className="title-div ">
        <h1 className="centered-heading"> Coco's Bakery </h1>
        <hr className="fancy-hr" />
      </div>

      <div className="subtitle-div ">{formatSubtitle()}</div>

      <div className="input-div ">
        <form>
          <p> Give me a description of my bakery that ... </p>
          <input
            type="text"
            className="input-field"
            placeholder="is fun, sells cookies, and is a great place to be!"
            onChange={handleTextChange}
          />
          <input type="submit" value="→" onClick={handleTextSubmit} />
        </form>
      </div>
    </header>
  );
};
