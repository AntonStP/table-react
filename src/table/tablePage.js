import React from 'react';
import TableRow from "./tableRow";

export default function TablePage({rebuildArray,setDeleteIndex}) {

    return (
        <div className="table-page">
            {Rows(rebuildArray(), setDeleteIndex)}
        </div>
    )

}

const Rows = (list, setDeleteIndex) => {
    if (list){
        return list.map((el, index)=> <TableRow key={`item-${index}`} username={el.username} email={el.email}
                                                registration_date={el.registration_date} rating={el.rating}
                                                setDeleteIndex={()=>setDeleteIndex(el.id)}/>)
    }
};