import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

export default function BreadCrumb(props) {
  const items = [
    { href: '/', name: 'Import a file' },
    { href: '/map-template-columns', name: 'Map template columns' },
    { href: '/clean-and-finalize', name: 'Clean and finalize' },
  ];

  return (
    <>
      <div style={{ margin: '60px' }}>
        <Breadcrumb>
          {items.map((item, index) =>
            item.href === props.location_path ? (
              <Breadcrumb.Item key={0} href={item.href} active>{item.name}
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={index+1} href={item.href}>
                {item.name}
              </Breadcrumb.Item>
            )
          )}
        </Breadcrumb>
        {props.children}
      </div>
    </>
  )
}
