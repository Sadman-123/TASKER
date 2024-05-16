import React from 'react'

function Tr(props) {
  return (
    <tr>
    <td>
        {props.task}
    </td>
    <td>
        {props.time}
    </td>
</tr>
  )
}

export default Tr
