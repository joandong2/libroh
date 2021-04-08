import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  Table,
  Pagination,
  Icon,
  List,
  Rating,
  Button,
  Image
} from "semantic-ui-react";
import Header from "./Header";
import Footer from "./Footer";
import { getBooks } from "../../../redux/actions/books";

const Books = props => {
  //const { register, handleSubmit, errors } = useForm();
  //const notifications = useSelector(state => state.notifications);
  const books = useSelector(state => state.books);
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    dispatch(getBooks(undefined, pageNum));
  }, [dispatch, pageNum]);

  const paginationChange = e => {
    setPageNum(parseInt(e.target.innerText));
  };

  console.log("books", books);

  return (
    <div className="wrapper">
      <Header />

      <Grid padded className="title-box">
        <Grid container>
          <h3 className="page-title">Books </h3>
        </Grid>
      </Grid>

      <Grid padded className="dashboard-boxes">
        <Grid container>
          <Grid.Row columns={2}>
            <Grid.Column align="left" width={16}>
              <Table celled compact>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ISBN</Table.HeaderCell>
                    <Table.HeaderCell>Rating</Table.HeaderCell>
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Total Pages</Table.HeaderCell>
                    <Table.HeaderCell>Author</Table.HeaderCell>
                    <Table.HeaderCell>Publisher</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {books.books &&
                    books.books.map(book => {
                      return (
                        <Table.Row key={book.id}>
                          <Table.Cell>{book.isbn}</Table.Cell>
                          <Table.Cell>
                            <Rating
                              defaultRating={parseFloat(book.ratings).toFixed(
                                0
                              )}
                              maxRating={5}
                              disabled
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <Image src={book.cover} avatar /> {book.title}
                          </Table.Cell>
                          <Table.Cell>{book.total_pages}</Table.Cell>
                          <Table.Cell>{book.author_name}</Table.Cell>
                          <Table.Cell>{book.publisher_name}</Table.Cell>
                          <Table.Cell>
                            <List horizontal link>
                              href={`/admin/book/${book.id}/edit`}
                              <List.Item as="a">
                                <Icon name="edit" />
                              </List.Item>
                              <List.Item
                                as="a"
                                href={`/admin/book/${book.id}/delete`}
                              >
                                <Icon name="delete" />
                              </List.Item>
                            </List>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                </Table.Body>

                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan="8" align="right">
                      {books.books && (
                        <Pagination
                          boundaryRange={0}
                          onPageChange={paginationChange}
                          defaultActivePage={pageNum}
                          ellipsisItem={null}
                          firstItem={null}
                          lastItem={null}
                          siblingRange={1}
                          totalPages={books.totalPages}
                        />
                      )}
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Grid>

      <Footer />
    </div>
  );
};

export default Books;
