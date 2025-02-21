import { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Minus,
  ArrowBigUp,
  SendHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import "./FAQs.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FAQs = () => {
  const [selected, setSelected] = useState(null);
  const [queries, setQueries] = useState([]);
  const [replies, setReplies] = useState({});
  const [queryInput, setQueryInput] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(null);
  const [replyInput, setReplyInput] = useState("");
  const [likedStatus, setLikedStatus] = useState("Not Liked");
  const [count, setCount] = useState(0);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  const addQUeries = async () => {
    try {
      // const body = JSON.parse(localStorage.getItem("userdata"));
      const token = JSON.parse(localStorage.getItem("token")).token;
      const response = await axios.post(
        "http://localhost:2000/query/create",
        {
          // name: body.name,
          query: queryInput,
          // phone: body.phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log("Query added successfully");
      setQueryInput("");
      getQUeries();
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const getQUeries = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token")).token;
      const response = await axios.get(
        "http://localhost:2000/query/get-query",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      );

      setQueries(response.data.message); // Storing the list of queries in state
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const getReplies = async (name, phone, index) => {
    try {
      const token = JSON.parse(localStorage.getItem("token")).token;
      const response = await axios.post(
        "http://localhost:2000/query/get-reply",
        {
          name: name,
          phone: phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      // Update the replies state to store replies for this specific query
      setReplies((prevReplies) => ({
        ...prevReplies,
        [index]: response.data.message, // Store the replies based on query index
      }));
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const addReply = async (name1, phone1) => {
    try {
      // const body = JSON.parse(localStorage.getItem("userdata"));
      const token = JSON.parse(localStorage.getItem("token")).token;
      const response = await axios.post(
        "http://localhost:2000/query/reply",
        {
          name1: name1,
          phone1: phone1,
          reply: replyInput,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log("Reply added successfully");
      setReplyInput("");
      getReplies();
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const deleteReply = async (name, phone, reply) => {
    try {
      // const body = JSON.parse(localStorage.getItem("userdata"));
      const token = JSON.parse(localStorage.getItem("token")).token;
      console.log(name);
      console.log(phone);
      console.log(reply);
      const response = await axios.post(
        "http://localhost:2000/query/delete-reply",
        {
          name: name,
          phone: phone,
          query: reply,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log("Reply deleted successfully");
      getReplies();
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const addLike = async (number, phone) => {
    try {
      // const body = JSON.parse(localStorage.getItem("userdata"));
      const token = JSON.parse(localStorage.getItem("token")).token;

      const response = await axios.post(
        "http://localhost:2000/query/upvote",
        {
          name1: number,
          phone1: phone,
          // replyname: body.name,
          // replyphone: body.phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log("Added Like successfully");
      getQUeries();
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const checkLiked = async (name, phone) => {
    try {
      // const body = JSON.parse(localStorage.getItem("userdata"));
      const token = JSON.parse(localStorage.getItem("token")).token;

      const response = await axios.post(
        "http://localhost:2000/query/check",
        {
          queryname: name,
          queryphone: phone,
          // checkname: body.name,
          // checkphone: body.phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data.message);
      setLikedStatus(response.data.message);
      console.log(likedStatus);
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  useEffect(() => {
    getQUeries();
  }, []);

  return (
    <>
      <div className="flex flex-col h-full w-[70vw] justify-center items-center py-[0.1rem] px-[0.1rem] border rounded-xl bg-gradient-to-r from-green-300 to-green-400 faq-box">
        <div className="bg-black/90 rounded-xl w-[100%]">
          <h1 className="text-lg lg:text-2xl uppercase text-center tracking-wider bg-gradient-to-r from-green-700 via-green-500 to-green-200 text-transparent bg-clip-text my-10">
            Frequently Asked Questions
          </h1>
          <div className="max-w-5xl mx-auto px-5 lg:px-10 pb-10">
            {queries.map((item, i) => (
              <div
                key={i}
                className="border-t border-b border-black/80 lg:mx-5 bg-gradient-to-r from-green-300 to-green-400"
              >
                <div
                  onClick={async () => {
                    toggle(i);
                    await getReplies(item.name, item.phone, i);
                    await checkLiked(item.name, item.phone);
                  }}
                  className="flex flex-row justify-between items-start cursor-pointer py-5 px-6 bg-black/90"
                >
                  <h2 className="font-medium text-2xl max-md:text-base">
                    {item.query}
                  </h2>
                  <div className="flex flex-row justify-between items-center">
                    <div className="text-sm flex gap-1 max-md:hidden w-[13rem]">
                      asked by:{" "}
                      <p className="bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text">
                        {item.name}
                      </p>
                    </div>
                    <span>{selected === i ? <Minus /> : <Plus />}</span>
                  </div>
                </div>
                <div
                  className={`max-h-0 overflow-hidden content bg-black/90 px-5 lg:px-10 leading-7 tracking-wide text-base ${
                    selected === i ? "content show" : "content"
                  }`}
                >
                  {replies[i] && replies[i].length > 0 ? (
                    replies[i].map((reply, idx) => (
                      <>
                        <div key={idx}>
                          <div className="text-sm flex gap-3">
                            replied by:{" "}
                            <p className="bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text">
                              {reply.userName}
                            </p>
                          </div>
                          <p>{reply.reply}</p>
                        </div>
                        <div className="flex flex-wrap justify-between items-center gap-1 py-3 text-sm">
                          <div className="flex justify-start items-center cursor-pointer pt-5">
                            <div className="flex items-center justify-center gap-2 border border-neutral-500 px-3 py-[0.4rem] rounded-l-full hover:opacity-80 hover:border-green-700 hover:text-green-500">
                              <ArrowBigUp size={22} />
                              <div
                                onClick={() => {
                                  {
                                    likedStatus === "Liked"
                                      ? toast.error("Upvoted Already", {
                                          position: "bottom-center",
                                        })
                                      : addLike(item.name, item.phone);
                                  }
                                }}
                              >
                                {likedStatus === "Liked"
                                  ? `${item.upvote}`
                                  : "Upvote"}
                              </div>
                            </div>
                            <div className="flex items-center justify-center gap-2 border px-3 py-[0.4rem] border-neutral-500 hover:opacity-80 hover:border-neutral-700 hover:text-neutral-300">
                              <Pencil size={17} />
                              <p>Edit</p>
                            </div>
                            <div className="flex items-center justify-center gap-2 border rounded-r-full px-3 py-[0.4rem] border-neutral-500 hover:opacity-80 hover:border-red-700 hover:text-red-500">
                              <Trash2 size={17} />
                              <p
                                onClick={() =>
                                  deleteReply(
                                    item.name,
                                    item.phone,
                                    reply.reply
                                  )
                                }
                              >
                                Delete
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    ))
                  ) : (
                    <>
                      <div className="flex flex-row justify-between items-center mb-2">
                        <p>No replies yet.</p>
                        <div
                          onClick={() =>
                            setShowReplyBox(showReplyBox === i ? null : i)
                          }
                          className="flex justify-center items-center gap-1 border rounded-lg px-3 py-1"
                        >
                          {showReplyBox === i ? "Cancel" : "Add Reply"}
                        </div>
                      </div>
                      {showReplyBox === i && (
                        <div className="mt-4 flex flex-col items-end">
                          <input
                            type="text"
                            value={replyInput}
                            onChange={(e) => setReplyInput(e.target.value)}
                            placeholder="Enter your reply..."
                            className=" p-2 rounded-md w-full"
                          />
                          <button
                            onClick={() => {
                              addReply(item.name, item.phone);
                            }}
                            className="mt-2 px-4 py-2 bg-neutral-900/90 text-green-400 rounded-md mb-2"
                          >
                            Submit Reply
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 mx-auto lg:w-[50%] flex flex-row justify-center items-center border py-3 px-10 rounded-full border-neutral-700 hover:border-green-200 faq-input">
        <input
          type="text"
          placeholder="What is your question?..."
          value={queryInput}
          onChange={(e) => setQueryInput(e.target.value)}
          className="bg-transparent flex-1 p-3 text-base rounded-full outline-none"
        />
        <SendHorizontal
          className="text-neutral-400 cursor-pointer"
          onClick={addQUeries}
        />
        <ToastContainer />
      </div>
    </>
  );
};

export default FAQs;
