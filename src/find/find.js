import React from 'react';

export default function Find({inputRef,findText,setFindText,getFindEntries}) {

    const onChangeInput = () => { //при изменении в инпуте менять слово для поиска
        setFindText(inputRef.current.value);
        getFindEntries();
    };

    return (
        <div className="find">
            <input className="find__input" ref={inputRef} onChange={()=>onChangeInput()} value={findText}/>
        </div>
    )

}