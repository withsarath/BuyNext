
// import { useState } from "react";
// import { useProducts } from "../hooks/useProduct";
// import {
//   PackageIcon,
//   PlusIcon,
//   SearchIcon,
//   SparklesIcon,
//   XIcon,
// } from "lucide-react";
// import { Link } from "react-router";
// import { SignInButton, useAuth } from "@clerk/react";
// import ProductCard from "../components/ProductCard";
// import ProductSkeleton from "../components/ProductSkeleton";

// function HomePage() {
//   const { isSignedIn } = useAuth();
//   const { data: products, isLoading, error } = useProducts();
//   const [query, setQuery] = useState("");

//   const search = query.trim().toLowerCase();
//   const filtered = (products ?? []).filter(
//     (p) =>
//       p.title?.toLowerCase().includes(search) ||
//       p.description?.toLowerCase().includes(search)
//   );

//   return (
//     <div className="space-y-12">
//       {/* HERO */}
//       <section className="hero rounded-box overflow-hidden border border-base-300 bg-linear-to-br from-primary/15 via-base-200 to-secondary/15">
//         <div className="hero-content w-full flex-col lg:flex-row-reverse justify-between gap-10 px-6 py-12 lg:px-12">
//           <div className="relative shrink-0">
//             <div className="absolute inset-0 bg-primary/25 blur-3xl rounded-full scale-110" />
//             <img
//               src="/image.png"
//               alt=""
//               className="relative h-60 lg:h-72 rounded-2xl shadow-2xl"
//             />
//           </div>

//           <div className="max-w-lg text-center lg:text-left">
//             <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
//               Share your products with people who care
//             </h1>
//             <p className="py-4 text-base-content/70">
//               Upload what you make, get comments from other creators, and
//               browse everything the community is selling.
//             </p>

//             <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
//               {isSignedIn ? (
//                 <Link to="/create" className="btn btn-primary">
//                   <PlusIcon className="size-4" />
//                   New product
//                 </Link>
//               ) : (
//                 <SignInButton mode="modal">
//                   <button className="btn btn-primary">
//                     <SparklesIcon className="size-4" />
//                     Start selling
//                   </button>
//                 </SignInButton>
//               )}
//               <a href="#products" className="btn btn-outline">
//                 Browse products
//               </a>
//             </div>

//             {products && (
//               <p className="mt-5 text-sm text-base-content/60">
//                 {products.length}{" "}
//                 {products.length === 1 ? "product" : "products"} shared so far
//               </p>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* PRODUCTS */}
//       <section id="products" className="scroll-mt-20">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
//           <h2 className="text-xl font-bold flex items-center gap-2">
//             <PackageIcon className="size-5 text-primary" />
//             All Products
//           </h2>

//           <label className="input input-bordered flex items-center gap-2 w-full sm:max-w-xs">
//             <SearchIcon className="size-4 opacity-60" />
//             <input
//               type="search"
//               className="grow"
//               placeholder="Search products"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//             />
//           </label>
//         </div>

//         {isLoading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//             {Array.from({ length: 6 }).map((_, i) => (
//               <ProductSkeleton key={i} />
//             ))}
//           </div>
//         ) : error ? (
//           <div role="alert" className="alert alert-error">
//             <span>Couldn't load products. Please refresh the page.</span>
//           </div>
//         ) : products.length === 0 ? (
//           <div className="card bg-base-200 border border-base-300">
//             <div className="card-body items-center text-center py-16">
//               <PackageIcon className="size-16 text-base-content/20" />
//               <h3 className="card-title text-base-content/60">
//                 No products yet
//               </h3>
//               <p className="text-base-content/50 text-sm">
//                 Be the first to share something.
//               </p>
//               <Link to="/create" className="btn btn-primary btn-sm mt-2">
//                 Create product
//               </Link>
//             </div>
//           </div>
//         ) : filtered.length === 0 ? (
//           <div className="card bg-base-200 border border-base-300">
//             <div className="card-body items-center text-center py-14">
//               <SearchIcon className="size-12 text-base-content/20" />
//               <h3 className="card-title text-base-content/60">
//                 No products match "{query.trim()}"
//               </h3>
//               <button
//                 className="btn btn-ghost btn-sm mt-2"
//                 onClick={() => setQuery("")}
//               >
//                 <XIcon className="size-4" />
//                 Clear search
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//             {filtered.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// export default HomePage;

