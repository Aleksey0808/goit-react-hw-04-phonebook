import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import { Report } from 'notiflix/build/notiflix-report-aio';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { Container, Title } from './App.styles';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    contacts.some(contact => contact.name === name)
      ? Report.warning(`${name}`, 'Such a name already exists!', 'OK')
      : this.setState(({ contacts }) => ({
          contacts: [newContact, ...contacts],
        }));
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });
  };

  handleFilterChange = event => {
    const { name, value } = event.currentTarget;

    this.setState({
      [name]: value,
    });
  };

  deleteContacts = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const filterName = this.filterContacts();
    const addContact = this.addContact;
    const handleFilterChange = this.handleFilterChange;
    const deleteContacts = this.deleteContacts;
    const { filter } = this.state;
    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={addContact} />
        <Title>Contacts</Title>
        <Filter filter={filter} changeFilter={handleFilterChange} />
        <ContactList filter={filterName} onDeleteContacts={deleteContacts} />
      </Container>
    );
  }
}
