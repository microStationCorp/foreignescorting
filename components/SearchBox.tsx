/* This example requires Tailwind CSS v2.0+ */
import { Dispatch, Fragment, SetStateAction } from "react";
import { Menu, Transition } from "@headlessui/react";
import { IStaff } from "pages/escort_duty/new";


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({
  items,
  setSelectedhandler,
  setStaffHandler,
}: {
  items: IStaff[];
  setSelectedhandler: Dispatch<SetStateAction<IStaff[] | undefined>>;
  setStaffHandler: Dispatch<SetStateAction<IStaff[] | undefined>>;
}) {
  const onSelectHandler = (item: IStaff) => {
    setStaffHandler((prev) => prev?.filter((data) => data.id !== item.id));

    setSelectedhandler((prev) => {
      if (prev !== undefined) {
        return [...prev, item];
      } else {
        return [item];
      }
    });
  };

  return (
    <Menu as="div" className="relative inline-block text-left my-2">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-sky-600 px-2 py-1 text-sm font-medium text-slate-100 shadow-sm hover:bg-sky-500">
          <span className="mr-1">Escorting staff</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer">
          <div className="py-1">
            {items?.map((item) => (
              <Menu.Item key={item.id}>
                {({ active }) => (
                  <a
                    onClick={() =>
                      onSelectHandler({ id: item.id, name: item.name,designation:item.designation })
                    }
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    {item.name} ({item.designation})
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
