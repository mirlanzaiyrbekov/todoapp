import React from 'react'
import { Link } from 'react-router-dom'

export const Header: React.FC = () => {
	return (
		<div className="flex items-center justify-between p-5 border-b border-b-gray-200">
			<Link to={'/'} className="tracking-wide">
				<h4 className="font-medium text-purple-800">Todo List</h4>
			</Link>
			<div>
				<span>User</span>
			</div>
		</div>
	)
}
