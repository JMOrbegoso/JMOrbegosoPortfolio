import React, { useState } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import useTranslation from 'next-translate/useTranslation';
import TranslationResource from '../enums/translationResource';
import ModalResult from './modal-result';

type Props = {};

const ContactForm = ({}: Props) => {
  const { t, lang } = useTranslation('common');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [modalShow, setModalShow] = React.useState(false);
  const [modalTypeShow, setModalTypeShow] = React.useState(false);

  const onFormSubmit = async (e: any) => {
    e.preventDefault();

    await fetch('/api/send-contact-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, message }),
    });

    setModalTypeShow(true);
    setModalShow(true);

    setFirstName('');
    setLastName('');
    setEmail('');
    setMessage('');
  };

  return (
    <>
      <Container>
        <Form onSubmit={onFormSubmit}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>{t(TranslationResource.first_name)}</Form.Label>
                <Form.Control
                  type="fname"
                  placeholder={t(TranslationResource.first_name_placeholder)}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>{t(TranslationResource.last_name)}</Form.Label>
                <Form.Control
                  type="lname"
                  placeholder={t(TranslationResource.last_name_placeholder)}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

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
              type="text"
              as="textarea"
              style={{ minHeight: 200 }}
              placeholder={t(TranslationResource.message_placeholder)}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>

          <Container style={{ textAlign: 'center' }}>
            <Button
              variant="primary"
              type="submit"
              style={{ minWidth: '30vw' }}
            >
              {t(TranslationResource.submit)}
            </Button>
          </Container>
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
