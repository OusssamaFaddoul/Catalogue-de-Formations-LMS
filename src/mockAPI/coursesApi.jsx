const BASE_URL = "https://6945530aed253f51719afe95.mockapi.io/project/cours";

export const getCourses = () =>
  fetch(BASE_URL).then(res => res.json());

export const createCourse = data =>
  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

export const updateCourse = (id, data) =>
  fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

export const deleteCourse = id =>
  fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
