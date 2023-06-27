import React, {Fragment, memo, useState} from 'react';
import {adminSidebars} from "../../ultils/contants";
import {NavLink} from "react-router-dom";
import icons from "../../ultils/icons";

const activeClasses = "relative flex items-center gap-4 p-4 bg-gray-200 border-r-4 border-primary font-semibold"
const notActiveClasses = "flex items-center gap-4 p-4 hover:bg-gray-200"

const {MdOutlineKeyboardArrowDown, MdKeyboardArrowUp} = icons

const AdminSidebar = () => {

  const [avtiveSubMenu, setActiveSubMenu] = useState([])

  const handleShowSubMenu = (id) => {
    if (avtiveSubMenu.includes(id)) {
      setActiveSubMenu(avtiveSubMenu.filter(item => item !== id))
    } else {
      setActiveSubMenu([...avtiveSubMenu, id])
    }
  }

  return (
    <div className="bg-gray-100 h-full">
      <div className="flex flex-col p-4">
        <span className="font-bold text-4xl">
            HDCD <span className="text-primary">SHOP</span>
          </span>
        <small className="font-semibold">
          Admin Workspace
        </small>
      </div>
      <div>
        {
          adminSidebars.map((item) => (
            <Fragment key={item.id}>
              {
                item.type === 'SINGER' && (
                  <NavLink to={item.path}
                           className={({isActive}) => isActive ? activeClasses : notActiveClasses}
                  >
                    <span>
                      {item.icon}
                    </span>
                    <span>
                      {item.text}
                    </span>
                  </NavLink>
                )
              }
              {
                item.type === 'PARENT' && (
                  <div>
                    <div className="p-4 flex items-center justify-between cursor-pointer select-none"
                         onClick={
                           () => handleShowSubMenu(item.id)
                         }
                    >
                      <div className="flex items-center gap-4">
                        <span>
                        {item.icon}
                      </span>
                        <span>
                        {item.text}
                      </span>
                      </div>
                      <span>
                        {
                          avtiveSubMenu.includes(item.id) ? <MdKeyboardArrowUp size="20"/> : <MdOutlineKeyboardArrowDown size="20"/>
                        }
                      </span>
                    </div>
                    {
                      avtiveSubMenu.includes(item.id) && (
                        <div>
                          {item.subMenus.map((subItem) => (
                            <NavLink to={subItem.path} key={subItem.text}
                                     className={({isActive}) => isActive ? activeClasses : notActiveClasses}
                            >
                          <span className="pl-5">
                            {subItem.icon}
                          </span>
                              <span>
                            {subItem.text}
                          </span>
                            </NavLink>
                          ))}
                        </div>
                      )
                    }
                  </div>
                )
              }
            </Fragment>
          ))
        }
      </div>
    </div>
  );
};

export default memo(AdminSidebar);