import { useProducts } from "../hooks/useProduct";
import {
  MessageCircleIcon,
  PlusIcon,
  SparklesIcon,
  UploadIcon,
  UserPlusIcon,
} from "lucide-react";
import { Link } from "react-router";
import { SignInButton, useAuth } from "@clerk/react";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";

const STEPS = [
  {
    icon: UserPlusIcon,
    title: "Create a free account",
    text: "Sign up in a few seconds so you can post and comment.",
  },
  {
    icon: UploadIcon,
    title: "Post your product",
    text: "Add a title, a photo link, and a short description.",
  },
  {
    icon: MessageCircleIcon,
    title: "Get feedback",
    text: "Other creators can leave comments on your product page.",
  },
];

function HomePage() {
  const { isSignedIn } = useAuth();
  const { data: products, isLoading, error } = useProducts();

  const latest = (products ?? []).slice(0, 3);
  const sellerCount = new Set((products ?? []).map((p) => p.userId)).size;

  return (
    <div className="space-y-20">
      {/* HERO */}
      <section className="hero rounded-box overflow-hidden border border-base-300 bg-linear-to-br from-primary/15 via-base-200 to-secondary/15">
        <div className="hero-content w-full flex-col lg:flex-row-reverse justify-between gap-10 px-6 py-14 lg:px-12">
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-primary/25 blur-3xl rounded-full scale-110" />
            <img
              src="/image.png"
              alt=""
              className="relative h-60 lg:h-80 rounded-2xl shadow-2xl"
            />
          </div>

          <div className="max-w-lg text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Share your products with people who care
            </h1>
            <p className="py-4 text-base-content/70">
              Upload what you make, get comments from other creators, and
              browse everything the community is selling.
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {isSignedIn ? (
                <Link to="/create" className="btn btn-primary">
                  <PlusIcon className="size-4" />
                  New product
                </Link>
              ) : (
                <SignInButton mode="modal">
                  <button className="btn btn-primary">
                    <SparklesIcon className="size-4" />
                    Start selling
                  </button>
                </SignInButton>
              )}
              <Link to="/products" className="btn btn-outline">
                Browse products
              </Link>
            </div>
              {/* Exepremental code */}
            {/* {products && (
              <div className="mt-8 flex gap-10 justify-center lg:justify-start">
                <div>
                  <p className="text-2xl font-extrabold">{products.length}</p>
                  <p className="text-sm text-base-content/60">
                    {products.length === 1 ? "product" : "products"}
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold">{sellerCount}</p>
                  <p className="text-sm text-base-content/60">
                    {sellerCount === 1 ? "seller" : "sellers"}
                  </p>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </section>

      {/* LATEST PRODUCTS */}
      <section>
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">
              Latest products
            </h2>
            <p className="text-base-content/60 text-sm mt-1">
              Fresh from the community
            </p>
          </div>
          <Link to="/products" className="btn btn-ghost btn-sm">
            View all products
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div role="alert" className="alert alert-error">
            <span>Couldn't load products. Please refresh the page.</span>
          </div>
        ) : latest.length === 0 ? (
          <div className="card bg-base-200 border border-base-300">
            <div className="card-body items-center text-center py-12">
              <h3 className="card-title text-base-content/60">
                No products yet
              </h3>
              <p className="text-base-content/50 text-sm">
                Be the first to share something.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {latest.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* HOW IT WORKS */}
      <section>
        <h2 className="text-2xl font-extrabold tracking-tight mb-6">
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className="rounded-box border border-base-300 bg-base-200 p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-xl bg-primary/10 text-primary grid place-items-center">
                  <Icon className="size-5" />
                </div>
                <span className="text-sm font-semibold text-base-content/50">
                  Step {i + 1}
                </span>
              </div>
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="text-sm text-base-content/70 mt-1">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="rounded-box bg-primary text-primary-content p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Got something to sell?
          </h2>
          <p className="mt-2 opacity-90">
            It takes about a minute to post your first product.
          </p>
        </div>
        {isSignedIn ? (
          <Link
            to="/create"
            className="btn border-0 bg-primary-content text-primary"
          >
            <PlusIcon className="size-4" />
            Add a product
          </Link>
        ) : (
          <SignInButton mode="modal">
            <button className="btn border-0 bg-primary-content text-primary">
              Create a free account
            </button>
          </SignInButton>
        )}
      </section>
    </div>
  );
}

export default HomePage;