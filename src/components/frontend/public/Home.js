import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Image } from "semantic-ui-react";
import { getBooks } from "../../../redux/actions/books";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Home = (props) => {
    const notifications = useSelector((state) => state.notifications);
    const books = useSelector((state) => state.books.books);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBooks(props.match.params.category));
    }, [dispatch, props.match.params.category]);

    return (
        <>
            <Header />
            <Grid padded columns={2} className="main-content">
                <Grid.Row>
                    <Sidebar />
                    <Grid.Column className="content" width={13} align="left">
                        <Grid columns={10} className="books">
                            <Grid.Row>
                                {notifications.loading ? (
                                    <h1>Loading</h1>
                                ) : (
                                    books &&
                                    books.map((book) => {
                                        return (
                                            <Grid.Column
                                                className="book"
                                                key={book.id}
                                            >
                                                <Image src={book.cover} />
                                                <a
                                                    href={`http://localhost:3000/${book.slug}`}
                                                    className="title"
                                                >
                                                    {book.title}
                                                </a>
                                            </Grid.Column>
                                        );
                                    })
                                )}
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Footer />
        </>
    );
};

export default Home;
