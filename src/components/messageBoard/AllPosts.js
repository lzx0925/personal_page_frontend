import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AllPosts() {
  const [numbers, setNumbers] = useState(5);
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState([]);
  const [sort, setSort] = useState(-1);
  const [maxPage, setMaxPage] = useState(2);
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    console.log("maxpage", maxPage);
    getAllPosts();
  }, [page, numbers, sort, maxPage]);

  function getAllPosts() {
    axios
      .post("http://localhost:5000/allmessage", {
        page: page,
        numbers: numbers,
        sort: sort,
      })
      .then((response) => {
        console.log(response.data.messages);
        setMaxPage(response.data.maxPage);
        setAllPosts(response.data.messages.message);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function renderPosts() {
    console.log(123, allPosts);
    return allPosts.map((post) => (
      <div className="every-post" key={post._id}>
        <div className="post-username">{post.username}</div>
        <div className="post-content">{post.content}</div>
        <div className="post-date">
          {post.createdAt.slice(0, 16).split("T")[0] +
            " " +
            post.createdAt.slice(0, 16).split("T")[1]}
        </div>
        <div className="post-function">
          {user.username == post.username ? (
            <button className="delete fa fa-trash"></button>
          ) : (
            <button className="fa fa-thumbs-down"></button>
          )}
          <button className="like fa fa-thumbs-up"> </button>
        </div>
      </div>
    ));
  }

  return (
    <div className="all-posts">
      <link
        href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css"
        rel="stylesheet"
        type="text/css"
      />
      <div className="posts-header">
        <div className="sub-header">
          <button
            className="fa fa-chevron-circle-left"
            onClick={() => {
              page - 1 >= 1 ? setPage(page - 1) : setPage(0);
            }}
          ></button>
          <div className="page">page {page}</div>
          <button
            className="	fa fa-chevron-circle-right"
            onClick={() => {setPage(page + 1)}}
          ></button>
        </div>

        <div className="sub-header">
          <select
            className="numbers"
            onChange={(e) => {
              setNumbers(parseInt(e.target.value));
            }}
          >
            <option value="5">5 posts</option>
            <option value="10">10 posts</option>
          </select>

          <button
            className="sort"
            onClick={() => {
              {
                setSort(-sort);
              }
            }}
          >
            {sort == 1 ? "oldest" : "newest"}
          </button>
        </div>
      </div>
      {renderPosts()}
    </div>
  );
}
