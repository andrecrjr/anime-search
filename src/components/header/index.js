import React, { useContext } from "react";
import { AnimeContext } from "../contexts";
import { useHistory } from "react-router-dom";

export function Header() {
  const { state } = useContext(AnimeContext);
  const history = useHistory();

  const findAnime = (e) => {
    e.preventDefault();
    if (state.selected.cont > 0) {
      window.scroll(0, 300);
    }
    if(document.querySelector("header").classList.contains("larger--height")){
    document.querySelector("header.header").classList.remove("larger--height");}
    history.push("/browser");
  };

  return (
    <header
      className={`header${state.selected.cont > 0 ? "" : `__browser`}`}
      style={{
        backgroundImage: `url('${state && state.selected.bannerImage}')`,
      }}
    >
      <h1
        className="header--logo"
        style={{
          textShadow: `0px 0px 6px ${
            state.selected.cont > 0 ? state.selected.coverImage.color : "white"
          }`,
        }}
      >
        AnimeBonds
      </h1>
      <span
        className="header--search"
        role="img"
        aria-label="search"
        onClick={(e) => findAnime(e)}
      >
        🔎
      </span>
      {state.selected.cont > 0 && (
        <>
          <HeaderAnime anime={state.selected} />
          <div className="shadows"></div>
        </>
      )}
    </header>
  );
}

const HeaderAnime = ({ anime }) => {
  
  const history = useHistory();
  React.useEffect(()=>{
    document
    .querySelector("header")
    .classList.remove("larger--height");
  },[anime])

  const desktopOpen = () => {
    if (window.innerWidth >= 661) {
      document
        .querySelector("header.header")
        .classList.toggle("larger--height");
    }
  };
  const redirectPage = (e, animeId) => {
    e.preventDefault();
    history.push(`/anime/${animeId}`);
    window.scroll(0, 500);
    desktopOpen();
  };
  if (anime)
    return (
      <div className="header__anime">
        <img
          className="header__anime--image"
          src={anime?.coverImage?.large}
          alt={anime.title.english}
        />
        <div className="header__anime--title-area">
          <h1 className="header__anime--title">
            {anime?.title?.userPreferred}
          </h1>
          <button
            className="header__anime--more"
            style={{ background: anime.coverImage.color }}
            onClick={(e) => redirectPage(e, anime.id)}
          >
            Read about!
          </button>
        </div>
      </div>
    );
};
