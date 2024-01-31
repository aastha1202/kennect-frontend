import Post from "./Post";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../ModalContext";
import Signup from "./Signup";
import axios from "axios";
import Login from "./Login";
import { MdSearch } from "react-icons/md";
import _ from 'lodash'
const Home = () => {
  const { setModal } = useContext(ModalContext);
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [content, setPostsContent] = useState("");
  const [currentKey, setCurrentKey] = useState(0);
  const token = localStorage.getItem("token");
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  async function handlePost(e) {
    e.preventDefault();
    await axios
      .post(
        "https://kennect-backend.onrender.com/posts",
        { content: content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setPostsContent("");
        setCurrentKey((prevKey) => prevKey + 1);
      })
      .catch((e) => console.log(e));
  }

  const openSignupModal = () => {
    setSignupOpen(true);
    setModal(true);
    setLoginOpen(false);
  };

  const openLoginModal = () => {
    setLoginOpen(true);
    setModal(true);
    setSignupOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };

 async function handleSearch(query){
    await axios.get(`https://kennect-backend.onrender.com/posts/search?q=${query}`, {headers: {
        'Authorization': `Bearer ${token}`,
    }}).then((res)=> {
        setSearchResults(res.data)
        setCurrentKey((prevKey) => prevKey + 1);
     }).catch((e)=> console.log(e))
  }

  const debounceSearch = _.debounce(handleSearch,1000)
  return (
    <>
      <div className="grid grid-flow-col mt-[1em] ">
        <div className="w-[100%] flex flex-col my-[2em] items-center col-span-7 mx-4  ">
          {loggedIn ? (
            <>
              <form onSubmit={handlePost} className="flex gap-2 items-center">
                <textarea
                  placeholder="Text"
                  value={content}
                  onChange={(e) => setPostsContent(e.target.value)}
                  rows={5}
                  className="resize-none w-[20em] p-2 border-2 border-[rgb(34,91,88)]"
                />
                <button
                  type="submit"
                  className="bg-[rgb(34,91,88)] text-white p-2 rounded-lg"
                >
                  Create Post
                </button>
              </form>
            </>
          ) : (
            <h1 className="font-semibold uppercase text-red-500">
              Please Login To create Post
            </h1>
          )}
          <div className=" h-[35em] scrollable-content overflow-auto">
          {loggedIn && <Post key={currentKey}  searchedPosts={searchResults} />}
          </div>
        </div>
        <div className="col-span-5 ">
          {!loggedIn ? (
            <>
              <button
                className=" border-[1px]  bg-[rgb(34,91,88)] text-white p-2 rounded-lg"
                onClick={openSignupModal}
              >
                Signup
              </button>
              <button
                onClick={openLoginModal}
                className="bg-[rgb(34,91,88)] text-white p-2 rounded-lg"
              >
                Login
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-3 items-start">
            <button
              onClick={handleLogout}
              className="bg-[rgb(34,91,88)] text-white p-2 rounded-lg"
            >
              Logout
            </button>
            <div className="relative w-[20em] px-2">
            <input placeholder="Search Posts" className="w-[20em] px-2 " onChange={(e)=>debounceSearch(e.target.value)}/>
            <MdSearch size={20} className="absolute right-0 top-1"/>
            </div>
            </div>
          )}
        </div>
      </div>
      <Signup isOpen={signupOpen} />
      <Login isOpen={loginOpen} />
    </>
  );
};

export default Home;
