import React, { useEffect, useRef, useState } from 'react';

const BookList = () => {
    // useState 는 화면 랜더링에 반영됨
    const [bookList, setBookList] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    // useRef 는 화면 렌더링 반영되지 않는 참조값
    const pageCount = useRef(1);

    const changeSearch = (e) => {
        if (e.target.value.length >= 2) setSearch(e.target.value);
    };

    const fetchBooks = async () => {
        const response = await fetch(`https://dapi.kakao.com/v2/search/vclip?query=${search}&page=${page}`, {
            method: 'GET',
            headers: {
                Authorization: `KakaoAK ${process.env.REACT_APP_API_KEY}`,
            },
        });
        const data = await response.json();

        if (data.meta && data.meta.pageable_count) {
            pageCount.current =
                data.meta.pageable_count % 10 > 0 ? data.meta.pageable_count / 10 + 1 : data.meta.pageable_count / 10;
            pageCount.current = Math.floor(pageCount.current);
            pageCount.current = pageCount.current > 15 ? 15 : pageCount.current;
            setBookList(data.documents);
        } else {
            console.error('ㄴㄴ');
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [page, search]);

    return (
        <>
            <h1>동영상 검색 목록</h1>
            <div class="search-container">
                <input type="text" placeholder="검색어 입력" onChange={changeSearch} />
            </div>
            <div>
                {bookList.map((book) => (
                    <>
                        <p>{book.title}</p>
                    </>
                ))}
            </div>
            <ul>
                {Array.from({ length: pageCount.current }, (_, index) => (
                    <>
                        <li
                            onClick={(e) => {
                                setPage(index + 1);
                            }}
                        >
                            {index + 1}
                        </li>
                    </>
                ))}
            </ul>
        </>
    );
};
export default BookList;
