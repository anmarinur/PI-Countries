import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities } from '../actions';

export default function AddActivity() {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);

  const [input, setInput] = useState({
    name: '',
    difficulty: 0,
    duration: 0,
    season: '',
    countries: []
  })

  useEffect(() => {
    dispatch(getActivities())
  }, [dispatch]);

  return (
    <div>
      <Link to="/home"><button>Home</button></Link>
      <h1>Add activities</h1>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" value={input.name} placeholder="Name..." name="name"></input>
        </div>
        <div>
          <label>Difficulty:</label>
          <input type="number" value={input.difficulty} placeholder="Difficulty..." name="difficulty"></input>
        </div>
        <div>
          <label>Duration:</label>
          <input type="number" value={input.duration} placeholder="Duration..." name="duration"></input>
        </div>
        <div>
          <label>Season:</label>
          <input type="text" value={input.season} placeholder="Season..." name="season"></input>
        </div>
      </form>
    </div>
  )
}