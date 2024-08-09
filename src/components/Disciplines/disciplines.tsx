
import React from "react";
import { sectionHeading,sectiondesc,InnerContainerStyle,disciplineWrapper } from "../Container/style.css";
import discipline from "../../images/Disciplines.png"


const Disciplines: React.FC = () => (
    <div className={InnerContainerStyle }>
        <div className={disciplineWrapper}>
    <div className={sectionHeading}>
    Disciplines 
    </div>
    <div className={sectiondesc}>
    S Cubed Platform simplifies the way you manage your practice and clinical process. It is designed to integrate with various disciplines allowing you to focus on your little clients’ well-being.
    </div>
    <img style={{maxWidth:"100%"}} src={discipline} alt="" />
    </div>
    </div>
)

export default  Disciplines;