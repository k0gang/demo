import { createBrowserRouter } from 'react-router-dom';
import Root from './routes/Root';
import VideoList from './components/VideoList';
import BookList from './components/BookList';
import RecommendBookList from './components/RecommendBookList';
import RecommendVideoList from './components/RecommendVideoList';

// 라우터 설계
/*

GET /demo/video                 추천 영상 목록 페이지       <VideoList />
GET /demo/video/list            추천 영상 목록 페이지       <VideoList />
GET /demo/video/search          검색 영상 목록 페이지       <VideoList />

GET /demo/book
GET /demo/book/list             추천 도서 목록 페이지       <BookList />
GET /demo/book/search           검색 도서 검색 페이지       <BookList />
GET /demo/book/search/:isbn}    검색 도서 상세 페이지       <BookDetail />

*/

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Root />,
            children: [
                {
                    path: '/video',
                    element: <VideoList />,
                },
                {
                    path: '/video/list',
                    element: <RecommendVideoList />,
                },
                {
                    path: '/book',
                    element: <BookList />,
                },
                {
                    path: '/book/list',
                    element: <RecommendBookList />,
                },
            ],
            errorElement: (
                <>
                    <h1>Error</h1>
                </>
            ),
        },
    ],
    {
        basename: '/demo',
    }
);

export default router;
