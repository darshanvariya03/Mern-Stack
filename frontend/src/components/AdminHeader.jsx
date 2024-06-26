import React from 'react'
import '../Assets/adminStyle.css'
import { Link } from 'react-router-dom'

const AdminHeader = () => {
    return (
        <div className='admin-header'>
            <div className="admin-logo">
                <img src="https://res-console.cloudinary.com/dh74x8sny/media_explorer_thumbnails/e830a8abcf9ff38fc39548465faea2cc/detailed" width={200} className="py-4" alt srcSet />
            </div>
            <div className="admin-menu">
                <ul>
                    <li className='admin-li'><Link to={'/dashboard'}>Dashboard</Link></li>
                    <li className='admin-li'><Link to={'/category'}>Category</Link></li>
                    <li className='admin-li'><Link to={'/Adminproduct'}>Products</Link></li>
                    <li className='admin-li'><Link to={'/order'}>Order</Link></li>
                    <li className='admin-li'><Link>Mail</Link></li>
                </ul>
            </div>
        </div>


    )
}

export default AdminHeader