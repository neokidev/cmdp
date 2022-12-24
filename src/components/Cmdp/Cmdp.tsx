import { Combobox, Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';

const projects = [
  { id: 0, title: 'GraphQL API', team: 'Engineering' },
  { id: 1, title: 'New Benefits Plan', team: 'Human Resources' },
  { id: 2, title: 'Onboarding Emails', team: 'Customer Success' },
  { id: 3, title: 'iOS App', team: 'Engineering' },
  { id: 4, title: 'Marketing Site Redesign', team: 'Engineering' },
  { id: 5, title: 'Hire CFO', team: 'Human Resources' },
  { id: 6, title: 'Android App', team: 'Engineering' },
  { id: 7, title: 'New Customer Portal', team: 'Engineering' },
  { id: 8, title: 'Co-op Program', team: 'Human Resources' },
  { id: 9, title: 'Implement NPS', team: 'Customer Success' },
  { id: 10, title: 'Employee Recognition', team: 'Human Resources' },
  { id: 11, title: 'Open Source Web Client', team: 'Engineering' },
];

export const Cmdp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filteredProjects = query
    ? projects.filter((project) =>
        project.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    function onKeydown(event: globalThis.KeyboardEvent) {
      if (event.key === 'k' && event.metaKey) {
        event.preventDefault();
        setIsOpen((isOpen) => !isOpen);
      }
    }

    window.addEventListener('keydown', onKeydown);
    return () => {
      window.removeEventListener('keydown', onKeydown);
    };
  }, []);

  return (
    <Transition.Root
      show={isOpen}
      as={Fragment}
      afterLeave={() => {
        setQuery('');
      }}
    >
      <Dialog
        onClose={setIsOpen}
        className="fixed inset-0 overflow-y-auto p-4 pt-[25vh]"
      >
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />
        </Transition.Child>
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            value={query}
            onChange={() => {
              setIsOpen(false);
            }}
            as="div"
            className="relative mx-auto max-w-xl bg-gray-800 divide-y divide-white/10 overflow-hidden rounded-xl shadow-2xl ring-1 ring-black/5"
          >
            <div className="flex items-center px-2">
              <Combobox.Input
                onChange={(event) => {
                  console.log('onChange');
                  setQuery(event.target.value);
                }}
                className="h-14 w-full border-0 caret-gray-400 bg-transparent pl-2 text-white placeholder-gray-400 focus:outline-none"
                placeholder="Search..."
                autoCorrect="off"
                autoCapitalize="off"
              />
            </div>

            {filteredProjects.length > 0 && (
              <Combobox.Options
                static
                className="h-96 w-full overflow-y-auto text-sm"
              >
                <div className="relative w-full box-border">
                  {filteredProjects.map((project, index) => (
                    <Combobox.Option
                      key={project.id}
                      value={project}
                      className="absolute w-full px-2 box-border h-10"
                      style={{
                        top: `${2.5 * index}rem`,
                      }}
                    >
                      {({ active }) => (
                        <div
                          className={`h-10 w-full flex items-center truncate box-border rounded-lg overflow-hidden ${
                            active ? 'bg-white/10' : ''
                          }`}
                        >
                          <span className="text-white flex-1 min-w-0 truncate px-2">
                            {project.title}
                          </span>
                          <span className="text-gray-400 min-w-0 max-w-[50%] truncate px-2">
                            in {project.team}
                          </span>
                        </div>
                      )}
                    </Combobox.Option>
                  ))}
                </div>
              </Combobox.Options>
            )}
            {query && filteredProjects.length === 0 && (
              <p className="p-4 text-sm text-gray-500">No results found</p>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};
