import React, { useState } from 'react';
import Container from './container';
import { Button, Form } from 'react-bootstrap';
import useTranslation from 'next-translate/useTranslation';
import TranslationResource from '../enums/translationResource';
import ModalResult from './modal-result';

type Props = {};

const ContactForm = ({}: Props) => {
  const { t, lang } = useTranslation('common');

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [modalShow, setModalShow] = React.useState(false);
  const [modalTypeShow, setModalTypeShow] = React.useState(false);

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    console.log('email', email);
    console.log('message', message);

    setModalTypeShow(true);
    setModalShow(true);
  };

  return (
    <>
      <Container>
        <Form onSubmit={onFormSubmit}>
          <Form.Group>
            <Form.Label>{t(TranslationResource.email)}</Form.Label>
            <Form.Control
              type="email"
              placeholder={t(TranslationResource.email_placeholder)}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>{t(TranslationResource.message)}</Form.Label>
            <Form.Control
              type="message"
              placeholder={t(TranslationResource.message_placeholder)}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {t(TranslationResource.submit)}
          </Button>
        </Form>
        <ModalResult
          title={
            modalTypeShow
              ? t(TranslationResource.email_sent_successfully)
              : t(TranslationResource.error_sending_email)
          }
          message={
            modalTypeShow
              ? t(TranslationResource.i_will_contact_you_shortly)
              : t(TranslationResource.an_error_occurred_sending_email)
          }
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Container>
    </>
  );
};

export default ContactForm;
