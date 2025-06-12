import React from "react";
import { useParams } from "react-router-dom";
import "./CharacterComics.css";

function CharacterComics() {
  const { characterId } = useParams();

  return (
    <div className="character-comics-page">
      <h1>Comics for Character</h1>
      <p>Character ID: {characterId}</p>
      {/* comics list for this character will be displayed here */}
    </div>
  );
}

export default CharacterComics; 