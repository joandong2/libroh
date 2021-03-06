import { axiosWithAuth } from "../../utils/axiosWithAuth";

export const START = "START";
export const SUCCESS = "SUCCESS";
export const FAILED = "FAILED";
export const GET_BOOK = "GET_BOOK";
export const GET_BOOKS = "GET_BOOKS";
export const GET_CATEGORIES = "GET_CATEGORIES";

export const getBook = (slug) => (dispatch) => {
  dispatch({ type: START });

  axiosWithAuth()
    .get(`/books/${slug}`)
    .then((res) => {
      dispatch({ type: GET_BOOK, payload: res.data.book });
      dispatch({ type: SUCCESS });
    })
    .catch((err) => {
      dispatch({
        type: FAILED,
        payload: err.response.data.message
          ? err.response.data.message
          : "Internal server issues. Please try again.",
      });
    });
};

export const getBooks = (category, pageNum) => (dispatch) => {
  dispatch({ type: START });
  axiosWithAuth()
    .get(
      pageNum === undefined
        ? `/books`
        : category === undefined
        ? `/books?page=${parseInt(pageNum)}`
        : `/books/category/${category}?page=${parseInt(pageNum)}`
    )
    .then((res) => {
      dispatch({ type: GET_BOOKS, payload: res.data });
      dispatch({ type: SUCCESS });
    })
    .catch((err) => {
      dispatch({
        type: FAILED,
        payload: err.response.data.message
          ? err.response.data.message
          : "Internal server issues. Please try again.",
      });
    });
};

export const postBook = (values) => (dispatch) => {
  dispatch({ type: START });

  axiosWithAuth()
    .post(`/books/`, {
      isbn: values.data.isbn,
      title: values.data.title,
      slug: values.data.title.toLowerCase().split(" ").join("-"),
      description: values.data.description,
      total_pages: values.data.total_pages,
      year: values.data.year,
      author_id: values.dropDownValues.author,
      publisher_id: values.dropDownValues.publisher,
      categories: values.dropDownValues.categories,
    })
    .then((res) => {
      dispatch({ type: SUCCESS, payload: res.data.message });
    })
    .catch((err) => {
      dispatch({
        type: FAILED,
        payload: err.response.data.message
          ? err.response.data.message
          : "Internal server issues. Please try again.",
      });
    });
};

export const updateBook = (slug, values) => (dispatch) => {
  dispatch({ type: START });

  axiosWithAuth()
    .patch(`/books/${slug}`, {
      isbn: values.data.isbn,
      // title: values.data.title,
      // slug: values.data.title.toLowerCase().split(" ").join("-"),
      description: values.data.description,
      total_pages: values.data.total_pages,
      year: values.data.year,
      author_id: values.dropDownValues.author,
      publisher_id: values.dropDownValues.publisher,
      categories: values.dropDownValues.categories,
    })
    .then((res) => {
      dispatch({ type: SUCCESS, payload: res.data.message });
    })
    .catch((err) => {
      dispatch({
        type: FAILED,
        payload: err.response.data.message
          ? err.response.data.message
          : "Internal server issues. Please try again.",
      });
    });
};

export const getCategories = () => (dispatch) => {
  dispatch({ type: START });
  axiosWithAuth()
    .get("/categories")
    .then((res) => {
      dispatch({ type: GET_CATEGORIES, payload: res.data });
      dispatch({ type: SUCCESS });
    })
    .catch((err) => {
      dispatch({
        type: FAILED,
        payload: err.response.data.message
          ? err.response.data.message
          : "Internal server issues. Please try again.",
      });
    });
};

export const getAllCategories = () => (dispatch) => {
  dispatch({ type: START });
  axiosWithAuth()
    .get("/categories/all")
    .then((res) => {
      dispatch({ type: GET_CATEGORIES, payload: res.data });
      dispatch({ type: SUCCESS });
    })
    .catch((err) => {
      dispatch({
        type: FAILED,
        payload: err.response.data.message
          ? err.response.data.message
          : "Internal server issues. Please try again.",
      });
    });
};

export const postCategory = (values) => (dispatch) => {
  dispatch({ type: START });

  axiosWithAuth()
    .post(`/categories`, {
      name: values.name,
      slug: values.name.toLowerCase().split(" ").join("-"),
    })
    .then((res) => {
      dispatch({ type: SUCCESS, payload: res.data.message });
    })
    .catch((err) => {
      dispatch({
        type: FAILED,
        payload: err.response.data.message
          ? err.response.data.message
          : "Internal server issues. Please try again.",
      });
    });
};

export const deleteCategories = (id) => (dispatch) => {
  dispatch({ type: START });
  axiosWithAuth()
    .delete(`/categories/${id}`)
    .then((res) => {
      axiosWithAuth()
        .get(`/categories/all`)
        .then((res) => {
          dispatch({ type: GET_CATEGORIES, payload: res.data });
        });
      dispatch({ type: SUCCESS, payload: res.data.message });
    })
    .catch((err) => {
      dispatch({
        type: FAILED,
        payload: err.response.data.message
          ? err.response.data.message
          : "Internal server issues. Please try again.",
      });
    });
};

export const updateBookRatingByUser =
  (book_slug, book_id, user_id, rating) => (dispatch) => {
    dispatch({ type: START });
    axiosWithAuth()
      .patch(`/books/${book_slug}/rating`, {
        book_id: book_id,
        user_id: user_id,
        rating: rating,
      })
      .then((res) => {
        axiosWithAuth()
          .get(`/books/${book_slug}`)
          .then((res) => {
            dispatch({ type: GET_BOOK, payload: res.data.book });
          });
        dispatch({ type: SUCCESS, payload: res.data.message });
      })
      .catch((err) => {
        dispatch({
          type: FAILED,
          payload: err.response.data.message
            ? err.response.data.message
            : "Internal server issues. Please try again.",
        });
      });
  };

export const deleteBookById = (book_id) => (dispatch) => {
  dispatch({ type: START });
  axiosWithAuth()
    .delete(`/books/${book_id}/`)
    .then((res) => {
      dispatch({ type: SUCCESS, payload: res.data.message });
      axiosWithAuth()
        .get(`/books`)
        .then((res) => {
          dispatch({ type: GET_BOOKS, payload: res.data });
        });
    })
    .catch((err) => {
      dispatch({
        type: FAILED,
        payload: err.response.data.message
          ? err.response.data.message
          : "Internal server issues. Please try again.",
      });
    });
};
