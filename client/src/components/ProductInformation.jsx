import {memo, useState} from "react";
import {productInfoTabs} from "../ultils/contants";

const ProductInformation = () => {

	const activeClass = "uppercase text-lg bg-white px-4 rounded-t-md py-2 border-t border-l border-r border-gray-300 hover:bg-white cursor-pointer"
	const notActiveClass = "uppercase text-lg bg-gray-200 px-4 rounded-t-md py-2 border border-gray-300 hover:bg-white cursor-pointer"

	const [activeTab, setActiveTab] = useState(0);

	return (
		<div>
			<div className="flex items-center gap-1 relative bottom-[-1px]">
				{
					productInfoTabs.map((tab) => (
						<span key={tab.id} className={activeTab === tab.id ? activeClass : notActiveClass} onClick={
							() => setActiveTab(tab.id)
						}>
							{tab.title}
						</span>
					))
				}
			</div>
			<div className="w-full h-[300px] border rounded-b-md rounded-tr-md border-gray-300 p-5">
				{
					productInfoTabs.map((tab) => (
						<p key={tab.id}>
							{activeTab === tab.id && tab.content}
						</p>
					))
				}
			</div>
		</div>
	)
}

export default memo(ProductInformation);