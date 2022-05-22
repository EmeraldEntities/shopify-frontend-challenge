import React, { useEffect, useState } from 'react';

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
    prompt: `Write a promotion for Coco's bakery that ${keywords}.`,
    temperature: 0.7,
    max_tokens: 100,
  };

  // use curie to save me money while still being good
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
  return data.choices[0].text;
};


/**
 * The props for the heading component.
 */
interface HeadingProps {
  updateHistory: (newHistory: CompletionsHistory[]) => void;
  description?: string;
}


/**
 * React function that generates the heading of the home page.
 * @returns the heading of the home page.
 */
export const Heading = ({ updateHistory, description }: HeadingProps) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [subtitleChanged, setSubtitleChanged] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  const defaultText = `Hi, I'm Coco the Chicken! 
  I'm right now in my assets kitchen, cooking up some cookies—
  feel free to drop by when you're examining the code. 
  Welcome to the new site of my bakery! 
  Help me generate a better description :)`;
  const [subtitle, setSubtitle] = useState<string>(defaultText);


  // Sets the scrolled state to true when the user scrolls down.
  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);

    // Clean up the event listener we added
    return () => {
      window.removeEventListener('scroll', listenScrollEvent);
    };
  }, []);


  // Fills in the old description if provided.
  useEffect(() => {
    if (description) {
      setSubtitle(description);
      setSubtitleChanged(true);
    }
  }, [description]);


  /**
   * Determines if the user scrolled away from the top of the page and modifies state if so.
   *
   * @param e the scroll event.
   */
  const listenScrollEvent = (e: Event) => {
    if (window.scrollY > 150) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };


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
    const textForGeneration = text.trim();
    setText('');

    generateNewSubtitle(textForGeneration).then((newSubtitle: string) => {
      setSubtitleChanged(true);
      setSubtitle(newSubtitle);

      updateHistory([
        {
          prompt: text,
          result: newSubtitle,
        },
      ]);
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
      .split(/(?<=[!.?])/g)
      .filter((s) => s.length > 0);

    return subtitleList.map((sItem: string, index: number) => {
      return (
        <p
          key={index}
          className="centered-context-text"
          style={{ color: subtitleChanged ? 'black' : '#791dd0' }}
        >
          {sItem}
        </p>
      );
    });
  };


  return (
    <header className="header-div">
      <div className="title-div ">
        <h1 className="centered-heading"> Coco's Bakery </h1>
        <hr className="fancy-hr" />
      </div>

      <div className="subtitle-div ">{formatSubtitle()}</div>

      {/* <div
        className="input-div "
        style={{
          backgroundColor: scrolled ? '#fa7aefbb' : '#fa7aef52',
          color: scrolled ? '#f1f1f1' : '#414040',
        }}
      >
        <form>
          <p> Give me a description! My bakery... </p>
          <input
            type="text"
            className="input-field"
            value={text.length > 0 ? text : ''}
            placeholder="is fun, sells cookies, and is a great place to be!"
            onChange={handleTextChange}
          />
          <input type="submit" value="→" onClick={handleTextSubmit} />
        </form>
      </div> */}
    </header>
  );
};
