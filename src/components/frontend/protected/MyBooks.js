import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Image, Rate, Alert } from "antd";
import { getUserBook } from "../../../redux/actions/users";
import { updateBookRatingByUser } from "../../../redux/actions/books";
import Header from "../public/Header";
import Sidebar from "../public/Sidebar";
import Footer from "../public/Footer";

const MyBook = (props) => {
  const notifications = useSelector((state) => state.notifications);
  const books = useSelector((state) => state.books);
  const user = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("_user")) {
      dispatch(getUserBook(parseInt(localStorage.getItem("_user"))));
    }
  }, [dispatch]);

  console.log(user);

  return (
    <>
      <Header />
      <Row gutter={32}>
        <Sidebar />
        <Col span={16} align="left">
          <h4>Saved Books</h4>
          {notifications.message && (
            <Alert message={notifications.message} type="warning" showIcon />
          )}

          {notifications.loading ? (
            <Row style={{ height: "10vh" }}>
              <div className="loader"></div>
            </Row>
          ) : (
            <Row gutter={16}>
              {books.books &&
                books.books.map((book) => {
                  return (
                    <Col span={4} className="book" key={book.id} align="center">
                      <Image
                        width={180}
                        height={280}
                        src={book.cover}
                        preview={false}
                      />
                      <Rate
                        defaultValue={parseFloat(book.ratings).toFixed(0)}
                        onChange={(rating) => {
                          dispatch(
                            updateBookRatingByUser(
                              book.slug,
                              book.id,
                              parseInt(localStorage.getItem("_user")),
                              rating
                            )
                          );
                        }}
                        value={parseFloat(book.ratings).toFixed(0)}
                      />
                      <p className="book-title">
                        {user.user &&
                          user.user.saved_books &&
                          user.user.saved_books.includes(book.id) && (
                            <i className="fas fa-bookmark"></i>
                          )}
                        <a href={`/${book.slug}`} className="title">
                          {book.title}
                        </a>{" "}
                      </p>
                    </Col>
                  );
                })}
            </Row>
          )}
        </Col>
      </Row>
      <Footer />
    </>
  );
};

export default MyBook;
