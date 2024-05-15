import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  HStack,
  Input,
  Image,
  Text,
  Stack,
  useColorModeValue,
  useColorMode,
  Heading,
  Icon,
  IconButton,
  TableContainer,
  Table,
  Thead,
  Tr,
  Tbody,
  Tfoot,
  Td,
  Th,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { RxVideo } from "react-icons/rx";

const VideoList = () => {
  // useState 는 화면 랜더링에 반영됨
  const [VideoList, setVideoList] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  // useRef 는 화면 렌더링 반영되지 않는 참조값
  const pageCount = useRef(1);

  const color = useColorModeValue("red.500", "white");
  const buttonScheme = useColorModeValue("blackAlpha", "whiteAlpha");

  const fetchVideos = async () => {
    if (search.length < 2) return;
    const response = await fetch(
      `https://dapi.kakao.com/v2/search/vclip?query=${search}&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_API_KEY}`,
        },
      }
    );
    const data = await response.json();

    pageCount.current =
      data.meta.pageable_count % 10 > 0
        ? data.meta.pageable_count / 10 + 1
        : data.meta.pageable_count / 10;
    pageCount.current = Math.floor(pageCount.current);
    pageCount.current = pageCount.current > 15 ? 15 : pageCount.current;
    setVideoList(data.documents);
  };

  useEffect(() => {
    fetchVideos();
  }, [page, search]);

  const changeSearch = (e) => {
    if (e.target.value.length >= 2) setSearch(e.target.value);
  };

  return (
    <>
      <Box>
        <Heading color={color}>
          <Icon as={RxVideo} boxSize={"1.3em"} />
          검색 영상 목록
        </Heading>
        <Input
          type="text"
          placeholder="검색어 입력"
          onChange={changeSearch}
          size="lg"
          variant="filled"
        />
      </Box>
      <TableContainer>
        <Table variant={"striped"} colorScheme="teal">
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>썸네일</Th>
              <Th>Title</Th>
              <Th>author</Th>
            </Tr>
          </Thead>
          <Tbody>
            {VideoList.map((video, index) => (
              <>
                <Tr>
                  <Td>{(page - 1) * 10 + index + 1}</Td>
                  <Box>
                    <a href={video.url}>
                      <Image boxSize="100px" src={video.thumbnail} />
                    </a>
                  </Box>
                  <Td>
                    <a href={video.url}>{video.title}</a>
                  </Td>
                  <Td>{video.author}</Td>
                </Tr>
              </>
            ))}
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
      <HStack>
        {Array.from({ length: pageCount.current }, (_, index) => (
          <>
            <Button
              colorScheme={page === index + 1 ? "green" : buttonScheme}
              onClick={(e) => {
                setPage(index + 1);
              }}
            >
              {index + 1}
            </Button>
          </>
        ))}
      </HStack>
    </>
  );
};
export default VideoList;
