import React from "react";
import { Card } from "../Card";
import { useRouter } from "next/navigation";

export const BookCard = ({ book, className, children }: any) => {
  const { push } = useRouter();
  const openMovieDetails = () => {
    if (book.book_id || book.id) push(`/details/${book.book_id || book.id}`);
  };

  return (
    <Card onClick={openMovieDetails} className={className}>
      {children}
      <img style={{ padding: "1vw 2vh" }} src={`${book.img}`} alt={book.title} loading='lazy' width={"250px"} height={"353px"} />
    </Card>
  );
};

export default BookCard;
