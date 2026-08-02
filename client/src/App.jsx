import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";

import Dashboard from "./pages/Dashboard/Dashboard";
import Files from "./pages/Files/Files";
import Folders from "./pages/Folders/Folders";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import NotFound from "./pages/NotFound/NotFound";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public Routes */}

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Layout */}

                <Route element={<Layout />}>

                    <Route path="/" element={<Dashboard />} />

                    <Route path="/files" element={<Files />} />

                    <Route path="/folders" element={<Folders />} />

                    <Route path="/profile" element={<Profile />} />

                    <Route path="/settings" element={<Settings />} />

                </Route>

                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;