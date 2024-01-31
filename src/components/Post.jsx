/* eslint-disable react/prop-types */
import axios from "axios"
import { useEffect, useRef, useState } from "react"

const Post =({searchedPosts})=>{
  const [post, setPost]= useState([])
  const [comment, setComment] = useState('')
  const inputRef = useRef(null)
  useEffect(()=>{
    const token= localStorage.getItem('token')
    async function getAllPosts(){
      await axios.get('https://kennect-backend.onrender.com/posts',
      { headers: {
          'Authorization': `Bearer ${token}`,
      }
      }).then((response)=> {
        setPost(response.data)
        console.log(response.data)
      })
      console.log('this')
    }
    // if(!searchedPosts){
      getAllPosts()
    // }
 

  },[comment,searchedPosts])

  useEffect(()=>{
    if(searchedPosts?.length>0)
    setPost(searchedPosts)
    console.log('post',searchedPosts)
  },[searchedPosts])
  
  const [activePostIndex, setActivePostIndex] = useState(null);

  useEffect(() => {
    if (activePostIndex !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activePostIndex]);

  const toggleComments = (index) => {
    setActivePostIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  async function handlePostComment(activePostIndex){
    const token= localStorage.getItem('token')
    await axios.post('https://kennect-backend.onrender.com/comments', {post: activePostIndex,comment:comment},
    {headers: {
        'Authorization': `Bearer ${token}`,
    }}, ).then(()=> setComment('')).catch((e)=>console.log(e))
  
}  
  return(
    <>
    { post===undefined || post===null|| post.length===0 ?  
     ( <p className="w-[34em] text-center font-bold">No posts found. Be the first to share your thoughts!</p>)
      :(post?.map((obj,index)=>(
      <div key={index} className="post shadow-md w-[34em] p-[2em] flex flex-col my-2 justify-items-center break-words border-2 border-solid border-[rgb(34,91,88)]  ">
          <h4 className=" font-bold ">{obj.author.userName} </h4>
          <p className="  "> {obj.content}</p>
          <button onClick={() => toggleComments(index)}>
            {activePostIndex === index ? "Hide Comments" : "View Comments"}
          </button>
          {activePostIndex === index && (
            <div>
              {obj.comment.map((comment, commentIndex) => (
               <div key={commentIndex} className="flex gap-2">
               <h1 className="font-semibold">{comment.author.userName}</h1>
                <p >{comment.comment}</p>
                </div>
              ))}
              <div className="flex gap-2">
              <input ref={inputRef} placeholder="" onChange={(e)=>setComment(e.target.value)}/>
              <button onClick={()=>handlePostComment(obj._id)} className="text-[rgb(34,91,88)] font-semibold">Create Comment</button>
              </div>
            </div>
          )}
        </div>
        
    )))

    }
    </>
  )
}

export default Post