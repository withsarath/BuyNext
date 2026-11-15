import { useState } from "react";
import { useProducts } from "../hooks/useProduct";
import { PackageIcon, SearchIcon, XIcon } from "lucide-react";
import { Link } from "react-router";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";

function ProductsPage() {
  const { data: products, isLoading, error } = useProducts();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");

  const search = query.trim().toLowerCase();
  const filtered = (products ?? []).filter(
    (p) =>
      p.title?.toLowerCase().includes(search) ||
      p.description?.toLowerCase().includes(search),
  );

  // the API already returns newest first
  const visible =
    sort === "oldest"
      ? [...filtered].reverse()
      : sort === "az"
        ? [...filtered].sort((a, b) => a.title.localeCompare(b.title))
        : filtered;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
            <PackageIcon className="size-7 text-primary" />
            All products
          </h1>
          {products && (
            <p className="text-base-content/60 mt-1">
              {products.length} {products.length === 1 ? "product" : "products"}{" "}
              from the community
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <label className="input input-bordered flex items-center gap-2 w-full sm:w-64">
            <SearchIcon className="size-4 opacity-60" />
            <input
              type="search"
              className="grow"
              placeholder="Search products"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <select
            className="select select-bordered w-full sm:w-40"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort products"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="az">Title A-Z</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div role="alert" className="alert alert-error">
          <span>Couldn't load products. Please refresh the page.</span>
        </div>
      ) : products.length === 0 ? (
        <div className="card bg-base-200 border border-base-300">
          <div className="card-body items-center text-center py-16">
            <PackageIcon className="size-16 text-base-content/20" />
            <h3 className="card-title text-base-content/60">No products yet</h3>
            <p className="text-base-content/50 text-sm">
              Be the first to share something.
            </p>
            <Link to="/create" className="btn btn-primary btn-sm mt-2">
              Create product
            </Link>
          </div>
        </div>
      ) : visible.length === 0 ? (
        <div className="card bg-base-200 border border-base-300">
          <div className="card-body items-center text-center py-14">
            <SearchIcon className="size-12 text-base-content/20" />
            <h3 className="card-title text-base-content/60">
              No products match "{query.trim()}"
            </h3>
            <button
              className="btn btn-ghost btn-sm mt-2"
              onClick={() => setQuery("")}
            >
              <XIcon className="size-4" />
              Clear search
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
