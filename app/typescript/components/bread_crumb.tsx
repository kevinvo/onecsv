import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

type BreadCrumbProps = {
  locationPath: string
  children: JSX.Element
}

export default function BreadCrumb({ locationPath, children }: BreadCrumbProps) {
  const items = [
    { href: '/', name: 'Import a file' },
    { href: '/map-template-columns', name: 'Map template columns' },
    { href: '/clean-and-export', name: 'Clean and export' },
  ]

  return (
    <>
      <div style={{ margin: '60px' }}>
        <Breadcrumb>
          {items.map((item, index) =>
            item.href === locationPath ? (
              <Breadcrumb.Item key={0} href={item.href} active>
                {item.name}
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={index + 1} href={item.href}>
                {item.name}
              </Breadcrumb.Item>
            ),
          )}
        </Breadcrumb>
        {children}
      </div>
    </>
  )
}
