import { IStaff } from "pages/escort_duty/new";
import { Dispatch, SetStateAction } from "react";

export default function SelectedEscort({
  selected,
  setSelectedhandler,
  setStaffHandler,
}: {
  selected: IStaff[];
  setSelectedhandler: Dispatch<SetStateAction<IStaff[] | undefined>>;
  setStaffHandler: Dispatch<SetStateAction<IStaff[] | undefined>>;
}) {
  const removeHandler = (item: IStaff) => {
    setSelectedhandler((prev) => prev?.filter((data) => data.id !== item.id));

    setStaffHandler((prev) => {
      if (prev !== undefined) {
        return [...prev, item];
      } else {
        return [item];
      }
    });
  };
  return (
    <div className="mx-4 my-2">
      {selected?.map((s) => (
        <span key={s.id}>
          <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300">
            <span>
              {s.name}({s.designation})
            </span>
            <a
              className="cursor-pointer hover:bg-gray-600 rounded-full ml-2"
              onClick={() => removeHandler(s)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </a>
          </span>
        </span>
      ))}
    </div>
  );
}
