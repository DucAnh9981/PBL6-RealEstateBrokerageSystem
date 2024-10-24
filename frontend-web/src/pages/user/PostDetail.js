import ImageCard from "../../components/image_card/ImageCard";
import DetailDescription from "../../components/detail_description/DetailDescription";
import BasicInformation from "../../components/basic_information/BasicInformation";
import ProfileInformation from "../../components/profile_information/ProfileInformation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faShareAlt,
  faBookmark,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Comment from "../../components/comment/Comment";

const DetailPost = () => {
  const { id } = useParams(); // Lấy id từ URL
  // const id = 3;
  const [post, setPost] = useState(null); // Lưu dữ liệu bài đăng
  const [isClicked, setIsClicked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleClick = () => {
    setTimeout(() => {
      setIsClicked(!isClicked);
    }, 80);
  };

  const handleSaveClick = () => {
    setTimeout(() => {
      setIsSaved(!isSaved);
    }, 80);
  };

  useEffect(() => {
    const fetchPostById = async () => {
      try {
        // Lấy bài đăng theo ID
        let url = `http://127.0.0.1:8000/api/posts/${id}`; // Thêm id vào URL

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        setPost(data); // Cập nhật bài đăng
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostById(); // Gọi hàm lấy bài đăng theo ID
  }, [id]);

  if (!post) {
    return <p>Loading...</p>; // Kiểm tra nếu post chưa có dữ liệu
  }

  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-[#E4FFFC] via-blue-200 to-blue-400 font-montserrat">
      <h3 className="mt-5 p-2 text-2xl font-bold text-white flex items-center gap-2 pl-5 w-[22rem] shadow-2xl shadow-[#E4FFFC] rounded-[3rem]">
        <FontAwesomeIcon
          icon={faListAlt}
          className="text-white bg-[#3CA9F9] p-3 w-5 h-5 rounded-full"
        />
        Chi tiết bài đăng
      </h3>

      <div className="flex flex-row-2 items-start justify-start">
        {/* Main content */}
        <div className="p-6 mt-5 mb-5 max-w-[65%] mx-auto rounded-lg bg-white border-double border-[#3CA9F9] border-[2px] shadow-md">
          <div className="flex justify-between items-center px-6 py-4 bg-white">
            <h1 className="text-2xl font-bold text-[#3CA9F9] mb-4">
              {post.title}
            </h1>
            <div className="px-5 w-[10rem] justify-center text-center py-2 text-[#3CA9F9] border-[2px] border-double border-[#3CA9F9] rounded-[0.5rem]">
              {post.id}
            </div>
          </div>

          {/* Profile + reaction */}
          <div className="flex flex-row justify-between">
            <ProfileInformation
              name={post.author.username} // Truy cập đúng vào thuộc tính username của tác giả
              date={post.created_at} // Truy cập vào ngày tạo bài viết
            />

            <div className="mt-4 flex justify-center items-center">
              <button className="bg-[#3CA9F9] text-white px-5 py-3 rounded-md">
                Thương lượng
              </button>
            </div>

            <div className="flex space-x-8 mt-4 justify-end">
              {/* Heart */}
              <div className="flex items-end text-gray-500 space-x-1">
                <button onClick={handleClick} className="focus:outline-none">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={`w-8 h-8 transition duration-100 ${
                      isClicked ? "text-red-400" : "text-gray-500"
                    }`}
                  />
                </button>
                <span>33</span>
              </div>
              {/* Chat */}
              <div className="flex items-end text-gray-500 space-x-1">
                <FontAwesomeIcon icon={faComment} className="w-8 h-8" />
                <span>124</span>
              </div>
              {/* Share */}
              <div className="flex items-end text-gray-500 space-x-1">
                <FontAwesomeIcon icon={faShareAlt} className="w-8 h-8" />
                <span>124</span>
              </div>
              {/* Save */}
              <div className="flex items-end text-gray-500 space-x-1">
                <button
                  onClick={handleSaveClick}
                  className="focus:outline-none"
                >
                  <FontAwesomeIcon
                    icon={faBookmark}
                    className={`w-8 h-8 transition duration-100 ${
                      isSaved ? "text-yellow-400" : "text-gray-500"
                    }`}
                  />
                </button>
                <span>2</span>
              </div>
            </div>
          </div>

          <BasicInformation
            price={post.price}
            area={post.area}
            orientation={post.orientation}
            bedroom={post.bedroom}
            bathroom={post.bathroom}
            street={post.street}
            district={post.district}
            city={post.city}
            description={post.description}
          />
          <ImageCard
            title="Hình ảnh mô tả:"
            imageUrl="https://th.bing.com/th/id/OIP.jbWA3pC_GsfnBH5IohOa8gHaFB?rs=1&pid=ImgDetMain"
          />
          <DetailDescription
            description={post.description}
            maxLength={5000000}
          />
        </div>

        {/* Comment */}
        <Comment />
        
      </div>
    </div>
  );
};

export default DetailPost;
