import React from "react";
import "./EmojiCard.scss";

type data = {
  emojiDetails: {
    name: string;
    category: string;
    group: string;
    htmlCode: [string];
    unicode: [string];
  };
};
export default function EmojiCard(props: data) {
  const { htmlCode, name, group, category } = props?.emojiDetails;
  function createMarkup(stringHTML: string) {
    return { __html: stringHTML };
  }
  return (
    <div className="emojiContainerCard">
      <div
        className="emojiImg"
        dangerouslySetInnerHTML={createMarkup(htmlCode?.[0])}
      />
      <div className="emojiName">{name}</div>
      <div className="emojiTitle">Group</div>
      <div className="emojiDescriptions">{`${group}`}</div>
      <div className="emojiTitle">Category</div>
      <div className="emojiDescriptions">{`${category}`}</div>
    </div>
  );
}
