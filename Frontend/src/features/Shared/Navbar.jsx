import "../Shared/navbar.scss"
import { Link, useNavigate } from "react-router"

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <div className='navbar'>
        <p>Instagram</p>
        <Link to={"/friend-requests"}>Friend Request</Link>
        <button 
        onClick={()=>{navigate("/create-post")}}
        className='button primary-button'>New Post</button>
    </div>
  )
}

export default Navbar