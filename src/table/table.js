import React, { useState, useEffect, useRef} from 'react';
import Find from './../find/find';
import TableRow from './tableRow';
import Sort from './../sort/sort';
import TablePage from "./tablePage";
import Pagination from "../pagination/pagination";
import Modal from "../modal/modal";


export default function Table({setModalData}) {
  
    const [data, setData] = useState(null); //данные полученные по url

    const [findText,setFindText] = useState(''); //текст из инпута
    const inputRef = useRef(null);

    const [sortDir,setSortDir] = useState(false); //направление и вид сортировки
    const [kindSort,setKindSort] = useState(null);

    const [page, setPage] = useState(1); // страница и общее количество страниц
    const [pageQuantity, setPageQuantity] = useState(1);

    const [deleteIndex,setDeleteIndex] = useState(null);


    useEffect(()=> {//запрос данных
        async function getResponse() {
            let response = await fetch('https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users');
            let content = await response.json();
            setData(content);
        }
        getResponse();
    },[]);


    useEffect(()=> { // рассчет кол-ва старниц при изменении данных или вводе текста
        if ((getFindEntries().length!==0) && data) {
            setPageQuantity(Math.ceil(getFindEntries().length/5));
        }
        else if((getFindEntries().length===0) && data) setPageQuantity(1);
        else if (data) setPageQuantity(Math.ceil(data.length/5));
    }, [findText,data]);


    useEffect(()=> { //обновление номера страницы при переборе
        if (page>pageQuantity) setPage(pageQuantity)
    },[pageQuantity]);


    return (
        <>
            <div className="table">
                <h2 className="table__title">Список пользователей</h2>
                <Find inputRef={inputRef} findText={findText} setFindText={setFindText} getFindEntries={getFindEntries}/>
                {(kindSort || findText) ?  <div className="table__clear" onClick={()=>clearFilters()}>Очистить фильтр</div>: null}
                <Sort kindSort={kindSort} changeSort={changeSort}/>
                {data ?
                    <>
                        <div className="table__list">
                            <TableRow mod="description" username="Имя пользователя" email="E-mail" registration_date="Дата регистрации" rating="Ратинг"/>
                            <TablePage rebuildArray={findText!=='' ? ()=>rebuildArray(getFindEntries()) : ()=>rebuildArray(data)}
                                       setDeleteIndex={setDeleteIndex} />
                        </div>
                        <Pagination page={page} pageQuantity={pageQuantity} data={data} setPage={setPage}/>
                    </>    : null
                }
            </div>
            {deleteIndex!=null ? <Modal deleteThis={()=>deleteThisItem(deleteIndex)} setDeleteIndex={setDeleteIndex}/> : null}
        </>
    );

    ///////////
    //функции//


    function getFindEntries() { // массив найденных элементов
        let array = [];
        if(data) data.forEach((el)=> {
            if(el.username.toLowerCase().indexOf(findText.toLowerCase())>=0 || el.email.toLowerCase().indexOf(findText.toLowerCase())>=0) array.push(el);
        });
        return array;
    }


    function clearFilters() { // очистка фильтров
        setKindSort(null);
        setSortDir(false);
        setData(data.sort(function(a,b){
            return (a.id - b.id)
        }));
        setFindText('');
    }

    function sort(sortName) { // выполниние сортировки для разных видов и порядка
        if(sortName==='Рейтинг' && sortDir) {
            setData(data.sort(function(a,b){
                return (b.rating - a.rating)
            }));
        }
        else if(sortName==='Рейтинг' && sortDir===false) {
            setData(data.sort(function(a,b){
                return (a.rating - b.rating)
            }));
        }
        else if(sortName==='Дата регистрации' && sortDir) {
            setData(data.sort(function(a,b){
                return (trimDate(b) - trimDate(a))
            }));
        }
        else if(sortName==='Дата регистрации' && sortDir===false) {
            setData(data.sort(function(a,b){
                return (trimDate(a) - trimDate(b))
            }));
        }
    }

    function changeSort(sortName) { //смена сортировки
        setKindSort(sortName);
        setSortDir(!sortDir);
        sort(sortName);
    }


    function deleteThisItem(index) { // удаление по id пользователя
        let newData = [];
        data.forEach((el)=>{
            if (el.id !== index) newData.push(el);
        });
        setData(newData);
        setDeleteIndex(null);
    };


    function trimDate(item) { // отрезает лишнее из строки для проверки
        let newItem = item.registration_date
            .replace(/[\s-:.]/g, '')
            .slice(0,8);
        return newItem;
    }


    function rebuildArray(data) { //массив чтоб делать страницы
        let array = [];
        for(let i=0+(page-1)*5; i<5*page;i++) {
            if (data[i]) array.push(data[i]);
        }
        return array;
    }


}
