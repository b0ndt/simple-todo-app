import { Navigate, Route, Routes } from "react-router-dom";
import TodoScreen from "../screens/TodoScreen";
import NotFoundScreen from "../screens/NotFoundScreen";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoScreen />} />
      <Route path="/todos" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}
