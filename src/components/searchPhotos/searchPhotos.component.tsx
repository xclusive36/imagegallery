import React, { useState } from "react";
// import { createApi, toJson } from "unsplash-js";

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

    const searchPhotos = async (e: any) => {
        e.preventDefault();
        unsplash.search.getPhotos(query).then((result) => {
            setPics(result.response?.results);
            console.log(result.response?.results);
        });
        // .then(result=>{console.log(result.response)});
    };

    return (
        <>
            <form className="form" onSubmit={searchPhotos}>
                <label className="label" htmlFor="query">
                    {" "}
                    📷
                </label>
                <input
                    type="text"
                    name="query"
                    className="input"
                    placeholder={`Try "dog" or "apple"`}
                    value={query.query}
                    onChange={(e) => setQuery({ query: e.target.value })}
                />
                <button type="submit" className="button">
                    Search
                </button>
            </form>
            <div className="card-list">
                {
                    pics.map((pic: { id: React.Key | null | undefined; alt_description: string | undefined; urls: { full: string | undefined; }; }) => (
                        <div className="card" key={pic.id}>
                            <img
                                className="card--image"
                                alt={pic.alt_description}
                                src={pic.urls.full}
                                width="50%"
                                height="50%"
                            ></img>
                        </div>
                    ))
                }
            </div>
        </>
    );
}
