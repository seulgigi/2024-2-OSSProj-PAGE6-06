import React, { useState, useEffect } from "react";
import * as S from "./Styled";
import { API } from "@/pages/api";

function RandomBookList() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [books, setBooks] = useState([]);
  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get(`/mainpage`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      setBooks(response.data.topbooks);
    } catch (error) {
      console.error("요청 중 오류 발생:", error);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [books.length]);

  return (
    <S.RandomBookListContainer>
      <S.Title>루티너들이 읽고 있는 책</S.Title>
      <S.SliderWrapper>
        <S.BookCard>
          <S.Slider $currentIndex={currentIndex}>
            {books.map((item, index) => (
              <S.BookContent key={index}>
                <S.BookInfoWrapper>
                  <S.BookInfo>
                    <S.BookImage
                      src={item.coverImage}
                      width={114}
                      height={163}
                      alt={`${item.title} 커버 이미지`}
                    />
                    <S.BookTitle>{item.title}</S.BookTitle>
                    <S.Author>{item.author}</S.Author>
                  </S.BookInfo>
                </S.BookInfoWrapper>
                <S.Story>{item.summary}</S.Story>
              </S.BookContent>
            ))}
          </S.Slider>
        </S.BookCard>
      </S.SliderWrapper>
      <S.IndicatorContainer>
        {books.map((_, index) => (
          <S.Indicator key={index} $isActive={index === currentIndex} />
        ))}
      </S.IndicatorContainer>
    </S.RandomBookListContainer>
  );
}

export default RandomBookList;
