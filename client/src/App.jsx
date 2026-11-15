
// import Navbar from "./components/Navbar";
// import { Navigate, Route, Routes } from "react-router";
// import HomePage from "./pages/HomePage";
// import ProductPage from "./pages/ProductPage";
// import ProfilePage from "./pages/ProfilePage";
// import CreatePage from "./pages/CreatePage";
// import EditProductPage from "./pages/EditProductPage";
// import useAuthReq from "./hooks/useAuthReq";
// import useUserSync from "./hooks/useUserSync";

// function App() {
//   const { isClerkLoaded, isSignedIn } = useAuthReq();
//   useUserSync();

//   if (!isClerkLoaded) return null;
//   return (
//     <div className="min-h-screen flex flex-col bg-base-100">
//       <Navbar />
//       <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/product/:id" element={<ProductPage />} />
//           <Route
//             path="/profile"
//             element={isSignedIn ? <ProfilePage /> : <Navigate to={"/"} />}
//           />
//           <Route
//             path="/create"
//             element={isSignedIn ? <CreatePage /> : <Navigate to={"/"} />}
//           />
//           <Route
//             path="/edit/:id"
//             element={isSignedIn ? <EditProductPage /> : <Navigate to={"/"} />}
//           />
//         </Routes>
//       </main>

//       <footer className="border-t border-base-300">
//         <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-base-content/60">
//           <p>Built by Sarath</p>
//           <div className="flex gap-5">
//             <a
//               href="https://github.com/withsarath"
//               target="_blank"
//               rel="noreferrer"
//               className="link link-hover"
//             >
//               GitHub
//             </a>
//             <a
//               href="https://github.com/withsarath/BuyNext"
//               target="_blank"
//               rel="noreferrer"
//               className="link link-hover"
//             >
//               Source code
//             </a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default App;

import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import CreatePage from "./pages/CreatePage";
import EditProductPage from "./pages/EditProductPage";
import useAuthReq from "./hooks/useAuthReq";
import useUserSync from "./hooks/useUserSync";

function App() {
  const { isClerkLoaded, isSignedIn } = useAuthReq();
  useUserSync();

  if (!isClerkLoaded) return null;
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Navbar />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route
            path="/profile"
            element={isSignedIn ? <ProfilePage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/create"
            element={isSignedIn ? <CreatePage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/edit/:id"
            element={isSignedIn ? <EditProductPage /> : <Navigate to={"/"} />}
          />
        </Routes>
      </main>

      <footer className="border-t border-base-300">
        <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-base-content/60">
          <p>Made with 💖</p>
          <div className="flex gap-5">
            <a
              href="https://github.com/withsarath"
              target="_blank"
              rel="noreferrer"
              className="link link-hover"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;