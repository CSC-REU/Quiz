/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { HiChevronDown } from 'react-icons/hi'


import {ImRadioChecked, ImCheckboxChecked} from 'react-icons/im';

import { classNames } from '@util/classnames';

function MultipleChoice() {
    return <div className="flex items-center"><ImRadioChecked className="inline-block"/><span className="ml-2">Multiple Choice</span></div>
}

function CheckBox() {
    return <div className="flex items-center"><ImCheckboxChecked className="inline-block"/><span className="ml-2">Checkboxes</span></div>
}

export default function QuestionMenu(props) {

    const [type, setType] = useState(props.type) 
  
    return (
    <Menu as="div" className="relative inline-block text-right">
      <div>
        <Menu.Button className="inline-flex justify-center w-full bg-white font-semibold text-gray-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100">
          {type === "mc" && <MultipleChoice />}
          {type === "cb" && <CheckBox />}
          <HiChevronDown className="-mr-1 h-7 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="z-10 text-left origin-top-right absolute w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
            <div className="py-1">
            <Menu.Item >
              {({ active }) => (
                <a
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm cursor-pointer'
                  )}
                  onClick={e => {
                      setType("mc")
                      props.onChange("mc");
                  }}
                >
                  <MultipleChoice  />
                </a>
              )}
            </Menu.Item>
            <Menu.Item >
              {({ active }) => (
                <a
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm cursor-pointer'
                  )}
                  onClick={e => {
                      setType("cb");
                      props.onChange("cb");
                  }}
                >
                  <CheckBox  />
                </a>
              )}

            </Menu.Item>         
            </div>
            <div className="py-1">
                {props.data.map(key => (
                        <Menu.Item key={key}>
                        {({ active }) => (
                        <a
                            href="#"
                            className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                            )}
                        >
                            {key._id}
                        </a>
                        )}
                    </Menu.Item>
                ))}
            </div> 

        </Menu.Items>
      </Transition>
    </Menu>
  )
}