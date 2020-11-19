import React from "react";
import "../Styles/Post.css";
import { Avatar } from "@material-ui/core";
//iconst
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import NearMeIcon from "@material-ui/icons/NearMe";
import ExpandMoreOutlined from "@material-ui/icons/ExpandMoreOutlined";
import AccountCircleIclon from "@material-ui/icons/AccountCircle";

function Post({ profilePic, imgName, username, timestamp, message }) {
  return (
    <div className="post">
      <div className="post__top">
        <Avatar src={profilePic} className="post__avatar" />
        <div className="post__topInfo">
          <h3>{username}</h3>
          <p>{new Date(parseInt(timestamp)).toUTCString()}</p>
        </div>
      </div>
      <div className="post__bottom">
        <p>{message}</p>
      </div>

      {imgName ? (
        <div className="post__image">
          <img
            src={`https://my-fakebook.herokuapp.com/retrieve/images/single?name=${imgName}`}
          />
        </div>
      ) : (
        console.log(">>> no image here :{}")
      )}

      <div className="post__options">
        <div className="post__option">
          <ThumbUpIcon />
          <p>Like</p>
        </div>
        <div className="post__option">
          <ChatBubbleOutlineIcon />
          <p>Comment</p>
        </div>
        <div className="post__option">
          <NearMeIcon />
          <p>Share</p>
        </div>
        <div className="post__option">
          <AccountCircleIclon />
          <ExpandMoreOutlined />
        </div>
      </div>
    </div>
  );
}

export default Post;
