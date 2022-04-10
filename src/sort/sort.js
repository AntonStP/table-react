import React from 'react';
import SortItem from './sotrItem';

export default function Sort({kindSort, changeSort}) {

    return (
        <div className="sort">
            <div className="sort__name">Сортировка</div>
            {SortItems([{name:"Дата регистрации", action: changeSort},
                        {name:"Рейтинг", action: changeSort}], kindSort)}
        </div>
    )

}

function SortItems(list,kindSort) {
    return (
        list.map((el,id)=> {
            return <SortItem key={`item-${id}`} name={el.name} action={el.action} kindSort={kindSort}/>
        })
    )
}