"use client";

import { FC, memo, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuBar, Button } from "tp-kit/components";
import { ShoppingBag, X } from "@phosphor-icons/react";

type Props = {};

const Menu: FC<Props> = memo(function () {
  return (
    <MenuBar
      trailing={
        <Popover as="div" className="flex justify-end">
          {({ open }) => (
            <>
              <Popover.Button as={Button} variant={"ghost"} className={"!rounded-full !p-0 flex justify-center items-center aspect-square relative text-3xl"}>
                {open 
                  ? <X size={18} weight="regular" />
                  : <ShoppingBag size={24} weight="regular" />}

                <div className="aspect-square bg-brand text-white text-center text-xs absolute right-0 top-0 rounded-full flex items-center justify-center h-[20px] w-[20px]">
                  <div>0</div>
                </div>
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-0 sm:left-auto right-0 top-full z-10 mt-6 sm:w-full sm:max-w-sm">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white p-8">
                    <p className="my-12 text-center text-gray-600 text-sm">Votre panier est vide</p>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      }
    />
  );
});

Menu.displayName = "Menu";
export { Menu };
