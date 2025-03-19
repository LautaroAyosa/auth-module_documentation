import React from 'react';
import OriginalDocSidebarItem from '@theme-original/DocSidebarItem';
import clsx from 'clsx';

export default function DocSidebarItem(props) {
  const { item, ...rest } = props;
  const method = item.customProps?.method;

  return (
    <li className="menu__list-item">
      <OriginalDocSidebarItem
        {...rest}
        item={{
          ...item,
          label: (
            <>
              { !!method ? (
                <>
                  <span className={clsx(`sidebar-method sidebar-${method.toLowerCase()}`)}>
                    {method}
                  </span>
                  <span>
                    {item.label}
                  </span>
                </>
              ) : (
              <span>
                {item.label}
              </span>)}
            </>
          ),
        }}
      />
    </li>
  );
}
