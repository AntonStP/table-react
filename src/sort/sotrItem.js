import React from 'react';

export default function SortItem({name,action, kindSort}) {

    return (
        <div className={`sort__item ${name===kindSort ? "sort__item_active" : ""}`} onClick={()=>action(name)}>{name}</div>
    )

}