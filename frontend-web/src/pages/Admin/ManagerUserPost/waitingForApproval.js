import React, { useState, useEffect } from "react";
import Pagination from "../../Pagination/Pagination";
import axios from 'axios';
import { useAppContext } from "../../../AppProvider"; 
import PostDetailPopup from '../Popup/PostDetailPopup';

const WaitingForApproval = () => {
  const { role, sessionToken } = useAppContext(); 
  const [posts, setPosts] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [postsPerPage] = useState(2); 
  const [selectedPostId, setSelectedPostId] = useState(null);
  const openPopup = (postId) => {
    setSelectedPostId(postId);
  };

  const closePopup = () => {
    setSelectedPostId(null);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/admin/posts/', {
          headers: {
            Authorization: `Bearer ${sessionToken}`, 
          },
        });

        console.log('Dữ liệu trả về:', response.data);
        
        const postsData = response.data.results; 

        if (Array.isArray(postsData)) {
          const pendingPosts = postsData.filter(post => post.status === 'Đang chờ duyệt');
          setPosts(pendingPosts);
        } else {
          console.error('Dữ liệu không phải là một mảng:', postsData);
          setPosts([]); 
        }

      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [sessionToken]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleApprovePost = async (postId) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/posts/${postId}/`, { status: 'đã duyệt' }, {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });
      
      setPosts(posts.map(post => 
        post.post_id === postId ? { ...post, status: 'đã duyệt' } : post
      ));
    } catch (error) {
      console.error('Error updating post status:', error);
    }
  };

  if (role !== 'admin') {
    return <div className="text-center text-red-500">Bạn không có quyền truy cập trang này.</div>;
  }

  return (
    <div className="h-[84vh] bg-white rounded-xl p-3">
      <h3 className="text-center font-bold mb-3 text-lg">Danh sách bài đăng chờ duyệt</h3>
      {currentPosts.map((post) => (
        <div key={post.post_id} className="flex flex-col w-[80%] h-[40%] bg-white border-solid border-2 border-slate-200 rounded-xl mb-5">
          <div className="flex justify-between items-center px-6 py-2">
            <h2 className="text-lg font-semibold text-[#3CA9F9]">{post.title}</h2>
            <button className="px-5 py-2 text-[#3CA9F9] border border-[#3CA9F9] rounded-lg">{post.sale_status}</button>
          </div>
          <div className="flex flex-row px-4 py-2">
            <div className="w-[40%] pr-4">
              <img
                className="w-full h-[60%] object-cover rounded-md"
                src="https://th.bing.com/th/id/OIP.c_e6N6YtIVI2NFhW_Ugm6wHaF7?w=246&h=197&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                alt="room_image"
              />
            </div>
            <div className="flex flex-col justify-between w-[55%] h-[55%] border-2 border-[#DCDCDC] p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-2 text-gray-700 text-lg font-bold">
                <p className="text-red-600">{post.price} VND</p>
                <p className="text-red-600">{post.area}m²</p>
              </div>
              <p className="text-gray-700">{post.city}, {post.district}</p>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="flex items-center gap-2">
                  <strong>{post.bedroom}</strong>
                  <p>phòng ngủ</p>
                </div>
                <div className="flex items-center gap-2">
                  <strong>{post.bathroom}</strong>
                  <p>phòng tắm</p>
                </div>
              </div>
              <div className="w-full flex items-center justify-center gap-8 mt-5">
                <button 
                  className="px-5 py-2 text-[#8bcaf7] border border-[#3CA9F9] rounded-lg" 
                  onClick={() => handleApprovePost(post.post_id)}
                >
                  Duyệt bài đăng
                </button>
                <button onClick={() => openPopup(post.post_id)} className="px-5 py-2 text-blue-500 border border-[#3CA9F9] rounded-lg">
            Chi tiết
          </button>
                <button className="px-5 py-2 text-[#3CA9F7] border border-[#3CA9F9] rounded-lg">Xóa bài đăng</button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {selectedPostId && <PostDetailPopup postId={selectedPostId} onClose={closePopup} />}

      <Pagination
        accountsPerPage={postsPerPage}
        totalAccounts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default WaitingForApproval;