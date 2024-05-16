import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import New from './pages/new/New';
import './style/dark.scss';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/AuthContext';
import { hotelColumns, roomColumns, transactionColumns, userColumns } from './datatablesource';
import NewHotel from './pages/newHotel/NewHotel';
import NewRoom from './pages/newRoom/NewRoom';
import ListTransaction from './pages/list/ListTransaction';
import EditHotel from './pages/EditHotel/EditHotel';
import EditRoom from './pages/EditRoom/EditRoom';

function App() {
    const { darkMode } = useContext(DarkModeContext);

    const ProtectRoute = ({ children }) => {
        const { user } = useContext(AuthContext);

        if (!user) {
            return <Navigate to="/login" />;
        }

        return children;
    };

    return (
        <div className={darkMode ? 'app dark' : 'app'}>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route path="login" element={<Login />} />
                        <Route
                            index
                            element={
                                <ProtectRoute>
                                    <Home />
                                </ProtectRoute>
                            }
                        />

                        <Route path="user">
                            <Route
                                index
                                element={
                                    <ProtectRoute>
                                        <List columns={userColumns} />
                                    </ProtectRoute>
                                }
                            />
                            <Route
                                path="new"
                                element={
                                    <ProtectRoute>
                                        <New />
                                    </ProtectRoute>
                                }
                            />
                        </Route>

                        <Route path="hotel">
                            <Route
                                index
                                element={
                                    <ProtectRoute>
                                        <List columns={hotelColumns} />
                                    </ProtectRoute>
                                }
                            />
                            <Route
                                path=":id"
                                element={
                                    <ProtectRoute>
                                        <EditHotel columns={hotelColumns} />
                                    </ProtectRoute>
                                }
                            />
                            <Route
                                path="new"
                                element={
                                    <ProtectRoute>
                                        <NewHotel />
                                    </ProtectRoute>
                                }
                            />
                        </Route>

                        <Route path="room">
                            <Route
                                index
                                element={
                                    <ProtectRoute>
                                        <List columns={roomColumns} />
                                    </ProtectRoute>
                                }
                            />
                            <Route
                                path=":id"
                                element={
                                    <ProtectRoute>
                                        <EditRoom columns={roomColumns} />
                                    </ProtectRoute>
                                }
                            />
                            <Route
                                path="new"
                                element={
                                    <ProtectRoute>
                                        <NewRoom />
                                    </ProtectRoute>
                                }
                            />
                        </Route>

                        <Route
                            path="/transaction"
                            element={
                                <ProtectRoute>
                                    <ListTransaction columns={transactionColumns} />
                                </ProtectRoute>
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
