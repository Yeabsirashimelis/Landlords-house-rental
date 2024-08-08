import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./ui/PageNotFound";
import "@fontsource/inter";
import MyAccount from "./pages/MyAccount";
import { AuthProvider } from "./contexts/AuthContext";
import PersonalBuildings from "./pages/PersonalBuildings";
import { HouseProvider } from "./contexts/HousesContext";
import AddProperty from "./pages/AddProperty";
import MainPropertyForm from "./features/add property/MainPropertyForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import AppLayOut from "./ui/AppLayOut";
import HomeDetails from "./pages/HomeDetails";
import MessageDetailPage from "./features/message/MessageDetailPage";
import MessagesPage from "./features/message/MessagesPage";
import MyListings from "./features/manage-rentals/MyListings";
import SignIn from "./features/users/SignIn";
import NotFoundPage from "./ui/PageNotFound";
import RealEstate from "./ui/RealEstate";
import ProtectedRoute from "./pages/ProtectedRoute";
import Bookmarks from "./pages/Bookmarks";
import Articles from "./pages/Articles";
import EditMyListing from "./features/manage-rentals/EditMyListing";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HouseProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayOut />}>
                <Route path="/home" element={<Home />} />
                <Route index element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="*" element={<PageNotFound />} />

                {/* Protected Routes */}
                <Route
                  path="/user/myAccount"
                  element={
                    <ProtectedRoute>
                      <MyAccount />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/homesforrent/personalbuildings"
                  element={
                    <ProtectedRoute>
                      <PersonalBuildings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/homesforrent/realestates"
                  element={
                    <ProtectedRoute>
                      <RealEstate />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/homesforrent/personalbuildings/:id"
                  element={
                    <ProtectedRoute>
                      <HomeDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/add-property"
                  element={
                    <ProtectedRoute>
                      <AddProperty />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/add-property/form-details"
                  element={
                    <ProtectedRoute>
                      <MainPropertyForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/manage-rentals/messages"
                  element={
                    <ProtectedRoute>
                      <MessagesPage />
                    </ProtectedRoute>
                  }
                >
                  <Route
                    path=":userId/:houseId"
                    element={
                      <ProtectedRoute>
                        <MessageDetailPage />
                      </ProtectedRoute>
                    }
                  />
                </Route>
                <Route
                  path="/manage-rentals/my-listings"
                  element={
                    <ProtectedRoute>
                      <MyListings />
                    </ProtectedRoute>
                  }
                >
                  <Route
                    path="edit-listing/:houseId"
                    element={
                      <ProtectedRoute>
                        <EditMyListing />
                      </ProtectedRoute>
                    }
                  />
                </Route>

                <Route
                  path="/my-bookmarks"
                  element={
                    <ProtectedRoute>
                      <Bookmarks />
                    </ProtectedRoute>
                  }
                />
                <Route path="/articles" element={<Articles />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </HouseProvider>
      </AuthProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 5000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            padding: "8px 24px",
            backgroundColor: "whitesmoke",
            color: "black",
            fontStyle: "bold",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
