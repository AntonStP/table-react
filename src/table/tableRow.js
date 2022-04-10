import React from 'react';

export default function TableRow({mod,username,email,registration_date, rating, setDeleteIndex}) {

    return (
        <div className={`table__row ${mod ? `table__row_${mod}`:""}`}>
            <div className={`table__row-cell table__row-cell_username ${mod ? "table__row-cell_description" : ""}`}>{username}</div>
            <div className="table__row-cell table__row-cell_email">{email}</div>
            <div className="table__row-cell table__row-cell_registration">{registration_date}</div>
            <div className="table__row-cell table__row-cell_rating">{rating}</div>
            <div className="table__row-cell table__row-cell_delete">
                {mod ? null : <div className="table__row-delete" onClick={setDeleteIndex}></div>}
            </div>
        </div>
    )

}