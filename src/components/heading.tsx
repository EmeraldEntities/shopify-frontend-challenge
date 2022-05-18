import React, { useState } from 'react';

import './heading.css';

export const Heading = () => {
  const [changedText, setChangedText] = useState<boolean>(false);

  return (
      <header className="header-div">
          <div className="title-div ">
            <h1 className="centered-heading"> Coco's Bakery </h1>
            <hr className="fancy-hr" />
          </div>
          <div className="subtitle-div ">
            
            {!changedText ? (
              <React.Fragment>
                  <p className="centered-context-text">
                  Hi! I'm Coco. I'm still building my website, and I need some help...
                  </p>
                  <p className="centered-context-text">
                      Can you scroll down and give me some ideas for this site description? I'll keep track of your ideas... and you'll even get to see how it looks like!
                  </p>
              </React.Fragment>
            ) : undefined}
          </div>
      </header>

  );
};
