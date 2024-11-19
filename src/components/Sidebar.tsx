import { FunctionComponent, ReactElement } from "react";

interface Contact {
  id: number;
  name: string;
}

interface SidebarProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
}

const Sidebar: FunctionComponent<SidebarProps> = ({ contacts, onSelectContact }): ReactElement => {
  return (
    <div className="w-1/4 h-screen bg-gray-100 border-r overflow-y-auto">
      <h2 className="text-xl font-bold p-4">Contacts</h2>
      <ul className="space-y-2 px-4">
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className="cursor-pointer p-3 rounded-lg hover:bg-gray-200"
            onClick={() => onSelectContact(contact)}
          >
            {contact.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
