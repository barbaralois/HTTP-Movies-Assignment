import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialFormValues = {
  title: '',
  director: '',
  metascore: '',
  stars: [],
};

export default function UpdateMovie(props) {
  const [formValues, setFormValues] = useState(initialFormValues);
  const { id } = useParams();

  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        const movieData = res.data;
        setFormValues({ ...movieData, stars: movieData.stars.join(', ') });
        // setFormValues(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const onInputChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const movieUpdates = { ...formValues, stars: formValues.stars.split(/,/) };
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movieUpdates)
      .then((res) => {
        props.getMovieList();
        history.push(`/movies/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={onSubmit} className="update">
      <h2>Update Movie Information</h2>

      <label>
        Title:&nbsp;
        <input
          type="text"
          placeholder="..."
          maxLength="50"
          name="title"
          value={formValues.title}
          onChange={onInputChange}
        />
      </label>
      <label>
        Director:&nbsp;
        <input
          type="text"
          name="director"
          placeholder="..."
          maxLength="50"
          value={formValues.director}
          onChange={onInputChange}
        />
      </label>
      <label>
        Metascore:&nbsp;
        <input
          type="text"
          name="metascore"
          placeholder="..."
          maxLength="3"
          value={formValues.metascore}
          onChange={onInputChange}
        />
      </label>
      <label>
        Stars:&nbsp;
        <input
          type="text"
          name="stars"
          placeholder="..."
          maxLength="100"
          value={formValues.stars}
          onChange={onInputChange}
        />
      </label>

      <button>Submit</button>
    </form>
  );
}
