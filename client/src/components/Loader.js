import React from 'react'

export const Loader = () => (
  <div className="container centered full-height">
    <div className="preloader-wrapper big active ">
      <div className="spinner-layer spinner-white-only">
        <div className="circle-clipper left">
          <div className="circle"/>
        </div><div className="gap-patch">
          <div className="circle"/>
        </div><div className="circle-clipper right">
          <div className="circle"/>
        </div>
      </div>
    </div>
  </div>
)