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
            className="relative mx-auto max-w-xl divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5"
          >
            <div className="flex items-center px-4">
              <Combobox.Input
                onChange={(event) => {
                  console.log('onChange');
                  setQuery(event.target.value);
                }}
                className="h-12 w-full border-0 bg-transparent pl-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                placeholder="Search..."
                autoCorrect="off"
                autoCapitalize="off"
              />
            </div>

            {filteredProjects.length > 0 && (
              <Combobox.Options
                static
                className="max-h-96 overflow-y-auto py-4 text-sm"
              >
                {filteredProjects.map((project) => (
                  <Combobox.Option key={project.id} value={project}>
                    {({ active }) => (
                      <div
                        className={`space-x-1 truncate px-4 py-2 ${
                          active ? 'bg-indigo-600' : 'bg-white'
                        }`}
                      >
                        <span
                          className={`font-medium ${
                            active ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {project.title}
                        </span>
                        <span
                          className={
                            active ? 'text-indigo-200' : 'text-gray-400'
                          }
                        >
                          in {project.team}
                        </span>
                      </div>
                    )}
                  </Combobox.Option>
                ))}
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
