import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { SocketProvider } from "./providers/Socket";
import Room from "./pages/Room";
function App() {
  return (
    <BrowserRouter>
      <header />
      <SocketProvider>
        <Routes>
          <Route path="/" element={<h1>hello world</h1>} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/room/:roomId" element={<Room />} />
          {/* <Route path="/sign-in" element={SignIn} /> */}

          {/* <Route path="/profile" element={Profile} /> */}
        </Routes>
      </SocketProvider>
      <footer />
    </BrowserRouter>
  );
}

export default App;
