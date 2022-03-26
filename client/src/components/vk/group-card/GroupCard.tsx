import React, {FC} from "react"
import { useDispatch, useSelector } from "react-redux"

interface GroupCardProps {
    name: string;
    imgURL: string;
}

export const GroupCard: FC<GroupCardProps> = ({name, imgURL}) => {
    return (
      <div>
        <div>
        <img alt="" src={imgURL} />
        </div>
        <div className="name"><b>{name}</b></div>
      </div>
    )
}