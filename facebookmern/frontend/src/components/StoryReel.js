import React from "react";
import "../Styles/StoryReel.css";
import Story from "./Story";

function StoryReel() {
  return (
    <div className="storyReel">
      <Story
        image="../pics/story-pic-david.jpg"
        profileSrc="../pics/david-profilePic.jpg"
        title="David Hasselhoff"
      />
      <Story
        image="../pics/story-pic-john.jpg"
        profileSrc="../pics/john-profilePic.jpg"
        title="John Travolta"
      />
      <Story
        image="../pics/story-pic-chuck.jpg"
        profileSrc="../pics/story-pic-chuck.jpg"
        title="Chuck Norris"
      />
    </div>
  );
}

export default StoryReel;
