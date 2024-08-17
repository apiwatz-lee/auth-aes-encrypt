import React from 'react'

const Button = ({className,type,title,onClick}) => {
  
  return    <button 
                  type={type} 
                  className={className}
                  onClick={onClick}
                  >
                {title}
            </button>  
}

export default Button