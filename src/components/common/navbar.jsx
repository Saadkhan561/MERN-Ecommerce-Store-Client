import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useFetchAllCategories } from "@/hooks/query";
import useCartStore from "@/store/cart";
import useUserStore from "@/store/user";
import Search from "../search";
// import { Link } from "next/link";
const Navbar = () => {
  const [logOut, setLogout] = useState(false);
  const [user, setUser] = useState();
  const router = useRouter();
  const [pathName, setPathName] = useState();

  const {currentUser, deleteUserInfo} = useUserStore()
  useEffect(() => {
    setPathName(router.pathname);
  }, [pathName]);

  const { data: categories, isLoading: isCategoryLoading } =
    useFetchAllCategories();

  const sideBar = (name) => {
    if (router.query[name]) {
      delete router.query[name];
    } else {
      router.query[name] = true;
    }
    router.push(router, undefined, { shallow: true });
  };

  const products = (name) => {
    if (router.query[name]) {
      delete router.query[name];
    } else {
      router.query[name] = true;
    }
    router.push(router, undefined, { shallow: true });
  };

  const logout = () => {
    deleteUserInfo()
    router.push("register?login=true");
  };

  const {cart} = useCartStore()

  return (
    <div className={router.query.payment ? "opacity-50 duration-200":""}>
      <div className="full_screen:hidden p-8 flex justify-end">
        <button onClick={() => sideBar("open")}>
          <img
            className="hover:cursor-pointer"
            src="/images/menu.png"
            alt=""
            height={25}
            width={25}
          />
        </button>
      </div>
      {/* FULL SCREEN NAVBAR */}
      <ul className="flex items-center justify-end p-1 pt-6 text-lg mob_display:hidden">
        <Search />
        <Link href={"/"} className="navbar_li">
          Home
        </Link>
        <Link href={"/products"} className="navbar_li">
          Shop
        </Link>
        <li className="navbar_li relative flex items-center gap-2">
          Products{" "}
          {pathName === "/products" ? null : (
            <img
              onClick={() => products("products")}
              className={
                eval(router.query.products)
                  ? "-rotate-90 cursor-pointer duration-200"
                  : "rotate-90 cursor-pointer duration-200"
              }
              src="/images/right-arrow.png"
              alt=""
              height={15}
              width={15}
            />
          )}
          <ul
            className={
              eval(router.query.products)
                ? "absolute z-10 text-start top-10 text-sm shadow-md border border-slate-300 rounded-md w-32 bg-white"
                : "absolute text-start top-10 text-sm shadow-md border border-slate-300 rounded-md w-32 hidden"
            }
          >
            {categories?.map((category) => (
              <li key={category._id} className="hover:bg-slate-200 duration-200 cursor-pointer w-full p-1">
                <Link href={`/products?category=${category._id}`}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <Link href={'/cart'} className="navbar_li flex justify-center relative">
          <img src="/images/cart.png" alt="cart" height={25} width={25} />
          <div className="absolute top-0 right-4 border border-black h-5 w-5 rounded-full font-bold text-sm bg-black text-white">
            {Object.keys(cart).length}
          </div>
        </Link>
        {currentUser ? (
          <li className="navbar_li flex justify-center relative">
            <img
              onClick={() => setLogout(!logOut)}
              src="/images/account.png"
              alt="account"
              height={25}
              width={25}
            />
            {logOut ? (
              <div
                onClick={logout}
                className="absolute z-10 top-10 right-0 w-[80px] p-1 text-sm border border-slate-200 text-red-500 font-semibold cursor-pointer hover:bg-slate-100 rounded-md duration-200"
              >
                Logout
              </div>
            ) : null}
          </li>
        ) : (
          <Link
            href={"register?login=true"}
            className="navbar_li flex justify-center text-sm"
          >
            LogIn/SignUp
          </Link>
        )}
      </ul>
      {/* SMALL SCREEN NAVBAR */}
      <div
        className={
          eval(router.query.open)
            ? "fixed top-0 right-0 w-[300px] border-slate-300 bg-white shadow-2xl z-10 h-screen full_screen:hidden"
            : "absolute left-full hidden full_screen:hidden"
        }
      >
        <ul>
          <li className="p-4 text-end">
            <button>
              <img
                className="border border-slate-400 rounded-full p-1"
                onClick={() => sideBar("open")}
                src="/images/right-arrow.png"
                alt=""
                height={25}
                width={25}
              />
            </button>
          </li>
          {user ? (
            <li className="p-3 hover:bg-slate-200 hover:cursor-pointer duration-200 font-semibold flex justify-between">
              <div className="flex justify-between w-full">Account</div>
            </li>
          ) : (
            <Link
              href={"register?login=true"}
              className="p-3 hover:bg-slate-200 hover:cursor-pointer duration-200 font-semibold flex justify-between"
            >
              LogIn/SignUp
            </Link>
          )}
          <li className="p-3 hover:bg-slate-200 hover:cursor-pointer duration-200 font-semibold flex justify-between">
            <Link href={"/"}>Home</Link>
          </li>
          <li className="p-3 hover:bg-slate-200 hover:cursor-pointer duration-200 font-semibold">
            <Link href={"/products"}>Shop</Link>
          </li>
          <li
            onClick={() => products("products")}
            className="flex items-center gap-2 p-3 hover:bg-slate-200 hover:cursor-pointer duration-200 font-semibold"
          >
            Products{" "}
            <img
              className={
                eval(router.query.products)
                  ? "-rotate-90 cursor-pointer duration-200"
                  : "rotate-90 cursor-pointer duration-200"
              }
              src="/images/right-arrow.png"
              alt=""
              height={15}
              width={15}
            />
          </li>
          <div
            className={eval(router.query.products) ? "ml-3 text-sm" : "hidden"}
          >
            {categories?.map((category) => (
              <li key={category._id} className="hover:bg-slate-200 text-slate-600 duration-200 cursor-pointer w-full p-1 font-semibold">
                <Link href={`/products?category=${category._id}`}>
                  {category.name}
                </Link>
              </li>
            ))}
          </div>
          <li className="p-3 hover:bg-slate-200 hover:cursor-pointer duration-200 font-semibold">
            My Cart
          </li>
          <li
            onClick={logout}
            className="p-3 text-red-500 hover:bg-slate-200 hover:cursor-pointer duration-200 font-semibold"
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
