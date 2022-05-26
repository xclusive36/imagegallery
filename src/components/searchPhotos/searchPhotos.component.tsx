import React, { useState } from "react";
import { ReactComponent as Logo } from "../../assets/search-svgrepo-com.svg";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import "./searchPhotos.styles.scss";

import { createApi } from "unsplash-js";

const unsplash = createApi({
    accessKey: "LfRJ9gHzqO9WaVvO20t8qsB1yDBKo5nkZr0CEJC327w",
});
// const unsplash = new createApi({
//   accessKey: "LfRJ9gHzqO9WaVvO20t8qsB1yDBKo5nkZr0CEJC327w",
// });

export default function SearchPhotos() {
    const [query, setQuery] = useState({ query: "" });
    const [pics, setPics] = useState<any>([]);

    const [isOpen, setIsOpen] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);

    const searchPhotos = async (e?: any) => {
        e?.preventDefault();
        unsplash.search.getPhotos(query).then((result) => {
            setPics(result.response?.results);
            console.log(result.response?.results);
        });
        // .then(result=>{console.log(result.response)});
    };

    return (
        <div>
            <div className="search-box">
                <form
                    onSubmit={searchPhotos}
                    className="searchbox sbx-facebook"
                >
                    <div role="search" className="sbx-facebook__wrapper">
                        <input
                            type="search"
                            name="query"
                            placeholder={`Try "dog" or "apple"`}
                            className="sbx-facebook__input"
                            value={query.query}
                            onChange={(e) =>
                                setQuery({ query: e.target.value })
                            }
                        />
                        <button
                            type="submit"
                            title="Submit your search query."
                            className="sbx-facebook__submit"
                        >
                            <Logo className="sbx-facebook__submit" />
                        </button>
                    </div>
                </form>
            </div>
            <div className="nav-links-container">
                <form onSubmit={searchPhotos}>
                    <button className="myButton" onClick={() => setQuery({ query: "Cats" })}>
                        Cats
                    </button>
                    <button className="myButton" onClick={() => setQuery({ query: "Dogs" })}>
                        Dogs
                    </button>
                    <button className="myButton" onClick={() => setQuery({ query: "Cars" })}>
                        Cars
                    </button>
                </form>
            </div>
            <div className="card-list">
                {pics.map(
                    (pic: {
                        id: React.Key | null | undefined;
                        alt_description: string | undefined;
                        urls: { small: string | undefined };
                    }, index: React.SetStateAction<number>) => (
                        <div className="card" key={pic.id} onClick={() => {setImgIndex(index);setIsOpen(true);}}>
                            <img
                                className="card--image"
                                alt={pic.alt_description}
                                src={pic.urls.small}
                                width="50%"
                                height="50%"
                            ></img>
                        </div>
                    )
                )}
            </div>
            {isOpen && (
                <Lightbox
                // pics.urls.full
                    imageTitle={pics[imgIndex].alt_description}
                    imageCaption={pics[imgIndex].alt_description}
                    mainSrc={pics[imgIndex].urls.small}
                    nextSrc={pics[(imgIndex + 1) % pics.length].urls.small}
                    prevSrc={
                        pics[(imgIndex + pics.length - 1) % pics.length]
                            .urls.small
                    }
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                        setImgIndex(
                            (imgIndex + pics.length - 1) % pics.length
                        )
                    }
                    onMoveNextRequest={() =>
                        setImgIndex((imgIndex + 1) % pics.length)
                    }
                />
            )}
        </div>
    );
}
