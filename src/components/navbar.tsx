import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Link from 'next/link';
import { WEB_NAME } from '../lib/constants';
import LanguagePicker from './language-picker';
import useTranslation from 'next-translate/useTranslation';
import TranslationResource from '../enums/translationResource';

type Props = {};

const NavBar = ({}: Props) => {
  const { t, lang } = useTranslation('common');

  return (
    <Navbar bg="primary" variant="dark" fixed="top" expand="lg">
      <Link href="/#" passHref>
        <Navbar.Brand>{WEB_NAME}</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link href="/#aboutme" passHref>
            <Nav.Link>{t(TranslationResource.about)}</Nav.Link>
          </Link>
          <Link href="/#skills" passHref>
            <Nav.Link>{t(TranslationResource.skills)}</Nav.Link>
          </Link>
          <Link href="/#projects" passHref>
            <Nav.Link>{t(TranslationResource.projects)}</Nav.Link>
          </Link>
          <Link href="/#contact" passHref>
            <Nav.Link>{t(TranslationResource.contact)}</Nav.Link>
          </Link>
        </Nav>
        <LanguagePicker />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
