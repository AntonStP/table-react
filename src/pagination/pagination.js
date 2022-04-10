import React from 'react';

export default function Pagination({page, pageQuantity, setPage}) {

    function pageIterator(dir) {
        switch (dir) {
            case "prev":
                if (page > 1 && page <= pageQuantity) {
                    setPage(prevState => prevState - 1);
                }
                break;
            case "next":
                if (page >= 1 && page < pageQuantity) {
                    setPage(prevState => prevState + 1);
                }
                break;
        }
    }

    return (
        <div className="pagination">
            <div className="pagination__btn pagination__btn_prev" onClick={() => pageIterator("prev")}></div>
            <div className="pagination__page-counter">{`${page}/${pageQuantity}`}</div>
            <div className="pagination__btn pagination__btn_next" onClick={() => pageIterator("next")}></div>
        </div>
    )
}