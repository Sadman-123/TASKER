import React from 'react'

function Tr(props) {
  return (
    <div className='cardx'>
      <img src={props.url}/> 
    <h1>
        {props.task}
    </h1>
    <h3>
        {props.time}
    </h3>
</div>
  )
}

export default Tr
