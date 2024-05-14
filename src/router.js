import { createBrowserRouter } from 'react-router-dom';
import Root from './routes/Root';
import BookList from './components/BookList';

// 라우터 설계
/*
GET /demo/video/list            추천 영상 목록 페이지
GET /demo/video/search          검색 영상 목록 페이지

GET /demo/book/list             추천 도서 목록 페이지
GET /demo/book/search           검색 도서 검색 페이지
GET /demo/book/search/{:isbn}   검색 도서 상세 페이지

*/

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Root />,
            children: [
                {
                    path: '/sample',
                    element: (
                        <>
                            <p>자식.</p>
                        </>
                    ),
                },
                {
                    path: '/video',
                    element: <BookList />,
                },
                {
                    path: '/book',
                    element: <Root />,
                },
            ],
        },
    ],
    {
        basename: '/demo',
    }
);

export default router;
