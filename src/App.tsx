import React, { useEffect, useState } from "react";
import "./App.scss";
import EmojiCard from "./EmojiCard";

type apischema = {
  name: string;
  category: string;
  group: string;
  htmlCode: [string];
  unicode: [string];
};

function App() {
  const [emojiInfo, setEmojiInfo] = useState<apischema[] | null>(null);
  const [possibleCategory, setCategory] = useState<string[] | null>(null);
  const [isLoading, setLoadingInfo] = useState(false);
  const [isSuccess, setSuccessInfo] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState<null | string>(null);

  useEffect(() => {
    setLoadingInfo(true);
    const url =
      selectedFilter === null
        ? "https://emojihub.yurace.pro/api/all"
        : `https://emojihub.yurace.pro/api/all/category/${selectedFilter}`;

    fetch(url)
      .then((response) => response.json())
      .then((json: apischema[]) => {
        setEmojiInfo(json);
        setSuccessInfo(true);
        if (selectedFilter === null) {
          setCategory([...new Set(json?.map((e: apischema) => e.category))]);
        }
      })
      .finally(() => {
        setLoadingInfo(false);
      });
  }, [selectedFilter]);

  return (
    <div className="app">
      <h1 className="appTitle">Emoji Search</h1>

      {isSuccess && (
        <div className="filterContainer">
          <div className="filterButtonGroup">
            <div className="filterTitle">Filter By : </div>

            {possibleCategory?.map((type) => (
              <div
                className={
                  selectedFilter === type
                    ? "filterButton selected"
                    : "filterButton"
                }
                onClick={() => setSelectedFilter(type)}
              >
                {type}
              </div>
            ))}
          </div>
        </div>
      )}
      {isLoading && (
        <h1 className="appTitle">Loading Details Please wait....</h1>
      )}
      {!isLoading && isSuccess && (
        <div className="mainContainer">
          {Array.isArray(emojiInfo) &&
            emojiInfo?.length > 0 &&
            emojiInfo?.map((emoji) => <EmojiCard emojiDetails={emoji} />)}
        </div>
      )}
    </div>
  );
}

export default App;
