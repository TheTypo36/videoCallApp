import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <header />
      <Routes>
        <Route path="/sign-in" element={SignIn} />

        <Route path="/profile" element={Profile} />
      </Routes>
      <footer />
    </BrowserRouter>
  );
}

export default App;
