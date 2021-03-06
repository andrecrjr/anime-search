import React, { useContext } from "react";
import { AnimeContext, PageContext } from "../contexts/";
import { useHistory } from "react-router-dom";

function Cells({ data }) {
  return (
    <>
      {data.media.map((item) => (
        <AnimeCell
          item={item}
          key={item.id}
          index={item.id}
        />
      ))}
    </>
  );
}

function AnimeCell({ item, index }) {
  const { dispatchAnime } = useContext(AnimeContext);
  const { pageState } = useContext(PageContext)
  const history = useHistory();
  return (
    <section
      className="list__cell"
      onClick={(e) => {
        e.preventDefault();
        if (typeof pageState !== "undefined" && pageState.search.search) {
          history.push(`/anime/${item.id}`, {
            animeBack: encodeURIComponent(pageState.search.textSearch),
          });
        } else {
          dispatchAnime({ type: "SELECT_ANIME", payload: item });
          
          history.push("/");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
    >
      <img
        src={item.coverImage.large}
        className={`list__cell--item ${index}`}
        alt={index}
      />
    </section>
  );
}

export default Cells;
