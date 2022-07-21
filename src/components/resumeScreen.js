import React, { Fragment, memo } from 'react'

const ResumeScreen = memo((formData) => {

        console.log(formData.fusername);
const ResumeDesign1 = () => {
    <Fragment>
        <div>
            
            
        </div>
    </Fragment>
}

const ResumeDesign2 = () => {
    
}

  return (
    <Fragment>
        <ResumeDesign1 />
        <ResumeDesign2 />
        <p>Resume Static</p>
        <h1>Username Dynamic is {formData.fusername}</h1>
    </Fragment>
  )
})

export default ResumeScreen