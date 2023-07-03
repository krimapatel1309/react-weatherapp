import React from "react";

const Error = ({mess}) => {
    return (
        <>
            <article className="error">
                <div className={`abc ${mess==="Click Search!!" ? "srch" : ""}`}>{mess}</div>
            </article>
        </>
    );
};

export default Error;
