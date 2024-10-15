import Logo from '../../assets/image/Logo.png';
function Header() {
    return (
        <div className=' sticky top-0 h-[13vh] bg-[#f6f6f6] z-[100]'>
           <div className='main-content h-[13vh] w-screen px-3 flex items-center justify-between '>
           <div id="logo-header" className="flex items-center gap-1">
            <img className='w-[33px] ' src={Logo} alt=""></img>
            <strong className="font-bold text-base">SweetHome</strong>
               
            </div>
            <nav className="flex items-center w-[60%] px-6 ">
          <ul className="flex space-x-6 gap-10 text-[15px]">
            <li>
              <a href="#!" className="text-oxford-blue font-semibold hover:text-[#3CA9F9]">Nhà đất</a>
            </li>
            <li>
              <a href="#!" className="text-oxford-blue font-semibold hover:text-[#3CA9F9]">Tin tức</a>
            </li>
            <li>
              <a href="#!" className="text-oxford-blue font-semibold hover:text-[#3CA9F9]">Hướng dẫn</a>
            </li>
            <li>
              <a href="#!" className="text-oxford-blue font-semibold hover:text-[#3CA9F9]">Liên hệ</a>
            </li>
          </ul>
        </nav>
            <div>
                <button className="bg-custom_yellow px-3 py-2 font-semibold font-montserrat rounded-md bg-[#4F91F5] text-white">Đăng nhập</button>
            </div>
           </div>
        </div>
    );
}

export default Header;