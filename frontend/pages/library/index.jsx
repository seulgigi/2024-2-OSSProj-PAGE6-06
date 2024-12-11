import Header from "@/components/layout/Header";
import RecordModal from "@/components/library/RecordModal";

import * as MS from "../../components/_styled/mainStyled";
import * as LS from "../../components/_styled/libraryStyled";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import BookDelete from "@/components/library/BookDelete";
import { API } from "../api";
import BookCard from "@/components/library/BookCard";

export default function Library() {
  const router = useRouter();

  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await API.get(`/mylibrary/booklist`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const data = response.data;
      setBooks(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Book Record Modal
  const [currentBook, setCurrentBook] = useState({});
  const [isRecordOpen, setRecordOpen] = useState(false);
  const handleRecordOpen = () => {
    setRecordOpen(true);
  };
  const handleRecordClose = () => {
    setRecordOpen(false);
  };
  const handleRecordClick = (data) => {
    const current = data;
    setCurrentBook(current);
    handleRecordOpen();
  };

  const [deleteModal, setDeleteModal] = useState(false);
  const handleDeleteModal = useCallback((value) => {
    setDeleteModal(value);
  }, []);
  const [selectedDeleteBook, setSelectedDeleteBook] = useState(null);

  return (
    <LS.LibraryWrapper>
      {isRecordOpen && (
        <LS.LibraryRecordModalOverlay>
          <RecordModal
            book={currentBook}
            handleRecordClose={handleRecordClose}
          />
        </LS.LibraryRecordModalOverlay>
      )}
      {deleteModal && (
        <LS.LibraryRecordModalOverlay>
          <BookDelete
            selectedDeleteBook={selectedDeleteBook}
            setDeleteModal={handleDeleteModal}
          />
        </LS.LibraryRecordModalOverlay>
      )}
      <LS.LibraryContainer>
        <Header path="My Library" />
        <LS.LibraryAdd>
          <LS.LibraryButtonBox
            onClick={() => {
              router.push(`/library/add`);
            }}
          >
            <LS.LibraryAddButton icon={faPlus} />
          </LS.LibraryButtonBox>
        </LS.LibraryAdd>
        {/* Library List Section */}
        {books.length === 0 ? (
          <LS.LibraryListEmpty>등록된 책 정보가 없습니다.</LS.LibraryListEmpty>
        ) : (
          <LS.LibraryList>
            {books.map((book, idx) => (
              <BookCard
                onClick={() => {
                  handleRecordClick(book);
                }}
                key={idx}
                book={book}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
                setSelectedDeleteBook={setSelectedDeleteBook}
              />
            ))}
          </LS.LibraryList>
        )}
      </LS.LibraryContainer>
    </LS.LibraryWrapper>
  );
}
