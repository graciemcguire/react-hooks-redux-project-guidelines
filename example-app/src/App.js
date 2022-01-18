import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabits } from "./features/habits/habitsSlice";

function App() {
  const dispatch = useDispatch();
  const habits = useSelector((state) => state.habits.entities);

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  return <div>There are {habits.length} habits in `db.json`</div>;
}

export default App;
