//import react router dom
import { Routes, Route } from "react-router-dom";

//=======================================================================
//ADMIN
//=======================================================================

//import view Login
import Login from '../pages/admin/Login.jsx';

//import component private routes
import PrivateRoute from "./PrivateRoutes";

//import view admin Dashboard
import Dashboard from '../pages/admin/dashboard/Index.jsx';

//import view admin categories Index
import CategoriesIndex from '../pages/admin/categories/Index.jsx';

//import view admin category Create
import CategoryCreate from '../pages/admin/categories/Create.jsx';

//import view admin category Edit
import CategoryEdit from '../pages/admin/categories/Edit.jsx';

//import view admin places Index
import PlacesIndex from '../pages/admin/places/Index.jsx';

//import view admin places Create
import PlaceCreate from '../pages/admin/places/Create.jsx';

//import view admin places Edit
import PlaceEdit from '../pages/admin/places/Edit.jsx';

//import view admin sliders Index
import SlidersIndex from '../pages/admin/sliders/Index.jsx';

//import view admin slider Create
import SliderCreate from '../pages/admin/sliders/Create.jsx';

//import view admin users Index
import UsersIndex from '../pages/admin/users/Index.jsx';

//import view admin user Create
import UserCreate from '../pages/admin/users/Create.jsx';

//import view admin user Edit
import UserEdit from '../pages/admin/users/Edit.jsx';

//=======================================================================
//WEB
//=======================================================================

//import view web Home
import Home from '../pages/web/home/Index.jsx';

//import view web category Show
import WebCategoryShow from '../pages/web/categories/Show.jsx';

//import view web place Index
import WebPlacesIndex from "../pages/web/places/Index.jsx";

//import view web place Show
import WebPlaceShow from '../pages/web/places/Show.jsx';

//import view web place Direction
import WebPlaceDirection from '../pages/web/places/Direction.jsx';

//import view web maps
import WebMapsIndex from "../pages/web/maps/Index.jsx";

//import view web search
import WebSearch from '../pages/web/search/Index.jsx';

function RoutesIndex() {
    return (
        <Routes>

            {/* route "/admin/login" */}
            <Route path="/admin/login" element={<Login />} />

            {/* private route "/admin/dashboard" */}
            <Route
                path="/admin/dashboard"
                element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                }
            />

            {/* private route "/admin/categories" */}
            <Route
                path="/admin/categories"
                element={
                        <PrivateRoute>
                            <CategoriesIndex />
                        </PrivateRoute>
                }
            />

            {/* private route "/admin/categories/create" */}
            <Route
                path="/admin/categories/create"
                element={
                        <PrivateRoute>
                            <CategoryCreate />
                        </PrivateRoute>
                }
            />

            {/* private route "/admin/categories/edit/:id" */}
            <Route
                path="/admin/categories/edit/:id"
                element={
                        <PrivateRoute>
                            <CategoryEdit />
                        </PrivateRoute>
                }
            />

            {/* private route "/admin/places" */}
            <Route
                path="/admin/places"
                element={
                        <PrivateRoute>
                            <PlacesIndex />
                        </PrivateRoute>
                }
            />

            {/* private route "/admin/places/create" */}
            <Route
                path="/admin/places/create"
                element={
                        <PrivateRoute>
                            <PlaceCreate />
                        </PrivateRoute>
                }
            />

            {/* private route "/admin/places/edit/:id" */}
            <Route
                path="/admin/places/edit/:id"
                element={
                        <PrivateRoute>
                            <PlaceEdit />
                        </PrivateRoute>
                }
            />

            {/* private route "/admin/sliders" */}
            <Route
                path="/admin/sliders"
                element={
                        <PrivateRoute>
                            <SlidersIndex />
                        </PrivateRoute>
                }
            />

            {/* private route "/admin/sliders/create" */}
            <Route
                path="/admin/sliders/create"
                element={
                        <PrivateRoute>
                            <SliderCreate />
                        </PrivateRoute>
                }
            />

            {/* private route "/admin/users" */}
            <Route
                path="/admin/users"
                element={
                        <PrivateRoute>
                            <UsersIndex />
                        </PrivateRoute>
                }
            />

            {/* private route "/admin/users/create" */}
            <Route
                path="/admin/users/create"
                element={
                        <PrivateRoute>
                            <UserCreate />
                        </PrivateRoute>
                }
            />

            {/* private route "/admin/users/edit/:id" */}
            <Route
                path="/admin/users/edit/:id"
                element={
                        <PrivateRoute>
                            <UserEdit />
                        </PrivateRoute>
                }
            />

            {/* route "/" */}
            <Route path="/" element={<Home />} />

            {/* route "/category/:slug" */}
            <Route path="/category/:slug" element={<WebCategoryShow />} />
            

            {/* route "/places" */}
            <Route path="/places" element={<WebPlacesIndex />} />

            {/* route "/places/:slug" */}
            <Route path="/places/:slug" element={<WebPlaceShow />} />

            {/* route "/places/:slug/direction" */}
            <Route path="/places/:slug/direction" element={<WebPlaceDirection />} />

            {/* route "/maps" */}
            <Route path="/maps" element={<WebMapsIndex />} />

            {/* route "/search" */}
            <Route path="/search" element={<WebSearch />} />

        </Routes>
    )
}

export default RoutesIndex